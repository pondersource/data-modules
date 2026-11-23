// SPDX-License-Identifier: MIT
import {nativeSolidView} from './native-solid.js';
import { publicResources } from './public-resources.js';
import LegacyFlashcards from './flashcards-legacy.js';
import {flashcardsDomain} from './flashcards.js';
import { importSolid } from './solid-import.js';
import { createResourceStore } from './resource-store.js';
import { createLocalPod } from './resource-pod.ts';
import { parseRecipes } from './recipes.js';
import { parseMovies } from './movies.ts';
export { parseRecipes,parseMovies };
/** The module owns the storage API; apps receive only its domain and RDF interfaces. */
export function dataModule(name, classes, helpers={}, domain=()=>({})) {
  return {name,builder(privateClient,publicClient) {
    const store=createResourceStore(privateClient,name);
    const root='https://'+name+'.storage.pondersource.invalid/';
    const fetch=createLocalPod({root,store,newEtag:()=> '"'+crypto.randomUUID()+'"'});
    privateClient.declareType('migration',{type:'object',properties:{complete:{type:'boolean'}},required:['complete']});
    const api={...helpers,
      nativeSolid:context=>nativeSolidView({...context,adapter:api},helpers,domain,mode=>privateClient.storage?.access ? privateClient.storage.access.checkPermission(name,mode) : true),...publicResources({privateClient,publicClient,store,root}),
      async migrateSolid(fetcher,webId,excludePrefix) {
        if ((await privateClient.getObject('_rs/migration'))?.complete) return;
        await importSolid({fetcher,webId,classes,root,store,fetch,excludePrefix});
        await privateClient.storeObject('migration','_rs/migration',{complete:true});
      },
      importSolid:(fetcher,webId)=>importSolid({fetcher,webId,classes,root,store,fetch}),
      root,webId:root+'profile/card#me',classes,fetch,
      // Solid Memo's existing RDF adapters can use the exact resource-store contract.
      resources:store,
      onChange(callback) {
        if (!privateClient.on) throw Error('This client does not provide change events');
        privateClient.on('change',callback);
        return ()=>privateClient.removeEventListener('change',callback);
      },
      async initialize() {
        const profile=root+'profile/card';
        if (await store.get(profile)) return;
        await fetch(root+'settings/privateTypeIndex',{method:'PUT',headers:{'Content-Type':'text/turtle'},body:'<> a <http://www.w3.org/ns/solid/terms#TypeIndex>, <http://www.w3.org/ns/solid/terms#UnlistedDocument>.'});
        await fetch(root+'settings/preferences',{method:'PUT',headers:{'Content-Type':'text/turtle'},body:`<${root}profile/card#me> <http://www.w3.org/ns/solid/terms#privateTypeIndex> <${root}settings/privateTypeIndex>.`});
        await fetch(profile,{method:'PUT',headers:{'Content-Type':'text/turtle','If-None-Match':'*'},body:
          `<#me> a <http://xmlns.com/foaf/0.1/Person>; <http://xmlns.com/foaf/0.1/name> "My storage"; <http://www.w3.org/ns/pim/space#storage> <${root}>; <http://www.w3.org/ns/pim/space#preferencesFile> <${root}settings/preferences>; <http://www.w3.org/ns/solid/terms#privateTypeIndex> <${root}settings/privateTypeIndex>.`});
      }
    };
    return {exports:Object.assign(api,domain(api))};
  }};
}
export const Recipes = dataModule('recipes',['https://schema.org/Recipe'],{parseRecipes});
export const Movies = dataModule('movies',['https://schema.org/Movie','https://schema.org/WatchAction'],{parseMovies});
const FlashcardsRdf = dataModule('flashcards',['https://solid-memo.com/ns/vocab/v1.ttl#Instance'],{},flashcardsDomain);
export const Flashcards = {name:'flashcards',builder(client,publicClient){
  const legacy=LegacyFlashcards.builder(client).exports;
  const api=FlashcardsRdf.builder(client,publicClient).exports;
  for(const [key,value] of Object.entries(legacy))if(!(key in api))api[key]=value;
  api.listGroups=async()=>{const groups=await client.getListing();return Object.fromEntries(Object.entries(groups||{}).filter(([key])=>key.endsWith('/')&&key!=='_rs/'));};
  return {exports:api};
}};

export {connectApp} from './connection.js';
