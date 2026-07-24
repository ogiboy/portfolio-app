import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { siteUrl } from '@/lib/site-url';

describe('public discovery metadata', () => {
  it('lists every localized public page from the typed content model', () => {
    const entries = sitemap();
    const expectedPagesPerLocale = projects.length + 5;

    expect(entries).toHaveLength(expectedPagesPerLocale * routing.locales.length);
    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        siteUrl('/en'),
        siteUrl('/tr'),
        siteUrl('/en/about'),
        siteUrl('/en/projects'),
        siteUrl('/tr/privacy'),
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
        disallow: '/wasm/',
      },
      sitemap: siteUrl('/sitemap.xml'),
      host: new URL(siteUrl('/')).origin,
    });
  });

  it('declares that no advertising seller is authorized', () => {
    const adsText = readFileSync(resolve(process.cwd(), 'public/ads.txt'), 'utf8');

    expect(adsText).toContain('placeholder.example.com, placeholder, DIRECT, placeholder');
  });
});
