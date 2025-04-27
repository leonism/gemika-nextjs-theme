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
    remotePatterns: [
      {
        protocol: 'https', // Assuming HTTPS for both
        hostname: 'images.unsplash.com',
        port: '', // Optional: Defaults to standard ports (80/443)
        pathname: '**', // Allow any path under this hostname
      },
      {
        protocol: 'https', // Assuming HTTPS
        hostname: 'logo.clearbit.com',
        port: '', // Optional
        pathname: '**', // Allow any path under this hostname
      },
    ],
    unoptimized: true, // Keep this if you still need it
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
