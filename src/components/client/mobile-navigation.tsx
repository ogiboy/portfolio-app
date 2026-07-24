'use client';

import { useState } from 'react';
import { ExternalLink, Menu } from 'lucide-react';
import { NavigationLink } from '@/components/client/navigation-link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type MobileNavigationProps = {
  label: string;
  description: string;
  openLabel: string;
  closeLabel: string;
  homeLabel: string;
  aboutLabel?: string;
  projectsLabel: string;
  labLabel: string;
  processLabel: string;
  contactLabel: string;
  contactHref: string;
};

/** Provides an accessible mobile navigation sheet with localized route labels. */
export function MobileNavigation({
  label,
  description,
  openLabel,
  closeLabel,
  homeLabel,
  aboutLabel,
  projectsLabel,
  labLabel,
  processLabel,
  contactLabel,
  contactHref,
}: Readonly<MobileNavigationProps>) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="ghost" aria-label={openLabel}>
          <Menu data-icon="inline-start" aria-hidden="true" strokeWidth={2.5} />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={closeLabel} side="right">
        <SheetHeader className="pr-14">
          <SheetTitle>{label}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <nav className="mt-10 grid gap-3" aria-label={label}>
          <NavigationLink
            href="/"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {homeLabel}
          </NavigationLink>
          {aboutLabel ? (
            <NavigationLink
              href="/about"
              className={buttonVariants({ variant: 'secondary' })}
              onClick={() => setOpen(false)}
            >
              {aboutLabel}
            </NavigationLink>
          ) : null}
          <NavigationLink
            href="/projects"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {projectsLabel}
          </NavigationLink>
          <NavigationLink
            href="/labs/retro-game-center"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {labLabel}
          </NavigationLink>
          <NavigationLink
            href="/#process"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {processLabel}
          </NavigationLink>
          <a
            href={contactHref}
            className={buttonVariants({ className: 'mt-3' })}
            onClick={() => setOpen(false)}
          >
            {contactLabel}
            <ExternalLink data-icon="inline-end" aria-hidden="true" strokeWidth={2.5} />
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
