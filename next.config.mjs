/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/herring101.github.io' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/herring101.github.io' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
