'use client';

import LangSwitcher from './LangSwitcher';
import ThemeButton from './ThemeToggler/WithinThemeToggle';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTranslations } from 'next-intl';
import Dropdown from './Dropdown';

import type { JSX } from 'react';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const { user } = useUser();

  const menuItems: Array<{
    id: number;
    name: string;
    link: string;
    img: JSX.Element;
  }> = [
    { id: 0, name: t('Home'), img: <AiOutlineHome />, link: '/' },
    { id: 1, name: t('Dashboard'), img: <RxDashboard />, link: '/dashboard' },
    {
      id: 2,
      name: user ? t('Logout') : t('Login'),
      img: user ? <VscSignOut /> : <VscSignIn />,
      link: user ? '/auth/logout' : '/auth/login',
    },
  ];

  return (
    <nav
      suppressHydrationWarning
      className="fixed top-0 w-screen z-50 flex justify-between items-center px-4 py-2 border-b border-white/6 bg-black/30 backdrop-blur-md"
    >
      {/* Left: menu + title */}
      <div className="flex items-center gap-4">
        <Dropdown items={menuItems} />
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-white">
            {t('title')}
          </span>
          {user && (
            <span className="text-xs font-mono text-slate-500">
              ({user.name})
            </span>
          )}
        </div>
      </div>

      {/* Right: theme + lang */}
      <div className="flex items-center gap-2">
        <ThemeButton
          className={
            'w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 hover:bg-white/10 transition-colors'
          }
        />

        <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden">
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
