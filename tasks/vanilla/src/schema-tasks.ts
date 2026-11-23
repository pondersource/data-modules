const schema = 'https://schema.org/';
const ical = 'http://www.w3.org/2002/12/cal/ical#';
const rdfs = 'http://www.w3.org/2000/01/rdf-schema#';
const legacy = 'http://purl.org/vocab/lifecycle/schema#';
type ExpandedNode = Record<string, unknown>;

export type SchemaTask = {
  uri: string;
  name?: string;
  description?: string;
  actionStatus?: string;
  priority?: number;
  dueDate?: Date;
  completedAt?: Date;
  completed: boolean;
};

function first(node: ExpandedNode, predicate: string, key = '@value'): unknown {
  const values = node[predicate];
  if (!Array.isArray(values)) return undefined;
  const value = values.find(value => value && typeof value === 'object' && key in value);
  return value?.[key];
}

function text(node: ExpandedNode, predicate: string): string | undefined {
  const value = first(node, predicate);
  return typeof value === 'string' ? value : undefined;
}

function date(node: ExpandedNode, predicate: string): Date | undefined {
  const value = text(node, predicate);
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed;
}

/** Read expanded Schema.org Action / iCalendar Vtodo nodes without network or storage dependencies. */
export function parseSchemaTasks(input: unknown): SchemaTask[] {
  const graph = !Array.isArray(input) && input && typeof input === 'object'
    ? (input as ExpandedNode)['@graph'] : input;
  if (!Array.isArray(graph)) throw new TypeError('Expected expanded JSON-LD nodes or an @graph wrapper');
  const result: SchemaTask[] = [];
  for (const node of graph) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      throw new TypeError('Expected expanded JSON-LD node objects');
    }
    const types = Array.isArray(node['@type']) ? node['@type'] : [];
    if (!types.includes(schema + 'Action') && !types.includes(ical + 'Vtodo') && !types.includes(legacy + 'Task')) continue;
    if (typeof node['@id'] !== 'string') continue;
    const completedAt = date(node, ical + 'completed');
    const priorityValue = first(node, ical + 'priority');
    const priority = typeof priorityValue === 'number' || typeof priorityValue === 'string' && priorityValue.trim() !== ''
      ? Number(priorityValue) : undefined;
    const status = first(node, schema + 'actionStatus', '@id');
    result.push({
      uri: node['@id'],
      name: text(node, schema + 'name') ?? text(node, ical + 'summary') ?? text(node, schema + 'description') ?? text(node, rdfs + 'label'),
      description: text(node, schema + 'description') ?? text(node, rdfs + 'comment'),
      actionStatus: typeof status === 'string' ? status : undefined,
      priority: Number.isFinite(priority) ? priority : undefined,
      dueDate: date(node, ical + 'due'),
      completedAt,
      completed: !!completedAt,
    });
  }
  return result;
}
