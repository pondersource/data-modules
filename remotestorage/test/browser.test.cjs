// SPDX-License-Identifier: MIT
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
test('browser bundle retains contacts, chats and bookmarks without external storage requests',async()=>{
  const browser=await chromium.launch();
  try {
    const page=await browser.newPage(),errors=[],requests=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('https://**',route=>{requests.push(route.request().url());route.abort();});
    await page.route('http://localhost/**',route=>route.fulfill({contentType:'text/html',body:'<main>remoteStorage domain test</main>'}));
    await page.goto('http://localhost/');
    await page.addScriptTag({path:require.resolve('../dist/domains.js')});
    const result=await page.evaluate(async()=>{
      const client=()=>{
        const data=new Map();return {declareType(){},getObject:async k=>structuredClone(data.get(k)),
          storeObject:async(t,k,v)=>data.set(k,structuredClone(v)),remove:async k=>data.delete(k),
          getAll:async(prefix='')=>Object.fromEntries([...data].filter(([key])=>key.startsWith(prefix)).map(([key,value])=>[key.slice(prefix.length),structuredClone(value)])),
          getListing:async(prefix='')=>Object.fromEntries([...data.keys()].filter(k=>k.startsWith(prefix)).map(k=>{
            const rest=k.slice(prefix.length),slash=rest.indexOf('/');return [slash<0?rest:rest.slice(0,slash+1),{}];
          }))};
      };
      const api=PonderSourceDomains.Contacts.builder(client()).exports;await api.initialize();
      const addressBookUri=await api.createAddressBook({containerUri:api.root+'books/',name:'Browser book',ownerWebId:api.webId});
      const contactUri=await api.createNewContact({addressBookUri,contact:{name:'Browser contact'}});
      const contact=await api.readContact(contactUri);
      const chats=PonderSourceDomains.Chats.builder(client()).exports;await chats.initialize();
      const chatUri=await chats.createChat({containerUri:chats.root+'chats/',name:'Browser chat'});
      await chats.postMessage({chatUri,authorWebId:chats.webId,text:'Hello browser'});
      const chat=await chats.readChat(chatUri);
      const bookmarks=PonderSourceDomains.Bookmarks.builder(client()).exports;await bookmarks.initialize();
      await bookmarks.solid.create({title:'Browser bookmark',link:'https://example.test/'});
      const saved=await bookmarks.solid.getAll();
      const ldo=chats.openChat(chats.root+'ldo/');
      try {
        await ldo.createChat({type:{'@id':'LongChat'},author:{'@id':chats.webId},created:new Date().toISOString(),title:'Native LDO'});
        await ldo.sendMessage('SDK message',chats.webId);
        await chats.postMessage({chatUri:chats.root+'ldo/index.ttl#this',authorWebId:chats.webId,text:'rdflib message'});
        const messages=(await ldo.getMessageIterator().next()).value;
        if(messages.length!==2)throw Error('LDO did not read both native message document formats');
      } finally {await ldo.destroy();}

      const calendar=PonderSourceDomains.Calendar.builder(client()).exports;
      const id=await calendar.create({uid:'browser-event',title:'Calendar',start:{value:'2026-11-24'},vendor:{keep:true}});
      const value=await calendar.get(id);
      const mapped=calendar.fromRDF(calendar.toRDF(value))[0];
      const converted=calendar.fromICalendar(calendar.toICalendar(calendar.fromAtomic(calendar.toAtomic(mapped,{id:'https://atomic.example/calendar/1'}))))[0];
      return {name:contact.name,messages:chat.latestMessages.length,bookmark:saved[0].title,calendar:calendar.toJSON(converted).vendor};
    });
    assert.deepEqual(result,{name:'Browser contact',messages:1,bookmark:'Browser bookmark',calendar:{keep:true}});
    assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  } finally {await browser.close();}
});
