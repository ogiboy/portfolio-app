'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAnalyticsPreference } from '@/components/client/use-analytics-preference';
import {
  analyticsPreferenceEvent,
  saveAnalyticsPreference,
  type AnalyticsPreferenceSaveResult,
} from '@/lib/analytics-preference';

type AnalyticsPreferenceProps = {
  enabledLabel: string;
  disabledLabel: string;
  enableAction: string;
  disableAction: string;
  savedLabel: string;
  errorLabel: string;
};

type AnalyticsPreferenceLatch = AnalyticsPreferenceSaveResult | 'idle';

const latchDuration = 220;

function getStatusMessage(
  latch: AnalyticsPreferenceLatch,
  preferenceLabel: string,
  preferenceSentence: string,
  savedLabel: string,
  errorLabel: string,
) {
  if (latch === 'saved') return `${preferenceSentence} ${savedLabel}`;
  if (latch === 'error') return errorLabel;
  return preferenceLabel;
}

/** Presents a persisted analytics consent control with polite status feedback. */
export function AnalyticsPreference({
  enabledLabel,
  disabledLabel,
  enableAction,
  disableAction,
  savedLabel,
  errorLabel,
}: Readonly<AnalyticsPreferenceProps>) {
  const enabled = useAnalyticsPreference();
  const [latch, setLatch] = useState<AnalyticsPreferenceLatch>('idle');
  const latchTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(latchTimeout.current);
  }, []);

  function updatePreference(nextEnabled: boolean) {
    const result = saveAnalyticsPreference(window.localStorage, nextEnabled);

    if (result === 'saved') {
      window.dispatchEvent(new Event(analyticsPreferenceEvent));
    }

    setLatch(result);
    window.clearTimeout(latchTimeout.current);
    latchTimeout.current = window.setTimeout(() => setLatch('idle'), latchDuration);
  }

  const preferenceLabel = enabled ? enabledLabel : disabledLabel;
  const preferenceSentence = /[.!?]$/.test(preferenceLabel)
    ? preferenceLabel
    : `${preferenceLabel}.`;
  const statusMessage = getStatusMessage(
    latch,
    preferenceLabel,
    preferenceSentence,
    savedLabel,
    errorLabel,
  );

  return (
    <div
      className="border-foreground bg-card data-[latch=error]:border-destructive data-[latch=saved]:border-primary flex flex-col gap-4 border-2 p-5 shadow-[6px_6px_0_0_var(--shadow-hard)] transition-[border-color,box-shadow] duration-200 data-[latch=saved]:shadow-[3px_3px_0_0_var(--shadow-hard)] motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between"
      data-latch={latch}
    >
      <output className="font-mono text-sm font-bold" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </output>
      <Button
        type="button"
        variant={enabled ? 'secondary' : 'default'}
        onClick={() => updatePreference(!enabled)}
      >
        {enabled ? disableAction : enableAction}
      </Button>
    </div>
  );
}
