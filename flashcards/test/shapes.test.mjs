// SPDX-FileCopyrightText: 2026 Anton Wiklund and Solid Memo contributors
// SPDX-License-Identifier: MIT

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { DataFactory, Parser, Store } from "n3";
import SHACLValidator from "rdf-validate-shacl";

const sm = "https://solid-memo.com/ns/vocab/v1.ttl#";
const sh = "http://www.w3.org/ns/shacl#";
const node = DataFactory.namedNode;
const focus = node("https://pod.example/decks/one.ttl#card");

async function shapesAt(path, target) {
  // Resolve through the installed package exports, including in the packed consumer.
  const url = import.meta.resolve("@solid-data-modules/flashcards/" + path);
  const text = await readFile(new URL(url), "utf8");
  const shapes = new Store(new Parser().parse(text));
  if (target) {
    shapes.addQuad(node(target), node(sh + "targetNode"), focus);
  }
  return shapes;
}

function card(properties) {
  return new Store(new Parser().parse(
    '@prefix sm: <' + sm + '> . <' + focus.value + '> a sm:Card; ' + properties + '.'
  ));
}

async function conforms(properties) {
  const shapes = await shapesAt("shapes/card/v7.ttl", "https://solid-memo.com/ns/shapes/card/v7.ttl#shape");
  return (await new SHACLValidator(shapes).validate(card(properties))).conforms;
}

test("every exported shape parses and retains its canonical shape identifier", async () => {
  for (const [kind, count] of [["deck", 6], ["card", 7]]) {
    for (let version = 1; version <= count; version++) {
      const path = "shapes/" + kind + "/v" + version + ".ttl";
      const graph = await shapesAt(path);
      const canonical = "https://solid-memo.com/ns/" + path;
      assert.ok(graph.getQuads(null, node(sh + "name"), null, null).some(
        quad => quad.subject.value.startsWith(canonical + "#")
      ), path);
    }
  }
  const vocabulary = await shapesAt("vocab/v1.ttl");
  assert.ok(vocabulary.getQuads(node(sm + "Card"), null, null, null).length);
  assert.ok(vocabulary.getQuads(node(sm + "Deck"), null, null, null).length);
});

test("a format-7 card with translated text on both sides conforms", async () => {
  assert.equal(await conforms('sm:formatVersion 7; sm:front "Sun"@en; sm:back "Sol"@sv'), true);
});

test("a card can use pictures on both sides", async () => {
  assert.equal(await conforms(
    'sm:formatVersion 7; sm:frontImage <https://images.example/front.png>; sm:backImage <https://images.example/back.png>'
  ), true);
});

test("a card without a back is rejected", async () => {
  assert.equal(await conforms('sm:formatVersion 7; sm:front "Sun"@en'), false);
});

test("the format-7 shape rejects an older format stamp", async () => {
  assert.equal(await conforms('sm:formatVersion 6; sm:front "Sun"@en; sm:back "Sol"@sv'), false);
});

test("picture URLs must be IRIs", async () => {
  assert.equal(await conforms(
    'sm:formatVersion 7; sm:frontImage "https://images.example/front.png"; sm:back "Sol"@sv'
  ), false);
});

test("one side cannot mix tagged and untagged text", async () => {
  assert.equal(await conforms(
    'sm:formatVersion 7; sm:front "Sun", "Sun"@en; sm:back "Sol"@sv'
  ), false);
});
