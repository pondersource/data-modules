// SPDX-License-Identifier: MIT
import {Parser} from 'n3';
/** RDF resources are retained losslessly inside the owning remoteStorage scope. */
export function createResourceStore(client, scope) {
  client.declareType('rdf-resource', {
    type:'object', required:['url','resource'],
    properties:{url:{type:'string'},resource:{type:'object',required:['kind','etag'],
      properties:{kind:{enum:['container','rdf','file']},etag:{type:'string'}}}}
  });
  const legacyPath = url => '_rs/resources/' + encodeURIComponent(url);
  const compactPath = async url => {
    const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(url));
    return '_rs/resources/url-' + [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
  };
  // Keep existing paths; use bounded names for new records. The complete URL
  // remains inside the same atomic record, with no separately updated index.
  const locate = async url => {
    const compact = await compactPath(url);
    const current = await client.getObject(compact);
    const legacy = legacyPath(url);
    const listing = await client.getListing('_rs/resources/') || {};
    const old = Object.prototype.hasOwnProperty.call(listing,legacy.slice('_rs/resources/'.length)) ? await client.getObject(legacy) : undefined;
    for(const record of [current,old])if(record && record.url!==url)throw Error('Resource identity does not match its storage key');
    if(current && old && JSON.stringify(current)!==JSON.stringify(old))throw Error('Conflicting resource copies need attention');
    return {path:old?legacy:compact,record:old||current,duplicate:current&&old?compact:undefined};
  };
  let queue = Promise.resolve();
  return {
    async get(url) {
      const {record} = await locate(url);
      if (!record) return undefined;
      const resource = {...record.resource};
      if(!['container','rdf','file'].includes(resource.kind)||typeof resource.etag!=='string')throw Error('Invalid module resource record');
      if(resource.kind==='rdf'||resource.kind==='container'&&resource.triples!==undefined) {
        if(!Array.isArray(resource.triples)||resource.triples.some(line=>typeof line!=='string'))throw Error('Invalid stored RDF statements');
        // Validate before serving HTTP200. Some upstream readers treat a later
        // parser exception as an absent index and would create a replacement.
        new Parser({baseIRI:url}).parse(resource.triples.join('\n'));
      }
      if (resource.kind === 'file') resource.bytes = Uint8Array.from(atob(resource.base64), c=>c.charCodeAt(0));
      delete resource.base64;
      return resource;
    },
    async set(url, value) {
      const resource = {...value};
      if (resource.kind === 'file') {
        // Chunked conversion avoids exceeding the argument stack for recipe images.
        let text = '';
        for (let i=0;i<resource.bytes.length;i+=8192) text+=String.fromCharCode(...resource.bytes.slice(i,i+8192));
        resource.base64=btoa(text); delete resource.bytes;
      }
      const existing = await locate(url);
      if(existing.duplicate)throw Error('Duplicate resource copies must be reconciled before editing');
      await client.storeObject('rdf-resource',existing.path,{...existing.record,url,resource});
    },
    async delete(url) {
      const existing=await locate(url);
      await client.remove(existing.path);
      if(existing.duplicate)await client.remove(existing.duplicate);
    },
    async urls() {
      const urls=[];
      for(const name of Object.keys(await client.getListing('_rs/resources/') || {}).filter(name=>!name.endsWith('/'))) {
        if(/^url-[0-9a-f]{64}$/.test(name)) {
          const record=await client.getObject('_rs/resources/'+name);
          if(!record || typeof record.url!=='string' || (await compactPath(record.url))!=='_rs/resources/'+name)throw Error('Invalid compact resource identity');
          urls.push(record.url);
        } else urls.push(decodeURIComponent(name));
      }
      return [...new Set(urls)];
    },
    async clear() {
      for (const url of await this.urls()) await this.delete(url);
    },
    exclusive(work) {
      const run=queue.then(()=>globalThis.navigator?.locks
        ? navigator.locks.request('rs-data-module:'+scope,work) : work());
      queue=run.catch(()=>undefined);
      return run;
    }
  };
}
