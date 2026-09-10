import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/returns",
        destination: "/return-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
