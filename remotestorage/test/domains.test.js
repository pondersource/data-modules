// SPDX-License-Identifier: MIT
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Contacts,Chats,Tasks,Bookmarks,Profile} from '../dist/domains.mjs';
function client(data=new Map()) {
  const listeners=new Set();
  const changed=()=>{for(const callback of listeners)callback();};
  return {
    declareType(){},
    on(name,callback){listeners.add(callback);},removeEventListener(name,callback){listeners.delete(callback);},
    async getAll(prefix=''){return Object.fromEntries([...data.entries()].filter(([key])=>key.startsWith(prefix)).map(([key,value])=>[key.slice(prefix.length),structuredClone(value)]));},
    async getObject(path){return structuredClone(data.get(path));},
    async storeObject(type,path,value){data.set(path,structuredClone(value));changed();},
    async remove(path){data.delete(path);changed();},
    async getListing(prefix=''){return Object.fromEntries([...data.keys()].filter(k=>k.startsWith(prefix)).map(k=>{
      const rest=k.slice(prefix.length),slash=rest.indexOf('/');return [slash<0?rest:rest.slice(0,slash+1),{}];
    }));}
  };
}
async function opened(module,data=new Map()) {const api=module.builder(client(data)).exports;await api.initialize();return api;}
const put=(api,url,body)=>api.fetch(url,{method:'PUT',headers:{'Content-Type':'text/turtle'},body});

test('contacts reuses Solid address books, groups, names, emails and phone operations',async()=>{
  const data=new Map(),api=await opened(Contacts,data);
  const addressBookUri=await api.createAddressBook({containerUri:api.root+'books/',name:'Friends',ownerWebId:api.webId});
  assert.ok((await api.listAddressBooks(api.webId)).privateUris.includes(addressBookUri));
  const contactUri=await api.createNewContact({addressBookUri,contact:{name:'Ada',email:'ada@example.test',phoneNumber:'+12345'}});
  const groupUri=await api.createNewGroup({addressBookUri,groupName:'People'});
  await api.addContactToGroup({contactUri,groupUri});
  assert.equal((await api.readGroup(groupUri)).members[0].name,'Ada');
  await api.renameContact({contactUri,newName:'Ada Lovelace'});
  const emailAddressUri=await api.addNewEmailAddress({contactUri,newEmailAddress:'second@example.test'});
  await api.updateEmailAddress({emailAddressUri,newEmailAddress:'changed@example.test'});
  const phoneNumberUri=await api.addNewPhoneNumber({contactUri,newPhoneNumber:'+67890'});
  await api.updatePhoneNumber({phoneNumberUri,newPhoneNumber:'+99999'});
  const fresh=await opened(Contacts,data),contact=await fresh.readContact(contactUri);
  assert.equal(contact.name,'Ada Lovelace');
  assert.ok(contact.emails.some(e=>e.value.includes('changed@example.test')));
  assert.ok(contact.phoneNumbers.some(e=>e.value.includes('99999')));
  assert.equal((await fresh.readAddressBook(addressBookUri)).title,'Friends');
  await api.removeEmailAddress({contactUri,emailAddressUri});
  await api.removePhoneNumber({contactUri,phoneNumberUri});
  await api.removeContactFromGroup({contactUri,groupUri});
  assert.deepEqual((await (await opened(Contacts,data)).readGroup(groupUri)).members,[]);
});

test('chats creates a SolidOS chat and retains dated messages across instances',async()=>{
  const data=new Map(),api=await opened(Chats,data);
  const chatUri=await api.createChat({containerUri:api.root+'chats/',name:'Our chat'});
  await api.postMessage({chatUri,text:'Hello café',authorWebId:api.webId});
  const chat=await (await opened(Chats,data)).readChat(chatUri);
  assert.equal(chat.name,'Our chat');
  assert.equal(chat.latestMessages.length,1);
  assert.match(JSON.stringify(chat.latestMessages),/Hello café/);
});

test('tasks reuses the SolidOS N3 writer and the tracker reader',async()=>{
  const data=new Map(),api=await opened(Tasks,data),index=api.root+'tasks/index.ttl',state=api.root+'tasks/state.ttl';
  await put(api,index,`@prefix wf:<http://www.w3.org/2005/01/wf/flow#>.
    <#this> a wf:Tracker;wf:stateStore <${state}>;wf:issueClass wf:Task;wf:initialState wf:Open;wf:assigneeClass <http://xmlns.com/foaf/0.1/Person>.`);
  await put(api,state,`<${index}#this> <http://www.w3.org/2005/01/wf/flow#stateStore> <${state}>.`);
  const local={tracker:{indexUri:index+'#this',stateUri:state}};
  const issueUri=await api.addIssue(local,{title:'Read a book',description:'Keep "quotes" and Unicode: café'});
  await api.addComment(local,{issueUri,author:api.webId,text:'A comment'});
  const result=await (await opened(Tasks,data)).fetchTracker(index+'#this');
  assert.equal(result.issues[issueUri].title,'Read a book');
  assert.match(await (await api.fetch(state)).text(),/A comment/);
});

test('tasks reads schema Action and iCalendar Vtodo without losing source predicates',async()=>{
  const api=await opened(Tasks),url=api.root+'tasks/one.ttl';
  await put(api,url,'@prefix s:<https://schema.org/>. @prefix i:<http://www.w3.org/2002/12/cal/ical#>. <#t> a s:Action,i:Vtodo;s:name "Read";i:priority 3;i:completed "2026-11-20T10:00:00Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>; <https://unknown.test/field> "untouched".');
  const result=await api.fetchContainer(api.root+'tasks/');
  assert.equal(result.issues[url+'#t'].title,'Read');
  assert.equal(result.issues[url+'#t'].priority,3);
  assert.equal(result.issues[url+'#t'].completed,true);
  assert.match(await (await api.fetch(url)).text(),/untouched/);
});

test('bookmarks retains Solid CRUD and returns source-native RDF',async()=>{
  const data=new Map(),api=await opened(Bookmarks,data);
  await api.solid.create({title:'Example',link:'https://example.test/',topic:'Reading'});
  const all=await api.solid.getAll();
  assert.equal(all.length,1);
  const bookmark=all[0];
  assert.equal(bookmark.title,'Example');
  await api.solid.update(bookmark.url,{title:'Changed',link:'https://example.test/'});
  assert.equal((await (await opened(Bookmarks,data)).solid.get(bookmark.url)).title,'Changed');
  await api.solid.delete(bookmark.url);
  assert.deepEqual(await (await opened(Bookmarks,data)).solid.getAll(),[]);
});

test('profile uses FOAF name before VCARD fallback',async()=>{
  const api=await opened(Profile);
  assert.equal(await api.getName(),'My storage');
  await put(api,api.root+'profile/card','<#me> <http://www.w3.org/2006/vcard/ns#fn> "Fallback".');
  assert.equal(await api.getName(),'Fallback');
});

test('domain fetches cannot write outside their module',async()=>{
  for(const module of [Contacts,Chats,Tasks,Bookmarks,Profile]) {
    const api=await opened(module);
    assert.equal((await put(api,'https://another.example/private','')).status,404);
  }
});


test('bookmark module composes unchanged Webmarks JSON paths with Solid RDF CRUD',async()=>{
 const data=new Map(),api=await opened(Bookmarks,data);
 const original={url:'https://example.test/article',title:'Article',tags:['read'],unknown:{keep:true}};
 const saved=await api.archive.store(original);
 assert.ok(data.has('archive/'+saved.id));assert.equal(api.client,undefined);
 assert.deepEqual((await api.archive.find(saved.id)).unknown,{keep:true});
 assert.equal((await api.archive.searchByTags(['read']))[0].title,'Article');
 const fresh=await opened(Bookmarks,data);assert.equal((await fresh.archive.getAll()).length,1);
 assert.equal(typeof fresh.solid.create,'function');
 saved.title='Changed';await fresh.archive.store(saved);
 assert.deepEqual((await api.archive.find(saved.id)).unknown,{keep:true});
 await fresh.archive.remove(saved.id);assert.equal((await api.archive.getAll()).length,0);
});

test('vCard 3 and 4 readers retain folds, parameters, groups and unknown source fields',async()=>{
 const api=await opened(Contacts);
 const text='BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Ada\\, Love\r\n lace\r\nitem1.EMAIL;TYPE=HOME:ada@example.test\r\nX-UNKNOWN;LANGUAGE=nl:behouden\r\nEND:VCARD\r\nBEGIN:VCARD\r\nVERSION:4.0\r\nFN:Grace\r\nTEL;TYPE=work:tel:+12345\r\nEND:VCARD\r\n';
 const result=api.parseVCard(text);assert.equal(result.source,text);assert.equal(result.cards.length,2);
 assert.equal(result.cards[0].name,'Ada, Lovelace');
 assert.match(JSON.stringify(result.cards[0].properties),/behouden/);
 assert.equal(result.cards[1].phones[0].value,'tel:+12345');
 assert.throws(()=>api.parseVCard('BEGIN:VCARD\r\nVERSION:2.1\r\nFN:Old\r\nEND:VCARD\r\n'),/3.0 and 4.0/);
});

test('iCalendar task reader retains recurrence, timezone, alarms and unknown fields',async()=>{
 const api=await opened(Tasks);
 const text='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VTIMEZONE\r\nTZID:Example/Zone\r\nEND:VTIMEZONE\r\nBEGIN:VTODO\r\nUID:task-1\r\nSUMMARY:Read\r\nDUE:20261201T120000Z\r\nRRULE:FREQ=WEEKLY;COUNT=3\r\nX-UNKNOWN:keep\r\nBEGIN:VALARM\r\nACTION:DISPLAY\r\nTRIGGER:-PT10M\r\nEND:VALARM\r\nEND:VTODO\r\nEND:VCALENDAR\r\n';
 const result=api.parseICalendarTasks(text);assert.equal(result.source,text);
 assert.equal(result.tasks[0].title,'Read');assert.equal(result.tasks[0].due,'2026-12-01T12:00:00Z');
 assert.match(JSON.stringify(result.calendars),/Example\/Zone/);assert.match(JSON.stringify(result.tasks[0].properties),/valarm/);
});


test('rdflib bookmark API preserves document and container formats and unknown RDF',async()=>{
 const api=await opened(Bookmarks),doc=api.root+'native/bookmarks.ttl';
 await put(api,doc,'<#unknown> <https://example.test/vocab#keep> "unchanged".');
 const uri=await api.rdf.createBookmark({storageUrl:doc,title:'Native',url:'https://example.test/native'});
 assert.equal((await api.rdf.listBookmarks(doc))[0].title,'Native');
 await api.rdf.updateBookmark({uri,newTitle:'Updated',newUrl:'https://example.test/updated'});
 assert.match(await (await api.fetch(doc)).text(),/unchanged/);
 await api.rdf.deleteBookmark(uri);assert.equal((await api.rdf.listBookmarks(doc)).length,0);
 assert.match(await (await api.fetch(doc)).text(),/unchanged/);
 const folder=api.root+'by-document/';await put(api,folder,'');
 const second=await api.rdf.createBookmark({storageUrl:folder,title:'Separate document',url:'https://example.test/other'});
 assert.ok(second.startsWith(folder));assert.equal((await api.rdf.listBookmarks(folder))[0].title,'Separate document');
});


test('LDO chats reuses metadata, editing, message history and scope change subscriptions',async()=>{
 const api=await opened(Chats),chat=api.openChat(api.root+'ldo-chat/');
 try {
  await chat.createChat({type:{'@id':'LongChat'},author:{'@id':api.webId},created:new Date().toISOString(),title:'LDO chat'});
  assert.equal((await chat.getChatInfo()).title,'LDO chat');
  await chat.setChatInfo({title:'Renamed'});assert.equal((await chat.getChatInfo()).title,'Renamed');
  await chat.sendMessage('First message',api.webId);
  const messages=(await chat.getMessageIterator().next()).value;assert.equal(messages[0].content,'First message');
  await chat.removeMessage(messages[0]['@id']);
  assert.equal((await chat.getMessageIterator().next()).value.length,0);
  const received=[],errors=[];await chat.subscribeToMessages(messages=>received.push(...messages),error=>errors.push(error));
  await api.postMessage({chatUri:api.root+'ldo-chat/index.ttl#this',text:'From another module',authorWebId:api.webId});
  for(let i=0;i<50&&!received.length&&!errors.length;i++)await new Promise(resolve=>setTimeout(resolve,10));
  assert.deepEqual(errors,[]);assert.ok(received.some(message=>message.content==='From another module'));
  await chat.unsubscribeFromMessages();
 } finally {await chat.destroy();}
});


test('Solid bookmark discovery reads instanceContainer documents without erasing registrations',async()=>{
 const api=await opened(Bookmarks),folder=api.root+'soukai/',doc=folder+'one.ttl';
 await put(api,doc,'<#it> a <http://www.w3.org/2002/01/bookmark#Bookmark>; <http://www.w3.org/2000/01/rdf-schema#label> "Soukai alias"; <http://www.w3.org/2002/01/bookmark#recalls> <https://example.test/native>.');
 await api.fetch(api.root+'settings/privateTypeIndex',{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:`INSERT DATA { <#source> <http://www.w3.org/ns/solid/terms#forClass> <http://www.w3.org/2002/01/bookmark#Bookmark>; <http://www.w3.org/ns/solid/terms#instanceContainer> <${folder}>. }`});
 const result=await api.solid.getAll();assert.equal(result[0].title,'Soukai alias');
 assert.equal(result[0].url,doc+'#it');assert.match(await (await api.fetch(api.root+'settings/privateTypeIndex')).text(),/instanceContainer/);
});


test('native Solid views read and edit original upstream document URLs in place',async()=>{
 const data=new Map(),upstream=await opened(Bookmarks,data),url=upstream.root+'original.ttl#bookmark';
 await put(upstream,url.split('#')[0],`<#bookmark> a <http://www.w3.org/2002/01/bookmark#Bookmark>; <http://purl.org/dc/terms/title> "Original"; <http://www.w3.org/2002/01/bookmark#recalls> <https://example.test/old>; <https://example.test/unknown> "retain"@nl. <#sibling> <https://example.test/keep> [ <https://example.test/value> "blank node" ].`);
 const module=await opened(Bookmarks),calls=[];
 const native=module.nativeSolid({root:upstream.root,webId:upstream.webId,fetch:async(input,init)=>{calls.push(String(input));return upstream.fetch(input,init);}});
 assert.equal((await native.solid.get(url)).title,'Original');
 await native.solid.update(url,{title:'Edited through module',link:'https://example.test/new'});
 // A fresh upstream domain instance reads the same source document, not an import.
 const fresh=await opened(Bookmarks,data);assert.equal((await fresh.solid.get(url)).title,'Edited through module');
 const source=await (await upstream.fetch(url.split('#')[0])).text();assert.match(source,/@nl/);assert.match(source,/blank node/);
 assert.ok(calls.every(call=>call.startsWith(upstream.root)));
 assert.equal((await native.fetch('https://outside.example.test/data',{method:'PUT',body:'no'})).status,403);
 const fenced=module.nativeSolid({root:upstream.root+'nested/',webId:upstream.webId,fetch:upstream.fetch});
 assert.equal((await fenced.fetch(upstream.root+'nested/../escaped',{method:'DELETE'})).status,403);
});


test('native Solid views honor the module scope access mode',async()=>{
 const scopedClient=client();scopedClient.storage={access:{checkPermission:(scope,mode)=>scope==='bookmarks'&&mode==='r'}};
 const api=Bookmarks.builder(scopedClient).exports;let writes=0;
 const native=api.nativeSolid({root:'https://pod.example.test/alice/',webId:'https://pod.example.test/alice/profile#me',fetch:async(input,init)=>{if(init?.method==='PUT')writes++;return new Response('ok');}});
 assert.equal((await native.fetch(native.root+'document',{method:'PUT',body:'no'})).status,403);assert.equal(writes,0);
 assert.equal((await native.fetch(native.root+'document')).status,200);
});
