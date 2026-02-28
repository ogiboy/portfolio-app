import '../globals.css'

import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const params = await props.params

  const { children } = props

  const { locale } = params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <Providers locale={locale} messages={messages}>
      <html lang={locale} suppressHydrationWarning>
        <body className="antialiased scroll-smooth">
          <Navbar />
          {children}
        </body>
      </html>
    </Providers>
  )
}
