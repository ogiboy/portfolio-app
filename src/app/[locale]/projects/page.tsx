import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { ProjectCard } from '@/components/site/project-card';
import { Badge } from '@/components/ui/badge';
import { getProjectPosition, projects } from '@/content/projects';
import { siteCopy, type Locale } from '@/content/site';
import { createRouteMetadata, seoCopy } from '@/lib/seo';
import { buildProjectsStructuredData } from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  return createRouteMetadata({
    locale,
    path: '/projects',
    title: siteCopy[locale].projects.title,
    description: seoCopy[locale].projectsDescription,
  });
}

export default async function ProjectsPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].projects;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <JsonLd data={buildProjectsStructuredData(locale)} />
      <Badge>{copy.archiveLabel}</Badge>
      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
          {copy.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">{copy.intro}</p>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            liveLabel={copy.live}
            codeLabel={copy.code}
            caseLabel={copy.caseLabel}
            archiveLabel={copy.archiveLabel}
            position={getProjectPosition(project.slug)}
          />
        ))}
      </div>
    </main>
  );
}
