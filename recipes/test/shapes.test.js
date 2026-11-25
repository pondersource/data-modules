import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { Parser, Store } from 'n3';
import SHACLValidator from 'rdf-validate-shacl';
import { parseRecipes, readRecipes } from '../index.js';

const url = 'https://pod.example/cookbook/ramen';
const fromModules = createRequire(new URL('../../remotestorage/package.json', import.meta.url));
const shapePath = fromModules.resolve('@pondersource/rs-data-modules/shapes/recipe.ttl');
const shapes = new Store(new Parser().parse(await readFile(shapePath, 'utf8')));

async function validate(turtle, documentUrl = url) {
    const data = new Store(new Parser({ baseIRI: documentUrl }).parse(turtle));
    return new SHACLValidator(shapes).validate(data);
}

test('the existing Umai recipe, linked steps and Soukai metadata conform', async () => {
    const fixture = await readFile(new URL('./fixtures/ramen.ttl', import.meta.url), 'utf8');
    assert.equal((await validate(fixture)).conforms, true);
});

test('native RDF is read and validated at its original document URL', async () => {
    const document = await readFile(new URL('./fixtures/ramen.ttl', import.meta.url), 'utf8');
    const root = 'https://storage.example/native/recipes/ramen';
    const entries = await readRecipes(root + '#it', async (request, options) => {
        assert.equal(request, root);
        assert.equal(options.headers.Accept, 'text/turtle');
        assert.equal((await validate(document, request)).conforms, true);
        return new Response(document, {headers: {'Content-Type': 'text/turtle'}});
    });
    assert.deepEqual(entries, parseRecipes(document, root));
    assert.equal(entries[0].source, root + '#it');
});

test('native RDF accepts language tags, typed durations, blank-node steps and literal steps', async () => {
    const turtle = `
        @prefix s: <https://schema.org/> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        <#it> a s:Recipe ; s:name "Soupe"@fr ;
            s:recipeIngredient "eau"@fr ; s:totalTime "PT5M"^^xsd:duration ;
            s:recipeInstructions "Servir"@fr, [ s:text "Mélanger"@fr ; s:position 1 ] ;
            s:image <soup.jpg> .
    `;

    assert.equal((await validate(turtle)).conforms, true);
    assert.deepEqual(parseRecipes(turtle, url)[0].recipe, {
        title: 'Soupe',
        ingredients: ['eau'],
        instructions: ['Mélanger', 'Servir'],
        totalTime: 'PT5M',
    });
});

for (const [name, properties] of [
    ['a missing name', 's:recipeIngredient "Water"'],
    ['a whitespace-only name', 's:name "   "'],
    ['an IRI ingredient', 's:name "Soup"; s:recipeIngredient <water>'],
    ['a linked instruction without text', 's:name "Soup"; s:recipeInstructions [ s:position 1 ]'],
    ['a malformed linked step position', 's:name "Soup"; s:recipeInstructions [ s:text "Stir"; s:position "first" ]'],
]) {
    test(`the profile rejects ${name}`, async () => {
        const turtle = `@prefix s: <https://schema.org/> . <#it> a s:Recipe; ${properties} .`;
        assert.equal((await validate(turtle)).conforms, false);
    });
}
