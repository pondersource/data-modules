# Recipes

The recipes module reads records from Solid documents written by
[Umai](https://github.com/pondersource/umai). The fixture comes from the
[Umai browser tests](https://github.com/NoelDeMartin/umai/blob/c689e6255f1b7e653d18f95faf3c3ffc28a538aa/cypress/fixtures/recipes/ramen.ttl).

| Recipe record field | Solid RDF |
| --- | --- |
| title | schema:name |
| ingredients | schema:recipeIngredient literals |
| instructions | schema:recipeInstructions literals or linked steps with schema:text and schema:position |
| yield | schema:recipeYield |
| prepTime, cookTime, totalTime | Corresponding Schema.org properties |

`parseRecipes(turtle, documentUrl)` works offline. `readRecipes(documentUrl, session.fetch)`
loads a known Solid document. Both return entries with a backend-neutral
`recipe` and the Solid identifier separately. The order of RDF ingredient
literals is source order and may vary if a server reserializes the graph.
Instruction steps with explicit positions take precedence over unnumbered steps.

The adapter is read-only. Umai's edit path also maintains Soukai history
and linked resources. Direct RDF writes need to preserve that behavior.
Cookbook discovery is handled by the app. This package is private during
development.

[Recipe Boss](https://gitlab.com/bhdouglass/recipe-boss) is the remoteStorage
counterpart to validate against. Its `recipes` scope is known. A persisted
fixture is still needed before adding an adapter or claiming field parity.
