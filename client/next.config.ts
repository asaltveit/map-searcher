import type { NextConfig } from "next";
import { resolve } from "path";

// Use parent directory for pnpm workspace, current for standalone builds
const isPnpmWorkspace = process.env.PNPM_HOME || process.env.npm_config_user_agent?.includes("pnpm");
const root = isPnpmWorkspace ? resolve(process.cwd(), "..") : resolve(process.cwd());

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
};

export default nextConfig;
