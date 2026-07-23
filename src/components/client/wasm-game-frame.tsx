'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink, Gamepad2, LoaderCircle, RotateCcw, TriangleAlert } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

const bootTimeoutMs = 20_000;
const enginePath = '/wasm/engine/index.html?game=doom-shareware';

type FrameState = 'idle' | 'booting' | 'ready' | 'error' | 'timeout';

type WasmStatusMessage = {
  attempt: string;
  channel: 'hot-wasm';
  status: 'ready' | 'error';
  version: 1;
};

type WasmGameFrameProps = {
  title: string;
  intro: string;
  launchLabel: string;
  openLabel: string;
  idleTitle: string;
  idleBody: string;
  bootingTitle: string;
  bootingBody: string;
  readyLabel: string;
  errorTitle: string;
  errorBody: string;
  timeoutTitle: string;
  timeoutBody: string;
  retryLabel: string;
};

function isWasmStatusMessage(value: unknown): value is WasmStatusMessage {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<WasmStatusMessage>;
  return (
    candidate.channel === 'hot-wasm' &&
    candidate.version === 1 &&
    (candidate.status === 'ready' || candidate.status === 'error') &&
    typeof candidate.attempt === 'string'
  );
}

function copyForState(frameState: FrameState, copy: WasmGameFrameProps) {
  switch (frameState) {
    case 'booting':
      return { body: copy.bootingBody, title: copy.bootingTitle };
    case 'ready':
      return { body: '', title: copy.readyLabel };
    case 'error':
      return { body: copy.errorBody, title: copy.errorTitle };
    case 'timeout':
      return { body: copy.timeoutBody, title: copy.timeoutTitle };
    default:
      return { body: copy.idleBody, title: copy.idleTitle };
  }
}

function BootActionIcon({
  frameState,
  recoverable,
}: Readonly<{
  frameState: FrameState;
  recoverable: boolean;
}>) {
  if (recoverable) {
    return <RotateCcw data-icon="inline-start" aria-hidden="true" strokeWidth={2.5} />;
  }
  if (frameState === 'booting') {
    return (
      <LoaderCircle
        data-icon="inline-start"
        aria-hidden="true"
        strokeWidth={2.5}
        className="animate-spin"
      />
    );
  }
  return <Gamepad2 data-icon="inline-start" aria-hidden="true" strokeWidth={2.5} />;
}

function FrameStateIcon({
  frameState,
  recoverable,
}: Readonly<{
  frameState: FrameState;
  recoverable: boolean;
}>) {
  if (frameState === 'booting') {
    return (
      <LoaderCircle aria-hidden="true" strokeWidth={2.5} className="mx-auto size-12 animate-spin" />
    );
  }
  if (recoverable) {
    return <TriangleAlert aria-hidden="true" strokeWidth={2.5} className="mx-auto size-12" />;
  }
  return <Gamepad2 aria-hidden="true" strokeWidth={2.5} className="mx-auto size-12" />;
}

export function WasmGameFrame({
  title,
  intro,
  launchLabel,
  openLabel,
  idleTitle,
  idleBody,
  bootingTitle,
  bootingBody,
  readyLabel,
  errorTitle,
  errorBody,
  timeoutTitle,
  timeoutBody,
  retryLabel,
}: Readonly<WasmGameFrameProps>) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [frameState, setFrameState] = useState<FrameState>('idle');
  const activeAttemptRef = useRef(attempt);
  const frameStateRef = useRef(frameState);
  const running = frameState === 'booting' || frameState === 'ready';
  const recoverable = frameState === 'error' || frameState === 'timeout';
  const src = `${enginePath}&attempt=${attempt}`;
  const stateCopy = copyForState(frameState, {
    bootingBody,
    bootingTitle,
    errorBody,
    errorTitle,
    idleBody,
    idleTitle,
    intro,
    launchLabel,
    openLabel,
    readyLabel,
    retryLabel,
    timeoutBody,
    timeoutTitle,
    title,
  });

  useLayoutEffect(() => {
    activeAttemptRef.current = attempt;
    frameStateRef.current = frameState;
  }, [attempt, frameState]);

  useEffect(() => {
    if (frameState !== 'booting') return;

    const timeout = window.setTimeout(() => setFrameState('timeout'), bootTimeoutMs);
    return () => window.clearTimeout(timeout);
  }, [attempt, frameState]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== iframeRef.current?.contentWindow || !isWasmStatusMessage(event.data)) {
        return;
      }
      if (
        event.data.attempt !== String(activeAttemptRef.current) ||
        frameStateRef.current !== 'booting'
      ) {
        return;
      }

      setFrameState(event.data.status);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const startBoot = () => {
    setAttempt((current) => current + 1);
    setFrameState('booting');
  };

  return (
    <div className="border-foreground bg-foreground text-background border-2 shadow-[10px_10px_0_0_var(--primary)]">
      <div className="border-background flex flex-wrap items-start justify-between gap-4 border-b-2 p-4 md:p-5">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.18em] uppercase opacity-75">
            {title}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75">{intro}</p>
          <p
            className="mt-3 font-mono text-xs font-bold tracking-[0.12em] uppercase"
            aria-live="polite"
          >
            {stateCopy.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {frameState !== 'ready' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={startBoot}
              disabled={frameState === 'booting'}
            >
              <BootActionIcon frameState={frameState} recoverable={recoverable} />
              {recoverable ? retryLabel : launchLabel}
            </Button>
          )}
          <a
            href={enginePath}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: 'border-background text-background',
            })}
          >
            {openLabel}
            <ExternalLink aria-hidden="true" strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <div
        className="relative aspect-4/3 bg-black md:aspect-16/10"
        aria-busy={frameState === 'booting'}
      >
        {running && (
          <iframe
            key={attempt}
            ref={iframeRef}
            title={title}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="fullscreen; gamepad"
            sandbox="allow-scripts allow-pointer-lock allow-downloads"
            className="absolute inset-0 h-full w-full"
          />
        )}

        {frameState !== 'ready' && (
          <div className="bg-foreground/94 absolute inset-0 z-10 grid place-items-center p-6 text-center">
            <div className="max-w-md" role={recoverable ? 'alert' : 'status'}>
              <FrameStateIcon frameState={frameState} recoverable={recoverable} />
              <h2 className="font-display mt-6 text-4xl leading-none tracking-[-0.06em]">
                {stateCopy.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed opacity-70">{stateCopy.body}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
