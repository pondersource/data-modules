// Resolve dependencies from the owning rs package even when importing monorepo sources.
import ICALJS from 'ical.js';
import * as N3 from 'n3';
import {createCalendarCodecs} from '../../calendar/vanilla/src/codecs.js';
import {createCalendarRDF} from '../../calendar/vanilla/src/rdf-factory.js';
const codecs=createCalendarCodecs(ICALJS,N3);
export const {calendarModule}=codecs;
export const calendarRDF=createCalendarRDF(codecs,N3.Parser);
