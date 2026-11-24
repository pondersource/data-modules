
/** Module-owned CRUD on native Solid/LWS RDF documents. The caller supplies the
 * active backend's scoped fetch; codecs do not implement authentication. */
export function createCalendarRDF({fromRDF,toRDF,validateEvent},Parser) {
return function calendarRDF({fetch,root}) {
  const base=new URL(root);
  if(!base.pathname.endsWith('/')||base.search||base.hash||base.username||base.password||
    !(base.protocol==='https:'||base.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(base.hostname)))throw Error('Choose an HTTPS calendar root (or loopback HTTP)');
  const owned=value=>{
    const url=new URL(value,base);
    if(!url.href.startsWith(base.href)||url.username||url.password||url.search||/%(?:2f|5c)/i.test(url.pathname))throw Error('Calendar resource is outside the selected root');
    return url;
  };
  const read=async value=>{
    const id=owned(value),url=new URL(id);url.hash='';
    const response=await fetch(url.href,{headers:{Accept:'text/turtle, application/n-quads;q=0.9'}});
    if(!response.ok)throw Error('Calendar read failed: '+response.status);
    const events=fromRDF(await response.text(),{baseIRI:url.href});
    const event=id.hash?events.find(event=>event.sources.rdf.subject.value===id.href):events.length===1?events[0]:undefined;
    if(!event)throw Error('Select a specific event in this RDF document');
    return {event,events,url:url.href,etag:response.headers.get('ETag')};
  };
  const write=async(url,method,body,etag)=>{
    const response=await fetch(url,{method,headers:{'Content-Type':'application/n-quads',...(etag?{'If-Match':etag}:{'If-None-Match':'*'})},...(body===undefined?{}:{body})});
    if(!response.ok)throw Error(response.status===412?'Calendar changed; reload before retrying':'Calendar write failed: '+response.status);
  };
  return {
    async get(id) { return (await read(id)).event; },
    async getAll(container=base.href) {
      const url=owned(container);url.hash='';
      const response=await fetch(url.href,{headers:{Accept:'text/turtle'}});
      if(!response.ok)throw Error('Calendar listing failed: '+response.status);
      const children=new Parser({baseIRI:url.href}).parse(await response.text()).filter(q=>q.predicate.value==='http://www.w3.org/ns/ldp#contains'&&q.object.termType==='NamedNode');
      const result={};
      for(const child of children) {
        const target=owned(child.object.value);if(target.pathname.endsWith('/'))continue;
        const document=await fetch(target.href,{headers:{Accept:'text/turtle, application/n-quads;q=0.9'}});
        if(!document.ok)throw Error('Calendar read failed: '+document.status);
        for(const event of fromRDF(await document.text(),{baseIRI:target.href}))result[event.sources.rdf.subject.value]=event;
      }
      return result;
    },
    async create(event,id=new URL(crypto.randomUUID()+'.ttl#event',base).href) {
      const subject=owned(id);if(!subject.hash)subject.hash='event';
      const document=new URL(subject);document.hash='';
      await write(document.href,'PUT',toRDF(event,{id:subject.href}));return subject.href;
    },
    async update(id,changes) {
      const current=await read(id);
      if(!current.etag)throw Error('Calendar server did not provide an ETag; editing is blocked');
      const next=validateEvent({...current.event,...structuredClone(changes)});
      await write(current.url,'PUT',toRDF(next),current.etag);return next;
    },
    async delete(id) {
      const current=await read(id);
      if(!current.etag)throw Error('Calendar server did not provide an ETag; deleting is blocked');
      if(current.events.length!==1)throw Error('This document contains other events; deleting the document is blocked');
      await write(current.url,'DELETE',undefined,current.etag);
    }
  };
}

}
