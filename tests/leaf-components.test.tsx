import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/components/client/theme-toggle';
import { JsonLd } from '@/components/seo/json-ld';
import { HotMark } from '@/components/site/hot-mark';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { themeStorageKey } from '@/lib/theme';

function installMatchMedia(matches = false) {
  vi.stubGlobal('matchMedia', () => ({
    addEventListener: vi.fn(),
    matches,
    removeEventListener: vi.fn(),
  }));
}

describe('leaf components', () => {
  it('toggles the document theme and persists the selected preference', () => {
    installMatchMedia();
    document.documentElement.classList.remove('dark');
    window.localStorage.clear();
    render(<ThemeToggle darkLabel="Use dark theme" lightLabel="Use light theme" />);

    fireEvent.click(screen.getByRole('button', { name: 'Use dark theme' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem(themeStorageKey)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Use light theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('renders the H.O.T. mark as decorative branding', () => {
    const { container } = render(<HotMark className="custom-mark" />);

    expect(container.firstElementChild).toHaveClass('hot-mark', 'custom-mark');
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('H.O.T.')).toBeInTheDocument();
  });

  it('renders every card composition slot with consumer content', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(
      [...container.querySelectorAll('[data-slot]')].map((element) =>
        element.getAttribute('data-slot'),
      ),
    ).toEqual([
      'card',
      'card-header',
      'card-title',
      'card-description',
      'card-action',
      'card-content',
      'card-footer',
    ]);
  });

  it('exposes a vertical semantic separator to assistive technologies', () => {
    render(<Separator decorative={false} orientation="vertical" />);

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders serialized JSON-LD in an application JSON script element', () => {
    const { container } = render(<JsonLd data={{ text: '</script>' }} />);

    expect(container.querySelector('script')).toHaveAttribute('type', 'application/ld+json');
    expect(container.querySelector('script')).toHaveTextContent('\\u003c/script>');
  });
});
