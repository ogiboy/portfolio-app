'use client'

import { animated, useTransition } from '@react-spring/web'
import React, { useEffect, useState } from 'react'

// Supports weights 400-700
import '@fontsource-variable/dancing-script'

interface TextCarouselProps {
  texts: string[]
}

const TextCarousel: React.FC<TextCarouselProps> = ({ texts }) => {
  const [index, setIndex] = useState<number>(0)

  const transitions = useTransition(texts[index], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
  })

  const updateIndex = () => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length)
  }

  useEffect(() => {
    const timer = setInterval(updateIndex, 4000)

    return () => clearInterval(timer)
  }, [texts])

  return (
    <div className="w-screen h-screen px-5 text-9xl text-wrap font-carouselFont cursor-default flex justify-center items-center">
      {transitions((style, text) => (
        <animated.div className="w-full text-center" style={style}>
          <p className="select-none pb-28">{text}</p>
        </animated.div>
      ))}
    </div>
  )
}
export default TextCarousel
