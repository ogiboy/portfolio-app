'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { HiChevronDoubleDown } from 'react-icons/hi';

import SidebarWrapper from './SidebarWrapper';
import TextCarousel from './TextCarousel';

import htmlLogo from '../../public/html-logo.svg';
import jsLogo from '../../public/js-logo.svg';
import reactLogo from '../../public/react-logo.svg';
import cssLogo from '../../public/css-logo.svg';
import tardis from '../../public/tardis.svg';
import cubes from '../../public/Sticker-cubes.svg';
import codingBooks from '../../public/Sticker-coding-books.svg';
import fixingBugs from '../../public/Fixing-Bugs.svg';
import texts from '../app/lib/hello';

const techStack = [
  'TypeScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Redux Toolkit',
  'Node.js',
  'PostgreSQL',
  'Framer Motion',
];

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const firstLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const secondLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const thirdLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fourthLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] text-mainTextClr antialiased font-body"
    >
      {/* ─── Section 1: Greeting ──────────────────────────────────── */}
      <motion.section
        className="h-screen sticky top-0 bg-firstParallax overflow-hidden"
        style={{ y: firstLayerY }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

        {/* Status badge */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
            Available for work
          </span>
        </div>

        {/* Text carousel */}
        <TextCarousel texts={texts} />

        {/* Floating tardis */}
        <motion.div
          className="absolute left-[15%] top-[22%] z-10"
          animate={{ x: [-15, 15], y: [-15, 15], rotate: [0, 8] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <Image
            src={tardis}
            alt="tardis"
            height={22}
            width={22}
            className="opacity-40"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          animate={{ y: [0, 8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <span className="text-xs font-mono tracking-widest uppercase">
            scroll
          </span>
          <HiChevronDoubleDown className="text-xl" />
        </motion.div>
      </motion.section>

      {/* ─── Section 2: About + Skills ───────────────────────────── */}
      <motion.section
        className="h-screen sticky top-0 bg-secondParallax overflow-hidden"
        style={{ y: secondLayerY }}
      >
        <SidebarWrapper />

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="flex flex-col justify-center items-center h-full gap-10 relative z-10 px-8">
          <div className="text-center">
            <p className="text-xs font-mono text-indigo-400 tracking-[0.3em] uppercase mb-5">
              Web Developer
            </p>
            <h1
              className="font-display text-6xl md:text-7xl font-bold"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #c7d2fe 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              I&apos;m Oğuzcan
            </h1>
            <p className="text-slate-400 mt-5 max-w-md mx-auto text-base leading-relaxed">
              Building modern web experiences with a focus on clean
              architecture, performant UIs, and thoughtful design.
            </p>
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-lg">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-indigo-300 border border-indigo-500/25 bg-indigo-500/8 rounded-full tracking-wide hover:border-indigo-400/50 hover:bg-indigo-500/15 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Background tech logos */}
        <div className="absolute inset-0 flex justify-around items-center pointer-events-none">
          <motion.div style={{ y: thirdLayerY }}>
            <Image
              src={htmlLogo}
              alt="HTML"
              height={20}
              width={20}
              style={{ opacity: 0.08, scale: 4 }}
            />
          </motion.div>
          <motion.div style={{ y: fourthLayerY }}>
            <Image
              src={cssLogo}
              alt="CSS"
              height={20}
              width={20}
              style={{ opacity: 0.08, scale: 4 }}
            />
          </motion.div>
          <motion.div style={{ y: thirdLayerY }}>
            <Image
              src={jsLogo}
              alt="JavaScript"
              height={20}
              width={20}
              style={{ opacity: 0.08, scale: 4 }}
            />
          </motion.div>
          <motion.div style={{ y: fourthLayerY }}>
            <Image
              src={reactLogo}
              alt="React"
              height={20}
              width={20}
              style={{ opacity: 0.08, scale: 4 }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Section 3: CTA ──────────────────────────────────────── */}
      <motion.section
        className="h-screen sticky top-0 bg-thirdParallax overflow-hidden"
        style={{ y: thirdLayerY }}
      >
        {/* Centered glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-violet-600/12 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
          <p className="text-xs font-mono text-violet-400 tracking-[0.3em] uppercase">
            Open to opportunities
          </p>

          <div className="text-center space-y-2">
            <motion.p
              className="font-display text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              feel free
            </motion.p>
            <motion.p
              className="font-display text-5xl md:text-6xl font-bold"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              to reach out
            </motion.p>
            <motion.p
              className="font-display text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              for collabs
            </motion.p>
          </div>

          {/* Decorative elements */}
          <motion.div className="absolute inset-0 flex justify-around items-center pointer-events-none">
            <motion.div style={{ x: fourthLayerY }}>
              <Image
                src={cubes}
                alt="cubes"
                height={20}
                width={20}
                style={{ opacity: 0.07, scale: 4 }}
              />
            </motion.div>
            <motion.div style={{ x: thirdLayerY }}>
              <Image
                src={codingBooks}
                alt="coding books"
                height={20}
                width={20}
                style={{ opacity: 0.07, scale: 4 }}
              />
            </motion.div>
            <motion.div style={{ x: fourthLayerY }}>
              <Image
                src={fixingBugs}
                alt="fixing bugs"
                height={20}
                width={20}
                style={{ opacity: 0.07, scale: 4 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default App;
