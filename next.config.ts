import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  webpack: (config) => {
    config.cache = false
    return config
  },
  /* config options here */
}

export default nextConfig
