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

/**
 * Subscribes to browser events that signal a change to the analytics preference.
 *
 * @param onStoreChange - Callback invoked when the preference may have changed
 * @returns A function that removes the event subscriptions
 */
function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(analyticsPreferenceEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(analyticsPreferenceEvent, onStoreChange);
  };
}

/**
 * Provides the persisted analytics preference and keeps it synchronized with browser events.
 *
 * @returns `true` when analytics is enabled, `false` otherwise.
 */
export function useAnalyticsPreference() {
  return useSyncExternalStore(subscribe, readPreference, () => false);
}
