import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { contact, siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export function SiteFooter({ locale }: Readonly<{ locale: Locale }>) {
  const copy = siteCopy[locale];

  return (
    <footer className="border-foreground bg-background border-t-2 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link href="/" className="font-display text-4xl leading-none tracking-[-0.08em]">
              OGT.
            </Link>
            <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed">
              {copy.footer.line}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" variant="secondary">
              <a href={contact.github} target="_blank" rel="noreferrer">
                <GithubLogo aria-hidden="true" weight="bold" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <LinkedinLogo aria-hidden="true" weight="bold" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.16em] uppercase">
          Oğuzcan Toptaş / Portfolio system / 2026
        </p>
      </div>
    </footer>
  );
}
