import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      {children}
    </div>
  )
}
