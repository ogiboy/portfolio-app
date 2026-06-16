import Image from 'next/image';
import { ArrowRight, ArrowSquareOut, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/content/projects';
import { Link } from '@/i18n/navigation';

export function ProjectCard({
  project,
  liveLabel,
  codeLabel,
  caseLabel,
}: Readonly<{
  project: Project;
  liveLabel: string;
  codeLabel: string;
  caseLabel: string;
}>) {
  return (
    <Card className="group overflow-hidden">
      <div className="border-foreground bg-muted relative aspect-[4/3] border-b-2">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
          placeholder="blur"
        />
      </div>
      <CardContent className="grid min-h-[20rem] content-between gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.category}</Badge>
            <span className="text-muted-foreground font-mono text-xs font-bold">
              {project.year}
            </span>
          </div>
          <h3 className="font-display mt-6 text-3xl leading-none tracking-[-0.06em]">
            {project.name}
          </h3>
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
            {project.description}
          </p>
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
            <Button asChild size="sm">
              <Link href={`/projects/${project.slug}`}>
                {caseLabel}
                <ArrowRight aria-hidden="true" weight="bold" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <a href={project.url} target="_blank" rel="noreferrer">
                {liveLabel}
                <ArrowSquareOut aria-hidden="true" weight="bold" />
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <a href={project.gitUrl} target="_blank" rel="noreferrer">
                {codeLabel}
                <GithubLogo aria-hidden="true" weight="bold" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
