import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProjectCard } from '@/components/site/project-card';
import { projects } from '@/content/projects';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <span aria-label={alt} role="img" />,
}));

describe('ProjectCard', () => {
  const project = projects[0];

  it('keeps archive position and case destination available without client state', () => {
    render(
      <ProjectCard
        project={project}
        category={project.category}
        description={project.description}
        liveLabel="Live"
        codeLabel="Code"
        caseLabel="Case"
        archiveLabel="Archive"
        position={{ current: 1, total: projects.length }}
      />,
    );

    expect(screen.getByText(`Archive 01 / ${projects.length}`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Case: ${project.name}` })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`,
    );
    expect(screen.getByRole('link', { name: `Live: ${project.name}` })).toHaveAttribute(
      'href',
      project.url,
    );
    expect(screen.getByRole('link', { name: `Code: ${project.name}` })).toHaveAttribute(
      'href',
      project.gitUrl,
    );
  });

  it('does not invent an archive position for selected-work cards', () => {
    render(
      <ProjectCard
        project={project}
        category={project.categoryTr}
        description={project.descriptionTr}
        liveLabel="Canlı"
        codeLabel="Kod"
        caseLabel="Detay"
      />,
    );

    expect(screen.queryByText(/Archive/)).not.toBeInTheDocument();
    expect(screen.getByText(project.categoryTr)).toBeInTheDocument();
    expect(screen.getByText(project.descriptionTr)).toBeInTheDocument();
  });
});
