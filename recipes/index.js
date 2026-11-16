import { DataFactory, Parser, Store } from 'n3';

const { namedNode } = DataFactory;
const schema = 'https://schema.org/';
const rdfType = namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

function values(graph, subject, field) {
    return graph.getObjects(subject, namedNode(schema + field), null);
}

function literals(graph, subject, field) {
    return values(graph, subject, field)
        .filter(term => term.termType === 'Literal')
        .map(term => term.value);
}

/** Decode a recipe document without making network requests. */
export function parseRecipes(turtle, documentUrl) {
    const graph = new Store(new Parser({ baseIRI: documentUrl }).parse(turtle));
    return graph.getSubjects(rdfType, namedNode(schema + 'Recipe'), null).map(subject => {
        const [title] = literals(graph, subject, 'name');
        if (!title?.trim()) {
            throw new Error(`Recipe ${subject.value} has no title`);
        }

        const instructions = values(graph, subject, 'recipeInstructions')
            .flatMap(term => {
                if (term.termType === 'Literal') return [{ text: term.value }];
                const [text] = literals(graph, term, 'text');
                const [position] = literals(graph, term, 'position');
                return text === undefined ? [] : [{
                    text,
                    position: /^\\d+$/.test(position ?? '') ? Number(position) : undefined,
                }];
            })
            .sort((left, right) => (left.position ?? Infinity) - (right.position ?? Infinity))
            .map(step => step.text);

        const recipe = {
            title,
            ingredients: literals(graph, subject, 'recipeIngredient'),
            instructions,
        };
        for (const [property, field] of [
            ['yield', 'recipeYield'], ['prepTime', 'prepTime'],
            ['cookTime', 'cookTime'], ['totalTime', 'totalTime'],
        ]) {
            const [value] = literals(graph, subject, field);
            if (value !== undefined) recipe[property] = value;
        }

        return { source: subject.termType === 'NamedNode' ? subject.value : undefined, recipe };
    });
}

/** Load a known Solid document with a caller-provided authenticated fetch. */
export async function readRecipes(documentUrl, fetcher) {
    const url = new URL(documentUrl);
    url.hash = '';
    const response = await fetcher(url.href, { headers: { Accept: 'text/turtle' } });
    if (!response.ok) throw new Error(`Recipe request failed with HTTP ${response.status}`);
    return parseRecipes(await response.text(), response.url || url.href);
}
