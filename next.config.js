/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'w7.pngwing.com',
        pathname: '/pngs/**',
      },
    ],
  },
}

module.exports = nextConfig 