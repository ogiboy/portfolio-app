import { House, Rows3 } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/button';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const requestedLocale = await getLocale();
  const locale: Locale = requestedLocale === 'tr' ? 'tr' : 'en';
  const copy = siteCopy[locale].recovery;

  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 py-16">
      <section className="border-foreground bg-background w-full max-w-3xl border-2 p-6 shadow-[10px_10px_0_0_var(--primary)] md:p-10">
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
          {copy.notFoundEyebrow}
        </p>
        <h1 className="font-display mt-4 text-5xl leading-none tracking-tighter md:text-7xl">
          {copy.notFoundTitle}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
          {copy.notFoundBody}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants()}>
            <House aria-hidden="true" strokeWidth={2.5} />
            {copy.homeAction}
          </Link>
          <Link href="/projects" className={buttonVariants({ variant: 'secondary' })}>
            <Rows3 aria-hidden="true" strokeWidth={2.5} />
            {copy.projectsAction}
          </Link>
        </div>
      </section>
    </main>
  );
}
