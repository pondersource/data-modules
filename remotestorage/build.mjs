// SPDX-License-Identifier: MIT
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const alias={
  '@solid-data-modules/rdflib-utils/identifier':root+'utils/rdflib/src/identifier/index.ts',
  '@solid-data-modules/rdflib-utils':root+'utils/rdflib/src/index.ts',
};
// Sibling sources resolve their runtime dependencies from this package.
const scopedDependencies={name:'scoped-dependencies',setup(build){
  build.onResolve({filter:/^[^./]/},async args=>{
    if(args.pluginData==='scoped-dependency'||!args.importer.startsWith(root)||args.importer.includes('/node_modules/'))return;
    const resolved=await build.resolve(args.path,{kind:args.kind,resolveDir:fileURLToPath(new URL('.',import.meta.url)),pluginData:'scoped-dependency'});
    return {...resolved,pluginData:undefined};
  });
}};
const common={bundle:true,target:'es2020',alias,plugins:[scopedDependencies],nodePaths:[fileURLToPath(new URL('node_modules',import.meta.url))],logLevel:'warning'};
await build({...common,entryPoints:['src/index.js'],format:'iife',globalName:'PonderSourceModules',outfile:'dist/modules.js'});
await build({...common,entryPoints:['src/domains.ts'],format:'esm',platform:'node',banner:{js:"import {createRequire} from 'node:module';const require=createRequire(import.meta.url);"},outfile:'dist/domains.mjs'});
await build({...common,entryPoints:['src/domains.ts'],format:'esm',platform:'browser',outfile:'dist/domains.browser.mjs'});
await build({...common,entryPoints:['src/domains.ts'],format:'iife',globalName:'PonderSourceDomains',outfile:'dist/domains.js'});
