/** Browser storage key that persists the selected color theme. */
export const themeStorageKey = 'hot:theme';
/** Browser event name announced when the selected theme changes. */
export const themeChangeEvent = 'hot:theme-change';

/** Supported visual themes applied to the portfolio document root. */
export type Theme = 'dark' | 'light';

/** Narrows a stored string to one of the supported theme values. */
export function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

/** Selects a valid stored theme or falls back to system preference. */
export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
  if (isTheme(storedTheme)) return storedTheme;
  return prefersDark ? 'dark' : 'light';
}

type ThemeRoot = Pick<HTMLElement, 'classList' | 'dataset' | 'style'>;

/** Synchronizes root classes, data attributes, and native color scheme. */
export function applyTheme(root: ThemeRoot, theme: Theme) {
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/** Inline bootstrap script that applies theme before interactive hydration. */
export const themeBootstrapScript = `(() => {
  const root = document.documentElement;
  let storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem('${themeStorageKey}');
  } catch {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = storedTheme;
  if (theme !== 'dark' && theme !== 'light') {
    theme = prefersDark ? 'dark' : 'light';
  }
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;
