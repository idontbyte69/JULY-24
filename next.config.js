/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'netra.news',
      'upload.wikimedia.org',
      'gdb.voanews.com',
      'www.crisisgroup.org',
      'thehill.com',
      'images.unsplash.com',
      'sites'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.netra.news',
      },
      {
        protocol: 'https',
        hostname: '**.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '**.voanews.com',
      },
      {
        protocol: 'https',
        hostname: '**.crisisgroup.org',
      },
      {
        protocol: 'https',
        hostname: '**.thehill.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.thehill.com',
        pathname: '/wp-content/**',
      }
    ],
  },
}

module.exports = nextConfig 