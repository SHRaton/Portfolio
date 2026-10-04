import type { MetadataRoute } from 'next'

// Required with `output: 'export'`: metadata routes must be static to be emitted as out/robots.txt
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    // A portfolio wants to be found, by search engines and AI assistants alike
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://alexandre-vittenet.fr/sitemap.xml',
    host: 'https://alexandre-vittenet.fr',
  }
}
