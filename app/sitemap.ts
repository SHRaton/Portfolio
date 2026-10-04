import type { MetadataRoute } from 'next'

// Required with `output: 'export'`: emitted as out/sitemap.xml at build time
export const dynamic = 'force-static'

const SITE = 'https://alexandre-vittenet.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  // Every deploy follows a content change, so the build date is a fair lastModified
  const lastModified = new Date().toISOString().slice(0, 10)
  return [
    { url: `${SITE}/`, lastModified },
    { url: `${SITE}/cv.pdf`, lastModified },
  ]
}
