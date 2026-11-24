import ICALJS from 'ical.js';
import * as N3 from 'n3';
import {createCalendarCodecs} from './codecs.js';
import {createCalendarRDF} from './rdf-factory.js';
export {calendarSchema,calendarShape,atomicSchema,fieldMappings} from './schemas.js';
const codecs=createCalendarCodecs(ICALJS,N3);
export const {validateEvent,fromJSON,toJSON,fromICalendar,toICalendar,fromRDF,toRDF,fromAtomic,toAtomic,calendarModule}=codecs;
export const calendarRDF=createCalendarRDF(codecs,N3.Parser);
