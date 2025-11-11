import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix workspace root detection for Turbopack
  turbopack: {
    root: process.cwd(),
  },
  // Skip TypeScript type checking during build (run separately with tsc)
  // This bypasses the EPERM issue when Next.js tries to write next-env.d.ts
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
