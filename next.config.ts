import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false, // Disabling as per project requirements
  experimental: {
    // This helps in monorepo/nested scenarios
    serverActions: {
        bodySizeLimit: '1mb',
    },
  },
};

export default nextConfig;
