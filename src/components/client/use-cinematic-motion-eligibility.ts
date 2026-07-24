'use client';

import { useSyncExternalStore } from 'react';

const cinematicMediaQuery = '(min-width: 768px) and (hover: hover) and (pointer: fine)';

type NetworkConnection = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkConnection;
};

function getConnection() {
  return (navigator as NavigatorWithConnection).connection;
}

function subscribeToEligibility(onStoreChange: () => void) {
  const media = window.matchMedia(cinematicMediaQuery);
  const connection = getConnection();

  media.addEventListener('change', onStoreChange);
  connection?.addEventListener('change', onStoreChange);

  return () => {
    media.removeEventListener('change', onStoreChange);
    connection?.removeEventListener('change', onStoreChange);
  };
}

/**
 * Determines whether cinematic motion is suitable for the current device and network preferences.
 *
 * @returns `true` if the device matches the cinematic media criteria and data saving is not enabled, `false` otherwise.
 */
function getEligibilitySnapshot() {
  return window.matchMedia(cinematicMediaQuery).matches && getConnection()?.saveData !== true;
}

/** Reports whether cinematic motion suits the current device and data preference. */
export function useCinematicMotionEligibility() {
  return useSyncExternalStore(subscribeToEligibility, getEligibilitySnapshot, () => false);
}
