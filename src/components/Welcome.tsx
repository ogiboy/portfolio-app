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

interface Links {
  id: number
  platform: string
  link: string
  img: JSX.Element
}

const Welcome = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { isOpen } = useSelector((store: RootState) => store.modal)

  const dispatch = useDispatch()

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

  if (!isMounted) return null

  return (
    <main className="app pt-10 w-full text-slate-600 bg-slate-200 h-full dark:bg-slate-700 dark:text-slate-300 cursor-default">
      <header>{isOpen && <Modal />}</header>
      <div className="main w-4/5 mx-auto min-h-96 flex flex-col justify-evenly items-center lg:scale-125">
        <h1 className="heading text-5xl font-bold italic text-center">
          COMING SOON
        </h1>
        <p className="text-2xl text-center">Under construction</p>

        <div className="w-3/4 links-area flex flex-col min-h-32">
          <h3 className="text-center underline m-2">Links</h3>
          <nav className="links w-full flex justify-center items-center min-h-40">
            {myLinks.map((link) => {
              return (
                <Link
                  className="min-w-20 flex flex-col justify-evenly items-center mx-4 hover:bg-slate-300 dark:hover:bg-slate-500 rounded text-nowrap"
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
        </div>
      </div>
    </main>
  )
}

export default Welcome
