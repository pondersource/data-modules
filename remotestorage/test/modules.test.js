// SPDX-License-Identifier: MIT
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Recipes,Movies,Flashcards,parseRecipes} from '../src/index.js';
function client(data=new Map()) {
  return {
    declareType(){},
    async getObject(path){return structuredClone(data.get(path));},
    async storeObject(type,path,value){data.set(path,structuredClone(value));},
    async remove(path){data.delete(path);},
    async getListing(prefix=''){return Object.fromEntries([...data.keys()].filter(k=>k.startsWith(prefix)).map(k=>{const rest=k.slice(prefix.length);const slash=rest.indexOf('/');return [slash<0?rest:rest.slice(0,slash+1),{}];}));}
  };
}
for(const module of [Recipes,Movies,Flashcards])test(module.name+' preserves RDF and binary resources across fresh module instances',async()=>{
  const data=new Map();const api=module.builder(client(data)).exports;
  await api.initialize();
  const url=api.root+'items/example.ttl';
  assert.equal((await api.fetch(url,{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#it> <https://schema.org/name> "Café".'})).status,201);
  const another=module.builder(client(data)).exports;
  assert.match(await (await another.fetch(url)).text(),/Café/);
  assert.equal((await another.fetch(url,{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:'DELETE DATA { <#it> <https://schema.org/name> "Café". }; INSERT DATA { <#it> <https://schema.org/name> "Tea". }'})).status,205);
  const text=await (await api.fetch(url)).text();assert.match(text,/Tea/);assert.doesNotMatch(text,/Café/);
  const bytes=Uint8Array.from({length:100000},(_,i)=>i%256);
  await api.fetch(api.root+'image.png',{method:'PUT',headers:{'Content-Type':'image/png'},body:bytes});
  assert.deepEqual(new Uint8Array(await (await another.fetch(api.root+'image.png')).arrayBuffer()),bytes);
  assert.equal((await api.fetch('https://unrelated.test/')).status,404);
  await api.fetch(url,{method:'DELETE'});assert.equal((await another.fetch(url)).status,404);
});
test('recipes parsing retains ordered instructions, ingredients and duration',()=>{
 const [{recipe}]=parseRecipes('@prefix s:<https://schema.org/>. <#r> a s:Recipe;s:name "Soup";s:recipeIngredient "Water";s:totalTime "PT5M";s:recipeInstructions <#b>,<#a>. <#b> s:text "Serve";s:position 2. <#a> s:text "Heat";s:position 1.','https://pod.test/recipe');
 assert.deepEqual(recipe,{title:'Soup',ingredients:['Water'],instructions:['Heat','Serve'],totalTime:'PT5M'});
});
test('Solid import preserves source documents and can retry without overwriting edited copies',async()=>{
 const api=Recipes.builder(client()).exports;await api.initialize();
 const source='https://pod.test/';
 const docs=new Map([
  [source+'profile','<#me> <http://www.w3.org/ns/solid/terms#privateTypeIndex> <index>.'],
  [source+'index','<#r> <http://www.w3.org/ns/solid/terms#forClass> <https://schema.org/Recipe>; <http://www.w3.org/ns/solid/terms#instanceContainer> <recipes/>.'],
  [source+'recipes/','<> <http://www.w3.org/ns/ldp#contains> <soup>.'],
  [source+'recipes/soup','<#it> a <https://schema.org/Recipe>; <https://schema.org/name> "Soup".']
 ]);
 const fetcher=async(url,options)=>{assert.ok(!options.method||options.method==='GET');return new Response(docs.get(url),{status:docs.has(url)?200:404,headers:{'Content-Type':'text/turtle'}});};
 const result=await api.importSolid(fetcher,source+'profile#me');assert.equal(result.registrations,1);
 const url=(await api.resources.urls()).find(url=>url.endsWith('/soup'));
 assert.match(await (await api.fetch(url)).text(),/Soup/);
 await api.fetch(url,{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#it> <https://schema.org/name> "Edited".'});
 await api.importSolid(fetcher,source+'profile#me');assert.match(await (await api.fetch(url)).text(),/Edited/);
 assert.match(docs.get(source+'recipes/soup'),/Soup/);
});

test('legacy container POST and metadata PATCH preserve the cookbook name',async()=>{
 const api=Movies.builder(client()).exports;await api.initialize();
 const response=await api.fetch(api.root,{method:'POST',headers:{Slug:'movies',Link:'<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"','Content-Type':'text/turtle'}});
 assert.equal(response.status,201);const url=response.headers.get('Location');
 assert.equal(url,api.root+'movies/');
 assert.equal((await api.fetch(url,{method:'PATCH',headers:{'Content-Type':'application/sparql-update'},body:'INSERT DATA { <> <http://www.w3.org/2000/01/rdf-schema#label> "Movies". }'})).status,205);
 const read=await api.fetch(url);assert.match(await read.text(),/"Movies"/);assert.match(read.headers.get('Link'),/describedBy/);
});

test('public exports rewrite image links, leave private data unchanged, and revoke only their copies',async()=>{
 const data=new Map(),files=new Map(),events=[];
 const pub={async storeFile(type,path,body){events.push('write');files.set(path,{type,body});},async getItemURL(path){events.push('link');assert.ok(files.has(path));return 'https://public.example/'+path;},async remove(path){files.delete(path);return {statusCode:204};}};
 const api=Recipes.builder(client(data),pub).exports;await api.initialize();
 api.configureSync(async()=>events.push('sync'));
 const url=api.root+'recipes/soup',image=api.root+'recipes/soup.png';
 await api.fetch(url,{method:'PUT',headers:{'Content-Type':'text/turtle'},body:`<#it> <https://schema.org/name> "Soup"; <https://schema.org/image> <${image}>.`});
 await api.fetch(image,{method:'PUT',headers:{'Content-Type':'image/png'},body:new Uint8Array([1,2,3])});
 await api.fetch(api.root+'private',{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#it> <https://schema.org/name> "Private".'});
 const before=await (await api.fetch(url)).text();
 const shared=await api.publish(url,[image]);assert.equal(shared,'https://public.example/exports/recipes/soup');
 assert.ok(events.indexOf('sync')<events.indexOf('link'));assert.equal(files.size,2);
 assert.match(files.get('exports/recipes/soup').body,/<https:\/\/public.example\/exports\/recipes\/soup.png>/);
 assert.equal(await (await api.fetch(url)).text(),before);
 assert.equal(await Recipes.builder(client(data),pub).exports.getPublicURL(url),shared);
 await assert.rejects(api.publish('https://foreign.example/private'),/this module/);
 await api.unpublish(url);assert.equal(files.size,0);assert.equal(await api.getPublicURL(url),undefined);
 assert.equal((await api.fetch(url)).status,200);assert.equal((await api.fetch(image)).status,200);
});

test('flashcards retains the original front/back and review API',async()=>{
 const api=Flashcards.builder(client()).exports;
 await api.initialize();
 const saved=await api.store({frontText:'Hello',backText:'Hallo',group:'Dutch',familiarity:2,reviewedCount:3});
 assert.deepEqual(Object.keys(await api.listGroups()),['Dutch/']);
 assert.equal(saved.backText,'Hallo');assert.equal(saved.familiarity,2);assert.equal(saved.reviewedCount,3);
 assert.deepEqual(await api.get('Dutch',saved['@id']),saved);
 await api.remove('Dutch',saved['@id']);assert.equal(await api.get('Dutch',saved['@id']),undefined);
});

test('migration retains collection metadata and excludes rs records inside the old collection folder',async()=>{
 const api=Movies.builder(client()).exports;await api.initialize();
 const base='https://pod.example/',folder=base+'movies/';
 const documents=new Map([
  [base+'profile','<#me> <http://www.w3.org/ns/solid/terms#privateTypeIndex> <index>.'],
  [base+'index','<#r> <http://www.w3.org/ns/solid/terms#forClass> <https://schema.org/Movie>; <http://www.w3.org/ns/solid/terms#instanceContainer> <movies/>.'],
  [folder,'<> <http://www.w3.org/2000/01/rdf-schema#label> "My collection"; <http://www.w3.org/ns/ldp#contains> <movie>, <_rs/>.'],
  [folder+'movie','<#movie> a <https://schema.org/Movie>; <https://schema.org/name> "Jaws".']
 ]);
 const read=[];
 const fetcher=async url=>{read.push(url);assert.ok(documents.has(url),'must not read its own rs records');return new Response(documents.get(url),{headers:{'content-type':'text/turtle'}});};
 await api.migrateSolid(fetcher,base+'profile#me',folder+'_rs/');
 const imported=(await api.resources.urls()).find(url=>url.endsWith('/movie'));
 assert.ok(imported);assert.match(await (await api.fetch(imported.slice(0,-5))).text(),/My collection/);
 await api.migrateSolid(()=>{throw Error('must not import twice');},base+'profile#me',folder+'_rs/');
 assert.equal(read.length,4);
});


test('a refused public deletion keeps the sharing record available for retry',async()=>{
 const data=new Map();
 const pub={async storeFile(){},async getItemURL(){return 'https://public.example/recipe';},async remove(){return {statusCode:403};}};
 const api=Recipes.builder(client(data),pub).exports;await api.initialize();
 const url=api.root+'recipe';await api.fetch(url,{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<#it> <https://schema.org/name> "Soup".'});
 await api.publish(url);
 await assert.rejects(api.unpublish(url),/refused/);
 assert.equal(await api.getPublicURL(url),'https://public.example/recipe');
});
