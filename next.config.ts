import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.hanuri.or.kr",
      },
    ],
  },
};

export default nextConfig;
