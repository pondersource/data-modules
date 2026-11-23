// SPDX-License-Identifier: MIT
import {useOAuthHome} from './oauth-home.js';
import {publicRead} from './native-solid.js';
/** Shared widget lifecycle. Storage remains available only through the chosen rs.js module. */
export function connectApp(module, {RemoteStorage, Widget, apiKeys={}, element='storage-widget',widgetOptions={},nativeSolid=false}) {
  const rs=new RemoteStorage({modules:[module]});
  rs.access.claim(module.name,'rw');rs.caching.enable('/'+module.name+'/');
  rs.setApiKeys(Object.fromEntries(Object.entries(apiKeys).filter(([name])=>name!=='onedrive'||rs.onedrive)));
  const widget=new Widget(rs,{solidProviders:{allowAnyProvider:true},skipInitial:true,leaveOpen:true,...widgetOptions});
  const host=document.getElementById(element);
  Object.assign(host.style,{position:'fixed',bottom:'12px',left:'12px',zIndex:'1000'});
  widget.attach(element);
  const listeners=new Set();
  let preparing,activeApi,generation=0;
  const ready=new Promise(resolve=>rs.on('ready',()=>{useOAuthHome(rs);resolve();}));
  const prepare=()=>preparing ||= (async()=>{
    const current=generation,adapter=rs[module.name];
    adapter.configureSync(()=>rs.startSync());
    let api=adapter;
    if(rs.backend==='solid'&&nativeSolid) {
      const session=rs.solid.getSession();
      if(!session?.info?.webId)throw Error('The Solid session has no identity');
      api=adapter.nativeSolid({fetch:session.fetch.bind(session),webId:session.info.webId,root:rs.solid.getPodURL()});
    } else {
      await adapter.initialize();
      if(rs.backend==='solid') {
        const session=rs.solid.getSession();
        await adapter.migrateSolid(session.fetch.bind(session),session.info.webId,rs.solid.getPodURL()+module.name+'/_rs/');
      }
    }
    if(current!==generation)throw Error('The storage connection changed while it was opening');
    activeApi=api;
    const profile=api.webId.split('#')[0];
    return {webId:api.webId,name:rs.remote.userAddress||'My storage',cloaked:false,
      writableProfileUrl:profile.startsWith(api.root)?profile:undefined,storageUrls:[api.root],
      ...(api.nativeSolidDocuments?{}:{privateTypeIndexUrl:api.root+'settings/privateTypeIndex'})};
  })();
  rs.on('connected',()=>{
    const current=++generation;preparing=undefined;activeApi=undefined;
    prepare().then(user=>{if(current===generation)for(const listener of listeners)listener(user);}).catch(error=>{
    if(current!==generation)return;
    const message=document.createElement('p');message.setAttribute('role','alert');
    message.textContent='Storage could not be opened: '+error.message;
    document.getElementById(element).append(message);
  });});
  rs.on('disconnected',()=>{generation++;preparing=undefined;activeApi=undefined;for(const listener of listeners)listener(null);});
  return {
    rs,widget,get api(){return activeApi||rs[module.name];},ready,
    async restore(){await ready;return rs.connected?prepare():null;},
    onUser(listener){listeners.add(listener);return ()=>listeners.delete(listener);},
    open(){widget.open();widget.showChooseOrSignIn();},
    disconnect(){if(rs.connected)rs.disconnect();},
    fetch:(input,init)=>{
      const adapter=rs[module.name],api=activeApi||adapter;
      const url=new URL(input instanceof Request?input.url:String(input),api.root);
      if(url.href.startsWith(adapter.root))return adapter.fetch(input,init);
      if(api.nativeSolidDocuments)return api.fetch(input,init);
      return publicRead(input,init,api.root);
    }
  };
}
