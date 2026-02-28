'use client';

import { Auth0Provider } from '@auth0/nextjs-auth0/client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect } from 'react';
import { setTheme } from '@/app/features/theme/themeSlice';

export default function Providers({
  children,
  messages,
  locale,
}: Readonly<{
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}>) {
  // Sayfa yüklendiğinde localStorage'dan veya sistem tercihinden temayı al
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      store.dispatch(setTheme(savedTheme as 'light' | 'dark'));
    } else {
      const isDarkMode = globalThis.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      store.dispatch(setTheme(isDarkMode ? 'dark' : 'light'));
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <Auth0Provider>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Istanbul"
        >
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </Auth0Provider>
    </ReduxProvider>
  );
}
