import { describe, expect, it } from 'vitest';
import {
  collectReleaseState,
  nextVersion,
  parseConventionalSubject,
  validateReleaseVersionState,
} from '../scripts/release/release-state';

describe('manual release state', () => {
  it('parses the allowed Conventional Commit contract', () => {
    expect(parseConventionalSubject('feat(discovery): add agent index')).toMatchObject({
      breaking: false,
      scope: 'discovery',
      type: 'feat',
    });
    expect(parseConventionalSubject('fix!: replace public contract')).toMatchObject({
      breaking: true,
      type: 'fix',
    });
    expect(parseConventionalSubject('Update files')).toBeUndefined();
  });

  it('plans the highest required semantic version bump', () => {
    expect(
      nextVersion('0.2.0', [
        {
          breaking: false,
          parents: [],
          releasable: true,
          sha: 'a',
          subject: 'fix: repair route',
          type: 'fix',
        },
      ]),
    ).toBe('0.2.1');
    expect(
      nextVersion('0.2.0', [
        {
          breaking: false,
          parents: [],
          releasable: true,
          sha: 'b',
          subject: 'feat: add route',
          type: 'feat',
        },
      ]),
    ).toBe('0.3.0');
  });

  it('reports a valid repository release baseline', () => {
    const state = collectReleaseState();

    expect(state.baseVersion).toBe('0.2.0');
    expect(state.releaseRange).toMatch(/\.\.HEAD$/);
    expect(state.errors).toEqual([]);
    expect(state.invalidCommits).toEqual([]);
  });

  it('accepts only an exact pre-tag release commit for the planned version', () => {
    expect(
      validateReleaseVersionState({
        baseVersion: '0.2.0',
        headSubject: 'chore(release): 0.3.0',
        latestReleasedVersion: '0.3.0',
        packageVersion: '0.3.0',
        plannedVersion: '0.3.0',
      }),
    ).toEqual({ errors: [], mode: 'release-commit-awaiting-tag' });

    const invalid = validateReleaseVersionState({
      baseVersion: '0.2.0',
      headSubject: 'feat: continue after an untagged release',
      latestReleasedVersion: '0.3.0',
      packageVersion: '0.3.0',
      plannedVersion: '0.4.0',
    });
    expect(invalid.mode).toBe('invalid');
    expect(invalid.errors).not.toEqual([]);
  });
});
