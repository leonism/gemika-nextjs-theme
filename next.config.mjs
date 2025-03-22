// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable Turbopack
    turbo: {
      rules: {
        '*.mdx': {
          loaders: ['@next/mdx'],
        },
      },
    },
  },
};

export default nextConfig;
