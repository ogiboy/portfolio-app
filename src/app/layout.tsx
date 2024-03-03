import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import Taskbar from '@/components/Taskbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyPortfolioApp',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          {children}
          <SpeedInsights />
          <Analytics />
          {/* <footer><Taskbar /></footer> */}
        </body>
      </UserProvider>
    </html>
  )
}
