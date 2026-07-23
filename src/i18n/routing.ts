import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'tr'],

  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'always',
  localeDetection: true,

  // Locale-prefixed URLs are canonical; root detection does not need persistent visitor state.
  localeCookie: false,
});
