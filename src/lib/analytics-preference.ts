/** Browser storage key that records a user's analytics opt-out. */
export const analyticsStorageKey = 'hot:analytics-disabled';
/** Browser event name emitted after an analytics preference changes. */
export const analyticsPreferenceEvent = 'hot:analytics-preference';

/** Determines whether the persisted preference permits analytics collection. */
export function isAnalyticsEnabled(storage: Pick<Storage, 'getItem'>) {
  return storage.getItem(analyticsStorageKey) !== '1';
}

type AnalyticsPreferenceStorage = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

/** Reports whether updating the browser analytics preference was confirmed. */
export type AnalyticsPreferenceSaveResult = 'saved' | 'error';

/** Persists an analytics choice and verifies the resulting storage state. */
export function saveAnalyticsPreference(
  storage: AnalyticsPreferenceStorage,
  nextEnabled: boolean,
): AnalyticsPreferenceSaveResult {
  try {
    if (nextEnabled) {
      storage.removeItem(analyticsStorageKey);
    } else {
      storage.setItem(analyticsStorageKey, '1');
    }

    return isAnalyticsEnabled(storage) === nextEnabled ? 'saved' : 'error';
  } catch {
    return 'error';
  }
}
