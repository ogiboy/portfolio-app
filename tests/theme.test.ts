import { beforeEach, describe, expect, it } from 'vitest';
import { applyTheme, resolveTheme, themeBootstrapScript, themeStorageKey } from '@/lib/theme';

describe('color theme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = '';
  });

  it('prefers a stored choice over the system preference', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });

  it('falls back to the current system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
    expect(resolveTheme('unsupported', true)).toBe('dark');
  });

  it('bootstraps the same persisted preference before hydration', () => {
    expect(themeBootstrapScript).toContain(themeStorageKey);
    expect(themeBootstrapScript).toContain("matchMedia('(prefers-color-scheme: dark)')");
    expect(themeBootstrapScript).toContain("classList.toggle('dark'");
  });

  it('keeps the html class, dataset, and native color scheme aligned', () => {
    applyTheme(document.documentElement, 'dark');

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');

    applyTheme(document.documentElement, 'light');

    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.documentElement.style.colorScheme).toBe('light');
  });
});
