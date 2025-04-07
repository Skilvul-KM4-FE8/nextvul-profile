import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
        pathname: "/**", // Match all paths under this domain
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
