import { describe, expect, it } from 'vitest';
import { projects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { siteUrl } from '@/lib/site-url';

describe('public discovery metadata', () => {
  it('lists every localized public page from the typed content model', () => {
    const entries = sitemap();
    const expectedPagesPerLocale = projects.length + 3;

    expect(entries).toHaveLength(expectedPagesPerLocale * routing.locales.length);
    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        siteUrl('/en'),
        siteUrl('/tr'),
        siteUrl('/en/projects'),
        siteUrl('/tr/labs/retro-game-center'),
        siteUrl(`/en/projects/${projects[0].slug}`),
      ]),
    );
    expect(entries.every((entry) => !entry.url.includes('/dashboard'))).toBe(true);
    expect(entries.every((entry) => !entry.url.includes('/wasm/'))).toBe(true);
  });

  it('references the canonical sitemap from robots metadata', () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/wasm/', '/en/dashboard', '/tr/dashboard'],
      },
      sitemap: siteUrl('/sitemap.xml'),
    });
  });
});
