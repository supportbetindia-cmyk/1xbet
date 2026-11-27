import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/', '/api/'],
    },
    sitemap: 'https://www.1xbetgames.co/sitemap.xml',
  };
}
