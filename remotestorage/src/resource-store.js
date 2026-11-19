// SPDX-License-Identifier: MIT
/** RDF resources are retained losslessly inside the owning remoteStorage scope. */
export function createResourceStore(client, scope) {
  client.declareType('rdf-resource', {
    type:'object', required:['url','resource'],
    properties:{url:{type:'string'},resource:{type:'object',required:['kind','etag'],
      properties:{kind:{enum:['container','rdf','file']},etag:{type:'string'}}}}
  });
  const path = url => '_rs/resources/' + encodeURIComponent(url);
  let queue = Promise.resolve();
  return {
    async get(url) {
      const record = await client.getObject(path(url));
      if (!record) return undefined;
      const resource = {...record.resource};
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
      await client.storeObject('rdf-resource',path(url),{url,resource});
    },
    delete:url=>client.remove(path(url)),
    async urls() {
      return Object.keys(await client.getListing('_rs/resources/') || {}).filter(name=>!name.endsWith('/')).map(decodeURIComponent);
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
