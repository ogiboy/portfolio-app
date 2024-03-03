'use client'

import Image from 'next/image'
import WindowsLogo from '../../public/windows_slanted-1.png'

import { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import '@/styles/taskbar-styles.css'

const StartButton = () => {
  const [isShowing, setIsShowing] = useState(false)

  const handleBtn = () => {
    setIsShowing((p) => !p)
  }

  return (
    <Menu>
      <Menu.Button onClick={() => handleBtn()} className="start-button">
        <Image
          src={WindowsLogo}
          alt="windows98 start  button image"
          height={35}
          width={35}
        />
        <span>Start</span>
      </Menu.Button>
      {/* <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      > */}
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a className={`${active && 'bg-blue-500'}`} href="#">
              Login
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
      {/* </Transition> */}
    </Menu>
  )
}
export default StartButton
