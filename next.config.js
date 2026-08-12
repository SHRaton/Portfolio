/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
