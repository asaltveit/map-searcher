import type { NextConfig } from "next";
import { resolve } from "path";

const monorepoRoot = resolve(process.cwd(), "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
