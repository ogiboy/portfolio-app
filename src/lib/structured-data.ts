import type { Project } from '@/content/projects';
import { getProjectDescription, projects } from '@/content/projects';
import { contact, siteCopy, type Locale } from '@/content/site';
import { identity, seoCopy } from '@/lib/seo';
import { siteUrl } from '@/lib/site-url';

export type JsonLdValue =
  string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue };

const websiteId = siteUrl('/#website');
const personId = siteUrl('/#person');

const person = {
  '@type': 'Person',
  '@id': personId,
  name: identity.fullName,
  alternateName: [identity.knownAs, identity.brand],
  url: siteUrl('/en/about'),
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: [
    'Web development',
    'Next.js',
    'TypeScript',
    'Design systems',
    'Homelab',
    'Automation',
    'WebAssembly',
  ],
} satisfies JsonLdValue;

export function buildHomeStructuredData(locale: Locale): JsonLdValue {
  const copy = seoCopy[locale];
  const url = siteUrl(`/${locale}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl('/'),
        name: identity.siteName,
        alternateName: `${identity.fullName} Portfolio`,
        inLanguage: ['en', 'tr'],
        author: { '@id': personId },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: copy.homeTitle,
        description: copy.homeDescription,
        inLanguage: locale,
        isPartOf: { '@id': websiteId },
        author: { '@id': personId },
      },
    ],
  };
}

export function buildAboutStructuredData(locale: Locale): JsonLdValue {
  const copy = siteCopy[locale].about;
  const url = siteUrl(`/${locale}/about`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: seoCopy[locale].aboutTitle,
        description: seoCopy[locale].aboutDescription,
        inLanguage: locale,
        isPartOf: { '@id': websiteId },
        mainEntity: {
          ...person,
          jobTitle: seoCopy[locale].role,
          description: copy.identityBody,
          disambiguatingDescription: copy.intro,
          homeLocation: {
            '@type': 'City',
            name: 'Istanbul, Türkiye',
          },
        },
      },
    ],
  };
}

export function buildProjectsStructuredData(locale: Locale): JsonLdValue {
  const copy = siteCopy[locale].projects;
  const url = siteUrl(`/${locale}/projects`);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: copy.title,
    description: seoCopy[locale].projectsDescription,
    inLanguage: locale,
    isPartOf: { '@id': websiteId },
    author: { '@id': personId },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: siteUrl(`/${locale}/projects/${project.slug}`),
      })),
    },
  };
}

export function buildProjectStructuredData(locale: Locale, project: Project): JsonLdValue {
  const copy = siteCopy[locale].projects;
  const url = siteUrl(`/${locale}/projects/${project.slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${url}#project`,
        url,
        name: project.name,
        description: getProjectDescription(project, locale),
        inLanguage: locale,
        codeRepository: project.gitUrl,
        runtimePlatform: 'Web',
        keywords: project.stack.join(', '),
        isAccessibleForFree: true,
        author: { '@id': personId },
        sameAs: project.url,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: siteCopy[locale].nav.home,
            item: siteUrl(`/${locale}`),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.title,
            item: siteUrl(`/${locale}/projects`),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.name,
            item: url,
          },
        ],
      },
    ],
  };
}

export function buildLabStructuredData(locale: Locale): JsonLdValue {
  const copy = siteCopy[locale].lab;
  const url = siteUrl(`/${locale}/labs/retro-game-center`);

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#lab`,
    url,
    name: copy.title,
    description: seoCopy[locale].labDescription,
    inLanguage: locale,
    isAccessibleForFree: true,
    keywords: ['WebAssembly', 'DOSBox-X', 'DOOM Shareware', 'Browser runtime'],
    author: { '@id': personId },
    isPartOf: { '@id': websiteId },
  };
}

export function buildPrivacyStructuredData(locale: Locale): JsonLdValue {
  const copy = siteCopy[locale].privacy;
  const url = siteUrl(`/${locale}/privacy`);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#privacy`,
    url,
    name: copy.title,
    description: seoCopy[locale].privacyDescription,
    inLanguage: locale,
    isPartOf: { '@id': websiteId },
    author: { '@id': personId },
  };
}
