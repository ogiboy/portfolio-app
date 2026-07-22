import { describe, expect, it } from 'vitest';
import manifest from '@/app/manifest';
import { serializeJsonLd } from '@/components/seo/json-ld';
import { projects } from '@/content/projects';
import {
  createRootMetadata,
  createRouteMetadata,
  identity,
  localizedLanguageUrls,
  seoCopy,
} from '@/lib/seo';
import { siteUrl } from '@/lib/site-url';
import {
  buildHomeStructuredData,
  buildProjectStructuredData,
  buildProjectsStructuredData,
} from '@/lib/structured-data';

describe('search metadata', () => {
  it('keeps localized titles, canonicals, and reciprocal language alternates aligned', () => {
    const english = createRootMetadata('en');
    const turkishProjects = createRouteMetadata({
      locale: 'tr',
      path: '/projects',
      title: 'Proje arşivi',
      description: seoCopy.tr.projectsDescription,
    });

    expect(english.title).toEqual({
      default: seoCopy.en.homeTitle,
      template: `%s | ${identity.brand}`,
    });
    expect(english.alternates).toEqual({
      canonical: siteUrl('/en'),
      languages: localizedLanguageUrls(''),
    });
    expect(turkishProjects.alternates).toEqual({
      canonical: siteUrl('/tr/projects'),
      languages: localizedLanguageUrls('/projects'),
    });
    expect(turkishProjects.openGraph).toMatchObject({
      locale: 'tr_TR',
      alternateLocale: 'en_US',
      url: siteUrl('/tr/projects'),
      images: [{ url: siteUrl('/tr/opengraph-image'), width: 1200, height: 630 }],
    });
    expect(turkishProjects.twitter).toMatchObject({
      images: [{ url: siteUrl('/tr/twitter-image'), width: 1200, height: 630 }],
    });
  });

  it('publishes a portable H.O.T. manifest', () => {
    expect(manifest()).toMatchObject({
      name: `${identity.siteName} by ${identity.fullName}`,
      short_name: identity.brand,
      start_url: '/en',
      icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
    });
  });
});

describe('structured data', () => {
  it('represents the visible person, collection, and project owners', () => {
    expect(JSON.stringify(buildHomeStructuredData('en'))).toContain(identity.fullName);
    expect(JSON.stringify(buildProjectsStructuredData('tr'))).toContain(
      `"numberOfItems":${projects.length}`,
    );
    expect(JSON.stringify(buildProjectStructuredData('en', projects[0]))).toContain(
      projects[0].gitUrl,
    );
  });

  it('escapes HTML-significant characters before JSON-LD rendering', () => {
    const serialized = serializeJsonLd({ text: '</script><script>alert(1)</script>' });

    expect(serialized).not.toContain('<');
    expect(serialized).toContain('\\u003c/script>');
  });
});
