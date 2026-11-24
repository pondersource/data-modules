import {CAL,ICAL,SCHEMA,ATOMIC,SOURCE_KEY,fieldMappings,calendarSchema,calendarShape,atomicSchema} from './schemas.js';

export function createCalendarCodecs(ICALJS,{Parser,Writer,DataFactory}) {
const {namedNode,literal,quad,defaultGraph,blankNode} = DataFactory;
const XSD='http://www.w3.org/2001/XMLSchema#';
const TYPE='http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const META='x-pondersource-calendar-sources';
const timed = name => ['start','end','recurrenceId'].includes(name);
const clone = value => structuredClone(value);
function preserveFields(original,current,known) {
  if(current===undefined)return undefined;
  const extra=clone(original||{});
  for(const name of known)delete extra[name];
  return {...extra,...clone(current)};
}
function preserveRecurrence(original,current) {
  const result=preserveFields(original,current,['rules','dates','excludedDates']);
  if(!result)return result;
  for(const name of ['dates','excludedDates'])if(current[name])result[name]=current[name].map(time=>{
    const before=original?.[name]?.find(candidate=>candidate.value===time.value&&candidate.timezone===time.timezone);
    return preserveFields(before,time,['value','timezone']);
  });
  return result;
}
const sourcesOf = value => {
  if(value===undefined)return {};
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid calendar source envelope');
  return clone(value);
};

/** Validate semantic dates without converting floating times or all-day dates to UTC. */
function validateEvent(event) {
  if(!event||typeof event.uid!=='string'||!event.uid||!event.start)throw Error('A calendar event needs a UID and start');
  for(const field of ['title','description','location'])if(event[field]!==undefined&&typeof event[field]!=='string')throw Error('Invalid '+field);
  for(const value of [event.start,event.end,event.recurrenceId,...(event.recurrence?.dates||[]),...(event.recurrence?.excludedDates||[])].filter(Boolean)) {
    if(typeof value.value!=='string'||!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?)?$/.test(value.value))throw Error('Invalid calendar date');
    const [year,month,day]=value.value.slice(0,10).split('-').map(Number);
    const leap=year%4===0&&(year%100!==0||year%400===0);
    if(month<1||month>12||day<1||day>[31,leap?29:28,31,30,31,30,31,31,30,31,30,31][month-1])throw Error('Invalid calendar date');
    if(value.value.includes('T')&&(+value.value.slice(11,13)>23||+value.value.slice(14,16)>59||+value.value.slice(17,19)>59))throw Error('Invalid calendar time');
    if(value.timezone!==undefined&&(typeof value.timezone!=='string'||!value.timezone||!value.value.includes('T')||/[Z+-]/.test(value.value.slice(19))))throw Error('A timezone requires a floating local date-time');
  }
  if(event.end&&(event.end.value.length===10)!==(event.start.value.length===10))throw Error('Start and end must both be dates or both date-times');
  if(event.duration!==undefined) {
    if(event.end)throw Error('Use either end or duration, not both');
    if(typeof event.duration!=='string')throw Error('Invalid duration');
    ICALJS.Duration.fromString(event.duration);
  }
  if(event.recurrence?.rules)for(const rule of event.recurrence.rules)ICALJS.Recur.fromString(rule);
  return event;
}

function fromJSON(document) {
  const value=typeof document==='string'?JSON.parse(document):clone(document);
  const sources=sourcesOf(value.sources);delete value.sources;
  return validateEvent({...value,sources:{...sources,json:value}});
}
function toJSON(event) {
  validateEvent(event);
  const original=clone(event.sources?.json||{});
  for(const name of [...fieldMappings.map(field=>field.field),'recurrence'])delete original[name];
  const result={...original,...clone(event)};
  for(const field of ['start','end','recurrenceId'])if(event[field]!==undefined)result[field]=preserveFields(event.sources?.json?.[field],event[field],['value','timezone']);
  if(event.recurrence!==undefined)result.recurrence=preserveRecurrence(event.sources?.json?.recurrence,event.recurrence);
  return result;
}

function timeFromProperty(property) {
  if(!property)return undefined;
  const time=property.getFirstValue();
  return {value:time.toString(),...(property.getParameter('tzid')?{timezone:property.getParameter('tzid')}:{})};
}
function writeTime(component,name,value,parameters={}) {
  const property=new ICALJS.Property(name);
  // RFC5545 has UTC and local times, but no numeric offset date-times.
  const text=/[+-]\d{2}:\d{2}$/.test(value.value)?new Date(value.value).toISOString().slice(0,19)+'Z':value.value;
  property.setValue(ICALJS.Time.fromString(text));
  for(const [key,item] of Object.entries(parameters))if(!['tzid','value'].includes(key))property.setParameter(key,item);
  if(value.timezone)property.setParameter('tzid',value.timezone);
  component.addProperty(property);
}
function fromICalendar(text) {
  const calendar=new ICALJS.Component(ICALJS.parse(text));
  if(calendar.name!=='vcalendar')throw Error('Expected a VCALENDAR document');
  const events=calendar.getAllSubcomponents('vevent');
  const envelopes=events.map(event=>{
    const raw=event.getFirstPropertyValue(META);event.removeAllProperties(META);
    return raw?sourcesOf(JSON.parse(raw)):{};
  });
  const source=events.some((_event,index)=>Object.keys(envelopes[index]).length)?calendar.toString():text;
  return events.map((component,index)=>{
    const result={};
    for(const field of fieldMappings) {
      const value=timed(field.field)?timeFromProperty(component.getFirstProperty(field.ical)):component.getFirstPropertyValue(field.ical);
      if(value!==null&&value!==undefined)result[field.field]=field.field==='duration'?value.toString():value;
    }
    // Keep the original DURATION. Exposing an invented DTEND would change its representation.
    const rules=component.getAllProperties('rrule').map(property=>property.getFirstValue().toString());
    const dates=name=>component.getAllProperties(name).flatMap(property=>property.getValues().map(time=>({value:time.toString(),...(property.getParameter('tzid')?{timezone:property.getParameter('tzid')}:{})})));
    result.recurrence={rules,dates:dates('rdate'),excludedDates:dates('exdate')};
    result.sources={...envelopes[index],icalendar:{text:source,index}};
    return validateEvent(result);
  });
}
function toICalendar(event) {
  validateEvent(event);
  const source=event.sources?.icalendar;
  const calendar=source?new ICALJS.Component(ICALJS.parse(source.text)):new ICALJS.Component('vcalendar');
  if(!source){calendar.addPropertyWithValue('version','2.0');calendar.addPropertyWithValue('prodid','-//Ponder Source//Calendar module//EN');}
  const component=source?calendar.getAllSubcomponents('vevent')[source.index]:new ICALJS.Component('vevent');
  if(!component)throw Error('Calendar source event is missing');
  if(!source){calendar.addSubcomponent(component);component.addPropertyWithValue('dtstamp',ICALJS.Time.fromJSDate(new Date(),true));}
  for(const field of fieldMappings) {
    const parameters=clone(component.getFirstProperty(field.ical)?.toJSON()[1]||{});
    component.removeAllProperties(field.ical);
    if(event[field.field]===undefined)continue;
    if(timed(field.field))writeTime(component,field.ical,event[field.field],parameters);
    else {
      const property=new ICALJS.Property(field.ical);property.setValue(field.field==='duration'?ICALJS.Duration.fromString(event[field.field]):event[field.field]);
      for(const [key,item] of Object.entries(parameters))property.setParameter(key,item);
      component.addProperty(property);
    }
  }
  if(event.end)component.removeAllProperties('duration');
  const before=source?fromICalendar(source.text)[source.index].recurrence:undefined;
  if(!source||JSON.stringify(before)!==JSON.stringify(event.recurrence)) {
    for(const key of ['rrule','rdate','exdate'])component.removeAllProperties(key);
    for(const rule of event.recurrence?.rules||[])component.addPropertyWithValue('rrule',ICALJS.Recur.fromString(rule));
    for(const [key,name] of [['dates','rdate'],['excludedDates','exdate']])for(const time of event.recurrence?.[key]||[])writeTime(component,name,time);
  }
  component.removeAllProperties(META);component.addPropertyWithValue(META,JSON.stringify(event.sources||{}));
  return calendar.toString();
}

const nquads = quads => new Writer({format:'N-Quads'}).quadsToString(quads);
const parse = (text,baseIRI) => new Parser({baseIRI,blankNodePrefix:''}).parse(text);
const termKey = term => term.termType+':'+term.value;
const storedTerm = term => ({type:term.termType,value:term.value});
const restoreTerm = term => term.type==='BlankNode'?blankNode(term.value):term.type==='DefaultGraph'?defaultGraph():namedNode(term.value);

/** Open shapes: retain all source quads, including named graphs and unknown predicates. */
function fromRDF(text,{baseIRI}={}) {
  const quads=parse(text,baseIRI),groups=new Map();
  for(const statement of quads)if(statement.predicate.value===TYPE&&[ICAL+'Vevent',SCHEMA+'Event','http://schema.org/Event'].includes(statement.object.value)) {
    const key=termKey(statement.subject)+'|'+termKey(statement.graph);
    if(!groups.has(key))groups.set(key,{subject:statement.subject,graph:statement.graph,vocabulary:statement.object.value===ICAL+'Vevent'?'rdf':statement.object.value===SCHEMA+'Event'?'schema':'schemaHttp'});
  }
  return [...groups.values()].map(({subject,graph,vocabulary})=>{
    const own=quads.filter(q=>q.subject.equals(subject)&&q.graph.equals(graph));
    const envelope=own.find(q=>q.predicate.value===SOURCE_KEY&&q.object.termType==='Literal');
    const sources=envelope?sourcesOf(JSON.parse(envelope.object.value)):{};
    const result={};
    const selected={};
    for(const field of fieldMappings) {
      const statement=own.find(q=>q.predicate.value===field[vocabulary]&&q.object.termType==='Literal');
      if(!statement)continue;
      selected[field.field]=own.filter(q=>q.predicate.value===field[vocabulary]).indexOf(statement);
      if(timed(field.field)) {
        const timezone=own.find(q=>q.predicate.value===CAL+field.field+'Timezone')?.object.value;
        result[field.field]={value:statement.object.value,...(timezone?{timezone}:{})};
      } else result[field.field]=statement.object.value;
    }
    result.uid ||= subject.termType==='NamedNode'?subject.value:undefined;
    const recurrence=own.find(q=>q.predicate.value===CAL+'recurrence');
    if(recurrence)result.recurrence=JSON.parse(recurrence.object.value);
    else {
      const rules=own.filter(q=>q.predicate.value===ICAL+'rrule'&&q.object.termType==='Literal').map(q=>q.object.value);
      if(rules.length)result.recurrence={rules};
    }
    const clean=quads.filter(q=>q.predicate.value!==SOURCE_KEY);
    result.sources={...sources,rdf:{text:nquads(clean),subject:storedTerm(subject),graph:storedTerm(graph),vocabulary,selected}};
    return validateEvent(result);
  });
}
function toRDF(event,{id}={}) {
  validateEvent(event);
  const source=event.sources?.rdf;
  const subject=source?restoreTerm(source.subject):namedNode(id||'urn:calendar:'+encodeURIComponent(event.uid)+(event.recurrenceId?':'+encodeURIComponent(event.recurrenceId.value):''));
  const graph=source?restoreTerm(source.graph):defaultGraph();
  const vocabulary=source?.vocabulary||'rdf';
  let quads=source?parse(source.text):[quad(subject,namedNode(TYPE),namedNode(ICAL+'Vevent'),graph)];
  const own=q=>q.subject.equals(subject)&&q.graph.equals(graph);
  for(const field of fieldMappings) {
    const predicate=field[vocabulary],existing=quads.filter(q=>own(q)&&q.predicate.value===predicate);
    const selected=existing[source?.selected?.[field.field]??0];
    if(selected?.object.termType==='Literal'&&event[field.field]===undefined)quads=quads.filter(q=>q!==selected);
    // A structured schema:Place or complex date remains opaque unless explicitly replaced.
    else if(selected?.object.termType!=='Literal'&&existing.length&&event[field.field]!==undefined)throw Error('Cannot replace a structured RDF '+field.field+' implicitly');
    if(event[field.field]!==undefined) {
      const value=event[field.field];
      const object=timed(field.field)?literal(value.value,namedNode(XSD+(value.value.length===10?'date':'dateTime'))):literal(value,selected?.object.language||selected?.object.datatype);
      const statement=quad(subject,namedNode(predicate),object,graph);
      if(selected?.object.termType==='Literal')quads[quads.indexOf(selected)]=statement;
      else quads.push(statement);
    }
    if(timed(field.field)) {
      quads=quads.filter(q=>!(own(q)&&q.predicate.value===CAL+field.field+'Timezone'));
      if(event[field.field]?.timezone)quads.push(quad(subject,namedNode(CAL+field.field+'Timezone'),literal(event[field.field].timezone),graph));
    }
  }
  const previousRecurrence=quads.find(q=>own(q)&&q.predicate.value===CAL+'recurrence')?.object.value;
  quads=quads.filter(q=>!(own(q)&&[CAL+'recurrence',SOURCE_KEY].includes(q.predicate.value)));
  if(event.recurrence) {
    quads=quads.filter(q=>!(own(q)&&q.predicate.value===ICAL+'rrule'&&q.object.termType==='Literal'));
    for(const rule of event.recurrence.rules||[])quads.push(quad(subject,namedNode(ICAL+'rrule'),literal(rule),graph));
    quads.push(quad(subject,namedNode(CAL+'recurrence'),literal(JSON.stringify(preserveRecurrence(previousRecurrence?JSON.parse(previousRecurrence):undefined,event.recurrence))),graph));
  }
  quads.push(quad(subject,namedNode(SOURCE_KEY),literal(JSON.stringify(event.sources||{})),graph));
  return nquads(quads);
}

function fromAtomic(document) {
  const value=clone(document),sources=sourcesOf(value[SOURCE_KEY]);delete value[SOURCE_KEY];
  const result={};
  for(const field of fieldMappings)if(value[field.atomic]!==undefined) {
    result[field.field]=timed(field.field)?{value:value[field.atomic],...(value[CAL+field.field+'Timezone']?{timezone:value[CAL+field.field+'Timezone']}:{})}:value[field.atomic];
  }
  if(value[CAL+'recurrence'])result.recurrence=clone(value[CAL+'recurrence']);
  result.sources={...sources,atomic:value};
  return validateEvent(result);
}
function toAtomic(event,{id}={}) {
  validateEvent(event);
  const result=clone(event.sources?.atomic||{});
  result['@id']=id||result['@id'];
  if(!result['@id']||!/^https?:\/\//.test(result['@id']))throw Error('An Atomic resource URL is required');
  const isA=ATOMIC+'properties/isA';
  result[isA]=[...new Set([...(result[isA]||[]),CAL+'Event'])];
  for(const field of fieldMappings) {
    delete result[field.atomic];delete result[CAL+field.field+'Timezone'];
    if(event[field.field]!==undefined)result[field.atomic]=timed(field.field)?event[field.field].value:event[field.field];
    if(timed(field.field)&&event[field.field]?.timezone)result[CAL+field.field+'Timezone']=event[field.field].timezone;
  }
  const previousRecurrence=result[CAL+'recurrence'];
  delete result[CAL+'recurrence'];if(event.recurrence)result[CAL+'recurrence']=preserveRecurrence(previousRecurrence,event.recurrence);
  result[SOURCE_KEY]=clone(event.sources||{});
  return result;
}

/** JSON CRUD for remoteStorage, Dropbox, Google Drive, OneDrive and the document ledger. */
function calendarModule(client) {
  client.declareType('event',calendarSchema);
  const path=id=>'events/'+encodeURIComponent(id)+'.json';
  return {
    calendarSchema,calendarShape,atomicSchema,fieldMappings,fromJSON,toJSON,fromRDF,toRDF,fromAtomic,toAtomic,fromICalendar,toICalendar,
    async get(id) { const event=await client.getObject(path(id));return event?fromJSON(event):undefined; },
    async getAll() { const all=await client.getAll('events/');return Object.fromEntries(Object.entries(all||{}).map(([key,event])=>[decodeURIComponent(key.slice(0,-5)),fromJSON(event)])); },
    async create(event,id=crypto.randomUUID()) { if(await client.getObject(path(id)))throw Error('Calendar event already exists');await client.storeObject('event',path(id),toJSON(event));return id; },
    async update(id,changes) { const previous=await this.get(id);if(!previous)throw Error('Calendar event does not exist');const next={...previous,...clone(changes)};await client.storeObject('event',path(id),toJSON(next));return next; },
    async delete(id) { await client.remove(path(id)); }
  };
}

return {validateEvent,fromJSON,toJSON,fromICalendar,toICalendar,fromRDF,toRDF,fromAtomic,toAtomic,calendarModule};
}
