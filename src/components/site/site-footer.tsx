import { BriefcaseBusiness, Code2, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HotMark } from '@/components/site/hot-mark';
import { contact, siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

/**
 * Renders localized footer navigation and external professional profile links.
 *
 * @param locale - The locale used to select localized footer content.
 */
export function SiteFooter({ locale }: Readonly<{ locale: Locale }>) {
  const copy = siteCopy[locale];

  return (
    <footer className="border-foreground bg-background border-t-2 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link
              href="/"
              className="font-display text-4xl leading-none tracking-[-0.08em]"
              aria-label={copy.brand.homeLabel}
            >
              <HotMark />
            </Link>
            <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed">
              {copy.footer.line}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
              <ShieldCheck aria-hidden="true" strokeWidth={2.5} />
              {copy.footer.privacyLabel}
            </Link>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'sm', variant: 'secondary' })}
            >
              <Code2 aria-hidden="true" strokeWidth={2.5} />
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'sm', variant: 'secondary' })}
            >
              <BriefcaseBusiness aria-hidden="true" strokeWidth={2.5} />
              LinkedIn
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.16em] uppercase">
          {copy.brand.signature}
        </p>
      </div>
    </footer>
  );
}
