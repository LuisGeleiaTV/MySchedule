/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/MySchedule',
  assetPrefix: '/MySchedule/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
