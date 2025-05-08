/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Strapi の画像URLが http://localhost:1337 である前提
  },
}

module.exports = nextConfig