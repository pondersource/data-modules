import {mkdir,writeFile} from 'node:fs/promises';
import {calendarSchema,calendarShape,atomicSchema,fieldMappings} from './src/schemas.js';
await mkdir(new URL('schemas/',import.meta.url),{recursive:true});
for(const [name,value] of Object.entries({'event.schema.json':calendarSchema,'atomic.json':atomicSchema,'mapping.json':fieldMappings})) {
  await writeFile(new URL('schemas/'+name,import.meta.url),JSON.stringify(value,null,2)+'\n');
}
await writeFile(new URL('schemas/event.shex',import.meta.url),calendarShape);
