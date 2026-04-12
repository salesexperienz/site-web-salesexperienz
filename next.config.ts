import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'sanity': false,
        '@sanity/vision': false,
        'sanity/structure': false,
      }
    }
    return config
  },
}

export default nextConfig
