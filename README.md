# Ponder Source Data Modules
This project is [funded](https://nlnet.nl/project/SolidDataModules/) by <img src="https://nlnet.nl/logo/banner.svg" style="width: 5%; margin: 0 1% 0 1%;">
/ <img src="https://nlnet.nl/image/logos/NGI0Entrust_tag.svg" style="width: 5%; margin: 0 1% 0 1%;">

Ponder Source Data Modules brings together Solid Data Modules and
remoteStorage modules so apps can work with the same kinds of data across
storage providers. Modules handle domain data such as recipes, calendars and
contacts, and preserve the source formats that existing apps use.

The [shared npm package](./remotestorage) is `@pondersource/data-modules`.
It connects to the storage providers supported by the app's rs.js distribution.
Some modules also read or edit native Solid documents using the app's
authenticated fetch.

[Join our chat room on Matrix](https://app.gitter.im/index.html#/room/#solid-data-modules:gitter.im)

[Read the data conventions we have documented so far](https://pdsinterop.org/conventions/overview/)

[Our plan](https://hackmd.io/@michielbdejong/HyIMjmoxn)

## Data types covered
Modules and work in progress:
* [bookmarks](./bookmarks)
* [chats](./chats)
* [contacts](./contacts)
* [profile](./profile) (stub)
* [tasks](./tasks) (coming soon)

* [recipes](./recipes) (Umai read adapter)
* [calendar](./calendar/vanilla) (JSON, RDF, Atomic and iCalendar formats)

## Paradigms covered
The "vanilla" version of each of these data modules will be usable in combination with just an
authenticated fetcher, such as [Solid Auth Fetcher](https://github.com/solid-contrib/solid-auth-fetcher),
or the fetcher from the [Inrupt JS Libs](https://docs.inrupt.com/developer-tools/javascript/client-libraries/authentication/).
Apart from this "vanilla" version, we will also package each data module for use in combination with the following client-side Solid app paradigms:
* [Soukai-Solid](https://github.com/NoelDeMartin/soukai-solid)
* [rdflib](https://github.com/linkeddata/rdflib.js)
* [LDO](https://github.com/o-development/ldo)

Create a new module [Link to tutorial](./new-module.md)
