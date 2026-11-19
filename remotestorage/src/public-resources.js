// SPDX-License-Identifier: MIT
import { DataFactory, Parser, Writer } from 'n3';
const {namedNode,quad}=DataFactory;
/** Explicit sharing copies only selected resources to this module's public scope. */
export function publicResources({privateClient,publicClient,store,root}) {
  privateClient.declareType('published-resource',{type:'object',required:['url','paths'],properties:{url:{type:'string'},paths:{type:'array',items:{type:'string'}}}});
  let sync=async()=>{};
  const key=url=>'_rs/published/'+encodeURIComponent(url.split('#')[0]);
  const path=url=>'exports/'+url.slice(root.length);
  const own=url=>{if(!url.startsWith(root)||url.endsWith('/'))throw Error('Choose a document in this module to share');};
  const write=async(source,resource,links)=>{
    if(resource.kind==='container')throw Error('Share documents, not whole folders');
    if(resource.kind==='file')return publicClient.storeFile(resource.contentType,path(source),resource.bytes);
    const change=term=>{
      if(term.termType!=='NamedNode')return term;
      const [doc,fragment]=term.value.split('#');
      return links.has(doc)?namedNode(links.get(doc)+(fragment?'#'+fragment:'')):term;
    };
    const writer=new Writer({format:'N-Triples'});
    writer.addQuads(new Parser().parse(resource.triples.join('\n')).map(q=>quad(change(q.subject),q.predicate,change(q.object),q.graph)));
    const body=await new Promise((resolve,reject)=>writer.end((error,text)=>error?reject(error):resolve(text)));
    return publicClient.storeFile('text/turtle',path(source),body);
  };
  return {
    configureSync(callback){sync=callback;},
    async getPublicURL(url){return (await privateClient.getObject(key(url)))?.url;},
    async publish(url,related=[]) {
      url=url.split('#')[0];
      const sources=[...new Set([url,...related.map(x=>x.split('#')[0])])];
      sources.forEach(own);
      if(!publicClient)throw Error('Public storage is unavailable');
      const resources=await Promise.all(sources.map(async source=>{
        const resource=await store.get(source);if(!resource)throw Error('Document is not saved yet');return resource;
      }));
      // Upload before requesting provider links, then upload the rewritten references.
      for(let i=0;i<sources.length;i++)await write(sources[i],resources[i],new Map());
      await sync();
      const links=new Map();
      for(const source of sources){
        const link=await publicClient.getItemURL(path(source));
        if(!link)throw Error('The storage provider did not return a public link');
        links.set(source,link);
      }
      for(let i=0;i<sources.length;i++)await write(sources[i],resources[i],links);
      await sync();
      const result=links.get(url);
      await privateClient.storeObject('published-resource',key(url),{url:result,paths:sources.map(path)});
      return result;
    },
    async unpublish(url) {
      const record=await privateClient.getObject(key(url));
      if(!record)return;
      for(const item of record.paths){
        const response=await publicClient.remove(item);
        if(!response || !((response.statusCode>=200&&response.statusCode<300)||response.statusCode===404))throw Error('The provider refused to remove the public copy');
      }
      await sync();
      await privateClient.remove(key(url));
    }
  };
}
