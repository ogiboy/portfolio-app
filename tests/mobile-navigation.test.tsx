import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MobileNavigation } from '@/components/client/mobile-navigation';

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/',
  Link: ({ children, href, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={String(href)}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

const props = {
  closeLabel: 'Close navigation',
  contactHref: 'mailto:hello@example.com',
  contactLabel: 'Contact',
  description: 'Explore the portfolio.',
  homeLabel: 'Home',
  label: 'Primary navigation',
  labLabel: 'Lab',
  openLabel: 'Open navigation',
  processLabel: 'Process',
  projectsLabel: 'Projects',
};

describe('MobileNavigation', () => {
  afterEach(cleanup);

  it('opens every primary destination and returns focus after Escape', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<MobileNavigation {...props} />);
    const trigger = getByRole('button', { name: props.openLabel });

    await user.click(trigger);
    const dialog = getByRole('dialog', { name: props.label });
    expect(dialog).toBeInTheDocument();
    expect(getByRole('link', { name: props.homeLabel })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: props.homeLabel })).toHaveAttribute('aria-current', 'page');
    expect(getByRole('link', { name: props.projectsLabel })).toHaveAttribute('href', '/projects');
    expect(getByRole('link', { name: props.labLabel })).toHaveAttribute(
      'href',
      '/labs/retro-game-center',
    );
    expect(getByRole('link', { name: props.processLabel })).toHaveAttribute('href', '/#process');
    expect(getByRole('link', { name: props.contactLabel })).toHaveAttribute(
      'href',
      props.contactHref,
    );

    await user.keyboard('{Escape}');
    expect(queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes after choosing a navigation destination', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<MobileNavigation {...props} />);

    await user.click(getByRole('button', { name: props.openLabel }));
    await user.click(getByRole('link', { name: props.projectsLabel }));

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });
});
