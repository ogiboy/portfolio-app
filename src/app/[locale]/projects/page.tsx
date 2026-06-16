import type { Metadata } from "next";
import { ProjectCard } from "@/components/site/project-card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/projects";
import { siteCopy, type Locale } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const copy = siteCopy[locale].projects;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <Badge>{copy.archiveLabel}</Badge>
      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.08em] md:text-8xl">
          {copy.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {copy.intro}
        </p>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            liveLabel={copy.live}
            codeLabel={copy.code}
            caseLabel={copy.caseLabel}
          />
        ))}
      </div>
    </main>
  );
}
