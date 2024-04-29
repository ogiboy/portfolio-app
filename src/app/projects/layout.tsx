import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyPortfolioApp: Projects',
  description: "Oğuzcan Toptaş: Developer's Portfolio",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
