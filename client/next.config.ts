import type { NextConfig } from "next";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: join(__dirname, ".."),
  },
};

export default nextConfig;
