import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      // ...any other hostnames you already have
    ],
  },
};

export default nextConfig;
