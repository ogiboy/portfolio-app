import '../globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Providers from '@/components/Providers';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-app-three-rho.vercel.app'),
  title: {
    default: 'Oğuzcan Toptaş - Frontend Portfolio',
    template: '%s | Oğuzcan Toptaş',
  },
  description:
    'Client-first frontend portfolio by Oğuzcan Toptaş, built with Next.js, shadcn primitives, and cinematic motion.',
  openGraph: {
    title: 'Oğuzcan Toptaş - Frontend Portfolio',
    description:
      'Client-first frontend portfolio with brutalist design systems, Next.js architecture, and production delivery discipline.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale} messages={messages}>
          <SiteHeader locale={locale as Locale} />
          {children}
          <SiteFooter locale={locale as Locale} />
        </Providers>
      </body>
    </html>
  );
}
