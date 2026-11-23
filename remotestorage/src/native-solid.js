// SPDX-License-Identifier: MIT
/** A module-owned view over native Solid documents. The caller supplies only
 * the authenticated fetch owned by the active rs.js Solid backend.
 */
export function nativeSolidView({fetch:authenticatedFetch,webId,root},helpers,domain,permission=()=>true) {
  const pod=new URL(root);
  if(!pod.pathname.endsWith('/') || pod.search || pod.hash || pod.username || pod.password ||
    !(pod.protocol==='https:' || pod.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(pod.hostname)))throw Error('Choose an HTTPS Solid Pod root (or localhost)');
  const profile=new URL(webId);profile.hash='';
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
    return globalThis.fetch(url.href,{method,credentials:'omit',headers:{Accept:new Headers(init?.headers).get('Accept')||'*/*'}});
  };
  const api={...helpers,nativeSolidDocuments:true,root:pod.href,webId,fetch:scoped};
  return Object.assign(api,domain(api));
}
