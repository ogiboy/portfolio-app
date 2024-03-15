'use client'
import './globals.css'

import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'

import Navbar from '@/components/Navbar'

// export const metadata: Metadata = {
//   title: 'MyPortfolioApp',
//   description: "Oğuzcan Toptaş: Developer's Portfolio",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
