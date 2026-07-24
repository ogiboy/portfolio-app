import type { Metadata } from 'next';
import type { Locale } from '@/content/site';
import { siteOrigin, siteUrl } from '@/lib/site-url';

/** Canonical brand and author identity used throughout public metadata. */
export const identity = {
  brand: 'H.O.T.',
  fullName: 'Halil Oğuzcan Toptaş',
  knownAs: 'Oğuzcan Toptaş',
  siteName: 'H.O.T. Developer Lab',
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
    homeTitle: 'H.O.T. | Halil Oğuzcan Toptaş - Developer & Homelab',
    homeDescription:
      'H.O.T. is Halil Oğuzcan Toptaş’s developer and homelab portfolio: frontend projects, automation, self-hosting experiments, a project archive, and an isolated WebAssembly lab.',
    aboutTitle: 'About Halil Oğuzcan Toptaş',
    aboutDescription:
      'Meet Halil Oğuzcan Toptaş, an Istanbul-based software developer and homelab hobbyist building web interfaces, automation systems, and browser experiments.',
    projectsDescription:
      'Browse frontend projects, API interfaces, utilities, forms, and browser experiments by Halil Oğuzcan Toptaş.',
    labTitle: 'Retro Game Center: DOOM in WebAssembly',
    labDescription:
      'A live WebAssembly lab running DOOM Shareware through an isolated, lazy-loaded DOSBox-X browser runtime.',
    privacyDescription:
      'How the H.O.T. portfolio uses aggregate analytics and performance measurements without building advertising profiles, with a durable local opt-out.',
    role: 'Software developer and homelab hobbyist',
    ogLocale: 'en_US',
    alternateOgLocale: 'tr_TR',
  },
  tr: {
    homeTitle: 'H.O.T. | Halil Oğuzcan Toptaş - Geliştirici & Homelab',
    homeDescription:
      'H.O.T., Halil Oğuzcan Toptaş’ın geliştirici ve homelab portföyüdür: frontend projeleri, otomasyon, self-hosting denemeleri, proje arşivi ve izole WebAssembly labı.',
    aboutTitle: 'Halil Oğuzcan Toptaş hakkında',
    aboutDescription:
      'Halil Oğuzcan Toptaş, İstanbul’da web arayüzleri, otomasyon sistemleri ve browser deneyleri geliştiren bir yazılım geliştirici ve homelab meraklısıdır.',
    projectsDescription:
      'Halil Oğuzcan Toptaş’ın frontend projelerini, API arayüzlerini, yardımcı araçlarını, formlarını ve browser deneylerini inceleyin.',
    labTitle: 'Retro Game Center: WebAssembly ile DOOM',
    labDescription:
      'DOOM Shareware çalıştıran, izole ve yalnızca etkileşimden sonra yüklenen DOSBox-X tabanlı canlı WebAssembly laboratuvarı.',
    privacyDescription:
      'H.O.T. portföyünün reklam profili oluşturmadan toplu analitik ve performans ölçümünü, kalıcı yerel vazgeçme tercihiyle nasıl kullandığı.',
    role: 'Yazılım geliştirici ve homelab meraklısı',
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
  const imageAlt = `${identity.brand} developer and homelab portfolio by ${identity.fullName}`;

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
