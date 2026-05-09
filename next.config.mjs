const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip compression via Next.js
  compress: true,

  // Disable the "X-Powered-By" header for security
  poweredByHeader: false,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },

  // Forced unification of assets
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Unify JS files into a single bundle
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      );

      // Force CSS into a single bundle if possible
      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          styles: {
            name: 'styles',
            type: 'css/auto',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        };
      }
    }
    return config;
  },

  // Turbopack configuration
  turbopack: {
    rules: {
      '*.mdx': {
        loaders: ['@next/mdx'],
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
      : []
  },
}

export default nextConfig
