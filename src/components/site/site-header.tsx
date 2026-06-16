import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { LocaleSwitcher } from '@/components/client/locale-switcher';
import { Button } from '@/components/ui/button';
import { contact, siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  const copy = siteCopy[locale].nav;

  return (
    <header className="border-foreground bg-background/94 sticky top-0 z-40 border-b-2 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-[-0.08em] md:text-2xl"
          aria-label={copy.home}
        >
          OGT.
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">{copy.home}</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/projects">{copy.projects}</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/#process">{copy.process}</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher label={copy.language} />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={`mailto:${contact.email}`}>
              {copy.contact}
              <ArrowSquareOut aria-hidden="true" weight="bold" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
