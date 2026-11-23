// SPDX-License-Identifier: MIT
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {flashcardsDomain} from '../src/flashcards.js';

test('native and existing adapter registrations keep their own identities and URLs', () => {
  const native = {webId:'https://pod.example/profile/card#me',root:'https://pod.example/owner/'};
  const adapter = {webId:'https://flashcards.storage.pondersource.invalid/profile/card#me',root:'https://flashcards.storage.pondersource.invalid/'};
  const api = flashcardsDomain({...native,adapter});
  assert.deepEqual(api.storageSources(),[native,{...adapter,optional:true}]);
  assert.equal(api.identityFor(native.root+'memo/catalog.ttl#deck'),native.webId);
  assert.equal(api.identityFor(adapter.root+'legacy/meta.ttl'),adapter.webId);
  assert.equal(api.identityFor('https://pod.example/owner-elsewhere/catalog.ttl'),undefined);
  assert.equal(api.identityFor('https://elsewhere.example/memo/'),undefined);
});

test('non-Solid modules have one source; repeated source identities are listed once', () => {
  const source = {webId:'https://flashcards.storage.pondersource.invalid/profile/card#me',root:'https://flashcards.storage.pondersource.invalid/'};
  assert.deepEqual(flashcardsDomain(source).storageSources(),[source]);
  assert.deepEqual(flashcardsDomain({...source,adapter:source}).storageSources(),[source]);
});
