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
    domains: ['images.unsplash.com', 'logo.clearbit.com'],
    unoptimized: true,
  },
  experimental: {
    turbo : {
      rules: {
        '*.mdx': {
          loaders: ['@next/mdx'],
        },
      },
    },
  },
};

export default nextConfig;
