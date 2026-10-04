// Converts the original project screenshots into optimized WebP files in public/images.
//
//   node scripts/optimize-images.mjs
//
// Source folders (kept out of git) hold files named "1_Name.png", "2_Name.jpeg", …
// The leading number sets the display order and is preserved in the output name.
// Each image gets a full-size version (max 1600px wide) and a small one (800px) for srcset.

import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sources = {
  propai: 'PropAI',
  tracelayer: 'TraceLayer',
  urbanpuls: 'UrbanPlus', // source folder name
  isro: 'ANAV_ISRO',
};
const SIZES = [
  { suffix: '', width: 1600 },
  { suffix: '-sm', width: 800 },
];

// Spelling fixes for source file names (originals are left untouched).
const fixes = {
  aanalsis: 'analysis',
  maintainence: 'maintenance',
  dashboardd: 'dashboard',
  dahboard: 'dashboard',
};

function parse(file) {
  const match = /^(\d+)[_-]\s*(.+)\.(png|jpe?g|webp)$/i.exec(file);
  if (!match) return null;
  const slug = match[2]
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .map((word) => fixes[word] ?? word)
    .join('-');
  return { order: Number(match[1]), slug };
}

for (const [project, folder] of Object.entries(sources)) {
  const dir = path.join(root, folder);
  const outDir = path.join(root, 'public', 'images', project);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(dir))
    .map((file) => ({ file, info: parse(file) }))
    .filter((entry) => entry.info)
    .sort((a, b) => a.info.order - b.info.order);

  for (const { file, info } of files) {
    const base = `${String(info.order).padStart(2, '0')}-${info.slug}`;
    const input = sharp(path.join(dir, file)).rotate();
    const meta = await input.metadata();
    for (const size of SIZES) {
      const out = path.join(outDir, `${base}${size.suffix}.webp`);
      const result = await input
        .clone()
        .resize({ width: Math.min(size.width, meta.width), withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(out);
      if (!size.suffix) {
        console.log(
          `${project}/${base}.webp  ${result.width}x${result.height}  ${(result.size / 1024).toFixed(0)} KB  (from ${file})`,
        );
      }
    }
  }
}
