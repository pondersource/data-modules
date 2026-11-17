# Flashcards

This package provides RDF validation assets for decks and cards in [Solid Memo](https://github.com/pondersource/solid-memo). It includes the vocabulary, deck shapes 1–6, and card shapes 1–7. The vocabulary also defines terms used by other parts of the app.

Resolve a shape with `import.meta.resolve("@solid-data-modules/flashcards/shapes/card/v7.ttl")` in Node.js. Load it as Turtle in your RDF tooling. Its canonical IRI is still `https://solid-memo.com/ns/shapes/card/v7.ttl`.

The assets are copied verbatim from [Solid Memo at 10bc2dac](https://github.com/pondersource/solid-memo/tree/10bc2dacec8da173933a7a8fa344b1f2ea773c11/ns). Update them from the same source revision so the vocabulary and shapes stay in sync. [Solid Memo’s data model](https://github.com/pondersource/solid-memo/blob/10bc2dacec8da173933a7a8fa344b1f2ea773c11/docs/data-model.md) explains the pod layout.

The package currently contains schemas. Applications supply their own discovery, authentication, validation engine, and storage operations.
