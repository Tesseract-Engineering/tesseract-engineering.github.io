import type { NextConfig } from "next";

// A static export: `next build` writes plain HTML/CSS/JS to `out/`, which GitHub Pages serves.
// This is the <org>.github.io root site, so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
