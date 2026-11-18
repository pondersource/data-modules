import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchList, parseMovies } from '../build/src/movies.js';

const s = 'https://schema.org/';
const folder = 'https://pod.example/movies/';
const movie = { '@id': folder + 'metropolis#it', '@type': [s + 'Movie'], [s + 'name']: [{ '@value': 'Metropolis' }] };
const watched = { '@id': folder + 'metropolis#watch', '@type': [s + 'WatchAction'], [s + 'object']: [{ '@id': movie['@id'] }] };

test('minimal Media Kraken movie and related watched state preserve identifiers', () => {
  const result = parseMovies([movie, watched, { '@id': 'https://example.com/untyped' }]);
  assert.equal(result.listings[0].id, movie['@id']);
  assert.equal(result.listings[0].movie.name, 'Metropolis');
  assert.deepEqual(result.listings[0].movie.sameAs, []);
  assert.equal(result.watchActions[0].listingId, movie['@id']);
});

test('accepts corrected IRIs and legacy literal-valued image/object links', () => {
  const result = parseMovies({ '@graph': [
    { ...movie, [s + 'image']: [{ '@id': 'https://image.example/poster.jpg' }], [s + 'sameAs']: [{ '@id': 'https://imdb.example/title' }, { '@value': 'https://legacy.example/title' }] },
    { ...watched, [s + 'object']: [{ '@value': movie['@id'] }] },
  ] });
  assert.equal(result.listings[0].movie.image, 'https://image.example/poster.jpg');
  assert.equal(result.listings[0].movie.sameAs.length, 2);
  assert.equal(result.watchActions[0].listingId, movie['@id']);
});

test('follows explicit containment, deduplicates documents and ignores unrelated graph nodes', async () => {
  const calls = [];
  const response = data => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/ld+json' } });
  const result = await fetchList(folder, async (uri, options) => {
    calls.push(uri);
    assert.equal(options.headers.Accept, 'application/ld+json');
    if (uri === folder) return response([
      { '@id': folder, 'http://www.w3.org/ns/ldp#contains': [{ '@id': 'metropolis' }, { '@id': 'metropolis#it' }, { '@id': 'nested/' }] },
      { '@id': 'https://unrelated.example/do-not-fetch' },
    ]);
    assert.equal(uri, folder + 'metropolis');
    return response([movie, watched]);
  });
  assert.deepEqual(calls, [folder, folder + 'metropolis']);
  assert.equal(result.listings.length, 1);
});

test('supports legacy indexes listing child node identifiers', async () => {
  let calls = 0;
  const result = await fetchList(folder, async () => {
    calls++;
    return new Response(JSON.stringify(calls === 1 ? [{ '@id': folder }, { '@id': movie['@id'] }] : [movie]));
  });
  assert.equal(calls, 2);
  assert.equal(result.listings.length, 1);
});

test('reports HTTP and invalid JSON-LD failures instead of presenting an empty library', async () => {
  await assert.rejects(fetchList(folder, async () => new Response('', { status: 403 })), /HTTP 403/);
  assert.throws(() => parseMovies({ error: 'not RDF' }), /expanded JSON-LD/);
  await assert.rejects(fetchList(folder.slice(0, -1), async () => new Response('[]')), /end with/);
});
