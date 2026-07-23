import type { Metadata } from 'next';
import type { Locale } from '@/content/site';
import { siteOrigin, siteUrl } from '@/lib/site-url';

export const identity = {
  brand: 'H.O.T.',
  fullName: 'Halil Oğuzcan Toptaş',
  knownAs: 'Oğuzcan Toptaş',
  siteName: 'H.O.T. Developer Lab',
} as const;

export const seoCopy: Record<
  Locale,
  {
    homeTitle: string;
    homeDescription: string;
    projectsDescription: string;
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
    projectsDescription:
      'Browse frontend projects, API interfaces, utilities, forms, and browser experiments by Halil Oğuzcan Toptaş.',
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
    projectsDescription:
      'Halil Oğuzcan Toptaş’ın frontend projelerini, API arayüzlerini, yardımcı araçlarını, formlarını ve browser deneylerini inceleyin.',
    labDescription:
      'DOOM Shareware çalıştıran, izole ve yalnızca etkileşimden sonra yüklenen DOSBox-X tabanlı canlı WebAssembly laboratuvarı.',
    privacyDescription:
      'H.O.T. portföyünün reklam profili oluşturmadan toplu analitik ve performans ölçümünü, kalıcı yerel vazgeçme tercihiyle nasıl kullandığı.',
    role: 'Yazılım geliştirici ve homelab meraklısı',
    ogLocale: 'tr_TR',
    alternateOgLocale: 'en_US',
  },
};

function routePath(locale: Locale, path = '') {
  return `/${locale}${path}`;
}

export function localizedLanguageUrls(path = '') {
  return {
    en: siteUrl(routePath('en', path)),
    tr: siteUrl(routePath('tr', path)),
    'x-default': siteUrl(routePath('en', path)),
  };
}

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
