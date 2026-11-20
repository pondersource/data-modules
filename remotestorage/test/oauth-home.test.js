// SPDX-License-Identifier: MIT
import test from 'node:test';
import assert from 'node:assert/strict';
import {useOAuthHome} from '../src/oauth-home.js';
function browserAt(url) {
  const browser = {location: new URL(url)};
  browser.history = {state: {route: 'editor'}, replaceState(state, title, next) {
    this.state = state;
    browser.location = new URL(next);
  }};
  return browser;
}
test('Google and Dropbox authorize at the registered home address from a nested route', async () => {
  for (const name of ['dropbox', 'googledrive']) {
    const browser = browserAt('https://app.example/collection?view=one#item');
    const rs = {[name]: {marker: 'backend', connect(value) {
      assert.equal(this.marker, 'backend');
      assert.equal(browser.location.href, 'https://app.example/');
      return value;
    }}};
    useOAuthHome(rs, browser);
    assert.equal(await rs[name].connect('connected'), 'connected');
    assert.deepEqual(browser.history.state, {route: 'editor'});
  }
});
test('an authorization failure restores the original route and reaches the caller', async () => {
  const original = 'https://app.example/collection?view=one#item';
  const browser = browserAt(original);
  const rs = {dropbox: {async connect() {throw new Error('authorization failed');}}};
  useOAuthHome(rs, browser);
  await assert.rejects(rs.dropbox.connect(), /authorization failed/);
  assert.equal(browser.location.href, original);
});
test('Solid retains its own route restoration and connection method', () => {
  const connect = () => {};
  const rs = {solid: {connect}};
  const browser = browserAt('https://app.example/studio#deck');
  useOAuthHome(rs, browser);
  assert.equal(rs.solid.connect, connect);
  assert.equal(browser.location.href, 'https://app.example/studio#deck');
});
