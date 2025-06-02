'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store/store'
import { NextIntlClientProvider } from 'next-intl'

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode
  messages: any
  locale: string
}) {
  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Europe/Istanbul"
          >
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </UserProvider>
    </ReduxProvider>
  )
}
