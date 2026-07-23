'use client';

import { useState } from 'react';
import { ExternalLink, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from '@/i18n/navigation';

type MobileNavigationProps = {
  label: string;
  description: string;
  openLabel: string;
  closeLabel: string;
  homeLabel: string;
  projectsLabel: string;
  labLabel: string;
  processLabel: string;
  contactLabel: string;
  contactHref: string;
};

export function MobileNavigation({
  label,
  description,
  openLabel,
  closeLabel,
  homeLabel,
  projectsLabel,
  labLabel,
  processLabel,
  contactLabel,
  contactHref,
}: Readonly<MobileNavigationProps>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="md:hidden" size="icon" variant="ghost" aria-label={openLabel}>
          <Menu aria-hidden="true" strokeWidth={2.5} />
        </Button>
      </DialogTrigger>
      <DialogContent closeLabel={closeLabel}>
        <div className="pr-14">
          <DialogTitle className="font-display text-3xl leading-none tracking-tighter">
            {label}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </div>

        <nav className="mt-10 grid gap-3" aria-label={label}>
          <Link
            href="/"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {homeLabel}
          </Link>
          <Link
            href="/projects"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {projectsLabel}
          </Link>
          <Link
            href="/labs/retro-game-center"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {labLabel}
          </Link>
          <Link
            href="/#process"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => setOpen(false)}
          >
            {processLabel}
          </Link>
          <a
            href={contactHref}
            className={buttonVariants({ className: 'mt-3' })}
            onClick={() => setOpen(false)}
          >
            {contactLabel}
            <ExternalLink aria-hidden="true" strokeWidth={2.5} />
          </a>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
