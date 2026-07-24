import { describe, expect, it } from 'vitest';
import {
  cinematicProjects,
  featuredProjects,
  formatProjectPosition,
  getNextProject,
  getProjectCategory,
  getProjectDescription,
  getProjectPosition,
  projects,
} from '@/content/projects';
import { contact, siteCopy } from '@/content/site';

describe('portfolio content', () => {
  it('keeps project slugs unique and route-safe', () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it('keeps all projects publishable', () => {
    expect(projects).toHaveLength(18);

    for (const project of projects) {
      expect(project.name).toBeTruthy();
      expect(project.description.length).toBeGreaterThan(24);
      expect(project.descriptionTr.length).toBeGreaterThan(24);
      expect(project.descriptionTr).not.toBe(project.description);
      expect(project.categoryTr).toBeTruthy();
      expect(project.url).toMatch(/^https?:\/\//);
      expect(project.gitUrl).toMatch(/^https?:\/\//);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('keeps cinematic project headings distinct from featured project headings', () => {
    const featuredSlugs = new Set(featuredProjects.map((project) => project.slug));

    expect(cinematicProjects).toHaveLength(6);
    expect(cinematicProjects.every((project) => !featuredSlugs.has(project.slug))).toBe(true);
  });

  it('serves direct project narratives for both locales', () => {
    for (const project of projects) {
      expect(getProjectDescription(project, 'en')).toBe(project.description);
      expect(getProjectDescription(project, 'tr')).toBe(project.descriptionTr);
      expect(getProjectCategory(project, 'en')).toBe(project.category);
      expect(getProjectCategory(project, 'tr')).toBe(project.categoryTr);
      expect(project.description).not.toMatch(/\b(clean|modern|playful|simple|smooth|unique)\b/i);
    }
  });

  it('uses canonical project order for archive and next-project continuity', () => {
    const first = projects[0];
    const last = projects.at(-1);

    expect(getProjectPosition(first.slug)).toEqual({ current: 1, total: projects.length });
    expect(formatProjectPosition({ current: 1, total: projects.length })).toBe(
      `01 / ${projects.length}`,
    );
    expect(last && getNextProject(last.slug)).toBe(first);
    expect(getProjectPosition('missing-project')).toBeUndefined();
  });

  it('keeps EN and TR public copy complete', () => {
    expect(contact.email).toBe('ogi@oguzcantoptas.com');
    expect(siteCopy.en.home.primaryCta).toBeTruthy();
    expect(siteCopy.tr.home.primaryCta).toBeTruthy();
    expect(siteCopy.en.nav.about).toBe('About');
    expect(siteCopy.tr.nav.about).toBe('Hakkında');
    expect(siteCopy.en.nav.useDarkTheme).toBe('Use dark theme');
    expect(siteCopy.tr.nav.useLightTheme).toBe('Açık temayı kullan');
    expect(siteCopy.en.projects.caseLabel).toBeTruthy();
    expect(siteCopy.tr.projects.caseLabel).toBeTruthy();
    expect(siteCopy.en.projects.archiveLabel).toBe('Archive');
    expect(siteCopy.tr.projects.archiveLabel).toBe('Arşiv');
    expect(siteCopy.en.lab.launchLabel).toBeTruthy();
    expect(siteCopy.tr.lab.launchLabel).toBeTruthy();
    expect(siteCopy.en.lab.specs).toHaveLength(siteCopy.tr.lab.specs.length);
    for (const locale of ['en', 'tr'] as const) {
      expect(siteCopy[locale].brand.homeLabel).toContain('H.O.T.');
      expect(siteCopy[locale].brand.homeLabel).toContain('Halil Oğuzcan Toptaş');
    }
    expect(siteCopy.en.privacy.disableAction).toBeTruthy();
    expect(siteCopy.tr.privacy.disableAction).toBeTruthy();
    expect(siteCopy.en.about.title).toBe('Halil Oğuzcan Toptaş');
    expect(siteCopy.tr.about.title).toBe('Halil Oğuzcan Toptaş');
    expect(siteCopy.en.about.intro).toContain('H.O.T.');
    expect(siteCopy.tr.about.intro).toContain('H.O.T.');
    expect(siteCopy.en.about.paths).toHaveLength(3);
    expect(siteCopy.tr.about.paths).toHaveLength(3);
  });

  it('avoids banned dash characters in visible copy', () => {
    expect(JSON.stringify(siteCopy)).not.toMatch(/[—–]/);
  });
});
