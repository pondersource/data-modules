// SPDX-License-Identifier: MIT
import test from 'node:test';
import assert from 'node:assert/strict';
import {Flashcards} from '../src/index.js';
import {connectApp} from '../src/connection.js';
import {createLocalPod} from '../src/resource-pod.ts';

function client(data=new Map()) {
  return {declareType(){},storage:{access:{checkPermission:()=>true}},
    async getObject(key){return structuredClone(data.get(key));},
    async storeObject(type,key,value){data.set(key,structuredClone(value));},
    async remove(key){data.delete(key);},
    async getListing(prefix=''){return Object.fromEntries([...data.keys()].filter(key=>key.startsWith(prefix)).map(key=>{
      const rest=key.slice(prefix.length),slash=rest.indexOf('/');return [slash<0?rest:rest.slice(0,slash+1),{}];
    }));}};
}
function pod(root) {
  const data=new Map();let queue=Promise.resolve();
  const store={get:async key=>structuredClone(data.get(key)),set:async(key,value)=>data.set(key,structuredClone(value)),
    delete:async key=>data.delete(key),urls:async()=>[...data.keys()],exclusive(work){
      const result=queue.then(work);queue=result.catch(()=>{});return result;
    }};
  return createLocalPod({root,store,newEtag:()=> '"'+crypto.randomUUID()+'"'});
}
function fixture(t,{backend='solid',data=new Map(),initialize,nativeSolid=true}={}) {
  const previous={document:globalThis.document,window:globalThis.window};
  const alerts=[],host={style:{},append:element=>alerts.push(element)};
  globalThis.document={getElementById:()=>host,createElement:()=>({setAttribute(){}})};
  globalThis.window={location:new URL('https://app.example/editor'),history:{replaceState(){}}};
  t.after(()=>Object.assign(globalThis,previous));
  const root='https://pod.example/alice/',webId=root+'profile/card#me',native=pod(root),nativeCalls=[];
  class RemoteStorage {
    constructor({modules:[module]}) {
      this.events={};this.backend=backend;this.connected=true;this.remote={userAddress:webId};
      this.access={claim(){}};this.caching={enable(){}};
      this[module.name]=module.builder(client(data)).exports;
      if(initialize)this[module.name].initialize=initialize;
      this.solid={getSession:()=>({info:{webId},fetch:(...args)=>{nativeCalls.push(args);return native(...args);}}),getPodURL:()=>root};
      queueMicrotask(()=>this.emit('ready'));
    }
    on(name,callback){(this.events[name]||=[]).push(callback);}
    emit(name){for(const callback of this.events[name]||[])callback();}
    setApiKeys(){}startSync(){}
    disconnect(){this.connected=false;this.emit('disconnected');}
  }
  class Widget {attach(){}open(){}showChooseOrSignIn(){}}
  const connection=connectApp(Flashcards,{RemoteStorage,Widget,nativeSolid});
  return {connection,data,root,webId,native,nativeCalls,alerts};
}

test('Solid opens original identity/documents and retains the exact adapter without importing or initializing copies',async t=>{
  const {connection,data,root,webId,native,nativeCalls}=fixture(t);
  const adapter=connection.api,user=await connection.restore();
  assert.equal(connection.api.adapter,adapter);
  assert.equal(user.webId,webId);assert.deepEqual(user.storageUrls,[root]);
  assert.equal(user.privateTypeIndexUrl,undefined);
  assert.equal(data.size,0);assert.equal(nativeCalls.length,0);
  assert.deepEqual(connection.api.storageSources(),[{webId,root},{webId:adapter.webId,root:adapter.root,optional:true}]);
  const document=root+'original.ttl';
  await native(document,{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#card> <https://schema.org/name> "Before"; <https://unknown.example/p> "keep"@nl. <#other> <https://unknown.example/nested> [ <https://schema.org/name> "blank" ].'});
  const edited=await connection.fetch(new Request(document,{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:'DELETE DATA { <#card> <https://schema.org/name> "Before". }; INSERT DATA { <#card> <https://schema.org/name> "After". }'}));
  assert.equal(edited.status,205);
  const body=await (await native(document)).text();
  assert.match(body,/After/);assert.match(body,/@nl/);assert.match(body,/blank/);
  assert.equal(data.size,0);
  await connection.fetch(new Request(adapter.root+'old.ttl',{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#card> <https://schema.org/name> "Adapter".'}));
  assert.match(await (await adapter.fetch(adapter.root+'old.ttl')).text(),/Adapter/);
  assert.ok(data.size>0);
  assert.equal(nativeCalls.length,1,'adapter I/O never goes to native network fetch');
  const refused=await connection.fetch('https://outside.example/data',{method:'PUT',body:'no'});
  assert.equal(refused.status,403);assert.equal(nativeCalls.length,1);
});

test('other providers retain their initialized adapter identity',async t=>{
  const {connection,data}=fixture(t,{backend:'dropbox'});
  const adapter=connection.api,user=await connection.restore();
  assert.equal(connection.api,adapter);assert.equal(user.webId,adapter.webId);
  assert.ok(data.size>0);assert.equal(user.privateTypeIndexUrl,adapter.root+'settings/privateTypeIndex');
});

test('an existing Solid consumer keeps adapter behavior until its native integration is enabled',async t=>{
  const {connection,native,root,data}=fixture(t,{nativeSolid:false});
  await native(root+'profile/card',{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#me> a <http://xmlns.com/foaf/0.1/Person>.'});
  const adapter=connection.api,user=await connection.restore();
  assert.equal(connection.api,adapter);assert.equal(user.webId,adapter.webId);
  assert.ok(data.size>0);assert.equal(user.privateTypeIndexUrl,adapter.root+'settings/privateTypeIndex');
});

test('a disconnected preparation cannot publish a stale identity',async t=>{
  let finish;
  const {connection,alerts}=fixture(t,{backend:'dropbox',initialize:()=>new Promise(resolve=>{finish=resolve;})});
  const pending=connection.restore();await connection.ready;await Promise.resolve();
  connection.disconnect();finish();
  await assert.rejects(pending,/connection changed/);assert.deepEqual(alerts,[]);
});

test('Request writes retain method, validators, RDF text and arbitrary binary bytes',async()=>{
  const api=Flashcards.builder(client()).exports,url=api.root+'data.ttl';
  assert.equal((await api.fetch(new Request(url,{method:'PUT',headers:{'Content-Type':'text/turtle','If-None-Match':'*'},body:'<#x> <https://schema.org/name> "One".'}))).status,201);
  const etag=(await api.fetch(url)).headers.get('ETag');
  assert.equal((await api.fetch(new Request(url,{method:'PATCH',headers:{'Content-Type':'application/sparql-update','If-Match':etag},body:'INSERT DATA { <#x> <https://unknown.example/p> "Two". }'}))).status,205);
  assert.equal((await api.fetch(new Request(url,{method:'DELETE',headers:{'If-Match':etag}}))).status,412);
  assert.match(await (await api.fetch(url)).text(),/Two/);
  const bytes=new Uint8Array([0,255,254,128,1]);
  assert.equal((await api.fetch(new Request(api.root+'binary',{method:'PUT',headers:{'Content-Type':'application/octet-stream'},body:bytes}))).status,201);
  assert.deepEqual(new Uint8Array(await (await api.fetch(api.root+'binary')).arrayBuffer()),bytes);
});

test('corrupt adapter records fail as fetch errors rather than looking absent',async()=>{
  const data=new Map(),api=Flashcards.builder(client(data)).exports,url=api.root+'index.ttl';
  data.set('_rs/resources/'+encodeURIComponent(url),{url:api.root+'another',resource:{kind:'rdf',etag:'"bad"',triples:[]}});
  await assert.rejects(api.fetch(url),error=>error instanceof TypeError && /identity/.test(error.cause.message));
  assert.equal(data.size,1,'a failed read never removes the original record');
});

test('foreign Request reads preserve accept/cancellation without credentials or arbitrary headers',async t=>{
  const {connection}=fixture(t);await connection.restore();
  const previous=globalThis.fetch,calls=[];t.after(()=>{globalThis.fetch=previous;});
  globalThis.fetch=async(...args)=>{calls.push(args);return new Response('public');};
  const controller=new AbortController();
  const request=new Request('https://foreign.example/document',{headers:{Accept:'text/turtle',Authorization:'fixture-secret',DPoP:'fixture-proof','X-Private':'no'},credentials:'include',signal:controller.signal});
  await connection.fetch(request);controller.abort();
  assert.equal(calls[0][1].credentials,'omit');
  assert.deepEqual(calls[0][1].headers,{Accept:'text/turtle'});
  assert.equal(calls[0][1].signal.aborted,true);
});
