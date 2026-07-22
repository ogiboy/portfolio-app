'use client';

import { Button } from '@/components/ui/button';
import { useAnalyticsPreference } from '@/components/client/use-analytics-preference';
import { analyticsPreferenceEvent, analyticsStorageKey } from '@/lib/analytics-preference';

type AnalyticsPreferenceProps = {
  enabledLabel: string;
  disabledLabel: string;
  enableAction: string;
  disableAction: string;
};

function updatePreference(nextEnabled: boolean) {
  try {
    if (nextEnabled) {
      window.localStorage.removeItem(analyticsStorageKey);
    } else {
      window.localStorage.setItem(analyticsStorageKey, '1');
    }
    window.dispatchEvent(new Event(analyticsPreferenceEvent));
    if (!nextEnabled) {
      window.location.reload();
    }
  } catch {
    return;
  }
}

export function AnalyticsPreference({
  enabledLabel,
  disabledLabel,
  enableAction,
  disableAction,
}: Readonly<AnalyticsPreferenceProps>) {
  const enabled = useAnalyticsPreference();

  return (
    <div className="border-foreground bg-card flex flex-col gap-4 border-2 p-5 shadow-[6px_6px_0_0_var(--shadow-hard)] sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-sm font-bold" aria-live="polite">
        {enabled ? enabledLabel : disabledLabel}
      </p>
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
