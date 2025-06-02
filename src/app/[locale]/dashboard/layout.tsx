import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyPortfolioApp: Dashboard',
  description: "Oğuzcan Toptaş: Developer's Portfolio",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
