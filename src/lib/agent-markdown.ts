import { getProjectCategory, getProjectDescription, projects } from '@/content/projects';
import { contact, siteCopy, type Locale } from '@/content/site';
import { identity } from '@/lib/seo';

/** Cache policy that prevents agent markdown responses from being stored. */
export const agentMarkdownCacheControl = 'private, no-store';

type MarkdownDocument = {
  body: string;
  locale: Locale;
};

function asLocale(value: string): Locale | undefined {
  return value === 'en' || value === 'tr' ? value : undefined;
}

/**
 * Formats strings as a newline-separated Markdown bullet list.
 *
 * @param items - The strings to format as list items
 * @returns A Markdown bullet list
 */
function markdownList(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

/**
 * Builds the link for an About page action.
 *
 * @param locale - The locale used for the localized Projects path.
 * @param target - The destination type.
 * @returns The corresponding email, LinkedIn, or Projects link.
 */
function aboutPathHref(locale: Locale, target: 'email' | 'linkedin' | 'projects') {
  switch (target) {
    case 'email':
      return `mailto:${contact.email}`;
    case 'linkedin':
      return contact.linkedin;
    case 'projects':
      return `/${locale}/projects`;
  }
}

/**
 * Builds the localized Markdown document for the portfolio home page.
 *
 * @param locale - The locale used for page content and localized links
 * @returns The localized home page Markdown document
 */
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

/**
 * Builds the localized About page as a Markdown document.
 *
 * @param locale - The locale used for page content and links.
 * @returns The localized About page document.
 */
function aboutMarkdown(locale: Locale): MarkdownDocument {
  const copy = siteCopy[locale].about;

  return {
    locale,
    body: `# ${copy.title}\n\n${copy.intro}\n\n## ${copy.identityTitle}\n\n${copy.identityBody}\n\n## ${copy.pathsTitle}\n\n${copy.pathsIntro}\n\n${copy.paths
      .map(
        (path) =>
          `### ${path.title}\n\n${path.body}\n\n[${path.action}](${aboutPathHref(locale, path.target)})`,
      )
      .join(
        '\n\n',
      )}\n\n## ${copy.linksTitle}\n\n- [${copy.projectsAction}](/${locale}/projects)\n- [${copy.labAction}](/${locale}/labs/retro-game-center)\n- [${copy.githubAction}](${contact.github})\n- [${copy.linkedinAction}](${contact.linkedin})\n- [${copy.emailAction}](mailto:${contact.email})\n`,
  };
}

/**
 * Builds the localized Markdown project archive.
 *
 * @param locale - The locale used for labels, descriptions, categories, and links
 * @returns The generated project archive document
 */
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

/**
 * Generates a localized Markdown page for a project identified by its slug.
 *
 * @param locale - The locale used for localized project labels and descriptions
 * @param slug - The project's URL slug
 * @returns The project's Markdown document, or `undefined` when no project matches the slug
 */
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

/**
 * Builds the localized Markdown document for the retro game center lab page.
 *
 * @param locale - The locale used for page content and links.
 * @returns The localized lab page document.
 */
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

/**
 * Resolves a supported public portfolio route to localized Markdown content.
 *
 * @param pathname - The URL pathname to resolve
 * @returns The localized Markdown document, or `undefined` for unsupported routes
 */
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

/**
 * Creates an HTTP response containing Markdown for a supported public pathname.
 *
 * @param pathname - The public pathname to resolve.
 * @param options - Controls body inclusion, status override, and locale-related caching headers.
 * @returns An HTTP response containing the resolved Markdown document or a not-found response.
 */
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
