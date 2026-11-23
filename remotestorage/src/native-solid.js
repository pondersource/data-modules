// SPDX-License-Identifier: MIT
/** A module-owned view over native Solid documents. The caller supplies only
 * the authenticated fetch owned by the active rs.js Solid backend.
 */
export function nativeSolidView({fetch:authenticatedFetch,webId,root,adapter},helpers,domain,permission=()=>true) {
  const pod=new URL(root);
  if(!pod.pathname.endsWith('/') || pod.search || pod.hash || pod.username || pod.password ||
    !(pod.protocol==='https:' || pod.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(pod.hostname)))throw Error('Choose an HTTPS Solid Pod root (or localhost)');
  if(typeof authenticatedFetch!=='function')throw Error('A Solid session fetch is required');
  const profile=new URL(webId);profile.hash='';
  if(profile.username||profile.password||!['https:','http:'].includes(profile.protocol))throw Error('Unsupported Solid identity URL');
  const scoped=async(input,init)=>{
    const url=new URL(input instanceof Request?input.url:String(input),pod);
    if(url.username||url.password||/%(?:2f|5c)/i.test(url.pathname)||!['https:','http:'].includes(url.protocol))throw Error('Unsupported Solid document URL');
    const method=(init?.method||(input instanceof Request?input.method:'GET')).toUpperCase();
    const own=url.href.startsWith(pod.href),read=['GET','HEAD'].includes(method);
    if(!permission(read?'r':'rw'))return new Response(null,{status:403});
    if(!own&&!read)return new Response(null,{status:403});
    if(own || url.href.split('#')[0]===profile.href) return authenticatedFetch(input instanceof Request?input:url.href,init);
    // Foreign vocabularies, public profiles and linked resources are read
    // without this Pod's authorization headers, cookies or DPoP material.
    return publicRead(input,init,pod);
  };
  const api={...helpers,nativeSolidDocuments:true,root:pod.href,webId,fetch:scoped};
  if(adapter)Object.defineProperty(api,'adapter',{value:adapter,enumerable:true});
  return Object.assign(api,domain(api));
}

/** Preserve effective Request headers and cancellation without forwarding credentials. */
export function publicRead(input,init,base) {
  const request=new Request(input instanceof Request?input:new URL(String(input),base),init);
  if(!['GET','HEAD'].includes(request.method))return Promise.resolve(new Response(null,{status:403}));
  return globalThis.fetch(request.url,{method:request.method,credentials:'omit',signal:request.signal,
    headers:{Accept:request.headers.get('Accept')||'*/*'}});
}
