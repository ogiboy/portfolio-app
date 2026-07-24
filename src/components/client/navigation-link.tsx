'use client';

import { useEffect, useState, type MouseEventHandler, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

type NavigationHref = '/' | '/about' | '/projects' | '/labs/retro-game-center' | '/#process';

type NavigationLinkProps = {
  children: ReactNode;
  className: string;
  href: NavigationHref;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Determines whether a navigation link matches the current location.
 *
 * @param section - The hash fragment associated with the link, or `null` for path-based links.
 * @param hash - The current URL hash fragment.
 * @returns `true` if the link matches the current path or section, `false` otherwise.
 */
function isNavigationActive(
  pathname: string,
  href: NavigationHref,
  section: string | null,
  hash: string,
) {
  if (section) return pathname === '/' && hash === section;
  if (href === '/') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Renders a portfolio navigation link with active-state styling and accessibility metadata.
 *
 * @param children - The link content
 * @param className - Additional classes applied to the link
 * @param href - The portfolio route or section referenced by the link
 * @param onClick - Optional click handler for the link
 */
export function NavigationLink({
  children,
  className,
  href,
  onClick,
}: Readonly<NavigationLinkProps>) {
  const pathname = usePathname();
  const section = href.includes('#') ? href.slice(href.indexOf('#')) : null;
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!section) {
      return;
    }

    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => window.removeEventListener('hashchange', syncHash);
  }, [section]);

  const isActive = isNavigationActive(pathname, href, section, hash);
  let ariaCurrent: 'location' | 'page' | undefined;
  if (isActive) ariaCurrent = section ? 'location' : 'page';

  return (
    <Link
      href={href}
      aria-current={ariaCurrent}
      className={cn(
        className,
        'data-[active=true]:border-foreground data-[active=true]:bg-muted motion-reduce:transition-none',
      )}
      data-active={isActive}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
