export const themeStorageKey = 'hot:theme';
export const themeChangeEvent = 'hot:theme-change';

export type Theme = 'dark' | 'light';

export function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
  return isTheme(storedTheme) ? storedTheme : prefersDark ? 'dark' : 'light';
}

type ThemeRoot = Pick<HTMLElement, 'classList' | 'dataset' | 'style'>;

export function applyTheme(root: ThemeRoot, theme: Theme) {
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export const themeBootstrapScript = `(() => {
  const root = document.documentElement;
  let storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem('${themeStorageKey}');
  } catch {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme === 'dark' || storedTheme === 'light'
    ? storedTheme
    : prefersDark ? 'dark' : 'light';
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;
