import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parseRecipes, readRecipes } from '../index.js';

const url = 'https://pod.example/cookbook/ramen';
const ramen = await readFile(new URL('./fixtures/ramen.ttl', import.meta.url), 'utf8');

test('reads the Umai Ramen document and resolves its relative recipe identifier', () => {
    assert.deepEqual(parseRecipes(ramen, url), [{
        source: url + '#it',
        recipe: {
            title: 'Ramen',
            ingredients: ['Broth', 'Noodles'],
            instructions: ['Step 1', 'Step 2'],
        },
    }]);
});

test('sorts linked instructions by position and preserves textual yield and timings', () => {
    const [entry] = parseRecipes(`
        @prefix s: <https://schema.org/> .
        <#it> a s:Recipe ; s:name "Soup" ; s:recipeYield "4 bowls" ;
            s:prepTime "PT10M" ; s:cookTime "PT15M" ; s:totalTime "PT25M" ;
            s:recipeInstructions <#second>, <#first> .
        <#second> s:text "Serve" ; s:position 2 .
        <#first> s:text "Simmer" ; s:position 1 .
    `, url);
    assert.deepEqual(entry.recipe, {
        title: 'Soup', ingredients: [], instructions: ['Simmer', 'Serve'],
        yield: '4 bowls', prepTime: 'PT10M', cookTime: 'PT15M', totalTime: 'PT25M',
    });
});

test('fetches the RDF document with the supplied session and propagates denial', async () => {
    const fetcher = async (requested, { headers }) => {
        assert.equal(requested, url);
        assert.equal(headers.Accept, 'text/turtle');
        return new Response(ramen);
    };
    assert.deepEqual(await readRecipes(url + '#it', fetcher), parseRecipes(ramen, url));
    await assert.rejects(readRecipes(url, async () => new Response(null, { status: 403 })), /HTTP 403/);
});
