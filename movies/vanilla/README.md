# Solid Data Module for Movies

Data schemas supported:
* Media Kraken as-is in May 2025
* Media Kraken with [correctly typed links](https://github.com/NoelDeMartin/media-kraken/issues/41)

### Usage
Set up a typescript project, install [solid-data-module-movies](https://www.npmjs.com/package/solid-data-module-movies) from NPM, and create a `.env` file like this:
```env
SOLID_SERVER=https://solidcommunity.net
SOLID_EMAIL=michielbdejong@users.css.pod
SOLID_PASSWORD=...
```

Edit line 19 of `src/example.ts` to point to your movies folder on your pod.
```sh
node node_modules/solid-data-module-movies/build/src/example.js
```

The output will look something like this:
```
{
  created: 2020-07-17T16:40:29.000Z,
  modified: 2020-08-06T14:09:18.000Z,
  movie: {
    published: 2019-05-30T00:00:00.000Z,
    description: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    name: 'Parasite',
    sameAs: [
      'https://www.imdb.com/title/tt6751668',
      'https://www.themoviedb.org/movie/496243'
    ]
  }
}
{
  created: 2022-05-17T14:50:44.000Z,
  startTime: 2022-05-17T14:50:44.000Z,
  endTime: 2022-05-17T14:50:44.000Z,
  listingId: 'https://michielbdejong.solidcommunity.net/movies/the-green-mile-1999#it'
}
```

## Development
Put a .env like [above](#usage) in the root of your local check-out this repo and:

```sh
pnpm install
pnpm lint
pnpm prettier
pnpm build
pnpm start
```
## Verified reader behaviour

The reader accepts **expanded JSON-LD**, as an array of nodes or an `@graph` wrapper. It does not expand compact JSON-LD contexts. `parseMovies` interprets a document without network access; `fetchList` requests JSON-LD with the supplied authenticated fetch and follows direct `ldp:contains` document members. It also accepts the legacy index layout with child-resource node identifiers. It deduplicates document fetches and does not recurse into subcontainers. HTTP and malformed-response failures are surfaced to the caller.

Movie fields are optional except for the selected RDF type; absent `sameAs` is an empty array. Movie/action identifiers are retained so a WatchAction's `listingId` can be matched to a movie. The previous TypeScript declaration misspelled that property `listingUr`, although runtime output already used `listingId`.

Implementation reference: [Ponder Source Media Kraken](https://github.com/pondersource/media-kraken), including its [Metropolis fixture](https://github.com/pondersource/media-kraken/blob/3eb02c5f5471d214cefd4fa94992a37d9b4f8f5e/cypress/fixtures/metropolis.ttl). IRI-valued and legacy literal-valued links are accepted. [Media Kraken Playwright coverage](https://github.com/pondersource/media-kraken/pull/1) checks real browser persistence separately.

This remains a read-only module. Container/type-index discovery, writes, deletion, concurrency and migration are not implemented. Applications still using Soukai are not claimed to have migrated merely because this reader understands their data.

Run the reader regressions after compiling:

```sh
npx tsc -p tsconfig.json
node --test tests/movies.test.mjs
```
