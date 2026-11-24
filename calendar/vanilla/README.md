# Calendar data module

The `calendar` remoteStorage scope has one event API and explicit format codecs.
JSON Schema describes the JSON documents used by remoteStorage, Dropbox, Google
Drive, OneDrive and the current NextGraph document backend. Open ShEx shapes
describe equivalent iCalendar-RDF `Vevent` and schema.org `Event` documents for
Solid, LWS and a future native NextGraph graph integration. Atomic definitions
use native Classes, Properties and datatypes. No backend is silently migrated.

The readable contracts are [event.schema.json](schemas/event.schema.json),
[event.shex](schemas/event.shex), [atomic.json](schemas/atomic.json) and
[mapping.json](schemas/mapping.json). They are generated from `src/schemas.js`;
run `node build.mjs` after editing it. The Atomic namespace is a proposed module
vocabulary, not a claim that those resources are already installed on a server.
Atomic import/registration must install the definitions before requiring them.

```js
import { Calendar } from '@pondersource/rs-data-modules';
const rs = new RemoteStorage({ modules: [Calendar] });
rs.access.claim('calendar', 'rw');
const id = await rs.calendar.create({
  uid: 'my-meeting', title: 'Planning',
  start: { value: '2026-11-24T09:00:00', timezone: 'Europe/Amsterdam' },
  duration: 'PT1H'
});
await rs.calendar.update(id, { title: 'Planning together' });
const events = await rs.calendar.getAll();
await rs.calendar.delete(id);
```

`get`, `getAll`, `create`, `update` and `delete` operate on JSON records. They
use the rs.js client's existing conflict behavior; the create existence check
is not a cross-device atomic reservation. `fromJSON`/`toJSON`,
`fromRDF`/`toRDF`, `fromAtomic`/`toAtomic` and
`fromICalendar`/`toICalendar` perform explicit conversions. RDF and iCalendar
readers return arrays because a source document may contain multiple events.
The caller chooses a destination document/resource URL when creating native
RDF or Atomic data. Codecs perform no authentication or remote writes.

`rs.calendar.nativeSolid({fetch,webId,root})` uses the active rs.js Solid session's
scoped fetch and exposes the same CRUD names on the original Pod documents.
`calendarRDF({fetch,root})` from `src/rdf.js` can also use another backend-owned
RDF fetch, including an LWS service. Updates and deletes require an ETag and use
If-Match; creates use If-None-Match. Writes outside the selected root are refused.
Use an event's fragment IRI when a document contains multiple events. Editing
one preserves its sibling events; deletion refuses to delete a shared document.

## Dates and format preservation

- A date such as `2026-11-24` is all-day; its end is exclusive. A date-time
  without a suffix is floating unless it has a separate timezone. UTC and
  numeric offsets are distinct from floating values. No browser timezone is
  guessed. iCalendar writes numeric offsets as equivalent UTC instants.
- Recurrence rules, recurrence IDs, RDATE and EXDATE are retained. Parsing is
  not recurrence expansion. VTIMEZONE definitions, overrides, attendees,
  alarms, duration and unknown iCalendar fields survive document edits.
- The `sources` envelope retains source JSON fields, Atomic properties/classes,
  RDF quads and the original iCalendar document. This metadata is carried in
  each other format. It is stripped before taking the next source snapshot,
  so repeated conversions do not recursively nest earlier envelopes.
- RDF edits preserve unknown statements, blank-node subgraphs, languages and
  named graphs. Only the selected literal is changed; other language variants
  remain. Structured places and complex recurrence graphs remain opaque;
  unsupported structured replacements fail instead of discarding them.
- Atomic temporal values are lexical strings plus timezone properties, rather
  than forcing floating/all-day times into timestamps. Recurrence and source
  envelopes use Atomic's native JSON datatype. Module validation enforces
  cross-field conditions that an Atomic Property datatype alone cannot express.

The pinned NextGraph `@ng-org/shex-orm` 0.1.2-alpha.12 compiler rejects the
`xsd:string OR rdf:langString` union because both map to TypeScript strings.
The portable shape passes independent ShEx validation. Do not narrow it and
lose language-tagged data just to satisfy that compiler. A native graph binding
still needs this compiler limitation handled, plus lexical date preservation;
the current rs.js NextGraph adapter continues to preserve complete documents.

## Validation

`npm ci && npm test` runs independent JSON Schema and ShEx validators, all four
format round trips, repeated-conversion size checks, JSON CRUD and native RDF
CRUD/precondition tests. The rs module build and its existing browser/domain
tests also run when this directory changes. Tests do not establish live Atomic
schema installation, native NextGraph graph storage, wallet consent, broker
delivery or two-device/offline synchronization.
