'use client'

import Image from 'next/image'
import WindowsLogo from '../../public/windows_slanted-1.png'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

import '@/styles/taskbar-styles.css'

const StartButton = () => {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <button className="start-button">
      <Image
        src={WindowsLogo}
        alt="windows98 start  button image"
        height={35}
        width={35}
      />
      <span>Start</span>
    </button>
  )
}
export default StartButton
