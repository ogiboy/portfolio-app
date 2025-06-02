import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware({
  // Mevcut locale ve routing ayarlarını kullan
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  
  // URL'lerde her zaman locale gösterilsin
  localePrefix: 'always',
  
  // Tarayıcı dilini otomatik algıla
  localeDetection: true
})

export const config = {
  matcher: [
    // Tüm public route'lar için
    '/',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    // Özel olarak dashboard ve projects route'ları için
    '/(dashboard|projects)/:path*'
  ]
}
