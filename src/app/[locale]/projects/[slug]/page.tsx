import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowSquareOut, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getNextProject, getProject, projects } from '@/content/projects';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug, locale: 'en' },
    { slug: project.slug, locale: 'tr' },
  ]);
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? project.name : 'Project',
    description: project?.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale; slug: string }> }>) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const copy = siteCopy[locale].projects;
  const nextProject = getNextProject(project.slug);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <Button asChild variant="ghost" size="sm">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" weight="bold" /> {copy.back}
          </Link>
        </Button>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <Badge>{project.category}</Badge>
            <h1 className="font-display mt-6 text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
              {project.name}
            </h1>
          </div>
          <p className="text-muted-foreground text-xl leading-relaxed">{project.description}</p>
        </div>
        <div className="border-foreground bg-muted relative mt-12 aspect-[16/10] overflow-hidden border-2 shadow-[10px_10px_0_0_var(--shadow-hard)]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
            placeholder="blur"
          />
        </div>
      </section>

      <section className="border-foreground bg-card border-y-2 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
              {copy.yearLabel}
            </p>
            <p className="font-display mt-2 text-3xl tracking-[-0.05em]">{project.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
              {copy.stackLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-3 md:justify-end">
            <Button asChild>
              <a href={project.url} target="_blank" rel="noreferrer">
                <ArrowSquareOut aria-hidden="true" weight="bold" /> {copy.live}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={project.gitUrl} target="_blank" rel="noreferrer">
                <GithubLogo aria-hidden="true" weight="bold" /> {copy.code}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Separator />
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.18em] uppercase">
              {copy.nextProject}
            </p>
            <h2 className="font-display mt-3 text-4xl tracking-[-0.06em]">{nextProject.name}</h2>
          </div>
          <Button asChild size="lg">
            <Link href={`/projects/${nextProject.slug}`}>
              <ArrowRight aria-hidden="true" weight="bold" /> {copy.nextProject}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
