// SPDX-License-Identifier: MIT
import ICAL from 'ical.js';

function components(text, kind) {
  if (typeof text !== 'string' || !text.trim()) throw Error('A non-empty text document is required');
  const parsed=ICAL.parse(text);
  return (typeof parsed[0]==='string'?[parsed]:parsed).map(value=>new ICAL.Component(value)).filter(item=>item.name===kind);
}
const values=(component,name)=>component.getAllProperties(name).map(property=>({
  value:property.getFirstValue(),parameters:structuredClone(property.toJSON()[1])
}));

/** Read-only vCard 3/4 projection. Keep source + jCard so unknown fields,
 * parameters, groups and unsupported semantics are not discarded by conversion.
 */
export function parseVCard(text) {
  const cards=components(text,'vcard');
  if(!cards.length)throw Error('No vCard records found');
  return {format:'vcard',source:text,cards:cards.map(card=>{
    const version=card.getFirstPropertyValue('version');
    if(!['3.0','4.0'].includes(version))throw Error('Only vCard 3.0 and 4.0 are supported');
    return {version,uid:card.getFirstPropertyValue('uid'),name:card.getFirstPropertyValue('fn'),
      structuredName:card.getFirstPropertyValue('n'),emails:values(card,'email'),phones:values(card,'tel'),
      addresses:values(card,'adr'),organizations:values(card,'org'),urls:values(card,'url'),
      properties:card.toJSON()};
  })};
}

/** Read-only iCalendar VTODO projection, retaining recurrence, alarms,
 * timezone definitions, attachments and unknown properties in the source/jCal.
 */
export function parseICalendarTasks(text) {
  const calendars=components(text,'vcalendar');
  if(!calendars.length)throw Error('No iCalendar document found');
  return {format:'icalendar',source:text,calendars:calendars.map(calendar=>calendar.toJSON()),
    tasks:calendars.flatMap(calendar=>calendar.getAllSubcomponents('vtodo').map(task=>({
      uid:task.getFirstPropertyValue('uid'),title:task.getFirstPropertyValue('summary'),
      description:task.getFirstPropertyValue('description'),status:task.getFirstPropertyValue('status'),
      percentComplete:task.getFirstPropertyValue('percent-complete'),
      due:task.getFirstPropertyValue('due')?.toString(),properties:task.toJSON()
    })))};
}
