'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import TextCarousel from './TextCarousel'
import SidebarWrapper from './SidebarWrapper'

// Import assets
import htmlLogo from '../../public/html-logo.svg'
import jsLogo from '../../public/js-logo.svg'
import reactLogo from '../../public/react-logo.svg'
import cssLogo from '../../public/css-logo.svg'
import tardis from '../../public/tardis.svg'
import cubes from '../../public/Sticker-cubes.svg'
import codingBooks from '../../public/Sticker-coding-books.svg'
import fixingBugs from '../../public/Fixing-Bugs.svg'
import texts from '../app/lib/hello'
import { HiChevronDoubleDown } from 'react-icons/hi'

const App = () => {
  // Referanslar ve scroll hooks
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Katmanlar için scroll bazlı transform değerleri
  const firstLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const secondLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const thirdLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  // Logo animasyonları için transform değerleri
  const logoTransforms = [
    useTransform(scrollYProgress, [0, 1], ['0%', '-50%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-60%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-70%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-80%']),
  ]

  // Floating elements için transform değerleri
  const floatingTransforms = [
    useTransform(scrollYProgress, [0, 1], ['0%', '50%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '70%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '90%']),
  ]

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[300vh] text-mainTextClr antialiased overflow-hidden"
    >
      {/* First Page */}
      <motion.section
        style={{ y: firstLayerY }}
        className="min-h-screen bg-firstParallax fixed inset-0 flex items-center justify-center"
      >
        <TextCarousel texts={texts} />
      </motion.section>

      {/* Second Page - About */}
      <motion.section
        style={{ y: secondLayerY }}
        className="min-h-screen bg-secondParallax fixed inset-0 top-[100vh] flex flex-col justify-center items-center"
      >
        <h1 className="text-3xl font-sidebarFont">I&apos;m Oğuzcan,</h1>
        <h1 className="text-3xl font-sidebarFont">Web Developer</h1>

        {/* Tech Logos */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[htmlLogo, cssLogo, jsLogo, reactLogo].map((logo, index) => (
            <motion.div
              key={index}
              style={{
                y: logoTransforms[index],
                x: `${20 + index * 20}%`,
              }}
              className="absolute"
            >
              <Image
                src={logo}
                alt={`tech logo ${index + 1}`}
                width={80}
                height={80}
                className="opacity-70"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Third Page */}
      <motion.section
        style={{ y: thirdLayerY }}
        className="min-h-screen bg-thirdParallax fixed inset-0 top-[200vh] flex flex-col justify-center items-center"
      >
        <motion.p
          className="text-pink-500 text-4xl p-10 text-center"
          style={{ y: useTransform(scrollYProgress, [0.5, 1], [100, 0]) }}
        >
          feel free
        </motion.p>
        <motion.p
          className="text-pink-500 text-4xl p-10 text-center"
          style={{ y: useTransform(scrollYProgress, [0.6, 1], [100, 0]) }}
        >
          to reach out
        </motion.p>
        <motion.p
          className="text-pink-500 text-4xl p-10 text-center"
          style={{ y: useTransform(scrollYProgress, [0.7, 1], [100, 0]) }}
        >
          for collabs
        </motion.p>
      </motion.section>

      {/* Fixed Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <SidebarWrapper />

        {/* Floating Elements */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
          className="absolute top-1/2 left-[20%]"
        >
          <Image
            src={tardis}
            alt="tardis"
            width={30}
            height={30}
            className="animate-pulse"
          />
        </motion.div>

        {/* Other floating elements (cubes, books, bugs) */}
        {[cubes, codingBooks, fixingBugs].map((item, index) => (
          <motion.div
            key={index}
            style={{
              y: floatingTransforms[index],
              x: `${30 + index * 20}%`,
            }}
            className="absolute top-[60%]"
          >
            <Image
              src={item}
              alt={`float ${index + 1}`}
              width={80}
              height={80}
            />
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <HiChevronDoubleDown
          className="animate-bounce"
          style={{ scale: 1.8 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default App
