'use client';

import { House, RotateCcw, Rows3 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({ unstable_retry }: Readonly<ErrorPageProps>) {
  const requestedLocale = useLocale();
  const locale: Locale = requestedLocale === 'tr' ? 'tr' : 'en';
  const copy = siteCopy[locale].recovery;

  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 py-16">
      <section className="border-foreground bg-background w-full max-w-3xl border-2 p-6 shadow-[10px_10px_0_0_var(--primary)] md:p-10">
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
          {copy.errorEyebrow}
        </p>
        <h1 className="font-display mt-4 text-5xl leading-none tracking-tighter md:text-7xl">
          {copy.errorTitle}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
          {copy.errorBody}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button onClick={unstable_retry}>
            <RotateCcw aria-hidden="true" strokeWidth={2.5} />
            {copy.retryAction}
          </Button>
          <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
            <House aria-hidden="true" strokeWidth={2.5} />
            {copy.homeAction}
          </Link>
          <Link href="/projects" className={buttonVariants({ variant: 'ghost' })}>
            <Rows3 aria-hidden="true" strokeWidth={2.5} />
            {copy.projectsAction}
          </Link>
        </div>
      </section>
    </main>
  );
}
