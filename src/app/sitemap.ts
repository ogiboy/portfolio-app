import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { localizedLanguageUrls } from '@/lib/seo';
import { siteUrl } from '@/lib/site-url';

type SitemapPage = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
};

const staticPages: SitemapPage[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/labs/retro-game-center', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

const projectPages: SitemapPage[] = projects.map((project) => ({
  path: `/projects/${project.slug}`,
  changeFrequency: 'yearly',
  priority: project.featured ? 0.8 : 0.6,
}));

function localizedUrl(locale: (typeof routing.locales)[number], path: string) {
  return siteUrl(`/${locale}${path}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticPages, ...projectPages].flatMap((page) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: localizedLanguageUrls(page.path),
      },
    })),
  );
}
