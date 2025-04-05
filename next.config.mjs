/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Enable gzip compression via Next.js
  compress: true,

  // Disable the "X-Powered-By" header for security
  poweredByHeader: false,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image configuration
  images: {
    domains: ['images.unsplash.com', 'logo.clearbit.com'],
    unoptimized: true,
  },

  // Experimental features
  experimental: {
    serverActions: {}, // Fixed: Enabled server actions with an empty object
    turbo: {
      rules: {
        '*.mdx': {
          loaders: ['@next/mdx'], // From next.config.mjs
        },
      },
    },
  },

  // Optional headers (for gzip/brotli on production server)
  async headers() {
    return isProd
      ? [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
