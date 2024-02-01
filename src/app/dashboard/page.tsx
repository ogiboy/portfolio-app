'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

const Dashboard = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  return user ? (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  ) : (
    <div>
      <h1>Dashboard</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
export default Dashboard
