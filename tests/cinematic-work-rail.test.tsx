import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CinematicWorkRail } from '@/components/client/cinematic-work-rail';

const motionMocks = vi.hoisted(() => ({ reduceMotion: false }));

vi.mock('motion/react', async () => {
  return {
    LazyMotion: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => motionMocks.reduceMotion,
    useScroll: () => ({ scrollYProgress: {} }),
    useTransform: () => 0,
  };
});

vi.mock('motion/react-m', async () => {
  const React = await import('react');
  const createMotionElement = (tag: 'article' | 'div') =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(function MotionElement(
      { initial, transition, viewport, whileInView, ...props },
      ref,
    ) {
      void initial;
      void transition;
      void viewport;
      void whileInView;
      return React.createElement(tag, { ...props, ref });
    });

  return {
    article: createMotionElement('article'),
    div: createMotionElement('div'),
  };
});

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <span aria-label={alt} role="img" />,
}));

const projects = [
  {
    category: 'Lab',
    description: 'A measured project.',
    gitUrl: 'https://github.com/example/project',
    id: 1,
    image: { blurDataURL: 'data:image/png;base64,', height: 600, src: '/project.png', width: 800 },
    name: 'Measured Project',
    slug: 'measured-project',
    stack: ['Next.js'],
    url: 'https://example.com/project',
    year: '2026',
  },
  {
    category: 'Lab',
    description: 'The final project remains reachable.',
    gitUrl: 'https://github.com/example/final-project',
    id: 2,
    image: { blurDataURL: 'data:image/png;base64,', height: 600, src: '/final.png', width: 800 },
    name: 'Final Project',
    slug: 'final-project',
    stack: ['Next.js'],
    url: 'https://example.com/final-project',
    year: '2026',
  },
];

function installMatchMedia(eligible: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query.includes('min-width') ? eligible : false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
    })),
  );
}

function installSaveData(saveData: boolean) {
  Object.defineProperty(window.navigator, 'connection', {
    configurable: true,
    value: {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      saveData,
    },
  });
}

describe('CinematicWorkRail', () => {
  afterEach(() => {
    cleanup();
    motionMocks.reduceMotion = false;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window.navigator, 'connection');
  });

  it('measures a desktop scroll stage and keeps its content rendered', async () => {
    installMatchMedia(true);
    let trackWidth = 1600;
    vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(() => trackWidth);
    vi.stubGlobal('innerWidth', 1000);
    const observe = vi.fn();
    const disconnect = vi.fn();
    let resizeCallback: ResizeObserverCallback | undefined;

    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }

        disconnect = disconnect;
        observe = observe;
      },
    );

    const { container, getByText } = render(
      <CinematicWorkRail title="Work" intro="Selected work" projects={projects} />,
    );

    await waitFor(() =>
      expect(container.querySelector('section')).toHaveStyle({ height: 'calc(100dvh + 600px)' }),
    );
    expect(observe).toHaveBeenCalledTimes(1);
    expect(getByText('Measured Project')).toBeInTheDocument();

    trackWidth = 1900;
    resizeCallback?.([], {} as ResizeObserver);
    await waitFor(() =>
      expect(container.querySelector('section')).toHaveStyle({ height: 'calc(100dvh + 900px)' }),
    );

    cleanup();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('keeps a natural-height rail when reduced motion is requested', async () => {
    installMatchMedia(true);
    motionMocks.reduceMotion = true;
    const observer = vi.fn();
    vi.stubGlobal('ResizeObserver', observer);

    const { container } = render(
      <CinematicWorkRail title="Work" intro="Selected work" projects={projects} />,
    );

    await waitFor(() => expect(window.matchMedia).toHaveBeenCalled());
    expect(container.querySelector('section')).not.toHaveAttribute('style');
    expect(container.querySelector('[data-cinematic-track]')).toHaveClass('md:grid-cols-2');
    expect(getComputedStyle(container.querySelectorAll('article')[1]).display).not.toBe('none');
    expect(observer).not.toHaveBeenCalled();
  });

  it('keeps a natural-height rail when a fine pointer is unavailable', async () => {
    installMatchMedia(false);
    const observer = vi.fn();
    vi.stubGlobal('ResizeObserver', observer);

    const { container } = render(
      <CinematicWorkRail title="Work" intro="Selected work" projects={projects} />,
    );

    await waitFor(() => expect(window.matchMedia).toHaveBeenCalled());
    expect(container.querySelector('section')).toHaveAttribute('data-motion-mode', 'static');
    expect(container.querySelector('section')).not.toHaveAttribute('style');
    expect(observer).not.toHaveBeenCalled();
  });

  it('keeps a natural-height rail when data saver is enabled', async () => {
    installMatchMedia(true);
    installSaveData(true);
    const observer = vi.fn();
    vi.stubGlobal('ResizeObserver', observer);

    const { container } = render(
      <CinematicWorkRail title="Work" intro="Selected work" projects={projects} />,
    );

    await waitFor(() => expect(window.matchMedia).toHaveBeenCalled());
    expect(container.querySelector('section')).toHaveAttribute('data-motion-mode', 'static');
    expect(container.querySelector('section')).not.toHaveAttribute('style');
    expect(observer).not.toHaveBeenCalled();
  });
});
