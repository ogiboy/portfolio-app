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

  const isActive = section
    ? pathname === '/' && hash === section
    : href === '/'
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? (section ? 'location' : 'page') : undefined}
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
