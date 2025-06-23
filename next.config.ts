import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during production builds
  },
  images: {
    domains: [
      'dxlyawszcpeibmkvnwry.supabase.co', // Supabase storage domain
      'images.unsplash.com', // Add Unsplash domain
    ],
  },
  /* config options here */
};

export default nextConfig;
