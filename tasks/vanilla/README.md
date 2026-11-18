## Tasks Data Module

To use this Solid Data Module you need an authenticated fetch function. In Node.JS, when working against a CSS or Pivot server such as solidcommnunity.net, you can use [css-authn](https://www.npmjs.com/package/css-authn#usage) for this. In the browser, you can use [Inrupt Solid Client](https://docs.inrupt.com/developer-tools/javascript/client-libraries/authentication/).

Data schemas supported:
* Solid OS Issue Pane (using `index.ttl#this` and `state.ttl`)
* [Solid Hello World](https://hello.0data.app/solid/) (using one file per task, with `schema:Action`)

### Usage
Set up a typescript project, install [solid-data-module-tasks](https://www.npmjs.com/package/solid-data-module-tasks) from NPM, and create a `.env` file like this:
```env
SOLID_SERVER=https://solidcommunity.net
SOLID_EMAIL=michielbdejong@users.css.pod
SOLID_PASSWORD=...
```

Edit line 9 of `node_modules/solid-data-module-tasks/build/src/example.js` to point to a folder
where you can create a Solid OS issue tracker (through the Solid OS web interface of solidcommunity.net for instance) and a 0data issue tracker through [Solid Hello World](https://hello.0data.app/solid/).

If you now run `node node_modules/solid-data-module-tasks/build/src/example.js` you will see a list of issues that is combined from your 0data issue tracker and your Solid OS issue tracker at that same URL.

You can also save, build and run the following TypeScript file:
```ts
import 'dotenv/config';
import { v7 } from 'css-authn';
import { fetchTracker, Interpretation, addIssue, addComment } from 'solid-data-module-tasks';

const authenticatedFetch = await v7.getAuthenticatedFetch({
  email: process.env.SOLID_EMAIL,
  password: process.env.SOLID_PASSWORD,
  provider: process.env.SOLID_SERVER,
});
const trackerUrl = 'https://michielbdejong.solidcommunity.net/tasks/index.ttl#this';
const localState: Interpretation = await fetchTracker(trackerUrl, authenticatedFetch);
const issueUri = await addIssue(localState, {
    title: 'Use the Solid Data Module for Tasks',
    description: 'Solid app devs should not be rolling their own task tracker access code.',
}, authenticatedFetch);
const newComment = {
  issueUri,
  author: 'https://michielbdejong.solidcommunity.net/profile/card#me',
  text: `I totally agree at ${new Date().toUTCString()}`,
};
const commentUri = await addComment(localState, newComment, authenticatedFetch);
console.log(commentUri);
```

This will result in an issue and a comment being created in that tracker:
![screenshot](https://github.com/user-attachments/assets/8d0a1aef-94c8-4c41-848d-d21edfe5f116)

### SolidFocus / Schema.org task reader

`parseSchemaTasks(expandedJsonLd)` recognises both Schema.org Action and iCalendar Vtodo, including dual-typed resources with either type first. It returns the resource URI, name, description, priority, due date, completion date and action-status IRI. The name uses `schema:name`, then `ical:summary`, then the legacy description-only representation. Completion follows the presence of a valid `ical:completed` date, matching SolidFocus's `completed` getter; the separate action-status IRI is retained rather than silently reconciled.

Implementation references: [SolidFocus Task.schema.ts](https://github.com/NoelDeMartin/solid-focus/blob/53e6fddb0fec1e8cc9373b0106b138c99ae444a0/src/models/Task.schema.ts) and [Task.ts](https://github.com/NoelDeMartin/solid-focus/blob/53e6fddb0fec1e8cc9373b0106b138c99ae444a0/src/models/Task.ts). Its before-save hook sets CompletedActionStatus or PotentialActionStatus from completedAt. Priority, due dates, description and both title predicates must survive any eventual writer migration.

This is a **read-only mapping** within the existing tasks module. It does not claim SolidFocus has been forked, deployed or migrated. Workspaces, lists, history and writes still require coverage. The existing issue/comment writers target SolidOS trackers, not SolidFocus's schema. Do not use them as a drop-in Action writer.

Input must be expanded JSON-LD (array or `@graph` wrapper); this function does not resolve JSON-LD contexts. Import the built schema-tasks.js directly for a pure reader. The main module's UUID generation now uses Web Crypto, removing its static Node-only crypto dependency.

```sh
npx tsc -p tsconfig.json
node --test tests/schema-tasks.test.mjs
```
