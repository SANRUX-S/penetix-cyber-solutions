import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Provide the generated-image source directory. See docs/assets.md.');
const outputs = [
  ['exec-bd93c7db-1e64-4863-9275-ca5a5d661319.png', 'hero-architecture'],
  ['exec-bd43dd2c-c93e-4d5b-86a9-be10fbd83333.png', 'architecture'],
  ['exec-5e3c0e08-05cc-449b-a939-a25551531730.png', 'mountains'],
];
await mkdir('public/images', { recursive: true });
await Promise.all(outputs.map(async ([file, name]) => {
  const result = await sharp(resolve(source, file)).webp({ quality: 87, effort: 6 }).toFile(`public/images/${name}.webp`);
  console.log(`${name}.webp: ${Math.round(result.size / 1024)} KB`);
}));
