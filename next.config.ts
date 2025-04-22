import { types } from "util";
import { NextConfig } from "next";
// next.config.js
const nextConfig:NextConfig = {


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any host
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint:{
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

export default nextConfig;
