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


## Additional Solid domains

The optional `./domains` entry exports `Contacts`, `Chats`, `Tasks`, `Bookmarks`
and `Profile` as remoteStorage modules. It reuses the actual implementations in
this repository, including all contact/group/email/phone operations, LongChat
messages, tracker issues/comments, bookmark CRUD/discovery and profile names.
The browser build is `dist/domains.js` (`PonderSourceDomains`); bundlers receive
`domains.browser.mjs`, while Node uses `domains.mjs`.

Bookmarks composes the unchanged Webmarks archive module (paths, MD5 identities,
JSON schemas and tags) with Solid operations under `api.solid`. The native
module's raw client is kept private. Contacts adds a vCard 3.0/4.0 reader; Tasks
adds an iCalendar VTODO reader. Both retain original text and structured
properties, including unknown fields, recurrence, timezone data and alarms.
These are read-only projections; they do not claim native text-format editing. The RDF bridge
supports expanded JSON-LD and ground N3 InsertDeletePatch. Conditional or variable
N3 patches fail explicitly. Profile preferences and private type-index discovery
are retained. Bookmark fallback registration preserves the existing type index.

These domains currently use the same virtual Pod/resource-record representation
as recipes/movies/flashcards. They preserve RDF semantics and unknown predicates,
but do not yet prove native upstream readback at the original Solid Pod URLs.
A release needs upstream-native read/edit/read fixtures and additional format
readers, followed by consumer-app acceptance. No all-format or native-write-through
claim is made by the new bundle.

Run `npm test` for module/domain checks and `npm run test:browser` for the actual
browser bundle. The browser test creates contacts, chat messages and bookmarks
through the scope-owned virtual fetch interface without contacting an external
storage host.

The shared connection adapter accepts the all-backend rs.js/widget distribution.
LWS, OneDrive, Atomic (through its remoteStorage plugin) and Nextgraph require
that distribution. OneDrive requires a configured public SPA client ID and each
app's registered callback. Nextgraph's native engine owns replication; a local
save is not proof of broker delivery. Public URL operations remain unavailable
on backends that cannot publish a private record safely.


Chats also exposes `openChat(container)`, reusing the LDO API for metadata,
message creation/removal, history, deletion and subscriptions. The scope-owned
change stream supplies notifications on remoteStorage-compatible backends.
Its reader combines `chat.ttl` and `index.ttl`, including padded/unpadded dates.
Bookmarks exposes the rdflib document/container API under `api.rdf` as well as
the vanilla API under `api.solid`; discovery follows instance containers used
by Soukai. Both formats retain unknown RDF and sibling subjects.

New resource-record filenames use a SHA-256 key and retain the complete URL in
the same record. This avoids cloud filename limits for imported native URLs.
The adapter continues reading and editing existing URL-encoded record paths;
opening them does not migrate them. Conflicting duplicate copies fail explicitly.

`api.nativeSolid({fetch, webId, root})` provides a fresh module view over original
Solid document URLs using the authenticated fetch owned by rs.js's Solid backend.
Native operations can read/edit those original resources in place. Writes are
fenced to the selected root; foreign read requests carry no Pod credentials.
Unit fixtures verify original-URL read/edit/readback with unknown fields retained.
This is not yet a real-server certification or the default consumer-app mode:
the migration choice for existing JSON-adapter data is pending. Existing app
connections continue using their prior copy-based adapter until that choice is
implemented and tested.
