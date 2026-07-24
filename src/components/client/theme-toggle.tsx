'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import {
  applyTheme,
  isTheme,
  resolveTheme,
  themeChangeEvent,
  themeStorageKey,
  type Theme,
} from '@/lib/theme';

/**
 * Reads the stored theme preference.
 *
 * @returns The stored theme if valid, or `null` when no valid preference is available.
 */
function readStoredTheme() {
  try {
    const value = window.localStorage.getItem(themeStorageKey);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Determines the theme currently applied to the document.
 *
 * @returns `'dark'` if the document has the `dark` class, `'light'` otherwise.
 */
function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Provides the default theme snapshot for server-side rendering.
 *
 * @returns The `'light'` theme
 */
function getServerThemeSnapshot(): Theme {
  return 'light';
}

/**
 * Subscribes to system, stored, and application theme changes.
 *
 * @param onStoreChange - Callback invoked when the theme changes
 * @returns A function that removes the theme-change listeners
 */
function subscribeToTheme(onStoreChange: () => void) {
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const syncSystemTheme = () => {
    if (!readStoredTheme()) {
      applyTheme(document.documentElement, resolveTheme(null, colorScheme.matches));
    }
    onStoreChange();
  };
  const syncStoredTheme = (event: StorageEvent) => {
    if (event.key === themeStorageKey) {
      applyTheme(document.documentElement, resolveTheme(event.newValue, colorScheme.matches));
      onStoreChange();
    }
  };

  colorScheme.addEventListener('change', syncSystemTheme);
  window.addEventListener('storage', syncStoredTheme);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    colorScheme.removeEventListener('change', syncSystemTheme);
    window.removeEventListener('storage', syncStoredTheme);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

/**
 * Provides an accessible control for switching between light and dark themes.
 *
 * @param darkLabel - Label for switching to the dark theme
 * @param lightLabel - Label for switching to the light theme
 */
export function ThemeToggle({
  darkLabel,
  lightLabel,
}: Readonly<{ darkLabel: string; lightLabel: string }>) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const isDark = theme === 'dark';
  const actionLabel = isDark ? lightLabel : darkLabel;

  /**
   * Switches between the light and dark themes and persists the selected theme when storage is available.
   */
  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark';

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The visible theme still works when storage is unavailable.
    }
    applyTheme(document.documentElement, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={actionLabel}
      aria-pressed={isDark}
      title={actionLabel}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun aria-hidden="true" strokeWidth={2.5} />
      ) : (
        <Moon aria-hidden="true" strokeWidth={2.5} />
      )}
    </Button>
  );
}
