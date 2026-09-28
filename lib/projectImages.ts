import fs from 'node:fs'
import path from 'node:path'

const IMAGE_EXT = /\.(webp|avif|png|jpe?g|gif)$/i

/**
 * Build-time scan of public/projects/<slug>/ — drop screenshots there and they show up,
 * ordered by filename (prefix them 01-, 02-… to control the order; the first one is the cover).
 * Server-only: called from the page (a server component) during `next build`.
 */
export function getProjectImages(slugs: string[]): Record<string, string[]> {
  const root = path.join(process.cwd(), 'public', 'projects')
  const result: Record<string, string[]> = {}
  for (const slug of slugs) {
    const dir = path.join(root, slug)
    if (!fs.existsSync(dir)) continue
    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    if (files.length) result[slug] = files.map((f) => `/projects/${slug}/${f}`)
  }
  return result
}
