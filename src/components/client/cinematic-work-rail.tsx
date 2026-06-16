'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/content/projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobileViewport = window.matchMedia('(max-width: 767px)').matches;

      if (reduceMotion || mobileViewport || !root.current || !track.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]');

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          once: true,
        },
      });

      const distance = track.current.scrollWidth - window.innerWidth;

      if (distance <= 0) {
        return;
      }

      gsap.to(track.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root, dependencies: [projects.length] },
  );

  return (
    <section
      ref={root}
      className="border-foreground bg-foreground text-background overflow-hidden border-y-2 py-16 md:py-0"
    >
      <div
        ref={track}
        className="mx-auto grid max-w-7xl gap-6 px-4 md:flex md:h-[100dvh] md:max-w-none md:items-center md:px-8"
      >
        <div className="max-w-xl shrink-0 md:w-[38vw]">
          <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
            {title}
          </h2>
          <p className="text-background/75 mt-6 text-lg leading-relaxed">{intro}</p>
        </div>

        {projects.map((project) => (
          <article
            key={project.slug}
            data-work-card
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
          </article>
        ))}
      </div>
    </section>
  );
}
