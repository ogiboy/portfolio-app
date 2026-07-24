'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

/** Switches the current route locale while preserving the visitor's location. */
export function LocaleSwitcher({ label }: Readonly<{ label: string }>) {
  const pathname = usePathname();
  const locale = useLocale();
  const nextLocale = locale === 'en' ? 'tr' : 'en';
  const [pendingLocale, setPendingLocale] = useState<string>();
  const pending = pendingLocale === nextLocale;

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      scroll={false}
      aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
      aria-busy={pending || undefined}
      className={buttonVariants({
        size: 'sm',
        variant: 'ghost',
        className: 'motion-reduce:transition-none',
      })}
      onClick={() => setPendingLocale(nextLocale)}
    >
      {pending ? `${label}…` : label}
    </Link>
  );
}
