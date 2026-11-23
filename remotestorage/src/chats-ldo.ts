// SPDX-License-Identifier: MIT
import {createSolidLdoDataset, type SolidContainerUri} from '@ldo/connected-solid';
import {Parser,Store,DataFactory} from 'n3';
import {Chat} from '../../chats/ldo/src/Chat.js';

/** Reuse the complete LDO chat API. Notifications come from the owning rs.js
 * scope's change stream, so every backend uses its own synchronization engine.
 */
export function openScopedChat(api, container: SolidContainerUri): Chat {
  const dataset=createSolidLdoDataset();
  dataset.setContext('solid',{fetch:api.fetch});
  const chat=new Chat(container,dataset);
  let stop: (()=>void)|undefined;
  let pending=Promise.resolve();
  const destroy=chat.destroy.bind(chat);
  const createChat=chat.createChat.bind(chat);
  chat.createChat=async info=>{
    const response=await api.fetch(container,{method:'PUT',headers:{'Content-Type':'text/turtle','If-None-Match':'*'},body:''});
    if(!response.ok&&response.status!==412)throw Error('Could not create the chat container (HTTP '+response.status+')');
    await createChat(info);
  };
  // The upstream LDO implementation owns native Solid notifications.
  if(api.nativeSolidDocuments)return chat;

  // SolidOS implementations use both chat.ttl and index.ttl, and both padded
  // and unpadded month/day folders. Read all message documents for each day.
  chat.getMessageIterator=async function*(){
    const days=new Map<string, any[]>();
    const node=DataFactory.namedNode;
    for(const url of await api.resources.urls()){
      if(!url.startsWith(container))continue;
      const match=url.slice(container.length).match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\/[^/]+$/);
      if(!match)continue;
      const resource=await api.resources.get(url);if(resource?.kind!=='rdf')continue;
      const store=new Store(new Parser({baseIRI:url}).parse(resource.triples.join('\n')));
      const date=match.slice(1).map(value=>value.padStart(2,'0')).join('-');
      const messages=days.get(date)||[];
      for(const subject of store.getObjects(node(container+'index.ttl#this'),node('http://www.w3.org/2005/01/wf/flow#message'),null)){
        const value=(predicate)=>store.getObjects(subject,node(predicate),null)[0]?.value;
        const content=value('http://rdfs.org/sioc/ns#content'),created2=value('http://purl.org/dc/terms/created'),maker=value('http://xmlns.com/foaf/0.1/maker');
        if(content!==undefined&&created2&&maker)messages.push({'@id':subject.value,content,created2,maker:{'@id':maker}});
      }
      days.set(date,messages);
    }
    for(const date of [...days.keys()].sort().reverse()){
      const unique=new Map(days.get(date).map(message=>[message['@id'],message]));
      yield [...unique.values()].sort((a,b)=>b.created2.localeCompare(a.created2));
    }
  };
  const removeMessage=chat.removeMessage.bind(chat);
  chat.removeMessage=async id=>{
    const result=await dataset.getResource(id.split('#')[0] as any).read();
    if(result.isError)throw result;
    await removeMessage(id);
  };
  chat.deleteChat=async()=>{
    await chat.destroy();
    for(const url of (await api.resources.urls()).filter(url=>url.startsWith(container)).sort((a,b)=>b.length-a.length)){
      const response=await api.fetch(url,{method:'DELETE'});
      if(!response.ok&&response.status!==404)throw Error('Could not remove chat document (HTTP '+response.status+')');
    }
  };
  const latest=async()=>{
    const page=await chat.getMessageIterator().next();
    return page.value||[];
  };
  chat.subscribeToMessages=async(callback,onError=(error)=>console.error(error))=>{
    stop?.();
    const seen=new Set((await latest()).map(message=>message['@id']));
    let active=true;
    const unsubscribe=api.onChange(()=>{
      pending=pending.then(async()=>{
        if(!active)return;
        const messages=await latest();
        const added=messages.filter(message=>!seen.has(message['@id']));
        for(const message of messages)seen.add(message['@id']);
        if(active&&added.length)callback(added);
      }).catch(onError);
    });
    stop=()=>{active=false;unsubscribe();};
  };
  chat.unsubscribeFromMessages=async()=>{stop?.();stop=undefined;await pending;};
  chat.destroy=async()=>{await chat.unsubscribeFromMessages();await destroy();};
  return chat;
}
