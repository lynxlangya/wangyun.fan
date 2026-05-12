import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const files = ['index.html'];
const optionalDirs = ['assets'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  const source = resolve(root, file);
  if (!existsSync(source)) {
    throw new Error(`Missing required file: ${file}`);
  }
  await cp(source, resolve(dist, file));
}

for (const dir of optionalDirs) {
  const source = resolve(root, dir);
  if (existsSync(source)) {
    await cp(source, resolve(dist, dir), { recursive: true });
  }
}

console.log('Built static site to dist/');
