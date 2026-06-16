import { describe, expect, it } from 'vitest';
import { projects } from '@/content/projects';
import { siteCopy } from '@/content/site';

describe('portfolio content', () => {
  it('keeps project slugs unique and route-safe', () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it('keeps all projects publishable', () => {
    expect(projects.length).toBeGreaterThanOrEqual(12);

    for (const project of projects) {
      expect(project.name).toBeTruthy();
      expect(project.description.length).toBeGreaterThan(24);
      expect(project.url).toMatch(/^https?:\/\//);
      expect(project.gitUrl).toMatch(/^https?:\/\//);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('keeps EN and TR public copy complete', () => {
    expect(siteCopy.en.home.primaryCta).toBeTruthy();
    expect(siteCopy.tr.home.primaryCta).toBeTruthy();
    expect(siteCopy.en.projects.caseLabel).toBeTruthy();
    expect(siteCopy.tr.projects.caseLabel).toBeTruthy();
  });

  it('avoids banned dash characters in visible copy', () => {
    expect(JSON.stringify(siteCopy)).not.toMatch(/[—–]/);
  });
});
