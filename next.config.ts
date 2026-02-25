import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// next-pwa integration deferred — v5.6.0 requires CJS next.config.js
// which conflicts with the TS config from create-next-app v16.
// PWA/offline support will be added in Story 4.1 with a compatible approach.

export default nextConfig;
