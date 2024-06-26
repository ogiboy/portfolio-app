import Link from 'next/link'
import Image from 'next/image'

import { Within } from '@theme-toggles/react'

import { VscSignIn } from 'react-icons/vsc'
import { VscSignOut } from 'react-icons/vsc'
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineHome } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'

import { Menu, Transition } from '@headlessui/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useTheme } from 'next-themes'

import '@theme-toggles/react/css/Within.css'

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme()

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
      name: 'home',
      img: <AiOutlineHome />,
      link: '/',
    },
    {
      id: 1,
      name: 'dashboard',
      img: <RxDashboard />,
      link: '/dashboard',
    },
    {
      id: 2,
      name: user ? 'log out' : 'log in',
      img: user ? <VscSignOut /> : <VscSignIn />,
      link: user ? '/api/auth/logout' : '/api/auth/login',
    },
  ]

  return (
    <nav className="nav text-slate-600 bg-slate-200/50 dark:bg-slate-700/50 dark:text-slate-300 w-screen max-h-fit flex justify-between items-center flex-row-reverse fixed top-0 pb-1 border-b border-slate-300 dark:border-slate-800 rounded-sm z-50">
      <div className="themeToggle shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500 rounded-2xl">
        <Within
          toggled={systemTheme === theme}
          toggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="theme-toggler"
          placeholder="theme-toggler"
          tabIndex={999}
          duration={1000}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
      <div className="menus m-2 ">
        <Menu>
          <Menu.Button className="flex justify-between items-center">
            {user ? (
              <Image
                src={user.picture!}
                alt={user.name!}
                width={30}
                height={30}
                className="rounded-lg hover:shadow-lg"
              />
            ) : (
              <VscAccount className="scale-150 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500 rounded-2xl" />
            )}
            <span className="mx-2 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500 rounded-2xl">
              Welcome, {user ? user.name : 'Guest'}
            </span>
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute flex flex-col justify-around mx-2 my-2 z-50 bg-black/10 dark:bg-white/10 rounded-md p-2 w-24 h-36">
              {menuItems.map((item) => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <Link
                      className={`${
                        active &&
                        'text-slate-200 bg-slate-700 rounded-md p-1 dark:text-slate-700 dark:bg-slate-200'
                      }`}
                      href={item.link}
                    >
                      <span>{item.img}</span>
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  )
}
export default Navbar
