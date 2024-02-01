'use client'

import Navbar from '@/components/Navbar'

const Page = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Login:</h1>
        <a
          style={{
            color: 'red',
            border: '1px solid red',
            borderRadius: '10px',
          }}
          href="/api/auth/login"
        >
          Login
        </a>
      </main>
      <footer>
        <p
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: '2em',
          }}
        >
          Under Construction
        </p>
      </footer>
    </div>
  )
}
export default Page
