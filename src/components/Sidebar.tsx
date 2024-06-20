'use client'

import Link from 'next/link'
import Modal from './Modal'

import { GrContactInfo } from 'react-icons/gr'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { FiGithub } from 'react-icons/fi'
import { BsFiletypeHtml } from 'react-icons/bs'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { openModal } from '@/app/features/modal/modalSlice'

// Supports weights 400-900
import '@fontsource-variable/cinzel'

interface Links {
  id: number
  platform: string
  link: string
  img: JSX.Element
}

const Sidebar: React.FC = () => {
  const { isOpen } = useSelector((store: RootState) => store.modal)
  const [isActive, setIsActive] = useState<boolean>(false)

  const dispatch = useDispatch()

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
    {
      id: 3,
      platform: 'about me',
      link: 'myResume.pdf',
      img: <GrContactInfo />,
    },
    {
      id: 4,
      platform: 'projects',
      link: '/projects',
      img: <BsFiletypeHtml />,
    },
  ]

  useEffect(() => {
    const ringing = setInterval(() => {
      setIsActive((prevIsActive) => !prevIsActive)
    }, 1000)

    return () => {
      clearInterval(ringing)
    }
  }, [])

  return (
    <main
      className={`text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300 cursor-default w-2/3 h-fit flex flex-col items-center justify-center hover:border hover:w-28 transition-all ease-in-out ${
        isActive
          ? 'border-2 dark:border-slate-300 border-slate-700'
          : 'border-none'
      } rounded-md mx-2`}
    >
      {isOpen && (
        <header>
          <Modal />
        </header>
      )}
      <nav className="w-full h-2/3 flex flex-col items-center justify-center scale-75 font-sidebarFont">
        {myLinks.map((link) => {
          return (
            <Link
              className="min-w-20 max-w-24 flex flex-col justify-evenly items-center mx-4 hover:bg-slate-300 dark:hover:bg-slate-500 rounded text-nowrap hover:scale-150 hover:my-3 hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-all ease-in duration-300"
              href={link.link}
              key={link.id}
              target={link.platform === 'projects' ? '_self' : '_blank'}
              onClick={(e) => {
                if (link.platform === 'about me') {
                  e.preventDefault()
                  dispatch(openModal())
                }
              }}
            >
              <div className="flex justify-center items-baseline text-lg scale-125 m-3">
                {link.img}
              </div>
              {link.platform}
            </Link>
          )
        })}
      </nav>
    </main>
  )
}

export default Sidebar
