/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.thecocktaildb.com',
      },
    ],
  },
}

module.exports = nextConfig
