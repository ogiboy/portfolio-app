'use client'

import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { VscAccount } from 'react-icons/vsc'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface DropdownProps {
  items: {
    id: number
    name: string
    link: string
    img: JSX.Element
  }[]
}

const Dropdown = ({ items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const t = useTranslations('Navbar')

  const menuVariants = {
    closed: {
      scale: 0.95,
      opacity: 0,
      y: -20,
      transition: {
        type: 'spring',
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { 
      x: -20, 
      opacity: 0,
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-300/50 dark:hover:bg-slate-600/50 transition-colors"
      >
        <div className="rounded-full overflow-hidden">
          {user ? (
            <Image
              src={user.picture!}
              alt={user.name!}
              width={32}
              height={32}
              className="rounded-full hover:brightness-110 transition-all"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-slate-300/50 dark:bg-slate-600/50 rounded-full">
              <VscAccount className="w-5 h-5" />
            </div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute left-0 mt-2 py-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-xl z-50 border border-slate-200 dark:border-slate-700"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                >
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-700/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      {item.img}
                    </span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
