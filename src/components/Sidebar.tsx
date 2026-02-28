'use client';

import Modal from './Modal';

import { GrContactInfo } from 'react-icons/gr';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { FiGithub } from 'react-icons/fi';
import { BsFiletypeHtml } from 'react-icons/bs';

import { useState, type JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface Links {
  id: number;
  platform: string;
  link: string;
  img: JSX.Element;
}

const Sidebar: React.FC = () => {
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const [, setIsHovered] = useState<boolean>(false);
  const t = useTranslations('Sidebar');

  const myLinks: Links[] = [
    {
      id: 0,
      platform: 'GitHub',
      link: 'https://github.com/ogiboy',
      img: <FiGithub />,
    },
    {
      id: 1,
      platform: t('email'),
      link: 'mailto:oguzcantoptas@gmail.com',
      img: <IoMailUnreadOutline />,
    },
    {
      id: 2,
      platform: 'LinkedIn',
      link: 'https://www.linkedin.com/in/hoguzcantoptas/',
      img: <AiOutlineLinkedin />,
    },
    {
      id: 3,
      platform: t('aboutme'),
      link: 'myResume.pdf',
      img: <GrContactInfo />,
    },
    {
      id: 4,
      platform: t('projects'),
      link: '/projects',
      img: <BsFiletypeHtml />,
    },
  ];

  return (
    <main
      className="relative flex flex-col items-center gap-1 p-2 rounded-xl border border-white/8 bg-white/5 backdrop-blur-md w-16 hover:w-28 transition-all duration-500 ease-in-out overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOpen && <Modal />}

      <nav className="w-full flex flex-col items-center gap-1">
        {myLinks.map((link) => (
          <Link
            key={link.id}
            href={link.link}
            className="relative w-full flex items-center gap-2.5 px-2 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            title={link.platform}
          >
            <span className="text-base flex-shrink-0 w-5 flex items-center justify-center">
              {link.img}
            </span>
            <span className="text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {link.platform}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
};

export default Sidebar;
