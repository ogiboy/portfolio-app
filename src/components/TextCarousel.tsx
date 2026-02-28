import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

// Supports weights 400-700
// import '@fontsource-variable/dancing-script'

interface TextCarouselProps {
  texts: string[]
}

const TextCarousel: React.FC<TextCarouselProps> = ({ texts }) => {
  const [index, setIndex] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)
  const [cursorStyle, setCursorStyle] = useState<string>('cursor-grab')

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setIndex(
        (prevIndex) => (prevIndex + newDirection + texts.length) % texts.length
      )
    },
    [texts.length]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [texts.length])

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setCursorStyle('cursor-grabbing')
  }

  function handleMouseUp(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setCursorStyle('cursor-grab')
  }

  return (
    <div
      className={`w-screen h-screen px-5 text-wrap font-carouselFont flex justify-center items-center text-7xl overflow-hidden`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className={`w-full text-center absolute ${cursorStyle}`}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseUp(e)}
        >
          <p className="select-none pb-28">{texts[index]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
export default TextCarousel
