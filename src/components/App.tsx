'use client'

import SidebarWrapper from './SidebarWrapper'
import TextCarousel from './TextCarousel'

import Image from 'next/image'

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
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useTrail, animated } from '@react-spring/web'
import React, { useState } from 'react'

const App: React.FC = () => {
  const logoZIndex = 10
  const logoScale = 4

  const [isOpen, setIsOpen] = useState(true)

  const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({
    open,
    children,
  }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      height: open ? 'auto' : 0,
      from: { opacity: 0, x: 20, height: 0 },
    })
    return (
      <div>
        {trail.map(({ height, ...style }, index) => (
          <animated.div key={index} style={{ ...style, overflow: 'hidden' }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    )
  }

  return (
    <Parallax pages={3} className="text-mainTextClr antialiased">
      {/* text carousel parallax */}
      {/* first page */}
      <ParallaxLayer
        className="bg-firstParallax"
        offset={0}
        factor={2}
        speed={-0.5}
        style={{ zIndex: 5 }}
      >
        <TextCarousel texts={texts} />
      </ParallaxLayer>

      {/* sticky sidebar parallax */}
      <ParallaxLayer sticky={{ start: 1, end: 2 }}>
        <SidebarWrapper />
      </ParallaxLayer>

      {/* tardis parallax */}
      <ParallaxLayer
        speed={-1.5}
        horizontal
        style={{ left: 20, top: '20%', zIndex: 6 }}
        className="animate-pulse"
      >
        <Image
          src={tardis}
          alt="tardis svg"
          height={20}
          width={20}
          style={{ scale: 1.5, transform: 'rotate(10deg)' }}
        />
      </ParallaxLayer>

      {/* cube parallax */}
      <ParallaxLayer
        speed={1.9}
        style={{ marginLeft: '30%', zIndex: logoZIndex }}
        offset={1.5}
      >
        <Image
          src={cubes}
          alt="cubes svg"
          height={20}
          width={20}
          style={{ scale: logoScale }}
        />
      </ParallaxLayer>

      {/* codebooks parallax */}
      <ParallaxLayer
        speed={1.9}
        style={{ marginLeft: '50%', zIndex: logoZIndex }}
        offset={1.5}
      >
        <Image
          src={codingBooks}
          alt="codingbooks svg"
          height={20}
          width={20}
          style={{ scale: logoScale }}
        />
      </ParallaxLayer>

      {/* fixing bugs svg */}
      <ParallaxLayer
        speed={1.9}
        style={{ marginLeft: '70%', zIndex: logoZIndex }}
        offset={1.5}
      >
        <Image
          src={fixingBugs}
          alt="fixingbugs svg"
          height={20}
          width={20}
          style={{ scale: logoScale }}
        />
      </ParallaxLayer>

      {/* down arrow parallax */}

      <ParallaxLayer
        offset={0.9}
        speed={1}
        style={{ marginLeft: '50%', zIndex: 6 }}
      >
        <HiChevronDoubleDown
          style={{ scale: 1.8 }}
          className=" animate-bounce"
        />
      </ParallaxLayer>

      {/* about me parallax */}
      {/* second page */}
      <ParallaxLayer
        offset={1}
        factor={1}
        speed={1.5}
        style={{ zIndex: 9 }}
        className="text-3xl bg-secondParallax font-sidebarFont flex flex-col justify-evenly items-center"
      >
        <h1>I&apos;m Oğuzcan,</h1>

        <h1>Web Developer</h1>
      </ParallaxLayer>

      {/* html logo parallax */}
      <ParallaxLayer
        offset={1}
        speed={-2}
        style={{
          marginLeft: '20%',
          zIndex: logoZIndex,
        }}
      >
        <Image
          src={htmlLogo}
          alt="html logo svg"
          height={20}
          width={20}
          style={{ opacity: 0.7, scale: logoScale }}
        />
      </ParallaxLayer>

      {/* css logo parallax */}
      <ParallaxLayer
        offset={1}
        speed={-2.3}
        style={{
          marginLeft: '40%',
          zIndex: logoZIndex,
        }}
      >
        <Image
          src={cssLogo}
          alt="css logo svg"
          height={20}
          width={20}
          style={{ opacity: 0.7, scale: logoScale }}
        />
      </ParallaxLayer>

      {/* js logo parallax */}
      <ParallaxLayer
        offset={1}
        speed={-2.6}
        style={{
          marginLeft: '60%',
          zIndex: logoZIndex,
        }}
      >
        <Image
          src={jsLogo}
          alt="js logo svg"
          height={20}
          width={20}
          style={{ opacity: 0.7, scale: logoScale }}
        />
      </ParallaxLayer>

      {/* react logo parallax */}
      <ParallaxLayer
        offset={1}
        speed={-3}
        style={{
          marginLeft: '80%',
          zIndex: logoZIndex,
        }}
      >
        <Image
          src={reactLogo}
          alt="react logo svg"
          height={20}
          width={20}
          style={{ opacity: 0.7, scale: logoScale }}
        />
      </ParallaxLayer>

      {/* third page */}
      <ParallaxLayer
        style={{ zIndex: 55 }}
        offset={2}
        factor={1}
        speed={0.5}
        className="border-2 bg-thirdParallax"
      ></ParallaxLayer>

      <ParallaxLayer speed={2.5} offset={2} style={{ zIndex: 56 }}>
        <Trail open={isOpen}>
          <p className="text-pink-500 text-4xl p-10 w-screen text-center mt-28">
            feel free
          </p>
          <p className="text-pink-500 text-4xl p-10 w-screen text-center mt-28">
            to react out
          </p>
          <p className="text-pink-500 text-4xl p-10 w-screen text-center mt-28">
            for collabs
          </p>
        </Trail>
        {/* <p className="text-pink-500 text-4xl p-10 w-screen text-center mt-28">
          Feel free to reach out for collabs
        </p> */}
      </ParallaxLayer>
    </Parallax>
  )
}
export default App
