'use client';

import Image, { type StaticImageData } from 'next/image';
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { LazyMotion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { useCinematicMotionEligibility } from '@/components/client/use-cinematic-motion-eligibility';
import { cn } from '@/lib/utils';

const loadMotionFeatures = () => import('./motion-features').then((module) => module.default);
const subscribeToHydration = () => () => undefined;

/** Defines the project data rendered by the cinematic work rail. */
export type CinematicProject = {
  category: string;
  image: StaticImageData;
  name: string;
  slug: string;
};

/** Renders project highlights with motion only when the device is eligible. */
export function CinematicWorkRail({
  title,
  intro,
  projects,
}: Readonly<{
  title: string;
  intro: string;
  projects: CinematicProject[];
}>) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cinematicMotionEligible = useCinematicMotionEligibility();
  const motionReady = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [scrollDistance, setScrollDistance] = useState(0);
  const canUseCinematicMotion = cinematicMotionEligible && !shouldReduceMotion;
  const animateContent = motionReady && canUseCinematicMotion;
  const horizontalMotion = canUseCinematicMotion && scrollDistance > 0;
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, horizontalMotion ? -scrollDistance : 0]);

  useLayoutEffect(() => {
    if (!canUseCinematicMotion) {
      return;
    }

    const measure = () => {
      const trackElement = track.current;
      setScrollDistance(
        trackElement ? Math.max(trackElement.scrollWidth - window.innerWidth, 0) : 0,
      );
    };

    measure();
    const observedTrack = track.current;
    if (!observedTrack) return;

    window.addEventListener('resize', measure);

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(observedTrack);

    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, [animateContent, canUseCinematicMotion, projects.length]);

  const reveal = animateContent ? { opacity: 0, y: 42 } : false;

  return (
    <section
      ref={root}
      data-cinematic-rail
      data-motion-mode={canUseCinematicMotion ? 'cinematic' : 'static'}
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
            className={cn(
              'mx-auto grid max-w-7xl gap-6 px-4 md:px-8',
              canUseCinematicMotion
                ? 'md:flex md:min-h-dvh md:max-w-none md:items-center'
                : 'md:grid-cols-2 xl:grid-cols-3',
            )}
          >
            <m.div
              initial={reveal}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35, once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'max-w-xl',
                canUseCinematicMotion ? 'shrink-0 md:w-[38vw]' : 'md:col-span-2 xl:col-span-1',
              )}
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
                className={cn(
                  'border-background bg-background text-foreground grid overflow-hidden border-2 shadow-[8px_8px_0_0_var(--primary)]',
                  canUseCinematicMotion && 'md:w-[34vw] md:min-w-104',
                )}
              >
                <div className="border-foreground bg-muted relative aspect-4/3 border-b-2">
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
                  <h3 className="font-display mt-4 text-3xl leading-none tracking-tighter">
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
