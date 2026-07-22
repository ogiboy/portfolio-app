import type { MetadataRoute } from 'next';
import { siteOrigin, siteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/wasm/',
    },
    sitemap: siteUrl('/sitemap.xml'),
    host: siteOrigin,
  };
}
