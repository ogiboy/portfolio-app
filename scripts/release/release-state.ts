import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const conventionalSubjectPattern =
  /^(feat|fix|perf|docs|build|ci|chore|refactor|test|style)(?:\(([a-z0-9._/-]+)\))?(!)?: (\S.*)$/;
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const stableTagPattern = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const releasableTypes = new Set(['feat', 'fix', 'perf', 'refactor']);
const gitExecutable = '/usr/bin/git';

type ConventionalSubject = {
  breaking: boolean;
  description: string;
  scope?: string;
  type: string;
};

type ReleaseCommit = {
  breaking: boolean;
  parents: string[];
  releasable: boolean;
  sha: string;
  subject: string;
  type?: string;
};

type PackageManifest = {
  releasePolicy?: {
    bootstrapVersion?: string;
    conventionalCommitBaseline?: string;
    conventionalCommitExceptions?: Array<{ reason?: string; sha?: string }>;
  };
  version?: string;
};

type ReleaseVersionState = {
  baseVersion: string;
  headSubject: string;
  latestReleasedVersion: string;
  packageVersion: string;
  plannedVersion: string | null;
};

function git(cwd: string, args: string[], optional = false) {
  try {
    return execFileSync(gitExecutable, args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (error) {
    if (optional) return '';
    throw error;
  }
}

/** Parses a Conventional Commit subject into its release-relevant structured fields. */
export function parseConventionalSubject(subject: string): ConventionalSubject | undefined {
  const match = conventionalSubjectPattern.exec(subject);
  if (!match) return undefined;

  return {
    breaking: Boolean(match[3]),
    description: match[4],
    scope: match[2],
    type: match[1],
  };
}

/** Calculates the next semantic version implied by releasable commits since baseline. */
export function nextVersion(baseVersion: string, commits: ReleaseCommit[]) {
  const match = semverPattern.exec(baseVersion);
  if (!match) throw new Error(`Invalid semantic version: ${baseVersion}`);

  let [major, minor, patch] = match.slice(1).map(Number);
  const breaking = commits.some((commit) => commit.breaking);
  const feature = commits.some((commit) => commit.type === 'feat');
  const patchLevel = commits.some((commit) => commit.releasable);

  if (!breaking && !feature && !patchLevel) return null;
  if (breaking) {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (feature) {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

/** Verifies package, changelog, and HEAD state against the planned release version. */
export function validateReleaseVersionState({
  baseVersion,
  headSubject,
  latestReleasedVersion,
  packageVersion,
  plannedVersion,
}: ReleaseVersionState) {
  const errors: string[] = [];

  if (latestReleasedVersion !== packageVersion) {
    errors.push(
      `Latest released changelog version (${latestReleasedVersion || '<missing>'}) does not match package.json (${packageVersion || '<missing>'}).`,
    );
  }

  if (packageVersion === baseVersion && latestReleasedVersion === baseVersion) {
    return { errors, mode: 'development' as const };
  }

  if (
    plannedVersion &&
    packageVersion === plannedVersion &&
    latestReleasedVersion === plannedVersion
  ) {
    const expectedSubject = `chore(release): ${plannedVersion}`;
    if (headSubject !== expectedSubject) {
      errors.push(
        `Pre-tag release state requires HEAD subject "${expectedSubject}", received "${headSubject}".`,
      );
    }
    return {
      errors,
      mode: errors.length === 0 ? ('release-commit-awaiting-tag' as const) : ('invalid' as const),
    };
  }

  errors.push(
    `package.json must remain at base ${baseVersion} during development or equal planned ${plannedVersion ?? '<none>'} in the matching HEAD release commit.`,
  );
  return { errors, mode: 'invalid' as const };
}

function releaseCommits(cwd: string, range: string): ReleaseCommit[] {
  const output = git(cwd, ['log', '--format=%H%x09%P%x09%s', range], true);
  if (!output) return [];

  return output
    .split('\n')
    .map((line) => {
      const [sha = '', parentList = '', ...subjectParts] = line.split('\t');
      const subject = subjectParts.join('\t');
      const parents = parentList.split(' ').filter(Boolean);
      const parsed = parseConventionalSubject(subject);
      return {
        breaking: parsed?.breaking ?? false,
        parents,
        releasable: parsed ? releasableTypes.has(parsed.type) : false,
        sha,
        subject,
        type: parsed?.type,
      };
    })
    .filter((commit) => commit.parents.length < 2);
}

function latestStableTag(cwd: string) {
  const tags = git(
    cwd,
    ['tag', '--merged', 'HEAD', '--list', 'v*', '--sort=-version:refname'],
    true,
  );
  return tags.split('\n').find((tag) => stableTagPattern.test(tag)) ?? '';
}

/** Collects repository release evidence and validation errors for release tooling. */
export function collectReleaseState(cwd = process.cwd()) {
  const packageManifest = JSON.parse(
    readFileSync(resolve(cwd, 'package.json'), 'utf8'),
  ) as PackageManifest;
  const changelog = readFileSync(resolve(cwd, 'CHANGELOG.md'), 'utf8');
  const packageVersion = packageManifest.version ?? '';
  const latestTag = latestStableTag(cwd);
  const bootstrapVersion = packageManifest.releasePolicy?.bootstrapVersion ?? '';
  const configuredBaseline = packageManifest.releasePolicy?.conventionalCommitBaseline ?? '';
  const configuredExceptions = packageManifest.releasePolicy?.conventionalCommitExceptions ?? [];
  const validExceptions = configuredExceptions.filter(
    (exception) => /^[0-9a-f]{40}$/.test(exception.sha ?? '') && Boolean(exception.reason?.trim()),
  );
  const exceptionShas = new Set(validExceptions.map((exception) => exception.sha));
  const rangeStart = latestTag || configuredBaseline;
  const errors: string[] = [];

  if (!semverPattern.test(packageVersion)) {
    errors.push(`package.json version is not valid SemVer: ${packageVersion || '<missing>'}`);
  }
  if (!latestTag && !semverPattern.test(bootstrapVersion)) {
    errors.push(
      `releasePolicy.bootstrapVersion is required before the first stable tag: ${bootstrapVersion || '<missing>'}`,
    );
  }
  if (!rangeStart) {
    errors.push('No stable v* tag or releasePolicy.conventionalCommitBaseline is available.');
  } else if (!git(cwd, ['rev-parse', '--verify', `${rangeStart}^{commit}`], true)) {
    errors.push(`Release range start is not a commit: ${rangeStart}`);
  }
  if (validExceptions.length !== configuredExceptions.length) {
    errors.push(
      'Each releasePolicy.conventionalCommitExceptions entry requires a full lowercase commit SHA and a reason.',
    );
  }

  const latestReleasedVersion = /^## (\d+\.\d+\.\d+)(?: - .+)?$/m.exec(changelog)?.[1] ?? '';
  if (!changelog.includes('## Unreleased')) {
    errors.push('CHANGELOG.md must contain an Unreleased section.');
  }

  const releaseRange = rangeStart ? `${rangeStart}..HEAD` : '';
  const commits = releaseRange ? releaseCommits(cwd, releaseRange) : [];
  const invalidCommits = commits
    .filter((commit) => !parseConventionalSubject(commit.subject) && !exceptionShas.has(commit.sha))
    .map(({ sha, subject }) => ({ sha, subject }));
  if (invalidCommits.length > 0) {
    errors.push(`${invalidCommits.length} non-merge commit(s) do not use Conventional Commits.`);
  }

  const baseVersion = latestTag ? latestTag.slice(1) : bootstrapVersion;
  const plannedVersion = semverPattern.test(baseVersion) ? nextVersion(baseVersion, commits) : null;
  const headSubject = git(cwd, ['log', '-1', '--format=%s'], true);
  const versionState = validateReleaseVersionState({
    baseVersion,
    headSubject,
    latestReleasedVersion,
    packageVersion,
    plannedVersion,
  });
  errors.push(...versionState.errors);

  return {
    baseVersion,
    commits: commits.map(({ sha, subject, type, breaking, releasable }) => ({
      sha,
      subject,
      type,
      breaking,
      releasable,
    })),
    errors,
    invalidCommits,
    latestTag: latestTag || null,
    mode: versionState.mode,
    nextVersion: plannedVersion,
    releaseNeeded: versionState.mode === 'development' && plannedVersion !== null,
    releaseRange,
  };
}

function runCli() {
  const state = collectReleaseState();
  process.stdout.write(`${JSON.stringify(state, null, 2)}\n`);
  if (process.argv.includes('--check') && state.errors.length > 0) {
    process.exitCode = 1;
  }
}

const entrypoint = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : '';
if (import.meta.url === entrypoint) runCli();
