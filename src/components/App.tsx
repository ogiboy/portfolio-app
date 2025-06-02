'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { HiChevronDoubleDown } from 'react-icons/hi'

import SidebarWrapper from './SidebarWrapper'
import TextCarousel from './TextCarousel'

// Image imports
import htmlLogo from '../../public/html-logo.svg'
import jsLogo from '../../public/js-logo.svg'
import reactLogo from '../../public/react-logo.svg'
import cssLogo from '../../public/css-logo.svg'
import tardis from '../../public/tardis.svg'
import cubes from '../../public/Sticker-cubes.svg'
import codingBooks from '../../public/Sticker-coding-books.svg'
import fixingBugs from '../../public/Fixing-Bugs.svg'
import texts from '../app/lib/hello'

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Transform values for different parallax speeds
  const firstLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const secondLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const thirdLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fourthLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Constants
  const logoScale = 4
  const logoStyle = { opacity: 0.7, scale: logoScale }

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] text-mainTextClr antialiased"
    >
      {/* First Page */}
      <motion.section
        className="h-screen sticky top-0 bg-firstParallax overflow-hidden"
        style={{ y: firstLayerY }}
      >
        <TextCarousel texts={texts} />

        {/* Floating Elements */}
        <motion.div
          className="absolute left-[20%] top-[20%]"
          animate={{
            x: [-20, 20],
            y: [-20, 20],
            rotate: [0, 10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Image
            src={tardis}
            alt="tardis svg"
            height={20}
            width={20}
            className="scale-150"
          />
        </motion.div>
      </motion.section>

      {/* Second Page */}
      <motion.section
        className="h-screen sticky top-0 bg-secondParallax"
        style={{ y: secondLayerY }}
      >
        <SidebarWrapper />

        <div className="flex flex-col justify-evenly items-center h-full text-3xl font-sidebarFont">
          <h1>I&apos;m Oğuzcan,</h1>
          <h1>Web Developer</h1>
        </div>

        {/* Tech Stack Logos */}
        <div className="absolute inset-0 flex justify-around items-center">
          <motion.div style={{ y: thirdLayerY }}>
            <Image
              src={htmlLogo}
              alt="HTML"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
          <motion.div style={{ y: fourthLayerY }}>
            <Image
              src={cssLogo}
              alt="CSS"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
          <motion.div style={{ y: thirdLayerY }}>
            <Image
              src={jsLogo}
              alt="JavaScript"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
          <motion.div style={{ y: fourthLayerY }}>
            <Image
              src={reactLogo}
              alt="React"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Third Page */}
      <motion.section
        className="h-screen sticky top-0 bg-thirdParallax"
        style={{ y: thirdLayerY }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <motion.p
            className="text-pink-500 text-4xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            feel free
          </motion.p>
          <motion.p
            className="text-pink-500 text-4xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            to reach out
          </motion.p>
          <motion.p
            className="text-pink-500 text-4xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            for collabs
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <motion.div className="absolute inset-0 flex justify-around items-center pointer-events-none">
          <motion.div style={{ x: fourthLayerY }}>
            <Image
              src={cubes}
              alt="cubes"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
          <motion.div style={{ x: thirdLayerY }}>
            <Image
              src={codingBooks}
              alt="coding books"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
          <motion.div style={{ x: fourthLayerY }}>
            <Image
              src={fixingBugs}
              alt="fixing bugs"
              height={20}
              width={20}
              style={logoStyle}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <HiChevronDoubleDown className="text-3xl" />
      </motion.div>
    </div>
  )
}

export default App
