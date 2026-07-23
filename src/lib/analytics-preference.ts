export const analyticsStorageKey = 'hot:analytics-disabled';
export const analyticsPreferenceEvent = 'hot:analytics-preference';

export function isAnalyticsEnabled(storage: Pick<Storage, 'getItem'>) {
  return storage.getItem(analyticsStorageKey) !== '1';
}

type AnalyticsPreferenceStorage = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

export type AnalyticsPreferenceSaveResult = 'saved' | 'error';

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
