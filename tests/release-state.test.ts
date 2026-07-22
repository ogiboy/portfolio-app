import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  collectReleaseState,
  nextVersion,
  parseConventionalSubject,
  validateReleaseVersionState,
} from '../scripts/release/release-state';

const fixtures: string[] = [];

function git(cwd: string, ...args: string[]) {
  return execFileSync('/usr/bin/git', args, { cwd, encoding: 'utf8' }).trim();
}

function writeReleaseFiles(
  cwd: string,
  conventionalCommitBaseline?: string,
  conventionalCommitExceptions?: Array<{ reason: string; sha: string }>,
) {
  writeFileSync(
    join(cwd, 'package.json'),
    `${JSON.stringify(
      {
        name: 'release-state-fixture',
        version: '0.2.0',
        releasePolicy: {
          bootstrapVersion: '0.2.0',
          conventionalCommitBaseline,
          conventionalCommitExceptions,
        },
      },
      null,
      2,
    )}\n`,
  );
  writeFileSync(
    join(cwd, 'CHANGELOG.md'),
    '# Changelog\n\n## Unreleased\n\n## 0.2.0 - 2026-07-22\n',
  );
}

function createFixture() {
  const cwd = mkdtempSync(join(tmpdir(), 'portfolio-release-state-'));
  fixtures.push(cwd);
  git(cwd, 'init', '--quiet');
  git(cwd, 'config', 'user.name', 'Release Test');
  git(cwd, 'config', 'user.email', 'release-test@example.com');
  return cwd;
}

function commitAll(cwd: string, subject: string) {
  git(cwd, 'add', '.');
  git(cwd, 'commit', '--quiet', '-m', subject);
}

afterEach(() => {
  for (const fixture of fixtures.splice(0)) {
    rmSync(fixture, { recursive: true, force: true });
  }
});

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

  it('selects only an exact stable tag for the release baseline', () => {
    const fixture = createFixture();
    writeReleaseFiles(fixture);
    writeFileSync(join(fixture, 'baseline.txt'), 'baseline\n');
    commitAll(fixture, 'chore: initialize release fixture');
    git(fixture, 'tag', 'v0.2.0');

    writeFileSync(join(fixture, 'feature.txt'), 'feature\n');
    commitAll(fixture, 'feat: add fixture behavior');
    git(fixture, 'tag', 'v0.3.0-rc.1');
    git(fixture, 'tag', 'v9.9.9-preview');

    const state = collectReleaseState(fixture);

    expect(state.latestTag).toBe('v0.2.0');
    expect(state.baseVersion).toBe('0.2.0');
    expect(state.releaseRange).toBe('v0.2.0..HEAD');
    expect(state.nextVersion).toBe('0.3.0');
    expect(state.errors).toEqual([]);
    expect(state.invalidCommits).toEqual([]);
  });

  it('falls back to the configured baseline when only prerelease tags exist', () => {
    const fixture = createFixture();
    writeReleaseFiles(fixture);
    writeFileSync(join(fixture, 'baseline.txt'), 'baseline\n');
    commitAll(fixture, 'chore: initialize release fixture');
    const baseline = git(fixture, 'rev-parse', 'HEAD');

    writeReleaseFiles(fixture, baseline);
    commitAll(fixture, 'chore: configure release baseline');
    git(fixture, 'tag', 'v0.3.0-rc.1');
    writeFileSync(join(fixture, 'fix.txt'), 'fix\n');
    commitAll(fixture, 'fix: repair fixture behavior');

    const state = collectReleaseState(fixture);

    expect(state.latestTag).toBeNull();
    expect(state.releaseRange).toBe(`${baseline}..HEAD`);
    expect(state.nextVersion).toBe('0.2.1');
    expect(state.errors).toEqual([]);
    expect(state.invalidCommits).toEqual([]);
  });

  it('allows a documented exception for one exact legacy commit', () => {
    const fixture = createFixture();
    writeReleaseFiles(fixture);
    writeFileSync(join(fixture, 'baseline.txt'), 'baseline\n');
    commitAll(fixture, 'chore: initialize release fixture');
    const baseline = git(fixture, 'rev-parse', 'HEAD');

    writeFileSync(join(fixture, 'legacy.txt'), 'legacy\n');
    commitAll(fixture, 'Legacy provider commit');
    const legacyCommit = git(fixture, 'rev-parse', 'HEAD');

    writeReleaseFiles(fixture, baseline, [
      { reason: 'Imported before policy enforcement.', sha: legacyCommit },
    ]);
    commitAll(fixture, 'chore: document legacy commit exception');

    const state = collectReleaseState(fixture);

    expect(state.releaseRange).toBe(`${baseline}..HEAD`);
    expect(state.errors).toEqual([]);
    expect(state.invalidCommits).toEqual([]);
    expect(state.commits).toContainEqual(
      expect.objectContaining({ sha: legacyCommit, subject: 'Legacy provider commit' }),
    );
  });

  it('rejects incomplete legacy commit exceptions', () => {
    const fixture = createFixture();
    writeReleaseFiles(fixture);
    writeFileSync(join(fixture, 'baseline.txt'), 'baseline\n');
    commitAll(fixture, 'chore: initialize release fixture');
    const baseline = git(fixture, 'rev-parse', 'HEAD');

    writeFileSync(join(fixture, 'legacy.txt'), 'legacy\n');
    commitAll(fixture, 'Legacy provider commit');
    const legacyCommit = git(fixture, 'rev-parse', 'HEAD');

    writeReleaseFiles(fixture, baseline, [
      { reason: 'Imported before policy enforcement.', sha: legacyCommit.slice(0, 7) },
    ]);
    commitAll(fixture, 'chore: configure incomplete legacy exception');

    const state = collectReleaseState(fixture);

    expect(state.errors).toContain(
      'Each releasePolicy.conventionalCommitExceptions entry requires a full lowercase commit SHA and a reason.',
    );
    expect(state.invalidCommits).toEqual([
      { sha: legacyCommit, subject: 'Legacy provider commit' },
    ]);
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
