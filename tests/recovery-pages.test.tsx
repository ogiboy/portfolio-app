import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ErrorPage from '@/app/[locale]/error';
import NotFound from '@/app/[locale]/not-found';

const localeState = vi.hoisted(() => ({ current: 'en' }));

vi.mock('next-intl', () => ({
  useLocale: () => localeState.current,
}));

vi.mock('next-intl/server', () => ({
  getLocale: () => Promise.resolve(localeState.current),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

describe('localized recovery pages', () => {
  afterEach(() => {
    cleanup();
    localeState.current = 'en';
  });

  it('offers a real retry and safe English routes after a runtime error', () => {
    const retry = vi.fn();
    const { getByRole } = render(
      <ErrorPage error={new Error('test fault')} unstable_retry={retry} />,
    );

    fireEvent.click(getByRole('button', { name: 'Retry view' }));
    expect(retry).toHaveBeenCalledOnce();
    expect(getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: 'Browse projects' })).toHaveAttribute('href', '/projects');
  });

  it('keeps runtime recovery equivalent in Turkish', () => {
    localeState.current = 'tr';
    const { getByRole } = render(
      <ErrorPage error={new Error('test fault')} unstable_retry={vi.fn()} />,
    );

    expect(getByRole('button', { name: 'Görünümü yeniden dene' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Ana sayfaya dön' })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: 'Projeleri incele' })).toHaveAttribute('href', '/projects');
  });

  it('renders localized 404 recovery without turning the route into a client owner', async () => {
    localeState.current = 'tr';
    const { getByRole } = render(await NotFound());

    expect(getByRole('heading', { name: 'Bu yol haritadan çıkmış.' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Ana sayfaya dön' })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: 'Projeleri incele' })).toHaveAttribute('href', '/projects');
  });
});
