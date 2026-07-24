import { projects } from './project-records';
import type { Project, ProjectPosition } from './project-types';

export { projects };
export type { Project, ProjectPosition };

export const featuredProjects = projects.filter((project) => project.featured);
export const cinematicProjects = projects.filter((project) => !project.featured).slice(0, 6);

/**
 * Finds a project by its slug.
 *
 * @param slug - The project slug to search for
 * @returns The matching project, or `undefined` if no project has the specified slug
 */
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/**
 * Selects a project's category for the requested locale.
 *
 * @param project - The project whose category to retrieve
 * @param locale - The locale used to select the category
 * @returns The Turkish category when `locale` is `'tr'`; otherwise, the English category
 */
export function getProjectCategory(project: Project, locale: 'en' | 'tr') {
  return locale === 'tr' ? project.categoryTr : project.category;
}

/**
 * Selects a project's description for the specified locale.
 *
 * @param project - The project whose description to retrieve
 * @param locale - The description locale
 * @returns The Turkish description for `tr`, or the English description otherwise
 */
export function getProjectDescription(project: Project, locale: 'en' | 'tr') {
  return locale === 'tr' ? project.descriptionTr : project.description;
}

/**
 * Finds the project that follows the project identified by the given slug.
 *
 * @param slug - The slug of the current project
 * @returns The next project in the list, wrapping to the first project when needed
 */
export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/**
 * Finds a project's one-based position in the project list.
 *
 * @param slug - The project's URL slug
 * @returns The project's position and the total project count, or `undefined` if no project matches the slug.
 */
export function getProjectPosition(slug: string): ProjectPosition | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return undefined;

  return {
    current: index + 1,
    total: projects.length,
  };
}

/**
 * Formats a project position with zero-padded current index and total count.
 *
 * @param current - The current project index
 * @param total - The total number of projects
 * @returns The formatted position in the form `0001 / 12`
 */
export function formatProjectPosition({ current, total }: ProjectPosition) {
  const width = String(total).length;
  return `${String(current).padStart(width, '0')} / ${total}`;
}
