'use client'
import './globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'

import { store } from '../store/store'
import { Provider } from 'react-redux'

import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <UserProvider>
          <body>
            <ThemeProvider attribute="class">
              <Navbar />
              {children}
            </ThemeProvider>
            <SpeedInsights />
            <Analytics />
          </body>
        </UserProvider>
      </html>
    </Provider>
  )
}
