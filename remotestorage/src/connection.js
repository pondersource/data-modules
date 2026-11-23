// SPDX-License-Identifier: MIT
import {useOAuthHome} from './oauth-home.js';
/** Shared widget lifecycle. Storage remains available only through the chosen rs.js module. */
export function connectApp(module, {RemoteStorage, Widget, apiKeys, element='storage-widget'}) {
  const rs=new RemoteStorage({modules:[module]});
  rs.access.claim(module.name,'rw');rs.caching.enable('/'+module.name+'/');
  rs.setApiKeys(Object.fromEntries(Object.entries(apiKeys).filter(([name])=>name!=='onedrive'||rs.onedrive)));
  const widget=new Widget(rs,{solidProviders:{allowAnyProvider:true},skipInitial:true,leaveOpen:true});
  const host=document.getElementById(element);
  Object.assign(host.style,{position:'fixed',bottom:'12px',left:'12px',zIndex:'1000'});
  widget.attach(element);
  const listeners=new Set();
  let preparing;
  const ready=new Promise(resolve=>rs.on('ready',()=>{useOAuthHome(rs);resolve();}));
  const prepare=()=>preparing ||= (async()=>{
    const api=rs[module.name];
    api.configureSync(()=>rs.startSync());
    await api.initialize();
    if(rs.backend==='solid') {
      const session=rs.solid.getSession();
      await api.migrateSolid(session.fetch.bind(session),session.info.webId,rs.solid.getPodURL()+module.name+'/_rs/');
    }
    return {webId:api.webId,name:rs.remote.userAddress||'My storage',cloaked:false,
      writableProfileUrl:api.webId.split('#')[0],storageUrls:[api.root],
      privateTypeIndexUrl:api.root+'settings/privateTypeIndex'};
  })();
  rs.on('connected',()=>{prepare().then(user=>{for(const listener of listeners)listener(user);}).catch(error=>{
    const message=document.createElement('p');message.setAttribute('role','alert');
    message.textContent='Storage could not be opened: '+error.message;
    document.getElementById(element).append(message);
  });});
  rs.on('disconnected',()=>{preparing=undefined;for(const listener of listeners)listener(null);});
  return {
    rs,widget,api:rs[module.name],ready,
    async restore(){await ready;return rs.connected?prepare():null;},
    onUser(listener){listeners.add(listener);return ()=>listeners.delete(listener);},
    open(){widget.open();widget.showChooseOrSignIn();},
    disconnect(){if(rs.connected)rs.disconnect();},
    fetch:(input,init)=>{
      const url=String(input instanceof Request?input.url:input);
      if(url.startsWith(rs[module.name].root))return rs[module.name].fetch(input,init);
      const method=(init?.method||(input instanceof Request?input.method:'GET')).toUpperCase();
      if(!['GET','HEAD'].includes(method))return Promise.resolve(new Response(null,{status:403}));
      return globalThis.fetch(url,{...init,method,credentials:'omit',headers:{Accept:new Headers(init?.headers).get('Accept')||'*/*'}});
    }
  };
}
