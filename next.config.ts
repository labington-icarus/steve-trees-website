import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  // basePath: "/steve-trees-website",
  // assetPrefix: "/steve-trees-website/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
