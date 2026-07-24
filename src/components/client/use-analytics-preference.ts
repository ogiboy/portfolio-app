'use client';

import { useSyncExternalStore } from 'react';
import { analyticsPreferenceEvent, isAnalyticsEnabled } from '@/lib/analytics-preference';

function readPreference() {
  try {
    return isAnalyticsEnabled(window.localStorage);
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(analyticsPreferenceEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(analyticsPreferenceEvent, onStoreChange);
  };
}

/** Subscribes to the persisted analytics preference across local browser events. */
export function useAnalyticsPreference() {
  return useSyncExternalStore(subscribe, readPreference, () => false);
}
