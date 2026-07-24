'use client';

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { type FrameState } from './frame-state';
import { isWasmStatusMessage } from './protocol';

const bootTimeoutMs = 20_000;

type UseWasmFrameOptions = {
  enginePath: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
};

/** Coordinates iframe boot attempts and validates game-frame status transitions. */
export function useWasmFrame({ enginePath, iframeRef }: UseWasmFrameOptions) {
  const [attempt, setAttempt] = useState(0);
  const [frameState, setFrameState] = useState<FrameState>('idle');
  const activeAttemptRef = useRef(attempt);
  const frameStateRef = useRef(frameState);

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
  }, [iframeRef]);

  return {
    attempt,
    frameState,
    src: `${enginePath}&attempt=${attempt}`,
    startBoot: () => {
      setAttempt((current) => current + 1);
      setFrameState('booting');
    },
  };
}
