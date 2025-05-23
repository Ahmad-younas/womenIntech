import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during production builds
  },
  images: {
    domains: [
      'dxlyawszcpeibmkvnwry.supabase.co', // Supabase storage domain
    ],
  },
  /* config options here */
};

export default nextConfig;
