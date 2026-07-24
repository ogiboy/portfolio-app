import { getProjectCategory, getProjectDescription, projects } from '@/content/projects';
import { contact, siteCopy, type Locale } from '@/content/site';
import { identity } from '@/lib/seo';

export const agentMarkdownCacheControl = 'private, no-store';

type MarkdownDocument = {
  body: string;
  locale: Locale;
};

function asLocale(value: string): Locale | undefined {
  return value === 'en' || value === 'tr' ? value : undefined;
}

function markdownList(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

function aboutPathHref(target: 'email' | 'linkedin' | 'projects') {
  switch (target) {
    case 'email':
      return `mailto:${contact.email}`;
    case 'linkedin':
      return contact.linkedin;
    case 'projects':
      return '/projects';
  }
}

function homeMarkdown(locale: Locale): MarkdownDocument {
  const copy = siteCopy[locale];

  return {
    locale,
    body: `# ${identity.brand} - ${identity.fullName} Portfolio\n\n${copy.home.title}\n\n${copy.home.subtitle}\n\n## ${copy.home.servicesTitle}\n\n${copy.home.servicesIntro}\n\n${copy.home.services
      .map((service) => `### ${service.title}\n\n${service.body}`)
      .join('\n\n')}\n\n## ${copy.home.selectedTitle}\n\n${copy.home.selectedIntro}\n\n${projects
      .filter((project) => project.featured)
      .map(
        (project) =>
          `- [${project.name}](/${locale}/projects/${project.slug}) - ${getProjectDescription(project, locale)}`,
      )
      .join(
        '\n',
      )}\n\n## ${copy.home.contactTitle}\n\n${copy.home.contactIntro}\n\n- Email: ${contact.email}\n- GitHub: ${contact.github}\n- LinkedIn: ${contact.linkedin}\n\n## Public navigation\n\n- [${copy.nav.about}](/${locale}/about)\n- [${copy.nav.projects}](/${locale}/projects)\n- [${copy.nav.lab}](/${locale}/labs/retro-game-center)\n- [Public portfolio API](/api/portfolio)\n`,
  };
}

function aboutMarkdown(locale: Locale): MarkdownDocument {
  const copy = siteCopy[locale].about;

  return {
    locale,
    body: `# ${copy.title}\n\n${copy.intro}\n\n## ${copy.identityTitle}\n\n${copy.identityBody}\n\n## ${copy.pathsTitle}\n\n${copy.pathsIntro}\n\n${copy.paths
      .map(
        (path) =>
          `### ${path.title}\n\n${path.body}\n\n[${path.action}](${aboutPathHref(path.target)})`,
      )
      .join(
        '\n\n',
      )}\n\n## ${copy.linksTitle}\n\n- [${copy.projectsAction}](/${locale}/projects)\n- [${copy.labAction}](/${locale}/labs/retro-game-center)\n- [${copy.githubAction}](${contact.github})\n- [${copy.linkedinAction}](${contact.linkedin})\n- [${copy.emailAction}](mailto:${contact.email})\n`,
  };
}

function projectArchiveMarkdown(locale: Locale): MarkdownDocument {
  const copy = siteCopy[locale].projects;

  return {
    locale,
    body: `# ${copy.title}\n\n${copy.intro}\n\n${projects
      .map(
        (project) =>
          `## [${project.name}](/${locale}/projects/${project.slug})\n\n${getProjectDescription(project, locale)}\n\n- ${copy.yearLabel}: ${project.year}\n- ${copy.categoryLabel}: ${getProjectCategory(project, locale)}\n- ${copy.stackLabel}: ${project.stack.join(', ')}\n- [${copy.live}](${project.url})\n- [${copy.code}](${project.gitUrl})`,
      )
      .join('\n\n')}\n`,
  };
}

function projectMarkdown(locale: Locale, slug: string): MarkdownDocument | undefined {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return undefined;
  }

  const copy = siteCopy[locale].projects;
  return {
    locale,
    body: `# ${project.name}\n\n${getProjectDescription(project, locale)}\n\n- ${copy.yearLabel}: ${project.year}\n- ${copy.categoryLabel}: ${getProjectCategory(project, locale)}\n- ${copy.stackLabel}: ${project.stack.join(', ')}\n- [${copy.live}](${project.url})\n- [${copy.code}](${project.gitUrl})\n\n[${copy.back}](/${locale}/projects)\n`,
  };
}

function labMarkdown(locale: Locale): MarkdownDocument {
  const copy = siteCopy[locale].lab;
  return {
    locale,
    body: `# ${copy.title}\n\n${copy.intro}\n\n## ${copy.specsTitle}\n\n${copy.specsIntro}\n\n${copy.specs
      .map((specification) => `### ${specification.title}\n\n${specification.body}`)
      .join(
        '\n\n',
      )}\n\n## ${copy.qaTitle}\n\n${markdownList(copy.qa)}\n\n[${copy.back}](/${locale})\n`,
  };
}

export function getAgentMarkdown(pathname: string): MarkdownDocument | undefined {
  if (pathname === '/') {
    return homeMarkdown('en');
  }

  const segments = pathname.split('/').filter(Boolean);
  const locale = asLocale(segments[0] ?? '');
  if (!locale) {
    return undefined;
  }

  if (segments.length === 1) {
    return homeMarkdown(locale);
  }

  if (segments[1] === 'about' && segments.length === 2) {
    return aboutMarkdown(locale);
  }

  if (segments[1] === 'projects' && segments.length === 2) {
    return projectArchiveMarkdown(locale);
  }

  if (segments[1] === 'projects' && segments.length === 3) {
    return projectMarkdown(locale, segments[2]);
  }

  if (segments.length === 3 && segments[1] === 'labs' && segments[2] === 'retro-game-center') {
    return labMarkdown(locale);
  }

  return undefined;
}

export function markdownResponse(
  pathname: string,
  options?: { includeBody: boolean; status?: number; varyLocale?: boolean },
) {
  const document = getAgentMarkdown(pathname);
  const status = options?.status ?? (document ? 200 : 404);
  const requestedLocale = asLocale(pathname.split('/').find(Boolean) ?? '');
  const locale = document?.locale ?? requestedLocale ?? 'en';
  const body =
    document?.body ?? '# Not found\n\nThe requested public portfolio page was not found.\n';

  return new Response((options?.includeBody ?? true) ? body : null, {
    status,
    headers: {
      'Cache-Control': agentMarkdownCacheControl,
      'Content-Language': locale,
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: options?.varyLocale ? 'Accept, Accept-Language, Cookie' : 'Accept',
    },
  });
}
