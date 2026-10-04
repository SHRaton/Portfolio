/** @type {import('next').NextConfig} */
// Served from the root of https://alexandre-vittenet.fr (GitHub Pages custom domain),
// so no basePath. lib/assetPath.ts still honours NEXT_PUBLIC_BASE_PATH if one is ever set.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
