# remoteStorage data modules for the Solid app forks

Umai uses `Recipes` (`recipes:rw`), Media Kraken uses `Movies` (`movies:rw`),
and Solid Memo uses `Flashcards` (`flashcards:rw`). Each is an rs.js module.
The app receives its module's API; it does not receive a BaseClient or call
backend storage directly. `connectApp` connects the remoteStorage widget to
rs.js, with remoteStorage, Dropbox, Google Drive and Solid choices.

## Reused data logic

- `recipes.js` retains the recipe parser from this repository's Solid recipes
  module, including ingredient and instruction ordering.
- `movies.ts` and `movies-jsonld.ts` retain the movies/vanilla data parser,
  including watched state and watch actions.
- `resource-pod.ts` adapts Solid Memo's MIT-licensed local RDF resource adapter.
  Its resources are now saved through the owning rs.js module's BaseClient.
  This lets the existing Soukai and Solid Memo domain adapters retain rich RDF
  data, images, progress and metadata across all storage backends.
- `flashcards-legacy.js` retains Nick Jennings's MIT-licensed remoteStorage
  flashcards module API and data schema. Existing front/back flashcards remain
  readable through that API; Solid Memo's richer RDF records are separate and
  are not a lossy conversion to simple front/back cards.

## Storage and migration

The internal RDF identifiers are stable across providers. They are identifiers,
not public web links. Records live under `<scope>/_rs/resources/`, encoded as
JSON with RDF triples or binary bytes. `_rs/` is reserved for module records.
Existing Solid registrations are imported once, read-only, through the module.
An interrupted import can retry without overwriting edited copies. It excludes
its own rs storage records, retains container metadata, and leaves source files
unchanged. Import errors are shown before opening the collection.

`initialize`, `fetch`, and `resources` provide the RDF compatibility interface.
`publish(document, relatedDocuments)` explicitly copies selected documents to
`/public/<scope>/exports/`, rewrites their internal references to provider links,
and returns a public URL. `getPublicURL` retrieves it; `unpublish` removes those
copies, preserving private originals. Calling `getPublicURL` never publishes.

`connectApp` owns login and sign-out, while every data request in an app's
claimed scope goes through its module. Public imports outside that scope are
read without credentials; writes outside the scope are refused.

## Build and test

Use Node 22 or newer:

```sh
npm ci
npm test
npm run build
```

The browser bundle exports `PonderSourceModules`. Apps vendor that bundle along
with the pinned rs.js and widget builds. Their browser acceptance tests exercise
real Solid authentication, private writes, fresh-browser reads and sign-out.
The module tests also cover binary round trips, RDF updates, source import,
recipe ordering, the legacy flashcards API and public copies.

Google and Dropbox authorization use the app origin as their registered callback
(without a trailing slash in the OAuth request). The shared connection adapter
moves to the home route before starting authorization, including when login was
opened from an editor. A synchronous or asynchronous failure restores the old
route. Solid retains its own route and hash restoration.
