import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow server-side file reads from workspace
  serverExternalPackages: [],

  // Suppress Three.js/R3F build warnings
  webpack: (config) => {
    config.externals = config.externals || []
    return config
  },
}

export default nextConfig
