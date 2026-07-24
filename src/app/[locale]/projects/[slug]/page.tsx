import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  formatProjectPosition,
  getNextProject,
  getProject,
  getProjectCategory,
  getProjectDescription,
  getProjectPosition,
  projects,
} from '@/content/projects';
import { siteCopy, type Locale } from '@/content/site';
import { Link } from '@/i18n/navigation';
import { createRouteMetadata } from '@/lib/seo';
import { buildProjectStructuredData } from '@/lib/structured-data';

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug, locale: 'en' },
    { slug: project.slug, locale: 'tr' },
  ]);
}

/**
 * Generates localized metadata for a project detail page.
 *
 * @param params - Route parameters containing the locale and project slug.
 * @returns Metadata for the project page, or no-index metadata when the project is not found.
 */
export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string; slug: string }> }>): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: 'Project', robots: { index: false, follow: false } };
  }

  const metadata = createRouteMetadata({
    locale: locale === 'tr' ? 'tr' : 'en',
    path: `/projects/${project.slug}`,
    title: project.name,
    description: getProjectDescription(project, locale === 'tr' ? 'tr' : 'en'),
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
    },
  };
}

/**
 * Renders the localized detail page for a project.
 *
 * @param params - The locale and project slug used to load the page content.
 */
export default async function ProjectDetailPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale; slug: string }> }>) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const copy = siteCopy[locale].projects;
  const category = getProjectCategory(project, locale);
  const description = getProjectDescription(project, locale);
  const nextProject = getNextProject(project.slug);
  const position = getProjectPosition(project.slug);

  return (
    <main>
      <JsonLd data={buildProjectStructuredData(locale, project)} />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <Link href="/projects" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <ArrowLeft aria-hidden="true" strokeWidth={2.5} /> {copy.back}
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{category}</Badge>
              {position && (
                <Badge className="project-continuity bg-primary" data-project-continuity>
                  {copy.archiveLabel} {formatProjectPosition(position)}
                </Badge>
              )}
            </div>
            <h1 className="font-display mt-6 text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
              {project.name}
            </h1>
          </div>
          <p className="text-muted-foreground text-xl leading-relaxed">{description}</p>
        </div>
        <div className="border-foreground bg-muted relative mt-12 aspect-16/10 overflow-hidden border-2 shadow-[10px_10px_0_0_var(--shadow-hard)]">
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
            <p className="font-display mt-2 text-3xl tracking-tighter">{project.year}</p>
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
            <a href={project.url} target="_blank" rel="noreferrer" className={buttonVariants()}>
              <ExternalLink aria-hidden="true" strokeWidth={2.5} /> {copy.live}
            </a>
            <a
              href={project.gitUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'secondary' })}
            >
              <Code2 aria-hidden="true" strokeWidth={2.5} /> {copy.code}
            </a>
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
          <Link
            href={`/projects/${nextProject.slug}`}
            className={buttonVariants({ size: 'lg' })}
            aria-label={`${copy.nextProject}: ${nextProject.name}`}
          >
            <ArrowRight aria-hidden="true" strokeWidth={2.5} /> {copy.nextProject}
          </Link>
        </div>
      </section>
    </main>
  );
}
