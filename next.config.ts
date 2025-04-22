// next.config.js or next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // allow only https protocol
        hostname: '**', // allow any hostname
        pathname: '**', // allow any image path
      },
    ],
    dangerouslyAllowSVG: true, // if you want to allow SVGs too
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
