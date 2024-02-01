'use client'

import Navbar from '@/components/Navbar'

const Page = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <main>
        <h1>Login</h1>
        <a href="/api/auth/login">Login</a>
      </main>
    </div>
  )
}
export default Page
