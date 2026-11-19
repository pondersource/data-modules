// SPDX-License-Identifier: MIT
import { Parser, Writer } from 'n3';
export class TripleLines extends Set {}
export async function triplesOf(url, turtle) {
  const quads = new Parser({baseIRI:url}).parse(turtle);
  const writer = new Writer({format:'N-Triples'});
  writer.addQuads(quads);
  const output = await new Promise((resolve,reject)=>writer.end((error,text)=>error?reject(error):resolve(text)));
  return new TripleLines(output.split('\n').filter(Boolean));
}
