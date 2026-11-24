import type { NextConfig } from "next";

// Old → new, from the URL-mapping audit. Kept as permanent redirects so the
// indexed old paths pass their ranking to the renamed ones instead of 404ing.
const RENAMED: Record<string, string> = {
  "/sports": "/sports-betting",
  "/cricket": "/cricket-betting",
  "/football": "/football-betting",
  "/tennis": "/tennis-betting",
  "/basketball": "/basketball-betting",
  "/badminton": "/badminton-betting",
  "/horse-racing": "/horse-racing-betting",
  "/online-casino": "/online-casino-games",
  "/1xgames": "/1xgames-online",
};

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
      ...Object.entries(RENAMED).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
