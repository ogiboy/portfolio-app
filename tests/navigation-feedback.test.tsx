import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LocaleSwitcher } from '@/components/client/locale-switcher';
import { NavigationLink } from '@/components/client/navigation-link';

const navigationState = vi.hoisted(() => ({ pathname: '/projects' }));
const localeState = vi.hoisted(() => ({ current: 'en' }));

vi.mock('next-intl', () => ({
  useLocale: () => localeState.current,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    locale,
    onClick,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { locale?: string }) => (
    <a
      href={String(href)}
      data-locale={locale}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...props}
    >
      {children}
    </a>
  ),
  usePathname: () => navigationState.pathname,
}));

describe('navigation feedback', () => {
  afterEach(() => {
    cleanup();
    navigationState.pathname = '/projects';
    localeState.current = 'en';
    window.history.replaceState(null, '', '/');
  });

  it('marks only the current route as the active page', () => {
    const { getByRole } = render(
      <nav>
        <NavigationLink href="/" className="nav-link">
          Home
        </NavigationLink>
        <NavigationLink href="/projects" className="nav-link">
          Projects
        </NavigationLink>
      </nav>,
    );

    expect(getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('keeps the project archive active on project detail routes', () => {
    navigationState.pathname = '/projects/graduation-project';
    const { getByRole } = render(
      <NavigationLink href="/projects" className="nav-link">
        Projects
      </NavigationLink>,
    );

    expect(getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks the process link when its home-page hash is current', () => {
    navigationState.pathname = '/';
    window.history.replaceState(null, '', '/#process');
    const { getByRole } = render(
      <NavigationLink href="/#process" className="nav-link">
        Process
      </NavigationLink>,
    );

    expect(getByRole('link', { name: 'Process' })).toHaveAttribute('aria-current', 'location');
  });

  it('shows a short, non-blocking locale-switching state', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<LocaleSwitcher label="TR" />);
    const switcher = getByRole('link', { name: 'Switch language to TR' });

    expect(switcher).toHaveAttribute('href', '/projects');
    expect(switcher).toHaveAttribute('data-locale', 'tr');
    await user.click(switcher);

    expect(switcher).toHaveAttribute('aria-busy', 'true');
    expect(switcher).toHaveTextContent('TR…');
  });
});
