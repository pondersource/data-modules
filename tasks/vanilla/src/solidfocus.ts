/**
 * SolidFocus's native schemas and document operations.
 * Schema definitions adapted from Noel De Martin's SolidFocus v0.3.4
 * (ecdef05e5d267e81c12a04e20f7ff6e2a5cfb783), under its MIT license.
 * The application supplies its UI model subclasses; their original Soukai
 * engine performs the RDF/history writes using only this module's fetch.
 */
import { Parser } from 'n3';
import { parseSchemaTasks } from './schema-tasks.js';
import type { SchemaTask } from './schema-tasks.js';

const schema = 'https://schema.org/';
const ical = 'http://www.w3.org/2002/12/cal/ical#';
const crdt = 'https://vocab.noeldemartin.com/crdt/';
const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

type Fetcher = typeof globalThis.fetch;
type Attributes = Record<string, unknown>;
interface SchemaModel {
  getAttribute(name: string): unknown;
  setAttribute(name: string, value: unknown): void;
}
const containerFields = {
  name: { type: 'string', rdfProperty: 'rdfs:label' },
  description: { type: 'string', rdfProperty: 'rdfs:comment' },
  resourceUrls: { type: 'array', rdfProperty: 'ldp:contains', items: 'key' },
  createdAt: { type: 'date', rdfProperty: 'purl:created' },
  updatedAt: { type: 'date', rdfProperty: 'purl:modified' },
} as const;

/** Plain schema definitions keep the owning format independent of a UI framework. */
export const focusSchemas = {
  task: {
    rdfsClasses: ['Action', 'ical:Vtodo'] as string[],
    rdfContexts: { default: schema, ical },
    history: true,
    tombstone: false,
    fields: {
      name: { type: 'string', required: true, alias: '_summary' },
      description: 'string',
      status: { type: 'key', rdfProperty: 'actionStatus' },
      priority: { type: 'number', rdfProperty: 'ical:priority' },
      dueDate: { type: 'date', rdfProperty: 'ical:due' },
      completedAt: { type: 'date', rdfProperty: 'ical:completed' },
      _summary: { type: 'string', rdfProperty: 'ical:summary' },
    },
    hooks: {
      afterInitialize(this: SchemaModel): void {
        if (this.getAttribute('name') !== null) return;
        this.setAttribute('name', this.getAttribute('description'));
      },
      beforeSave(this: SchemaModel): void {
        this.setAttribute('status', schema + (this.getAttribute('completedAt') ? 'CompletedActionStatus' : 'PotentialActionStatus'));
      },
    },
  },
  legacyTask: {
    rdfsClass: 'lifecycle:Task',
    rdfContexts: { lifecycle: 'http://purl.org/vocab/lifecycle/schema#', cal: ical, purl: 'http://purl.org/dc/terms/' },
    history: true,
    tombstone: false,
    defaultResourceHash: '',
    fields: {
      name: { type: 'string', rdfProperty: 'rdfs:label', required: true },
      description: { type: 'string', rdfProperty: 'rdfs:comment' },
      priority: { type: 'number', rdfProperty: 'cal:priority' },
      dueDate: { type: 'date', rdfProperty: 'cal:due' },
      completedAt: { type: 'date', rdfProperty: 'cal:completed' },
      legacyCreatedAt: { type: 'date', rdfProperty: 'purl:created', alias: 'createdAt' },
      legacyUpdatedAt: { type: 'date', rdfProperty: 'purl:modified', alias: 'updatedAt' },
    },
  },
  list: { fields: containerFields, history: true, timestamps: true },
  workspace: {
    rdfContexts: { tasks: schema },
    fields: { color: { type: 'string', rdfProperty: 'schema:color' }, ...containerFields },
  },
} as const;

interface FocusModel {
  url: string;
  setEngine(engine: unknown): void;
  update(attributes: Attributes): Promise<FocusModel>;
  delete(): Promise<unknown>;
  loadRelationIfUnloaded(name: string): Promise<unknown>;
}
interface FocusModelClass {
  find(uri: string): Promise<FocusModel | null>;
  create(attributes: Attributes): Promise<FocusModel>;
  getEngine(): unknown;
  setEngine(engine: unknown): void;
  withCollection<T>(collection: string, operation: () => Promise<T>): Promise<T>;
}
export interface FocusModels {
  SolidEngine: new (fetcher: Fetcher) => unknown;
  Task: FocusModelClass;
  TasksList: FocusModelClass;
  Workspace: FocusModelClass;
}

/**
 * Domain operations share the original model schemas, CRDT history and per-document URLs.
 * Engine injection avoids shipping a second copy/version of Soukai into each application.
 */
export interface FocusStorage {
  engine: unknown;
  readTask(uri: string): Promise<FocusModel | null>;
  createTask(container: string, attributes: Attributes): Promise<FocusModel>;
  updateTask(uri: string, attributes: Attributes): Promise<FocusModel>;
  deleteTask(uri: string): Promise<void>;
  readTaskHistory(uri: string): Promise<{ metadata: unknown; operations: unknown } | null>;
  readList(uri: string): Promise<FocusModel | null>;
  createList(container: string, attributes: Attributes): Promise<FocusModel>;
  updateList(uri: string, attributes: Attributes): Promise<FocusModel>;
  readWorkspace(uri: string): Promise<FocusModel | null>;
  createWorkspace(container: string, attributes: Attributes): Promise<FocusModel>;
  updateWorkspace(uri: string, attributes: Attributes): Promise<FocusModel>;
}
export interface NativeQuad {
  subject: { termType: string; value: string };
  predicate: { termType: string; value: string };
  object: { termType: string; value: string; language?: string; datatype?: { value: string } };
  graph: { termType: string; value: string };
}
export interface FocusDocument {
  url: string;
  body: string;
  contentType: string;
  etag: string | null;
  quads: NativeQuad[];
  tasks: SchemaTask[];
  history: NativeQuad[];
}

const modelQueues = new WeakMap<FocusModelClass, Promise<void>>();

function collectionFor(uri: string): string {
  const url = new URL(uri);
  url.hash = '';
  return new URL(url.pathname.endsWith('/') ? '../' : '.', url).href;
}

export function openFocus(fetcher: Fetcher, models: FocusModels): FocusStorage {
  const engine = new models.SolidEngine(fetcher);
  // Model classes are shared with the UI. Serialize temporary class configuration,
  // restore it on every outcome, and bind returned instances to this owning engine.
  const run = <T>(Model: FocusModelClass, collection: string, operation: () => Promise<T>): Promise<T> => {
    const previous = modelQueues.get(Model) || Promise.resolve();
    const result = previous.then(() => Model.withCollection(collection, async () => {
      const originalEngine = Model.getEngine();
      Model.setEngine(engine);
      try { return await operation(); }
      finally { Model.setEngine(originalEngine); }
    }));
    modelQueues.set(Model, result.then(() => undefined, () => undefined));
    return result;
  };
  const find = async (Model: FocusModelClass, uri: string): Promise<FocusModel | null> => {
    const model = await Model.find(uri);
    model?.setEngine(engine);
    return model;
  };
  const read = (Model: FocusModelClass, uri: string): Promise<FocusModel | null> => run(Model, collectionFor(uri), () => find(Model, uri));
  const update = (Model: FocusModelClass, uri: string, attributes: Attributes): Promise<FocusModel> => run(Model, collectionFor(uri), async () => {
    const model = await find(Model, uri);
    if (!model) throw new Error('Task resource not found: ' + uri);
    return model.update(attributes);
  });
  const create = (Model: FocusModelClass, collection: string, attributes: Attributes): Promise<FocusModel> => {
    const url = new URL(collection);
    if (!url.pathname.endsWith('/') || url.hash || url.search) throw new TypeError('Choose a task container URL');
    if (typeof attributes.url === 'string' && collectionFor(attributes.url) !== collection) throw new TypeError('Task must belong to its chosen container');
    return run(Model, collection, async () => {
      const model = await Model.create(attributes);
      model.setEngine(engine);
      return model;
    });
  };
  return {
    engine,
    readTask: (uri: string): Promise<FocusModel | null> => read(models.Task, uri),
    createTask: (container: string, attributes: Attributes): Promise<FocusModel> => create(models.Task, container, attributes),
    updateTask: (uri: string, attributes: Attributes): Promise<FocusModel> => update(models.Task, uri, attributes),
    deleteTask: (uri: string): Promise<void> => run(models.Task, collectionFor(uri), async () => {
      const model = await find(models.Task, uri);
      if (!model) return;
      await model.delete();
    }),
    readTaskHistory: (uri: string): Promise<{ metadata: unknown; operations: unknown } | null> => run(models.Task, collectionFor(uri), async () => {
      const model = await find(models.Task, uri);
      if (!model) return null;
      return { metadata: await model.loadRelationIfUnloaded('metadata'), operations: await model.loadRelationIfUnloaded('operations') };
    }),
    readList: (uri: string): Promise<FocusModel | null> => read(models.TasksList, uri),
    createList: (container: string, attributes: Attributes): Promise<FocusModel> => create(models.TasksList, container, attributes),
    updateList: (uri: string, attributes: Attributes): Promise<FocusModel> => update(models.TasksList, uri, attributes),
    readWorkspace: (uri: string): Promise<FocusModel | null> => read(models.Workspace, uri),
    createWorkspace: (container: string, attributes: Attributes): Promise<FocusModel> => create(models.Workspace, container, attributes),
    updateWorkspace: (uri: string, attributes: Attributes): Promise<FocusModel> => update(models.Workspace, uri, attributes),
  };
}

/** A lossless native RDF view: callers keep the original document, term kinds and boundaries. */
export async function readFocusDocument(url: string, fetcher: Fetcher = globalThis.fetch): Promise<FocusDocument> {
  const document = new URL(url);
  document.hash = '';
  const response = await fetcher(document.href, { headers: { Accept: 'text/turtle, application/n-triples;q=0.9' } });
  if (!response.ok) throw new Error('Reading task document failed: HTTP ' + response.status);
  const body = await response.text();
  const contentType = response.headers.get('Content-Type') || 'text/turtle';
  const quads: NativeQuad[] = new Parser({ baseIRI: document.href, format: contentType.split(';')[0] }).parse(body);
  const expanded = new Map<string, Record<string, unknown>>();
  for (const quad of quads) {
    if (quad.subject.termType !== 'NamedNode') continue;
    const node = expanded.get(quad.subject.value) || { '@id': quad.subject.value };
    if (quad.predicate.value === rdfType && quad.object.termType === 'NamedNode') {
      ((node['@type'] ||= []) as string[]).push(quad.object.value);
    } else if (quad.object.termType === 'NamedNode') {
      ((node[quad.predicate.value] ||= []) as unknown[]).push({ '@id': quad.object.value });
    } else if (quad.object.termType === 'Literal') {
      ((node[quad.predicate.value] ||= []) as unknown[]).push({ '@value': quad.object.value });
    }
    expanded.set(quad.subject.value, node);
  }
  return {
    url: document.href, body, contentType, etag: response.headers.get('ETag'), quads,
    tasks: parseSchemaTasks([...expanded.values()]),
    history: quads.filter(quad => quad.predicate.value.startsWith(crdt) || quad.object.termType === 'NamedNode' && quad.object.value.startsWith(crdt)),
  };
}
