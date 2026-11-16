# data-modules
This project is [funded](https://nlnet.nl/project/SolidDataModules/) by <img src="https://nlnet.nl/logo/banner.svg" style="width: 5%; margin: 0 1% 0 1%;">
/ <img src="https://nlnet.nl/image/logos/NGI0Entrust_tag.svg" style="width: 5%; margin: 0 1% 0 1%;">

Solid Data Modules are snippets of JavaScript code that handle the reading and writing of one specific
type of data in the user's Solid pod, regardless of how the different data formats used by various Solid apps,
and how they evolve.

[Join our chat room on Matrix](https://app.gitter.im/index.html#/room/#solid-data-modules:gitter.im)

[Read the data conventions we have documented so far](https://pdsinterop.org/conventions/overview/)

[Our plan](https://hackmd.io/@michielbdejong/HyIMjmoxn)

## Data types covered
Data types for which we will produce Solid Data Modules:
* [bookmarks](./bookmarks)
* [chats](./chats)
* [contacts](./contacts)
* [profile](./profile) (stub)
* [tasks](./tasks/vanilla)
* [movies](./movies/vanilla)

## Paradigms covered
The "vanilla" version of each of these data modules will be usable in combination with just an
authenticated fetcher, such as [Solid Auth Fetcher](https://github.com/solid-contrib/solid-auth-fetcher),
or the fetcher from the [Inrupt JS Libs](https://docs.inrupt.com/developer-tools/javascript/client-libraries/authentication/).
Apart from this "vanilla" version, we will also package each data module for use in combination with the following client-side Solid app paradigms:
* [Soukai-Solid](https://github.com/NoelDeMartin/soukai-solid)
* [rdflib](https://github.com/linkeddata/rdflib.js)
* [LDO](https://github.com/o-development/ldo)

Create a new module [Link to tutorial](./new-module.md)


## App compatibility

| Data | Solid implementation | remoteStorage implementation |
| --- | --- | --- |
| Bookmarks | [Vanilla bookmarks](./bookmarks/vanilla) and the [PDS Interop conventions](https://pdsinterop.org/conventions/bookmark/) | [Webmarks](https://github.com/pondersource/webmarks) uses the bookmarks archive module. The tagged fixture in its acceptance suite is the first cross-backend example. |
| Movies | [Movies](./movies/vanilla) reads [Media Kraken](https://github.com/pondersource/media-kraken) listings and watch actions. The module's public read API is an integration starting point. | No corresponding module verified here. |
| Tasks | [Tasks](./tasks/vanilla) handles the SolidOS issue tracker and 0data Solid Hello World formats. | [Todonna](https://gitlab.com/pondersource/todonna.gitlab.io) stores simple list items. Map completion and identity explicitly before sharing a fixture with an issue tracker. |
| Contacts | [Contacts](./contacts) supports the Solid address book model and has a Community Solid Server test harness. | No matching app in this fork inventory verified here. |
| Recipes | [Umai](https://github.com/pondersource/umai) stores Schema.org recipes with Soukai Solid. | [Recipe Boss](https://remotestorage.io/apps/) advertises a recipes scope. Its stored schema needs a fixture before claiming compatibility. |

For cross-backend changes, use the same app-derived fixture for both adapters.
Compare the domain fields after loading, editing, and reading back. Preserve
backend-specific IDs and unknown fields on update. Test discovery, sync, and
access controls through each backend separately. App integrations can then
share domain operations while keeping authentication and persistence in the
adapters.
