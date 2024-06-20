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

import { HiChevronDoubleDown } from 'react-icons/hi'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const App: React.FC = () => {
  const texts: string[] = [
    'Meow',
    'Hello',
    'Merhaba',
    'Under Construction',
    'Yapım Aşamasında',
  ]

  const logoZIndex = 10
  const logoScale = 4

  return (
    <Parallax pages={3} className="text-mainTextClr">
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
        className="text-6xl bg-secondParallax font-sidebarFont flex flex-col justify-evenly items-center"
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
      >
        za
      </ParallaxLayer>
    </Parallax>
  )
}
export default App
