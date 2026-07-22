export const analyticsStorageKey = 'hot:analytics-disabled';
export const analyticsPreferenceEvent = 'hot:analytics-preference';

export function isAnalyticsEnabled(storage: Pick<Storage, 'getItem'>) {
  return storage.getItem(analyticsStorageKey) !== '1';
}
