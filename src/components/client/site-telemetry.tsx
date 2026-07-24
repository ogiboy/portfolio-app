'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useAnalyticsPreference } from '@/components/client/use-analytics-preference';

/** Mounts performance telemetry only after analytics consent is enabled. */
export function SiteTelemetry() {
  const enabled = useAnalyticsPreference();

  if (!enabled) {
    return null;
  }

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
