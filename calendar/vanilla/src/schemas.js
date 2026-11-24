export const CAL = 'https://pondersource.com/ns/calendar/';
export const ICAL = 'http://www.w3.org/2002/12/cal/ical#';
export const SCHEMA = 'https://schema.org/';
export const ATOMIC = 'https://atomicdata.dev/';
export const SOURCE_KEY = CAL + 'sources';

const temporal = {
  type: 'object', required: ['value'], additionalProperties: true,
  properties: {
    value: {type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(Z|[+-]\\d{2}:\\d{2})?)?$'},
    timezone: {type:'string',minLength:1}
  }
};
export const calendarSchema = {
  $schema:'http://json-schema.org/draft-07/schema#', $id:CAL+'Event.json',
  type:'object', required:['uid','start'], additionalProperties:true,
  properties: {
    uid:{type:'string',minLength:1}, title:{type:'string'}, description:{type:'string'}, location:{type:'string'}, duration:{type:'string'},
    start:temporal, end:temporal, recurrenceId:temporal,
    recurrence:{type:'object',additionalProperties:true,properties:{
      rules:{type:'array',items:{type:'string'}}, dates:{type:'array',items:temporal}, excludedDates:{type:'array',items:temporal}
    }},
    sources:{type:'object',additionalProperties:true}
  }
};

/** These are mappings, not an assertion that the backend validates a shape. */
export const fieldMappings = [
  {field:'uid',ical:'uid',rdf:ICAL+'uid',schema:SCHEMA+'identifier',atomic:CAL+'uid'},
  {field:'title',ical:'summary',rdf:ICAL+'summary',schema:SCHEMA+'name',atomic:ATOMIC+'properties/name'},
  {field:'description',ical:'description',rdf:ICAL+'description',schema:SCHEMA+'description',atomic:ATOMIC+'properties/description'},
  {field:'location',ical:'location',rdf:ICAL+'location',schema:SCHEMA+'location',atomic:CAL+'location'},
  {field:'duration',ical:'duration',rdf:ICAL+'duration',schema:SCHEMA+'duration',atomic:CAL+'duration'},
  {field:'start',ical:'dtstart',rdf:ICAL+'dtstart',schema:SCHEMA+'startDate',atomic:CAL+'start'},
  {field:'end',ical:'dtend',rdf:ICAL+'dtend',schema:SCHEMA+'endDate',atomic:CAL+'end'},
  {field:'recurrenceId',ical:'recurrence-id',rdf:ICAL+'recurrenceId',schema:CAL+'recurrenceId',atomic:CAL+'recurrenceId'}
].map(field=>({...field,schemaHttp:field.schema.startsWith(SCHEMA)?field.schema.replace(SCHEMA,'http://schema.org/'):field.schema}));

const prolog = `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ical: <${ICAL}>
PREFIX s: <${SCHEMA}>
PREFIX cal: <${CAL}>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
`;
export const calendarShape = prolog + [
  ['VEvent', 'ical:Vevent', 'rdf'], ['SchemaEvent','s:Event','schema'], ['SchemaHttpEvent','<http://schema.org/Event>','schemaHttp']
].map(([name,type,vocabulary]) => `<${CAL+name}> EXTRA a {
  a [${type}] ;
${fieldMappings.map(field => `  <${field[vocabulary]}> ${['start','end','recurrenceId'].includes(field.field)?'(xsd:date OR xsd:dateTime)':field.field==='uid'?'xsd:string':'(xsd:string OR rdf:langString)'}${field.field==='start'||field.field==='uid'&&vocabulary==='rdf'?'':field.field==='uid'?'?':'*'} ;`).join('\n')}
  cal:startTimezone xsd:string? ; cal:endTimezone xsd:string? ; cal:recurrenceIdTimezone xsd:string? ;
  cal:recurrence xsd:string? ; cal:sources xsd:string?
}`).join('\n') + '\n';

const prop = ATOMIC+'properties/';
const definitions = [
  ...fieldMappings.filter(field=>!field.atomic.startsWith(prop)).map(field=>[field.atomic,'string']),
  ...['startTimezone','endTimezone','recurrenceIdTimezone'].map(name=>[CAL+name,'string']),
  [CAL+'recurrence','json'],[SOURCE_KEY,'json']
];
export const atomicSchema = [
  {'@id':CAL+'Event',[prop+'isA']:[ATOMIC+'classes/Class'],[prop+'shortname']:'calendar-event',
    [prop+'requires']:[CAL+'uid',CAL+'start'],[prop+'recommends']:fieldMappings.slice(1).map(field=>field.atomic)},
  ...definitions.map(([id,type])=>({'@id':id,[prop+'isA']:[ATOMIC+'classes/Property'],
    [prop+'shortname']:'calendar-'+id.slice(CAL.length).replace(/[A-Z]/g,char=>'-'+char.toLowerCase()),
    [prop+'datatype']:ATOMIC+'datatypes/'+type}))
];
