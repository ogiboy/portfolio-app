/** Browser storage key that records a user's analytics opt-out. */
export const analyticsStorageKey = 'hot:analytics-disabled';
/** Browser event name emitted after an analytics preference changes. */
export const analyticsPreferenceEvent = 'hot:analytics-preference';

/**
 * Determines whether the persisted preference permits analytics collection.
 *
 * @returns `true` if analytics are enabled, `false` if the persisted opt-out flag is set.
 */
export function isAnalyticsEnabled(storage: Pick<Storage, 'getItem'>) {
  return storage.getItem(analyticsStorageKey) !== '1';
}

type AnalyticsPreferenceStorage = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

/** Reports whether updating the browser analytics preference was confirmed. */
export type AnalyticsPreferenceSaveResult = 'saved' | 'error';

/**
 * Persists the requested analytics enabled state and verifies the stored preference.
 *
 * @param nextEnabled - Whether analytics should be enabled.
 * @returns `'saved'` if the preference matches the requested state, or `'error'` if persistence fails or verification does not match.
 */
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
