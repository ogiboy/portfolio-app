import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';
import { auth0 } from '@/lib/auth0';

const intlMiddleware = createMiddleware({
  // Mevcut locale ve routing ayarlarını kullan
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,

  // URL'lerde her zaman locale gösterilsin
  localePrefix: 'always',

  // Tarayıcı dilini otomatik algıla
  localeDetection: true,
});

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return auth0.middleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Tüm public route'lar için
    '/',
    String.raw`/((?!api|trpc|_next|_vercel|.*\..*).*)`,
    // Özel olarak dashboard ve projects route'ları için
    '/(dashboard|projects)/:path*',
  ],
};
