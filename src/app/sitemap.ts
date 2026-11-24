import type { MetadataRoute } from 'next';

const BASE = 'https://www.1xbetgames.co';

// Non-www 308-redirects to www, so every URL here is the www form — a sitemap
// full of redirects is a crawl-budget leak.
const ROUTES = [
  '',
  '/sports-betting',
  '/cricket-betting',
  '/football-betting',
  '/soccer',
  '/tennis-betting',
  '/basketball-betting',
  '/horse-racing-betting',
  '/badminton-betting',
  '/online-casino-games',
  '/casino',
  '/1xgames-online',
  '/promotions',
  '/about',
  '/provably-fair',
  '/responsible-gaming',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
