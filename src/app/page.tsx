'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

import { AiOutlineLinkedin } from 'react-icons/ai'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { FiGithub } from 'react-icons/fi'
import { Within } from '@theme-toggles/react'
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import '@theme-toggles/react/css/Within.css'
import { useEffect, useState } from 'react'

interface Links {
  id: number
  platform: string
  link: string
  img: JSX.Element
}

const Welcome = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const myLinks: Links[] = [
    {
      id: 0,
      platform: 'github',
      link: 'https://github.com/ogiboy',
      img: <FiGithub />,
    },
    {
      id: 1,
      platform: 'mail',
      link: 'mailto:oguzcantoptas@gmail.com',
      img: <IoMailUnreadOutline />,
    },
    {
      id: 2,
      platform: 'linkedin',
      link: 'https://www.linkedin.com/in/hoguzcantoptas/',
      img: <AiOutlineLinkedin />,
    },
  ]

  if (!isMounted) return null

  return (
    <div className="app text-slate-600 bg-slate-200 h-full dark:bg-slate-700 dark:text-slate-300 cursor-default">
      <header>
        <nav>
          <Within
            toggled={systemTheme === theme}
            toggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="theme-toggler"
            placeholder="theme-toggler"
            tabIndex={999}
            duration={1000}
          />
        </nav>
      </header>
      <div className="main w-4/5 my-20 mx-auto min-h-80 flex flex-col justify-evenly items-center">
        <h1 className="heading text-5xl font-bold italic text-center">
          COMING SOON
        </h1>
        <p className="text-2xl text-center">Under construction</p>
        <div className="links-area flex flex-col min-h-32">
          <h3 className="text-center underline m-2">Links</h3>
          <div className="w-full flex justify-evenly items-center min-h-20">
            {myLinks.map((link) => {
              return (
                <Link
                  className="w-28 flex flex-col justify-evenly items-center mx-2 hover:bg-slate-300 dark:hover:bg-slate-500 rounded"
                  href={link.link}
                  key={link.id}
                >
                  <div className="flex justify-center items-baseline text-lg scale-125 m-3">
                    {link.img}
                  </div>
                  {link.platform}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const Wrapper = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

const App = () => {
  return <Wrapper Component={Welcome} />
}

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="app">
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
    </div>
  )
}
export default App
