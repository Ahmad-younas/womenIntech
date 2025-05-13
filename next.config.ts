import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during production builds
  },
  /* config options here */
};

export default nextConfig;
