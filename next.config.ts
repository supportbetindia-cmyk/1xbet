import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "1xbetgames.co",
          },
        ],
        destination: "https://www.1xbetgames.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;