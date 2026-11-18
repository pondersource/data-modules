import {
  getJsonLdDateField,
  getJsonLdLinkOrStringField,
  getJsonLdStringField,
} from './jsonld.js';

export type Listing = {
  id?: string;
  created?: Date;
  modified?: Date;
  movie: {
    published?: Date;
    description?: string;
    image?: string;
    name?: string;
    sameAs: string[];
  };
};
export type WatchAction = {
  id?: string;
  created?: Date;
  startTime?: Date;
  endTime?: Date;
  listingId?: string;
  /** @deprecated Historical declaration typo; use listingId. */
  listingUr?: string;
};
export type Interpretation = {
  listings: Listing[];
  watchActions: WatchAction[];
};

type Node = Record<string, unknown>;
const schema = 'https://schema.org/';
const contains = 'http://www.w3.org/ns/ldp#contains';

function nodes(value: unknown): Node[] {
  const graph = !Array.isArray(value) && value && typeof value === 'object'
    ? (value as Node)['@graph']
    : value;
  if (!Array.isArray(graph) || graph.some(node => !node || typeof node !== 'object' || Array.isArray(node))) {
    throw new TypeError('Expected expanded JSON-LD nodes or an @graph wrapper');
  }
  return graph as Node[];
}

function values(node: Node, predicate: string): Node[] {
  return Array.isArray(node[predicate])
    ? (node[predicate] as unknown[]).filter(value => value && typeof value === 'object') as Node[]
    : [];
}

function links(node: Node, predicate: string): string[] {
  return values(node, predicate)
    .map(value => value['@id'] ?? value['@value'])
    .filter((value): value is string => typeof value === 'string');
}

/** Interpret expanded JSON-LD. Context expansion is the caller/server's responsibility. */
export function parseMovies(value: unknown): Interpretation {
  const result: Interpretation = { listings: [], watchActions: [] };
  for (const thing of nodes(value)) {
    const types = Array.isArray(thing['@type']) ? thing['@type'] as unknown[] : [];
    const id = typeof thing['@id'] === 'string' ? thing['@id'] : undefined;
    if (types.includes(schema + 'Movie')) {
      result.listings.push({
        id,
        created: getJsonLdDateField(thing, 'http://purl.org/dc/terms/created'),
        modified: getJsonLdDateField(thing, 'http://purl.org/dc/terms/modified'),
        movie: {
          published: getJsonLdDateField(thing, schema + 'datePublished'),
          description: getJsonLdStringField(thing, schema + 'description'),
          image: getJsonLdLinkOrStringField(thing, schema + 'image'),
          name: getJsonLdStringField(thing, schema + 'name'),
          sameAs: links(thing, schema + 'sameAs'),
        },
      });
    }
    if (types.includes(schema + 'WatchAction')) {
      result.watchActions.push({
        id,
        created: getJsonLdDateField(thing, 'http://purl.org/dc/terms/created'),
        startTime: getJsonLdDateField(thing, schema + 'startTime'),
        endTime: getJsonLdDateField(thing, schema + 'endTime'),
        listingId: getJsonLdLinkOrStringField(thing, schema + 'object'),
      });
    }
  }
  return result;
}

async function getJsonLd(uri: string, authenticatedFetcher: typeof globalThis.fetch): Promise<Node[]> {
  const response = await authenticatedFetcher(uri, { headers: { Accept: 'application/ld+json' } });
  if (!response.ok) {
    throw new Error('Unable to read ' + uri + ': HTTP ' + response.status);
  }
  return nodes(await response.json());
}

/** Read direct container members; does not recurse into subcontainers or discover the type index. */
export async function fetchList(folderUri: string, aFetch: typeof globalThis.fetch): Promise<Interpretation> {
  const folder = new URL(folderUri).href;
  if (!folder.endsWith('/')) {
    throw new TypeError('Movie container URL must end with /');
  }
  const index = await getJsonLd(folder, aFetch);
  const container = index.find(entry => entry['@id'] === folder);
  const members = container && Array.isArray(container[contains])
    ? links(container, contains)
    : index.map(entry => entry['@id']).filter((id): id is string => typeof id === 'string' && id.startsWith(folder));
  const documents = [...new Set(members.map(member => new URL(member, folder).href.split('#')[0]))]
    .filter(member => member !== folder && !member.endsWith('/'));
  const interpretations = await Promise.all(documents.map(async member => parseMovies(await getJsonLd(member, aFetch))));
  return {
    listings: interpretations.flatMap(result => result.listings),
    watchActions: interpretations.flatMap(result => result.watchActions),
  };
}
