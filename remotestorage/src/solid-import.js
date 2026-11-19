// SPDX-License-Identifier: MIT
import { DataFactory, Parser, Store, Writer } from 'n3';
const {namedNode,quad}=DataFactory;
const solid='http://www.w3.org/ns/solid/terms#';
const contains='http://www.w3.org/ns/ldp#contains';
const rdfType='http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
async function turtle(quads) {
  const writer=new Writer({format:'N-Triples'});writer.addQuads(quads);
  return new Promise((resolve,reject)=>writer.end((error,text)=>error?reject(error):resolve(text)));
}
/** Read existing app registrations and copy only their trees. Never alters the source pod. */
export async function importSolid({fetcher,webId,classes,root,store,fetch,excludePrefix}) {
  const readGraph=async url=>{
    const response=await fetcher(url,{headers:{Accept:'text/turtle'}});
    if(!response.ok)throw Error('Could not import '+url+' (HTTP '+response.status+')');
    return new Store(new Parser({baseIRI:url}).parse(await response.text()));
  };
  const profile=await readGraph(webId.split('#')[0]);
  const indexes=['privateTypeIndex','publicTypeIndex'].flatMap(key=>profile.getObjects(namedNode(webId),namedNode(solid+key),null).map(t=>t.value));
  const registrations=[];
  for(const index of [...new Set(indexes)]) {
    const graph=await readGraph(index);
    for(const cls of classes) for(const subject of graph.getSubjects(namedNode(solid+'forClass'),namedNode(cls),null)) {
      for(const predicate of ['instanceContainer','instance']) for(const target of graph.getObjects(subject,namedNode(solid+predicate),null)) {
        const source=target.value.split('#')[0];
        // Instance registrations can name a file inside the instance tree.
        const tree=predicate==='instanceContainer'||source.endsWith('/')?source:source.slice(0,source.lastIndexOf('/')+1);
        registrations.push({cls,predicate,target:target.value,tree});
      }
    }
  }
  const trees=[...new Set(registrations.map(r=>r.tree))];
  const destinations=new Map(trees.map(tree=>[tree,root+'imported/'+encodeURIComponent(tree)+'/']));
  const rewrite=value=>{
    const tree=trees.find(tree=>value.startsWith(tree));
    return tree?destinations.get(tree)+value.slice(tree.length):value;
  };
  const changeTerm=term=>term.termType==='NamedNode'?namedNode(rewrite(term.value)):term;
  const visited=new Set();
  async function copy(source,tree) {
    if(excludePrefix && source.startsWith(excludePrefix))return;
    if(visited.has(source))return;
    if(!source.startsWith(tree))throw Error('Import member escaped its registered container');
    if(visited.size>=10000)throw Error('Import exceeds 10000 resources; source remains unchanged');
    visited.add(source);
    const destination=rewrite(source);
    const response=await fetcher(source,{headers:{Accept:'text/turtle, */*;q=0.5'}});
    if(!response.ok)throw Error('Could not import '+source+' (HTTP '+response.status+')');
    if(source.endsWith('/')) {
      const graph=new Store(new Parser({baseIRI:source}).parse(await response.text()));
      if(!await store.get(destination)) {
        const metadata=graph.getQuads(null,null,null,null).filter(q=>q.predicate.value!==contains);
        const triples=(await turtle(metadata.map(q=>quad(changeTerm(q.subject),q.predicate,changeTerm(q.object),q.graph)))).split('\n').filter(Boolean);
        await store.set(destination,{kind:'container',triples,etag:'"'+crypto.randomUUID()+'"'});
      }
      for(const member of graph.getObjects(namedNode(source),namedNode(contains),null)) await copy(member.value,tree);
      return;
    }
    // A retried import fills missing resources without overwriting subsequent app edits.
    if(await store.get(destination))return;
    const type=response.headers.get('content-type')||'application/octet-stream';
    let body;
    if(type.includes('text/turtle')||type.includes('application/n-triples')) {
      const quads=new Parser({baseIRI:source}).parse(await response.text());
      body=await turtle(quads.map(q=>quad(changeTerm(q.subject),q.predicate,changeTerm(q.object),q.graph)));
    } else body=await response.arrayBuffer();
    const result=await fetch(destination,{method:'PUT',headers:{'Content-Type':type},body});
    if(!result.ok)throw Error('Could not store imported resource '+destination);
  }
  for(const tree of trees)await copy(tree,tree);
  if(registrations.length) {
    const index=root+'settings/privateTypeIndex';
    const triples=registrations.map((r,i)=>`<#import-${i}> a <${solid}TypeRegistration>; <${solid}forClass> <${r.cls}>; <${solid+r.predicate}> <${rewrite(r.target)}>.`).join('\n');
    await fetch(index,{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:'INSERT DATA { '+triples+' }'});
    await fetch(root+'profile/card',{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:`INSERT DATA { <#me> <${solid}privateTypeIndex> <${index}>. }`});
  }
  return {registrations:registrations.length,resources:visited.size};
}
