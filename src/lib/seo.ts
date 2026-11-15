import type { Metadata } from 'next';
import type { Locale } from '@/content/site';
import { siteOrigin, siteUrl } from '@/lib/site-url';

/** Canonical brand and author identity used throughout public metadata. */
export const identity = {
  brand: 'H.O.T.',
  fullName: 'Halil Oğuzcan Toptaş',
  knownAs: 'Oğuzcan Toptaş',
  siteName: 'H.O.T. Portfolio',
} as const;

/** Locale-specific copy used to build search and social metadata. */
export const seoCopy: Record<
  Locale,
  {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    projectsDescription: string;
    labTitle: string;
    labDescription: string;
    privacyDescription: string;
    role: string;
    ogLocale: string;
    alternateOgLocale: string;
  }
> = {
  en: {
    homeTitle: 'H.O.T. | Halil Oğuzcan Toptaş — Developer',
    homeDescription:
      'Websites, apps, home lab projects, and browser experiments by Istanbul-based developer Halil Oğuzcan Toptaş.',
    aboutTitle: 'About Halil Oğuzcan Toptaş',
    aboutDescription:
      'Learn about Istanbul-based software developer Halil Oğuzcan Toptaş and explore his web projects and home lab experiments.',
    projectsDescription: 'Browse websites, apps, and browser experiments by Halil Oğuzcan Toptaş.',
    labTitle: 'Retro Game Center: DOOM in WebAssembly',
    labDescription:
      'Play the shareware version of DOOM in your browser with DOSBox-X and WebAssembly.',
    privacyDescription:
      'What analytics this portfolio uses, what information may be collected, and how to turn analytics off.',
    role: 'Software developer',
    ogLocale: 'en_US',
    alternateOgLocale: 'tr_TR',
  },
  tr: {
    homeTitle: 'H.O.T. | Halil Oğuzcan Toptaş — Yazılım Geliştirici',
    homeDescription:
      'İstanbul’da yaşayan yazılım geliştirici Halil Oğuzcan Toptaş’ın web projeleri, ev sunucusu çalışmaları ve tarayıcı demoları.',
    aboutTitle: 'Halil Oğuzcan Toptaş hakkında',
    aboutDescription:
      'İstanbul’da yaşayan yazılım geliştirici Halil Oğuzcan Toptaş’ı tanıyın; web projelerine ve ev sunucusu çalışmalarına göz atın.',
    projectsDescription:
      'Halil Oğuzcan Toptaş’ın web sitelerini, uygulamalarını ve tarayıcı deneylerini inceleyin.',
    labTitle: 'Retro Game Center: WebAssembly ile DOOM',
    labDescription: 'DOOM Shareware’ı DOSBox-X ve WebAssembly ile tarayıcınızda oynayın.',
    privacyDescription:
      'Bu portföyün kullandığı analitik araçları, toplanabilecek bilgiler ve analitiği kapatma yöntemi.',
    role: 'Yazılım geliştirici',
    ogLocale: 'tr_TR',
    alternateOgLocale: 'en_US',
  },
};

/**
 * Builds a localized route path.
 *
 * @param locale - The locale prefix for the route
 * @param path - The route path appended to the locale
 * @returns The localized route path
 */
function routePath(locale: Locale, path = '') {
  return `/${locale}${path}`;
}

/** Returns absolute alternate-language URLs for a localized route suffix. */
export function localizedLanguageUrls(path = '') {
  return {
    en: siteUrl(routePath('en', path)),
    tr: siteUrl(routePath('tr', path)),
    'x-default': siteUrl(routePath('en', path)),
  };
}

/**
 * Builds shared SEO metadata for a localized route.
 *
 * @param locale - The locale used for localized metadata and social images
 * @param path - The route path relative to the locale prefix
 * @param title - The page title
 * @param description - The page description
 * @returns Metadata containing canonical, alternate-language, social sharing, and indexing information
 */
function sharedMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const copy = seoCopy[locale];
  const canonical = siteUrl(routePath(locale, path));
  const imageAlt = `${identity.brand} portfolio by ${identity.fullName}`;

  return {
    description,
    alternates: {
      canonical,
      languages: localizedLanguageUrls(path),
    },
    authors: [{ name: identity.fullName, url: siteUrl('/en') }],
    creator: identity.fullName,
    publisher: identity.fullName,
    category: 'technology',
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: identity.siteName,
      locale: copy.ogLocale,
      alternateLocale: copy.alternateOgLocale,
      images: [
        {
          url: siteUrl(`/${locale}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: siteUrl(`/${locale}/twitter-image`),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

/** Builds root layout metadata for the requested public locale. */
export function createRootMetadata(locale: Locale): Metadata {
  const copy = seoCopy[locale];
  const metadata = sharedMetadata(locale, '', copy.homeTitle, copy.homeDescription);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    ...metadata,
    metadataBase: new URL(siteOrigin),
    applicationName: identity.siteName,
    title: {
      default: copy.homeTitle,
      template: `%s | ${identity.brand}`,
    },
    verification: googleVerification ? { google: googleVerification } : undefined,
  };
}

/**
 * Creates metadata for a localized route.
 *
 * @param locale - The route's locale
 * @param path - The route path used for canonical and alternate URLs
 * @param title - The page title
 * @param description - The page description
 * @returns Metadata containing localized canonical, alternate, and social fields
 */
export function createRouteMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    ...sharedMetadata(locale, path, `${title} | ${identity.brand}`, description),
    title,
  };
}
