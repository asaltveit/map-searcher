import type { NextConfig } from "next";
import path from "path";

// Resolve from client/node_modules (fixes "Can't resolve" when run from monorepo root)
// __dirname can be undefined when Next compiles the config; fallback to cwd (run from client/)
const clientDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();
const clientNodeModules = path.resolve(clientDir, "node_modules");
const maplibrePath = path.resolve(clientNodeModules, "maplibre-gl");
const maplibreCssPath = path.resolve(maplibrePath, "dist", "maplibre-gl.css");
const tailwindPath = path.resolve(clientNodeModules, "tailwindcss");
const twAnimatePath = path.resolve(clientNodeModules, "tw-animate-css");

// Turbopack needs relative paths; absolute paths break with "server relative imports"
const rel = (p: string) => path.relative(clientDir, p);

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  turbopack: {
    resolveAlias: {
      "maplibre-gl": rel(maplibrePath),
      "maplibre-gl/dist/maplibre-gl.css": rel(maplibreCssPath),
      tailwindcss: rel(tailwindPath),
      "tw-animate-css": rel(twAnimatePath),
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve?.alias,
      "maplibre-gl": maplibrePath,
      "maplibre-gl/dist/maplibre-gl.css": maplibreCssPath,
      tailwindcss: tailwindPath,
      "tw-animate-css": twAnimatePath,
    };
    config.resolve.modules = [
      clientNodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;
