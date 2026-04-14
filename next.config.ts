import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GEMINI_TOKEN: process.env.GEMINI_TOKEN,
    CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
  },
  reactCompiler: true,
};

export default nextConfig;
