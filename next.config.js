/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/MySchedule',
  assetPrefix: '/MySchedule/',
};

module.exports = nextConfig;
