// Converts media dropped in public/projects/<slug>/ to resized WebP and removes the originals:
// screenshots (png/jpg) become still WebP, GIFs become animated WebP (same animation, much lighter).
// Usage: npm run images
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.join(process.cwd(), 'public', 'projects')
const MAX_WIDTH = 1600
// Animated captures are mostly gameplay/terminal recordings: 1024px is plenty in the gallery
const MAX_WIDTH_ANIMATED = 1024

if (!fs.existsSync(ROOT)) {
  console.log('No public/projects folder yet.')
  process.exit(0)
}

for (const slug of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g|gif)$/i.test(file)) continue
    const src = path.join(dir, file)
    const out = path.join(dir, file.replace(/\.(png|jpe?g|gif)$/i, '.webp'))
    const animated = /\.gif$/i.test(file)
    await sharp(src, { animated })
      .resize({ width: animated ? MAX_WIDTH_ANIMATED : MAX_WIDTH, withoutEnlargement: true })
      .webp(animated ? { quality: 70, effort: 6 } : { quality: 82 })
      .toFile(out)
    const before = fs.statSync(src).size
    fs.unlinkSync(src)
    console.log(`${slug}/${file} → ${path.basename(out)} (${Math.round(before / 1024)} Ko → ${Math.round(fs.statSync(out).size / 1024)} Ko)`)
  }
}
