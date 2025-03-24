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
    appDir: true,         // Enable the new App Router
    skipPagesDir: true,   // Prevent Next.js from scanning the /pages directory
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
