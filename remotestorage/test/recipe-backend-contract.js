// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import {DataFactory, Parser, Store} from 'n3';

const schema = 'https://schema.org/';
const {namedNode, literal} = DataFactory;
const turtle = `
@prefix schema: <https://schema.org/> .
<#recipe> a schema:Recipe ;
    schema:name "Soup"@en ;
    schema:recipeIngredient "Water" ;
    schema:recipeInstructions [ schema:text "Heat" ; schema:position 1 ] ;
    <https://example.test/vendor> "À conserver"@fr .
`;

/**
 * Exercise the same Recipes API with any connected rs.js backend.
 * reopen returns a fresh Recipes API for the same account; flush waits for
 * the writer's mutation to reach that backend. Use a disposable test account.
 */
export async function assertRecipeBackend(t, {writer, reopen, flush}) {
    const url = new URL(`recipe-backend-test-${crypto.randomUUID()}.ttl`, writer.root).href;
    let removed = false;
    t.after(async () => {
        if (removed) return;
        const response = await writer.fetch(url, {method: 'DELETE'});
        assert.ok(response.ok || response.status === 404, 'remove the test recipe');
        await flush();
    });

    const create = await writer.fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'text/turtle', 'If-None-Match': '*'},
        body: turtle,
    });
    assert.equal(create.status, 201);
    await flush();

    async function read(title) {
        const reader = await reopen();
        const response = await reader.fetch(url, {headers: {Accept: 'text/turtle'}});
        assert.equal(response.status, 200);
        const body = await response.text();
        assert.deepEqual(reader.parseRecipes(body, url), [{
            source: url + '#recipe',
            recipe: {title, ingredients: ['Water'], instructions: ['Heat']},
        }]);
        const graph = new Store(new Parser({baseIRI: url}).parse(body));
        const subject = namedNode(url + '#recipe');
        assert.ok(graph.countQuads(subject, namedNode(schema + 'name'), literal(title, 'en')));
        assert.ok(graph.countQuads(
            subject, namedNode('https://example.test/vendor'), literal('À conserver', 'fr'),
        ));
        const etag = response.headers.get('ETag');
        assert.ok(etag, 'read a revision for conditional updates');
        return etag;
    }

    const etag = await read('Soup');
    const update = await writer.fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/sparql-update', 'If-Match': etag},
        body: `
          DELETE DATA { <#recipe> <${schema}name> "Soup"@en . };
          INSERT DATA { <#recipe> <${schema}name> "Stew"@en . }
        `,
    });
    assert.equal(update.status, 205);
    await flush();
    const updatedEtag = await read('Stew');
    assert.notEqual(updatedEtag, etag);

    const deletion = await writer.fetch(url, {method: 'DELETE', headers: {'If-Match': updatedEtag}});
    assert.equal(deletion.status, 205);
    await flush();
    const reader = await reopen();
    assert.equal((await reader.fetch(url)).status, 404);
    removed = true;
}
