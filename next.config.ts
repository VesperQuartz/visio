import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  serverExternalPackages: ["sharp", "onnxruntime-node"],
};

export default nextConfig;
