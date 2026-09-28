// Converts screenshots dropped in public/projects/<slug>/ (png/jpg) to resized WebP
// and removes the originals. Usage: npm run images
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.join(process.cwd(), 'public', 'projects')
const MAX_WIDTH = 1600

if (!fs.existsSync(ROOT)) {
  console.log('No public/projects folder yet.')
  process.exit(0)
}

for (const slug of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue
    const src = path.join(dir, file)
    const out = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'))
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out)
    const before = fs.statSync(src).size
    fs.unlinkSync(src)
    console.log(`${slug}/${file} → ${path.basename(out)} (${Math.round(before / 1024)} Ko → ${Math.round(fs.statSync(out).size / 1024)} Ko)`)
  }
}
