import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on these directories during `next lint` and `next build`
    dirs: ['app', 'components', 'lib'],
    // Allow production builds to successfully complete even if ESLint errors are present
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to successfully complete even if type errors are present
    ignoreBuildErrors: true, // Allow production builds to successfully complete even if type errors are present
  },
};

export default nextConfig;
