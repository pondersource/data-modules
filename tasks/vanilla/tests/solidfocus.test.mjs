import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFocusDocument, focusSchemas } from '../build/src/solidfocus.js';

const url = 'https://pod.example/original/tasks/one';
const body = `@prefix schema: <https://schema.org/> .
@prefix ical: <http://www.w3.org/2002/12/cal/ical#> .
@prefix crdt: <https://vocab.noeldemartin.com/crdt/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
<#it> a schema:Action, ical:Vtodo; schema:name "Native task";
  ical:priority 0; schema:description "Descripción"@es;
  <https://other.example/extra> [ <https://other.example/lexical> "0007"^^xsd:integer ] .
<#it-metadata> a crdt:Metadata; crdt:resource <#it>;
  crdt:createdAt "2026-11-01T00:00:00Z"^^xsd:dateTime .
<https://pod.example/another-document#item> <https://other.example/opaque> "untouched" .`;

test('native task reader retains exact bytes, URLs, term kinds and history', async () => {
  const record = await readFocusDocument(url + '#it', async (input, init) => {
    assert.equal(input, url);
    assert.match(init.headers.Accept, /text\/turtle/);
    return new Response(body, { headers: { 'Content-Type': 'text/turtle; charset=UTF-8', ETag: '"native-v1"' } });
  });
  assert.equal(record.body, body);
  assert.equal(record.url, url);
  assert.equal(record.etag, '"native-v1"');
  assert.equal(record.tasks[0].uri, url + '#it');
  assert.equal(record.tasks[0].priority, 0);
  assert.equal(record.quads.find(q => q.object.language === 'es').object.value, 'Descripción');
  const lexical = record.quads.find(q => q.predicate.value.endsWith('/lexical'));
  assert.equal(lexical.subject.termType, 'BlankNode');
  assert.equal(lexical.object.value, '0007');
  assert.equal(lexical.object.datatype.value, 'http://www.w3.org/2001/XMLSchema#integer');
  assert(record.history.some(q => q.predicate.value.endsWith('/createdAt')));
  assert(record.quads.some(q => q.subject.value === 'https://pod.example/another-document#item'));
});

test('native reader propagates failed reads and malformed RDF', async () => {
  await assert.rejects(readFocusDocument(url, async () => new Response(null, { status: 403 })), /HTTP 403/);
  await assert.rejects(readFocusDocument(url, async () => new Response('<malformed')), /./);
});

test('format definitions retain SolidFocus history, aliases, legacy format and container fields', () => {
  assert.deepEqual(focusSchemas.task.rdfsClasses, ['Action', 'ical:Vtodo']);
  assert.equal(focusSchemas.task.fields.name.alias, '_summary');
  assert.equal(focusSchemas.task.history, true);
  assert.equal(focusSchemas.legacyTask.defaultResourceHash, '');
  assert.equal(focusSchemas.legacyTask.fields.name.rdfProperty, 'rdfs:label');
  assert.equal(focusSchemas.list.fields.resourceUrls.rdfProperty, 'ldp:contains');
  assert.equal(focusSchemas.workspace.fields.color.rdfProperty, 'schema:color');
});
