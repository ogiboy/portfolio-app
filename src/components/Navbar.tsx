'use client'

import Image from 'next/image'
import LangSwitcher from './LangSwitcher'
import { Within } from '@theme-toggles/react'
import { useTheme } from 'next-themes'
import { VscSignIn, VscSignOut, VscAccount } from 'react-icons/vsc'
import { AiOutlineHome } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useTranslations } from 'next-intl'
import Dropdown from './Dropdown'

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const t = useTranslations('Navbar')
  const { user, isLoading, error } = useUser()

  interface MenuItemsType {
    id: number
    name: string
    link: string
    img: JSX.Element
  }

  const menuItems: MenuItemsType[] = [
    {
      id: 0,
      name: t('Home'),
      img: <AiOutlineHome />,
      link: '/',
    },
    {
      id: 1,
      name: t('Dashboard'),
      img: <RxDashboard />,
      link: '/dashboard',
    },
    {
      id: 2,
      name: user ? t('Logout') : t('Login'),
      img: user ? <VscSignOut /> : <VscSignIn />,
      link: user ? '/api/auth/logout' : '/api/auth/login',
    },
  ]

  return (
    <nav className="nav text-slate-600 bg-slate-200/50 dark:bg-slate-700/50 dark:text-slate-300 w-screen max-h-fit flex justify-between items-center fixed top-0 pb-1 border-b border-slate-300 dark:border-slate-800 rounded-sm z-50">
      <div className="flex items-center gap-8 ml-4">
        <Dropdown items={menuItems} />
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">{t('title')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ({user ? user.name : t('user')})
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mr-6">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-300/50 dark:bg-slate-600/50 shadow-lg shadow-slate-400/30 hover:shadow-slate-500/30 dark:shadow-slate-800/30 dark:hover:shadow-slate-500/30 transition-shadow">
          <Within
            toggled={systemTheme === theme}
            toggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="theme-toggler scale-75"
            placeholder="theme-toggler"
            tabIndex={999}
            duration={1000}
          />
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-300/50 dark:bg-slate-600/50 shadow-lg shadow-slate-400/30 hover:shadow-slate-500/30 dark:shadow-slate-800/30 dark:hover:shadow-slate-500/30 transition-shadow overflow-hidden">
          <LangSwitcher />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
