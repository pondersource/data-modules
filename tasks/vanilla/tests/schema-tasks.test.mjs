import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSchemaTasks } from '../build/src/schema-tasks.js';

const s = 'https://schema.org/';
const i = 'http://www.w3.org/2002/12/cal/ical#';
const task = { '@id': 'https://pod.example/tasks/one#it', '@type': [i + 'Vtodo', s + 'Action'] };
test('SolidFocus dual-typed task retains fields and completion date', () => {
  const [result] = parseSchemaTasks([{
    ...task, [s + 'name']: [{ '@value': 'Cook ramen' }],
    [s + 'description']: [{ '@value': 'Use fresh noodles' }],
    [i + 'priority']: [{ '@value': '1' }],
    [i + 'due']: [{ '@value': '2026-11-20T10:00:00Z' }],
    [i + 'completed']: [{ '@value': '2026-11-18T10:00:00Z' }],
    [s + 'actionStatus']: [{ '@id': s + 'CompletedActionStatus' }],
  }]);
  assert.equal(result.uri, task['@id']);
  assert.equal(result.name, 'Cook ramen');
  assert.equal(result.priority, 1);
  assert.equal(result.completed, true);
  assert.equal(result.completedAt.toISOString(), '2026-11-18T10:00:00.000Z');
  assert.equal(result.dueDate.toISOString(), '2026-11-20T10:00:00.000Z');
  assert.equal(result.actionStatus, s + 'CompletedActionStatus');
});
test('recognises Action regardless of type array order and preserves zero priority', () => {
  const [result] = parseSchemaTasks([{ ...task, [i + 'priority']: [{ '@value': 0 }] }]);
  assert.equal(result.priority, 0);
  assert.equal(result.completed, false);
});
test('uses iCalendar summary alias then legacy description for names', () => {
  const result = parseSchemaTasks({ '@graph': [
    { ...task, [i + 'summary']: [{ '@value': 'Summary' }], [s + 'description']: [{ '@value': 'Description' }] },
    { ...task, [s + 'description']: [{ '@value': '0data task' }] },
  ] });
  assert.equal(result[0].name, 'Summary');
  assert.equal(result[1].name, '0data task');
});
test('skips unrelated metadata and treats invalid dates/numbers as absent', () => {
  const result = parseSchemaTasks([{ '@id': 'https://pod.example/meta' }, {
    ...task, [i + 'completed']: [{ '@value': 'invalid' }], [i + 'priority']: [{ '@value': 'high' }],
  }]);
  assert.equal(result.length, 1);
  assert.equal(result[0].completedAt, undefined);
  assert.equal(result[0].completed, false);
  assert.equal(result[0].priority, undefined);
});
test('rejects compact and malformed response structures explicitly', () => {
  assert.throws(() => parseSchemaTasks({ name: 'compact JSON-LD' }), /expanded/);
  assert.throws(() => parseSchemaTasks([null]), /node objects/);
});

test('reads the original lifecycle task format without rewriting its identity', () => {
  const rdfs = 'http://www.w3.org/2000/01/rdf-schema#';
  const [result] = parseSchemaTasks([{
    '@id': 'https://pod.example/legacy/task-without-fragment',
    '@type': ['http://purl.org/vocab/lifecycle/schema#Task'],
    [rdfs + 'label']: [{ '@value': 'Legacy task' }],
    [rdfs + 'comment']: [{ '@value': 'Keep its original document' }],
    [i + 'completed']: [{ '@value': '2018-12-25T00:00:00.000Z' }],
  }]);
  assert.equal(result.uri, 'https://pod.example/legacy/task-without-fragment');
  assert.equal(result.name, 'Legacy task');
  assert.equal(result.description, 'Keep its original document');
  assert.equal(result.completed, true);
});
