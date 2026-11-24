// SPDX-License-Identifier: MIT
import {openScopedChat} from './chats-ldo.js';
import { dataModule } from './index.js';
import LegacyBookmarksImport from 'remotestorage-module-bookmarks';
import {parseVCard,parseICalendarTasks} from './text-formats.js';
export {parseVCard,parseICalendarTasks};
export {connectApp} from './connection.js';
export {Calendar} from './index.js';
const LegacyBookmarks=LegacyBookmarksImport.default || LegacyBookmarksImport;
import { Fetcher, graph, UpdateManager, sym, Namespace } from 'rdflib';
import { ContactsModuleRdfLib } from '../../contacts/src/rdflib/ContactsModuleRdfLib.js';
import { ChatsModuleRdfLib } from '../../chats/rdflib/src/module/ChatsModuleRdfLib.js';
import * as tasks from '../../tasks/vanilla/src/main.js';
export const focusSchemas=tasks.focusSchemas;
import { BookmarksModuleRdfLib } from '../../bookmarks/rdflib/src/module/BookmarksModuleRdfLib.js';
import { Bookmark } from '../../bookmarks/vanilla/src/modules/Bookmark';

/** Reuse each Solid module's domain operations with a fetch owned by its rs scope. */
function rdfDomain(api, Class, methods) {
  const store=graph();
  const fetcher=new Fetcher(store,{fetch:api.fetch});
  const updater=new UpdateManager(store);
  const instance=new Class({store,fetcher,updater});
  return Object.fromEntries(methods.map(key=>[key,instance[key].bind(instance)]));
}

export const Contacts=dataModule('contacts',['http://www.w3.org/2006/vcard/ns#AddressBook'],{parseVCard},api=>rdfDomain(api,ContactsModuleRdfLib,[
  'listAddressBooks','createAddressBook','readAddressBook','createNewContact','readContact','renameContact',
  'createNewGroup','readGroup','addContactToGroup','removeContactFromGroup','addNewPhoneNumber','addNewEmailAddress',
  'removePhoneNumber','updatePhoneNumber','updateEmailAddress','removeEmailAddress'
]));
export const Chats=dataModule('chats',['http://www.w3.org/ns/pim/meeting#LongChat'],{},api=>({
  ...rdfDomain(api,ChatsModuleRdfLib,['createChat','readChat','postMessage']),
  openChat:container=>openScopedChat(api,container)
}));
export const Tasks=dataModule('tasks',[
  'http://www.w3.org/2005/01/wf/flow#Tracker','https://schema.org/Action','http://www.w3.org/2002/12/cal/ical#Vtodo'
],{parseICalendarTasks},api=>({
  focusSchemas:tasks.focusSchemas,
  openFocus:models=>tasks.openFocus(api.fetch,models),
  readFocusDocument:url=>tasks.readFocusDocument(url,api.fetch),
  parseSchemaTasks:tasks.parseSchemaTasks,
  fetchTracker:uri=>tasks.fetchTracker(uri,api.fetch),
  fetchContainer:uri=>tasks.fetchContainer(uri,api.fetch),
  fetchContainerAndTracker:uri=>tasks.fetchContainerAndTracker(uri,api.fetch),
  addIssue:(state,issue)=>tasks.addIssue(state,issue,api.fetch),
  addComment:(state,comment)=>tasks.addComment(state,comment,api.fetch),
}));

const SolidBookmarks=dataModule('bookmarks',[
  'http://www.w3.org/2002/01/bookmark#Bookmark','https://www.w3.org/ns/activitystreams#Note'
],{},api=>({rdf:rdfDomain(api,BookmarksModuleRdfLib,['listBookmarks','discoverStorage','createBookmark','updateBookmark','deleteBookmark']),solid:{
  getAllBookmarkDocUrls:(webId=api.webId,defaultDocument=api.root+'bookmarks.ttl')=>Bookmark.getAllBookmarkDocUrls(api.fetch,webId,defaultDocument),
  getAll:(webId=api.webId,defaultDocument=api.root+'bookmarks.ttl')=>Bookmark.getAll(api.fetch,webId,defaultDocument),
  get:url=>Bookmark.get(url,api.fetch),
  create:(bookmark,webId=api.webId,defaultDocument=api.root+'bookmarks.ttl')=>Bookmark.create(bookmark,api.fetch,webId,defaultDocument),
  update:(url,bookmark)=>Bookmark.update(url,bookmark,api.fetch),
  delete:url=>Bookmark.delete(url,api.fetch),
  remove:url=>Bookmark.delete(url,api.fetch)
}}));

/** Preserve the exact Webmarks archive paths, MD5 identities and JSON schema,
 * while exposing Solid's RDF operations under the same owning scope. */
export const Bookmarks={name:'bookmarks',builder(privateClient,publicClient){
  const legacy=LegacyBookmarks.builder(privateClient,publicClient).exports;
  const {client,...domain}=legacy;
  const api=SolidBookmarks.builder(privateClient,publicClient).exports;
  for(const [key,value] of Object.entries(domain))if(!(key in api))api[key]=value;
  return {exports:api};
}};

export const Profile=dataModule('profile',['http://xmlns.com/foaf/0.1/Person'],{},api=>({
  async getName(webId=api.webId) {
    const store=graph();const fetcher=new Fetcher(store,{fetch:api.fetch});await fetcher.load(webId.split('#')[0]);
    // Same FOAF-first, VCARD-fallback behavior as profile/rdflib.
    return (store.any(sym(webId),Namespace('http://xmlns.com/foaf/0.1/')('name')) ||
      store.any(sym(webId),Namespace('http://www.w3.org/2006/vcard/ns#')('fn')))?.value;
  }
}));
