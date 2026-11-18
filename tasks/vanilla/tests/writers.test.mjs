import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Parser } from 'n3';
import { addIssue, addComment } from '../build/src/tasks.js';

const state = { tracker: { stateUri: 'https://pod.example/tasks/state.ttl', indexUri: 'https://pod.example/tasks/index.ttl#this' }, issues: {} };
function insertedGraph(options) {
  assert.equal(options.method, 'PATCH');
  assert.equal(options.headers['Content-Type'], 'text/n3');
  const body = options.body.slice(options.body.indexOf('solid:inserts {') + 'solid:inserts {'.length, options.body.lastIndexOf('}'));
  return new Parser().parse(body);
}
test('issue text containing quotes, newlines, backslashes and RDF-like text remains one literal', async () => {
  const title = 'Use "Solid"\\storage\nwith care';
  const description = 'end". <https://bad.example/s> <https://bad.example/p> "injected';
  let quads;
  const id = await addIssue(state, { title, description }, async (url, options) => {
    assert.equal(url, state.tracker.stateUri);
    quads = insertedGraph(options);
    return new Response(null, { status: 205 });
  });
  assert.equal(quads.length, 5);
  assert.equal(quads.find(q => q.predicate.value === 'http://purl.org/dc/elements/1.1/title').object.value, title);
  assert.equal(quads.find(q => q.predicate.value.endsWith('#description')).object.value, description);
  assert(quads.every(q => q.subject.value === id));
});
test('comment text round-trips and links to the correct issue and author', async () => {
  const text = 'Line one\n"quoted" \\ path';
  const issueUri = state.tracker.stateUri + '#issue';
  const author = 'https://pod.example/profile/card#me';
  let quads;
  const id = await addComment(state, { issueUri, author, text }, async (_url, options) => {
    quads = insertedGraph(options);
    return new Response(null, { status: 205 });
  });
  assert.equal(quads.length, 4);
  assert(quads.some(q => q.subject.value === issueUri && q.object.value === id));
  assert.equal(quads.find(q => q.predicate.value.endsWith('#content')).object.value, text);
  assert.equal(quads.find(q => q.predicate.value.endsWith('/maker')).object.value, author);
});
test('failed writes reject instead of returning a supposedly saved identifier', async () => {
  const fetcher = async () => new Response(null, { status: 403 });
  await assert.rejects(addIssue(state, { title: 'Task', description: '' }, fetcher), /HTTP 403/);
  await assert.rejects(addComment(state, { issueUri: state.tracker.stateUri + '#issue', author: 'https://pod.example/me', text: '' }, fetcher), /HTTP 403/);
});
test('invalid interpolated IRIs are rejected before sending a request', async () => {
  let called = false;
  const fetcher = async () => { called = true; return new Response(); };
  await assert.rejects(addComment(state, { issueUri: 'https://pod.example/i> . <https://bad.example/s', author: 'https://pod.example/me', text: '' }, fetcher), /IRI/);
  assert.equal(called, false);
});
