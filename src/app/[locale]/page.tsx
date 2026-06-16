import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import { CinematicWorkRail } from '@/components/client/cinematic-work-rail';
import { ProjectCard } from '@/components/site/project-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { contact, siteCopy, type Locale } from '@/content/site';
import { featuredProjects, projects } from '@/content/projects';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Frontend Portfolio',
};

export default async function HomePage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale];
  const heroProject = featuredProjects[0];

  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl content-center gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <div>
          <Badge>{copy.home.eyebrow}</Badge>
          <h1 className="font-display mt-8 max-w-5xl text-5xl leading-[0.9] tracking-[-0.08em] md:text-7xl lg:text-8xl">
            {copy.home.title}
          </h1>
          <p className="text-muted-foreground mt-8 max-w-2xl text-xl leading-relaxed">
            {copy.home.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href={`mailto:${contact.email}`}>
                <EnvelopeSimple aria-hidden="true" weight="bold" /> {copy.home.primaryCta}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/projects">
                {copy.home.secondaryCta} <ArrowRight aria-hidden="true" weight="bold" />
              </Link>
            </Button>
          </div>
        </div>
        <aside className="md:border-foreground grid content-end gap-4 md:border-l-2 md:pl-8">
          <div className="border-foreground bg-muted relative aspect-[4/3] overflow-hidden border-2 shadow-[8px_8px_0_0_var(--shadow-hard)]">
            <Image
              src={heroProject.image}
              alt={heroProject.name}
              fill
              priority
              sizes="(min-width: 768px) 32vw, 100vw"
              className="object-cover grayscale"
              placeholder="blur"
            />
          </div>
          <div className="border-foreground bg-primary border-2 p-5 shadow-[8px_8px_0_0_var(--shadow-hard)]">
            <p className="font-mono text-xs font-bold tracking-[0.18em] uppercase">
              {copy.home.stackLabel}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {copy.home.proof.map((item) => (
                <span
                  key={item}
                  className="border-foreground bg-background border-2 px-3 py-2 font-mono text-xs font-bold tracking-[0.12em] uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
            {copy.home.stackNote}
          </p>
        </aside>
      </section>

      <section className="border-foreground bg-card border-y-2 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
              {copy.home.servicesTitle}
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {copy.home.servicesIntro}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.home.services.map((service, index) => (
              <Card key={service.title} className={index === 1 ? 'bg-primary' : undefined}>
                <CardContent>
                  <h3 className="font-display text-3xl leading-none tracking-[-0.05em]">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                    {service.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
              {copy.home.selectedTitle}
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {copy.home.selectedIntro}
            </p>
          </div>
          <Separator className="hidden md:block" />
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              liveLabel={copy.projects.live}
              codeLabel={copy.projects.code}
              caseLabel={copy.projects.caseLabel}
            />
          ))}
        </div>
      </section>

      <CinematicWorkRail
        title={copy.home.motionTitle}
        intro={copy.home.motionIntro}
        projects={projects.slice(0, 6)}
      />

      <section id="process" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] md:text-6xl">
            {copy.home.processTitle}
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            {copy.home.processIntro}
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {copy.home.process.map((step) => (
            <article key={step.title} className="border-foreground border-t-2 pt-5">
              <h3 className="font-display text-3xl tracking-[-0.05em]">{step.title}</h3>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-primary px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="font-display max-w-4xl text-4xl leading-[0.95] tracking-[-0.06em] md:text-7xl">
              {copy.home.contactTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">{copy.home.contactIntro}</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
