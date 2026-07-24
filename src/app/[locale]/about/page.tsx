import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { contact, siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';
import { createRouteMetadata, seoCopy } from '@/lib/seo';
import { buildAboutStructuredData } from '@/lib/structured-data';

function getAboutPathHref(target: 'email' | 'linkedin' | 'projects') {
  switch (target) {
    case 'email':
      return `mailto:${contact.email}`;
    case 'linkedin':
      return contact.linkedin;
    case 'projects':
      return '/projects';
  }
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  return createRouteMetadata({
    locale,
    path: '/about',
    title: seoCopy[locale].aboutTitle,
    description: seoCopy[locale].aboutDescription,
  });
}

export default async function AboutPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].about;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <JsonLd data={buildAboutStructuredData(locale)} />
      <Badge>{copy.eyebrow}</Badge>
      <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
          {copy.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">{copy.intro}</p>
      </div>

      <Separator className="my-12" />

      <section aria-labelledby="about-identity">
        <h2 id="about-identity" className="font-display text-4xl tracking-[-0.06em]">
          {copy.identityTitle}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">{copy.identityBody}</p>
      </section>

      <section className="mt-12" aria-labelledby="about-paths">
        <h2 id="about-paths" className="font-display text-4xl tracking-[-0.06em]">
          {copy.pathsTitle}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">{copy.pathsIntro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {copy.paths.map((path, index) => {
            const href = getAboutPathHref(path.target);

            return (
              <Card key={path.title} className={index === 1 ? 'bg-primary' : undefined}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription
                    className={index === 1 ? 'text-primary-foreground/80' : undefined}
                  >
                    {path.body}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {path.target === 'projects' ? (
                    <Link
                      href="/projects"
                      className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                    >
                      {path.action}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                      {...(path.target === 'linkedin'
                        ? { target: '_blank', rel: 'noreferrer' }
                        : undefined)}
                    >
                      {path.action}
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="about-links">
        <h2 id="about-links" className="font-display text-4xl tracking-[-0.06em]">
          {copy.linksTitle}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className={buttonVariants({ variant: 'secondary' })}>
            {copy.projectsAction}
          </Link>
          <Link href="/labs/retro-game-center" className={buttonVariants({ variant: 'secondary' })}>
            {copy.labAction}
          </Link>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'secondary' })}
          >
            {copy.githubAction}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'secondary' })}
          >
            {copy.linkedinAction}
          </a>
          <a href={`mailto:${contact.email}`} className={buttonVariants()}>
            {copy.emailAction}
          </a>
        </div>
      </section>
    </main>
  );
}
