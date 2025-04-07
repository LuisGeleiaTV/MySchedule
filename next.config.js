const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/MySchedule",
  assetPrefix: "/MySchedule/",
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: true
};

module.exports = nextConfig;
