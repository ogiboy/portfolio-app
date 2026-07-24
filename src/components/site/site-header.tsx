import { ExternalLink } from 'lucide-react';
import { LocaleSwitcher } from '@/components/client/locale-switcher';
import { MobileNavigation } from '@/components/client/mobile-navigation';
import { NavigationLink } from '@/components/client/navigation-link';
import { ThemeToggle } from '@/components/client/theme-toggle';
import { HotMark } from '@/components/site/hot-mark';
import { buttonVariants } from '@/components/ui/button';
import { contact, siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  const copy = siteCopy[locale];

  return (
    <header className="border-foreground bg-background sticky top-0 z-40 border-b-2">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-[-0.08em] md:text-2xl"
          aria-label={copy.brand.homeLabel}
        >
          <HotMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={copy.nav.label}>
          <NavigationLink href="/" className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
            {copy.nav.home}
          </NavigationLink>
          <NavigationLink
            href="/about"
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
          >
            {copy.nav.about}
          </NavigationLink>
          <NavigationLink
            href="/projects"
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
          >
            {copy.nav.projects}
          </NavigationLink>
          <NavigationLink
            href="/labs/retro-game-center"
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
          >
            {copy.nav.lab}
          </NavigationLink>
          <NavigationLink
            href="/#process"
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
          >
            {copy.nav.process}
          </NavigationLink>
        </nav>

        <div className="flex items-center gap-2">
          <MobileNavigation
            label={copy.nav.label}
            description={copy.nav.menuDescription}
            openLabel={copy.nav.openMenu}
            closeLabel={copy.nav.closeMenu}
            homeLabel={copy.nav.home}
            aboutLabel={copy.nav.about}
            projectsLabel={copy.nav.projects}
            labLabel={copy.nav.lab}
            processLabel={copy.nav.process}
            contactLabel={copy.nav.contact}
            contactHref={`mailto:${contact.email}`}
          />
          <ThemeToggle darkLabel={copy.nav.useDarkTheme} lightLabel={copy.nav.useLightTheme} />
          <LocaleSwitcher label={copy.nav.language} />
          <a
            href={`mailto:${contact.email}`}
            className={buttonVariants({ size: 'sm', className: 'max-xl:hidden' })}
          >
            {copy.nav.contact}
            <ExternalLink aria-hidden="true" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
