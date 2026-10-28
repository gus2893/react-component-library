// Post-processes the declaration tree emitted by `tsc -p tsconfig.build.json`:
//  1. strips CSS side-effect imports (`import './Button.css';`) from every .d.ts,
//     because the CSS is shipped as a single dist/styles.css instead;
//  2. mirrors every dist/**/*.d.ts into a dist/**/*.d.cts (with './x.js' -> './x.cjs')
//     so `require` consumers under moduleResolution node16/nodenext get CJS-typed entries.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const CSS_IMPORT = /^import\s+['"][^'"]+\.css['"];?\s*\r?\n/gm;
const RELATIVE_JS = /(from\s+|import\()(['"])(\.{1,2}\/[^'"]+)\.js\2/g;

let count = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (name.endsWith('.d.ts')) {
      const esm = readFileSync(full, 'utf8').replace(CSS_IMPORT, '');
      writeFileSync(full, esm);
      writeFileSync(full.replace(/\.d\.ts$/, '.d.cts'), esm.replace(RELATIVE_JS, '$1$2$3.cjs$2'));
      count++;
    }
  }
}

walk(distDir);
console.log(`emit-cts-types: processed ${count} declaration files (.d.ts + .d.cts)`);
