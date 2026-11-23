// SPDX-License-Identifier: MIT
import { Parser } from 'n3';
/** Expanded RDF/JSON-LD for the existing Solid task reader; no context fetches. */
export function expandedJsonLd(turtle,baseIRI) {
  const nodes=new Map();
  const id=term=>term.termType==='BlankNode'?'_:'+term.value:term.value;
  for(const quad of new Parser({baseIRI}).parse(turtle)) {
    const subject=id(quad.subject);
    if(!nodes.has(subject))nodes.set(subject,{'@id':subject});
    const node=nodes.get(subject);
    if(quad.predicate.value==='http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && quad.object.termType==='NamedNode') {
      (node['@type'] ||= []).push(quad.object.value);continue;
    }
    const object=quad.object;
    const value=object.termType==='Literal'
      ? {'@value':object.value,...(object.language?{'@language':object.language}:{'@type':object.datatype.value})}
      : {'@id':id(object)};
    (node[quad.predicate.value] ||= []).push(value);
  }
  return [...nodes.values()];
}
