'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { LazyMotion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import type { Project } from '@/content/projects';

const desktopMediaQuery = '(min-width: 768px)';
const loadMotionFeatures = () => import('./motion-features').then((module) => module.default);
const subscribeToHydration = () => () => undefined;

function subscribeToDesktopViewport(onStoreChange: () => void) {
  const media = window.matchMedia(desktopMediaQuery);
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(desktopMediaQuery).matches;
}

export function CinematicWorkRail({
  title,
  intro,
  projects,
}: Readonly<{
  title: string;
  intro: string;
  projects: Project[];
}>) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const desktopViewport = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    () => false,
  );
  const motionReady = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [scrollDistance, setScrollDistance] = useState(0);
  const horizontalMotion = desktopViewport && !shouldReduceMotion && scrollDistance > 0;
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, horizontalMotion ? -scrollDistance : 0]);

  useLayoutEffect(() => {
    const trackElement = track.current;

    if (!desktopViewport || shouldReduceMotion || !trackElement) {
      setScrollDistance(0);
      return;
    }

    const measure = () => {
      setScrollDistance(Math.max(trackElement.scrollWidth - window.innerWidth, 0));
    };

    measure();
    window.addEventListener('resize', measure);

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(trackElement);

    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, [desktopViewport, projects.length, shouldReduceMotion]);

  const animateContent = motionReady && !shouldReduceMotion;
  const reveal = animateContent ? { opacity: 0, y: 42 } : false;

  return (
    <section
      ref={root}
      data-cinematic-rail
      style={horizontalMotion ? { height: `calc(100dvh + ${scrollDistance}px)` } : undefined}
      className="border-foreground bg-foreground text-background border-y-2"
    >
      <div
        className={
          horizontalMotion ? 'sticky top-0 h-dvh overflow-hidden' : 'overflow-hidden py-16 md:py-20'
        }
      >
        <LazyMotion features={loadMotionFeatures} strict>
          <m.div
            key={animateContent ? 'animated' : 'static'}
            ref={track}
            data-cinematic-track
            style={{ x }}
            className="mx-auto grid max-w-7xl gap-6 px-4 md:flex md:min-h-dvh md:max-w-none md:items-center md:px-8"
          >
            <m.div
              initial={reveal}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35, once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl shrink-0 md:w-[38vw]"
            >
              <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
                {title}
              </h2>
              <p className="text-background/75 mt-6 text-lg leading-relaxed">{intro}</p>
            </m.div>

            {projects.map((project, index) => (
              <m.article
                key={project.slug}
                initial={reveal}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.2),
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-background bg-background text-foreground grid overflow-hidden border-2 shadow-[8px_8px_0_0_var(--primary)] md:w-[34vw] md:min-w-[26rem]"
              >
                <div className="border-foreground bg-muted relative aspect-[4/3] border-b-2">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 768px) 34vw, 100vw"
                    className="object-cover grayscale"
                    placeholder="blur"
                  />
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.14em] uppercase">
                    {project.category}
                  </p>
                  <h3 className="font-display mt-4 text-3xl leading-none tracking-[-0.05em]">
                    {project.name}
                  </h3>
                </div>
              </m.article>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
