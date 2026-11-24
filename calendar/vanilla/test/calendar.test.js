import {test} from 'node:test';
import assert from 'node:assert/strict';
import Ajv from 'ajv';
import ShExParser from '@shexjs/parser';
import {ShExValidator} from '@shexjs/validator';
import {ctor as rdfjs} from '@shexjs/neighborhood-rdfjs';
import {Parser,Store} from 'n3';
import {calendarSchema,calendarShape,atomicSchema,fromJSON,toJSON,fromICalendar,toICalendar,fromRDF,toRDF,fromAtomic,toAtomic,calendarModule,validateEvent} from '../src/index.js';
import {CAL,ICAL,ATOMIC} from '../src/schemas.js';
const event=()=>({uid:'meeting-42',title:'Café',start:{value:'2026-11-24T09:00:00',timezone:'Europe/Amsterdam'},end:{value:'2026-11-24T10:00:00',timezone:'Europe/Amsterdam'},recurrence:{rules:['FREQ=WEEKLY;COUNT=4'],excludedDates:[{value:'2026-12-01T09:00:00',timezone:'Europe/Amsterdam'}]}});
const schema=new Ajv({strict:false}).compile(calendarSchema);
const shape=ShExParser.construct(CAL).parse(calendarShape);
const conforms=text=>new ShExValidator(shape,rdfjs(new Store(new Parser().parse(text)))).validateShapeMap([{node:'urn:calendar:meeting-42',shape:CAL+'VEvent'}])[0].status;

test('JSON Schema and independent ShEx validator agree on generated timed and all-day events',()=>{
  for(const value of [event(),{uid:'meeting-42',start:{value:'2026-11-24'},end:{value:'2026-11-25'}}]) {
    assert.equal(schema(value),true,JSON.stringify(schema.errors));
    const rdf=toRDF(value);assert.equal(conforms(rdf),'conformant');
    const roundtrip=fromRDF(rdf)[0];assert.deepEqual(roundtrip.start,value.start);assert.deepEqual(roundtrip.end,value.end);
  }
  assert.equal(schema({uid:'missing-start'}),false);
  assert.equal(conforms('<urn:calendar:meeting-42> a <'+ICAL+'Vevent>; <'+ICAL+'uid> "meeting-42".'),'nonconformant');
});

test('iCalendar preserves VTIMEZONE, attendees, alarms, unknown parameters, siblings and recurrence exceptions',()=>{
  const source=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Upstream app//EN\r\nBEGIN:VTIMEZONE\r\nTZID:Europe/Amsterdam\r\nX-ORIGINAL:keep-zone\r\nEND:VTIMEZONE\r\nBEGIN:VEVENT\r\nUID:meeting-42\r\nDTSTAMP:20261101T000000Z\r\nDTSTART;TZID=Europe/Amsterdam:20261124T090000\r\nDTEND;TZID=Europe/Amsterdam:20261124T100000\r\nSUMMARY:Café\r\nRRULE:FREQ=WEEKLY;COUNT=4\r\nEXDATE;TZID=Europe/Amsterdam:20261201T090000,20261208T090000\r\nATTENDEE;CN=Ada;X-ROLE=keep:mailto:ada@example.test\r\nX-UPSTREAM;X-PARAM=custom:opaque\r\nBEGIN:VALARM\r\nACTION:DISPLAY\r\nTRIGGER:-PT15M\r\nDESCRIPTION:Alarm\r\nEND:VALARM\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:meeting-42\r\nDTSTART;TZID=Europe/Amsterdam:20261215T110000\r\nRECURRENCE-ID;TZID=Europe/Amsterdam:20261215T090000\r\nSUMMARY:Exception\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
  const parsed=fromICalendar(source);assert.equal(parsed.length,2);assert.deepEqual(parsed[0].start,event().start);
  assert.equal(parsed[0].sources.icalendar.text,source);
  assert.equal(parsed[0].recurrence.excludedDates.length,2);
  assert.equal(parsed[1].recurrenceId.value,'2026-12-15T09:00:00');
  // Cross every representation; no backend may discard the original opaque fields.
  let value=fromRDF(toRDF(parsed[0]))[0];
  value=fromAtomic(toAtomic(value,{id:'https://atomic.example/events/42'}));
  value=fromJSON(toJSON(value));value.title='Changed title';
  const result=toICalendar(value);
  for(const text of ['X-ORIGINAL:keep-zone','X-ROLE=keep','X-UPSTREAM;X-PARAM=custom:opaque','BEGIN:VALARM','SUMMARY:Exception'])assert.ok(result.includes(text),text);
  assert.equal(fromICalendar(result)[0].title,'Changed title');
  assert.equal(fromICalendar(result)[0].recurrence.excludedDates.length,2);
});

test('all-day exclusive ends, UTC, floating times and numeric offsets retain their meaning',()=>{
  for(const start of [{value:'2028-02-29'},{value:'2026-11-24T09:00:00Z'},{value:'2026-11-24T09:00:00'}]) {
    const value={uid:'dates',start};assert.deepEqual(fromICalendar(toICalendar(value))[0].start,start);
  }
  const offset={uid:'offset',start:{value:'2026-11-24T09:00:00+02:00'}};
  assert.equal(Date.parse(fromICalendar(toICalendar(offset))[0].start.value),Date.parse(offset.start.value));
  assert.throws(()=>validateEvent({uid:'x',start:{value:'2026-02-29'}}),/Invalid calendar date/);
  assert.throws(()=>validateEvent({uid:'x',start:{value:'2026-11-24T29:00:00'}}),/Invalid calendar time/);
  assert.throws(()=>validateEvent({uid:'x',start:{value:'2026-11-24',timezone:'Europe/Amsterdam'}}),/timezone/);
});

test('JSON vendor fields survive RDF and Atomic round trips; envelopes do not nest on repeated conversion',()=>{
  const original={...event(),vendor:{unknown:['keep',{nested:true}]}};
  let value=fromJSON(original),first;
  for(let index=0;index<8;index++) {
    value=fromRDF(toRDF(value))[0];value=fromAtomic(toAtomic(value,{id:'https://atomic.example/events/42'}));
    const json=toJSON(value);assert.deepEqual(json.vendor,original.vendor);
    if(index===2)first=JSON.stringify(json).length;
    if(index>2)assert.equal(JSON.stringify(json).length,first);
    value=fromJSON(json);
  }
});

test('RDF edits preserve blank-node subgraphs, language variants, unknown predicates and other graphs',()=>{
  const source=`@prefix i:<${ICAL}>. @prefix s:<https://schema.org/>.
    <https://pod.example/event> a s:Event;s:identifier "meeting-42";s:name "Hello"@en,"Hallo"@nl;
      s:startDate "2026-11-24T09:00:00Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;
      s:location [s:name "Room";<https://unknown.example/key> "keep"].
    <https://graph.example/g> { <https://pod.example/event> s:name "Other graph". }`;
  const parsed=fromRDF(source)[0];assert.equal(parsed.title,'Hello');parsed.title='Changed';
  const result=toRDF(fromJSON(toJSON(fromAtomic(toAtomic(parsed,{id:'https://atomic.example/event'})))));
  assert.match(result,/"Changed"@en/);assert.match(result,/"Hallo"@nl/);assert.match(result,/"keep"/);assert.match(result,/"Other graph" <https:\/\/graph.example\/g>/);
  assert.equal(fromRDF(result)[0].title,'Changed');
});

test('Atomic schema uses native Classes, Properties and datatypes; resource extensions and classes survive',()=>{
  const definitions=new Map(atomicSchema.map(resource=>[resource['@id'],resource]));
  assert.deepEqual(definitions.get(CAL+'Event')[ATOMIC+'properties/requires'],[CAL+'uid',CAL+'start']);
  assert.equal(definitions.get(CAL+'recurrence')[ATOMIC+'properties/datatype'],ATOMIC+'datatypes/json');
  const native=toAtomic(event(),{id:'https://atomic.example/42'});
  native['https://vendor.example/unknown']={nested:true};native[ATOMIC+'properties/isA'].push('https://vendor.example/CustomEvent');
  const value=fromICalendar(toICalendar(fromRDF(toRDF(fromAtomic(native)))[0]))[0];
  const restored=toAtomic(value);
  assert.deepEqual(restored['https://vendor.example/unknown'],{nested:true});
  assert.ok(restored[ATOMIC+'properties/isA'].includes('https://vendor.example/CustomEvent'));
  assert.equal(restored['@id'],native['@id']);assert.deepEqual(fromAtomic(restored).start,event().start);
});

test('calendar scope CRUD survives module reconstruction and preserves upstream JSON extensions',async()=>{
  const records=new Map(),declared=[];
  const client={declareType(type,schema){declared.push([type,schema]);},async getObject(path){return structuredClone(records.get(path));},async storeObject(_type,path,value){records.set(path,structuredClone(value));},async remove(path){records.delete(path);},async getAll(prefix){return Object.fromEntries([...records].filter(([key])=>key.startsWith(prefix)).map(([key,value])=>[key.slice(prefix.length),structuredClone(value)]));}};
  const api=calendarModule(client),id=await api.create({...event(),vendor:{keep:true}},'native/42');
  await assert.rejects(api.create(event(),id),/already exists/);
  const fresh=calendarModule(client);await fresh.update(id,{title:'Edited'});
  assert.deepEqual((await fresh.get(id)).vendor,{keep:true});assert.equal((await fresh.getAll())[id].title,'Edited');
  assert.equal(declared[0][1],calendarSchema);await fresh.delete(id);assert.equal(await fresh.get(id),undefined);
});

test('duration survives conversions and removed known JSON fields do not reappear from source snapshots',()=>{
 const original=fromJSON({uid:'duration',title:'Remove me',start:{value:'2026-11-24T09:00:00Z'},duration:'PT90M',vendor:'keep'});
 delete original.title;
 let value=fromICalendar(toICalendar(fromAtomic(toAtomic(fromRDF(toRDF(original))[0],{id:'https://atomic.example/duration'}))))[0];
 assert.equal(value.duration,'PT90M');
 const result=toJSON(value);assert.equal(result.title,undefined);assert.equal(result.vendor,'keep');
 assert.throws(()=>validateEvent({...original,end:{value:'2026-11-24T10:00:00Z'}}),/either end or duration/);
});

test('native RDF CRUD uses original documents and ETags, retaining unknown triples and refusing stale or foreign writes',async()=>{
 const {calendarRDF}=await import('../src/rdf.js');
 const documents=new Map(),calls=[];let revision=0,forceStale=false;
 const fetch=async(url,options={})=>{
   calls.push({url,...options});const current=documents.get(url);
   if(!options.method)return current?new Response(current.body,{headers:{ETag:current.etag}}):new Response(null,{status:404});
   if(options.headers['If-None-Match']==='*'&&current)return new Response(null,{status:412});
   if(options.headers['If-Match']&&(forceStale||options.headers['If-Match']!==current?.etag))return new Response(null,{status:412});
   if(options.method==='DELETE')documents.delete(url);else documents.set(url,{body:options.body,etag:'"'+(++revision)+'"'});
   return new Response(null,{status:204});
 };
 const api=calendarRDF({fetch,root:'https://pod.example/calendar/'}),id=await api.create(event(),'https://pod.example/calendar/one.ttl#event');
 documents.get(id.split('#')[0]).body+='\n<https://pod.example/calendar/one.ttl#event> <https://vendor.example/opaque> "keep" .';
 await assert.rejects(api.create(event(),id),/changed/);
 await api.update(id,{title:'Updated'});assert.equal((await api.get(id)).title,'Updated');
 assert.match(documents.get(id.split('#')[0]).body,/"keep"/);
 assert.equal(calls.find(call=>call.method==='PUT'&&call.headers['If-Match']).headers['If-Match'],'"1"');
 forceStale=true;await assert.rejects(api.update(id,{title:'Stale'}),/changed/);forceStale=false;
 await assert.rejects(api.create(event(),'https://foreign.example/event'),/outside/);
 await api.delete(id);assert.equal(documents.size,0);
});

test('legacy HTTP schema.org Event vocabulary keeps its original IRIs',()=>{
 const text='<https://pod.example/event> a <http://schema.org/Event>; <http://schema.org/name> "Legacy"; <http://schema.org/startDate> "2026-11-24"^^<http://www.w3.org/2001/XMLSchema#date>.';
 const value=fromRDF(text)[0];assert.equal(value.title,'Legacy');value.title='Edited legacy';
 const result=toRDF(value);assert.match(result,/<http:\/\/schema.org\/name> "Edited legacy"/);assert.equal(fromRDF(result)[0].uid,'https://pod.example/event');
});

test('deleting a native event never deletes independent RDF resources, graphs or orphan blank nodes',async()=>{
 const {calendarRDF}=await import('../src/rdf.js');
 const id='https://pod.example/calendar/shared.ttl#event';
 const base=toRDF({uid:'delete',start:{value:'2026-11-24'}},{id});
 for(const extra of [
   '<https://pod.example/profile> <https://vendor.example/name> "Keep this profile" .',
   '<https://pod.example/calendar/shared.ttl#event> <https://vendor.example/key> "Other graph" <https://graph.example/g> .',
   '_:unrelated <https://vendor.example/key> "Orphan record" .'
 ]) {
   const calls=[];
   const fetch=async(_url,options={})=>{calls.push(options.method||'GET');return new Response(base+'\n'+extra,{headers:{ETag:'"v1"'}});};
   const api=calendarRDF({fetch,root:'https://pod.example/calendar/'});
   await assert.rejects(api.delete(id),/contains other/);
   assert.deepEqual(calls,['GET']);
 }
 const calls=[];
 const fetch=async(_url,options={})=>{calls.push(options.method||'GET');return options.method?new Response(null,{status:204}):new Response(base+'\n<'+id+'> <https://vendor.example/field> _:value .\n_:value <https://vendor.example/text> "Owned field" .',{headers:{ETag:'"v1"'}});};
 await calendarRDF({fetch,root:'https://pod.example/calendar/'}).delete(id);
 assert.deepEqual(calls,['GET','DELETE']);
});

test('unknown nested temporal and recurrence fields survive format round trips without reviving removed known fields',()=>{
 const original={...event(),start:{...event().start,vendor:{precision:'original'}},recurrence:{...event().recurrence,vendor:{keep:true},excludedDates:[{...event().recurrence.excludedDates[0],vendor:'date-extension'}]}};
 assert.equal(schema(original),true,JSON.stringify(schema.errors));
 let value=fromICalendar(toICalendar(fromAtomic(toAtomic(fromRDF(toRDF(fromJSON(original)))[0],{id:'https://atomic.example/nested'}))))[0];
 const result=toJSON(value);
 assert.deepEqual(result.start.vendor,original.start.vendor);assert.deepEqual(result.recurrence.vendor,{keep:true});assert.equal(result.recurrence.excludedDates[0].vendor,'date-extension');
 delete value.start.timezone;value.start.value+='Z';
 assert.equal(toJSON(value).start.timezone,undefined);
 const atomic=toAtomic(event(),{id:'https://atomic.example/nested'});atomic[CAL+'recurrence'].vendor='atomic-extension';
 value=fromICalendar(toICalendar(fromAtomic(atomic)))[0];assert.equal(toAtomic(value)[CAL+'recurrence'].vendor,'atomic-extension');
});
