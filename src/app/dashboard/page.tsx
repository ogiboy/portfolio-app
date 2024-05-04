'use client'

// import { useUser } from '@auth0/nextjs-auth0/client'

import Link from 'next/link'
import Form from '@/components/Form'

import { animated, useSpring, useScroll } from '@react-spring/web'

const Dashboard = () => {
  // const { user, error, isLoading } = useUser()

  // if (isLoading) return <div>Loading...</div>

  // if (error) return <div>{error.message}</div>

  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
  }))

  const { scrollYProgress } = useScroll()

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: 100,
        y: 50,
      },
    })
  }

  return (
    <div className="w-screen h-screen mt-10 flex flex-col items-center flex-start text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300">
      <h1 className="w-screen max-h-fit text-center text-xl m-5">Dashboard</h1>
      <animated.div
        style={{
          ...springs,
          opacity: scrollYProgress,
        }}
        onMouseEnter={handleClick}
      />
      <Link
        className="max-h-fit bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-800 px-5 py-2 rounded-md"
        href="/"
      >
        Home
      </Link>
      <Form />
    </div>
  )
}
export default Dashboard
