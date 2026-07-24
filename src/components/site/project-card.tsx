import Image from 'next/image';
import { ArrowRight, Code2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatProjectPosition, type Project, type ProjectPosition } from '@/content/projects';
import { Link } from '@/i18n/navigation';

/**
 * Displays a project summary with metadata, stack tags, and links to its case study, live site, and code repository.
 *
 * @param project - The project data used to populate the card.
 * @param category - The project category displayed in the card.
 * @param description - The project description displayed in the card.
 * @param liveLabel - The label for the live-site link.
 * @param codeLabel - The label for the code-repository link.
 * @param caseLabel - The label for the case-study link.
 * @param archiveLabel - The label displayed before the project position.
 * @param position - The optional project position displayed with the archive label.
 */
export function ProjectCard({
  project,
  category,
  description,
  liveLabel,
  codeLabel,
  caseLabel,
  archiveLabel,
  position,
}: Readonly<{
  project: Project;
  category: string;
  description: string;
  liveLabel: string;
  codeLabel: string;
  caseLabel: string;
  archiveLabel?: string;
  position?: ProjectPosition;
}>) {
  return (
    <Card className="project-card group overflow-hidden" data-project-card={project.slug}>
      <div className="border-foreground bg-muted relative aspect-4/3 border-b-2">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="project-card__image object-cover grayscale"
          placeholder="blur"
        />
      </div>
      <CardContent className="grid min-h-80 content-between gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{category}</Badge>
            {position && archiveLabel && (
              <span
                className="text-muted-foreground font-mono text-xs font-bold tracking-[0.12em] uppercase"
                data-project-position
              >
                {archiveLabel} {formatProjectPosition(position)}
              </span>
            )}
            <span className="text-muted-foreground font-mono text-xs font-bold">
              {project.year}
            </span>
          </div>
          <h3 className="font-display mt-6 text-3xl leading-none tracking-[-0.06em]">
            {project.name}
          </h3>
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="border-foreground bg-background border px-2 py-1 font-mono text-[0.65rem] font-bold tracking-[0.12em] uppercase"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className={buttonVariants({ size: 'sm' })}
              aria-label={`${caseLabel}: ${project.name}`}
            >
              {caseLabel}
              <ArrowRight aria-hidden="true" strokeWidth={2.5} />
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'sm', variant: 'secondary' })}
              aria-label={`${liveLabel}: ${project.name}`}
            >
              {liveLabel}
              <ExternalLink aria-hidden="true" strokeWidth={2.5} />
            </a>
            <a
              href={project.gitUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'sm', variant: 'ghost' })}
              aria-label={`${codeLabel}: ${project.name}`}
            >
              {codeLabel}
              <Code2 aria-hidden="true" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
