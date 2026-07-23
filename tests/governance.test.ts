import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseDocument } from 'yaml';

const root = process.cwd();
const readProjectFile = (path: string) => readFileSync(join(root, path), 'utf8');

function parseJsonFile<T>(path: string) {
  return JSON.parse(readProjectFile(path)) as T;
}

function parseYamlText<T>(source: string) {
  const document = parseDocument(source, { uniqueKeys: true });
  if (document.errors.length > 0) {
    throw new Error(document.errors.map((error) => error.message).join('\n'));
  }
  return document.toJS() as T;
}

function parseYamlFile<T>(path: string) {
  return parseYamlText<T>(readProjectFile(path));
}

function parsePropertiesText(source: string) {
  const properties: Record<string, string> = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('!')) continue;

    const entry = /^([^:=\s]+)\s*[:=]\s*(.*)$/.exec(line);
    if (!entry) throw new Error(`Invalid properties entry: ${line}`);

    const [, key, value] = entry;
    if (Object.hasOwn(properties, key)) throw new Error(`Duplicate properties key: ${key}`);
    properties[key] = value;
  }

  return properties;
}

type WorkflowStep = {
  name?: string;
  run?: string;
  uses?: string;
  with?: Record<string, unknown>;
};

type WorkflowConfig = {
  jobs: {
    verify: {
      steps: WorkflowStep[];
    };
  };
};

type DependabotUpdate = {
  'package-ecosystem': string;
  cooldown?: {
    'default-days': number;
    'semver-major-days': number;
    'semver-minor-days': number;
    'semver-patch-days': number;
  };
};

describe('project governance contracts', () => {
  it('keeps exactly one mutable overhaul checkpoint with the complete handoff schema', () => {
    const checkpointFiles = readdirSync(join(root, '.ai/checkpoints'))
      .filter((file) => file.startsWith('portfolio-overhaul') && file.endsWith('.md'))
      .sort();
    const checkpoint = readProjectFile('.ai/checkpoints/portfolio-overhaul.md');

    expect(checkpointFiles).toEqual(['portfolio-overhaul.md']);
    for (const field of [
      'Status:',
      'Updated:',
      'Objective (immutable until closure):',
      'Non-negotiable constraints (immutable):',
      'Completion criteria (immutable):',
      'Worktree / branch / commit:',
      'Last completed slice / commit:',
      'Current task:',
      'Completed:',
      'Pending:',
      'Owned dirty files:',
      'Unrelated changes:',
      'Decisions:',
      'Required gates / delivery expectations:',
      'Evidence:',
      'Hosted state:',
      'Blockers:',
      'Drift:',
      'Compatibility boundary:',
      'Next action:',
      'Closure / archive condition:',
    ]) {
      expect(checkpoint).toContain(field);
    }
  });

  it('preserves the accepted release decision and supersedes it in a new record', () => {
    const original = readProjectFile('.ai/decisions/2026-06-16-release-workflow.md');
    const replacement = readProjectFile('.ai/decisions/2026-07-22-manual-release-workflow.md');

    expect(original).toContain('# Decision: Changelog Release Workflow');
    expect(original).not.toContain('Supersedes:');
    expect(replacement).toContain('Supersedes: `2026-06-16-release-workflow.md`');
  });

  it('keeps every delivery state as an independent evidence class', () => {
    const checklist = readProjectFile('.ai/checklists/evidence-bundle.md');

    for (const evidenceClass of [
      'local',
      'pushed',
      'hosted-check',
      'preview',
      'browser',
      'review',
      'merge',
      'production',
      'external',
    ]) {
      expect(checklist).toContain(`\`${evidenceClass}\``);
    }
  });

  it('scopes SonarQube Cloud automatic analysis without pretending to publish coverage', () => {
    const sonarConfig = parsePropertiesText(readProjectFile('.sonarcloud.properties'));

    expect(sonarConfig).toEqual({
      'sonar.sources':
        'src,scripts,.github/workflows,next.config.mjs,eslint.config.mjs,postcss.config.js,playwright.config.ts,vitest.config.ts',
      'sonar.tests': 'tests,e2e',
      'sonar.sourceEncoding': 'UTF-8',
    });
  });

  it('keeps CI lifecycle scripts disabled by default and rebuilds only approved packages', () => {
    const workflow = parseYamlFile<WorkflowConfig>('.github/workflows/ci.yml');
    const steps = workflow.jobs.verify.steps;
    const step = (name: string) => steps.find((candidate) => candidate.name === name);

    expect(step('Install dependencies without lifecycle scripts')?.run).toBe(
      'pnpm install --frozen-lockfile --ignore-scripts',
    );
    expect(step('Build approved native dependencies')?.run).toBe(
      'pnpm rebuild @parcel/watcher @swc/core bufferutil sharp unrs-resolver',
    );
    expect(step('Set up Playwright browser')?.run).toBe('pnpm browser:setup');
    expect(step('Verify TypeScript toolchain')?.run).toBe('pnpm qa:typescript');
    expect(step('Typecheck')?.run).toBe('pnpm typecheck');
    expect(step('Typecheck compatibility')?.run).toBe('pnpm typecheck:compat');
    expect(step('Restore Next.js build cache')).toEqual({
      name: 'Restore Next.js build cache',
      uses: 'actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9',
      with: {
        path: '.next/cache',
        key: "${{ runner.os }}-next-${{ hashFiles('pnpm-lock.yaml', 'pnpm-workspace.yaml') }}-${{ hashFiles('src/**/*', 'messages/**/*', 'next.config.mjs', 'tsconfig.json') }}",
        'restore-keys':
          "${{ runner.os }}-next-${{ hashFiles('pnpm-lock.yaml', 'pnpm-workspace.yaml') }}-\n${{ runner.os }}-next-\n",
      },
    });
    expect(steps.map((candidate) => candidate.run).filter(Boolean)).not.toContain(
      'pnpm exec playwright install',
    );
    expect(step('Setup pnpm')?.with).toEqual({ run_install: false });
  });

  it('lets Vercel resolve the repository package-manager pin through Corepack', () => {
    const vercelConfig = parseJsonFile<{ buildCommand: string; installCommand: string }>(
      'vercel.json',
    );

    expect(vercelConfig.installCommand).toBe('corepack pnpm install --frozen-lockfile');
    expect(vercelConfig.buildCommand).toBe('corepack pnpm build');
    expect(Object.values(vercelConfig).join('\n')).not.toContain('pnpm@');
  });

  it('keeps pnpm version ownership and dependency policy unambiguous', () => {
    const packageManifest = parseJsonFile<{
      packageManager: string;
      engines: { pnpm: string };
      scripts: Record<string, string>;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }>('package.json');
    const workspace = parseYamlFile<{
      minimumReleaseAge: number;
      minimumReleaseAgeExclude: string[];
      overrides: Record<string, string>;
    }>('pnpm-workspace.yaml');
    const dependabot = parseYamlFile<{ updates: DependabotUpdate[] }>('.github/dependabot.yml');
    const npmUpdates = dependabot.updates.find((update) => update['package-ecosystem'] === 'npm');

    expect(packageManifest.packageManager).toMatch(/^pnpm@11\.17\.0\+/);
    expect(packageManifest.engines.pnpm).toBe('>=11.16.0 <12');
    expect(packageManifest.devDependencies.postcss).toBe('^8.5.22');
    expect(packageManifest.dependencies['lucide-react']).toBe('^1.26.0');
    expect(packageManifest.dependencies).not.toHaveProperty('@phosphor-icons/react');
    expect(packageManifest.devDependencies['@typescript/native']).toBe('npm:typescript@^7.0.2');
    expect(packageManifest.devDependencies.typescript).toBe('npm:@typescript/typescript6@^6.0.2');
    expect(packageManifest.scripts['qa:typescript']).toBe(
      'node scripts/qa/typescript-toolchain.mjs',
    );
    expect(packageManifest.scripts.typecheck).toBe('tsc --noEmit');
    expect(packageManifest.scripts['typecheck:compat']).toBe('tsc6 --noEmit');
    expect(workspace.overrides.postcss).toBe('^8.5.22');
    expect(workspace.overrides.sharp).toBe('0.35.3');
    expect(workspace.minimumReleaseAge).toBe(1440);
    expect(workspace.minimumReleaseAgeExclude).toEqual([
      '@radix-ui/react-dialog@1.1.17 || 1.1.21',
      '@radix-ui/react-dismissable-layer@1.1.13 || 1.1.17',
      '@radix-ui/react-focus-scope@1.1.10 || 1.1.14',
      '@radix-ui/react-portal@1.1.12 || 1.1.15',
      '@radix-ui/react-primitive@2.1.6 || 2.1.8',
      '@radix-ui/react-slot@1.3.0 || 1.3.1',
      '@radix-ui/primitive@1.1.7',
      '@radix-ui/react-compose-refs@1.1.4',
      '@radix-ui/react-context@1.2.1',
      '@radix-ui/react-focus-guards@1.1.5',
      '@radix-ui/react-id@1.1.3',
      '@radix-ui/react-presence@1.1.9',
      '@radix-ui/react-use-callback-ref@1.1.3',
      '@radix-ui/react-use-controllable-state@1.2.5',
      '@radix-ui/react-use-effect-event@0.0.4',
      '@radix-ui/react-use-layout-effect@1.1.3',
      'icu-minify@4.13.4',
      'lucide-react@1.26.0',
      'next-intl-swc-plugin-extractor@4.13.4',
      'next-intl@4.13.4',
      'use-intl@4.13.4',
    ]);
    expect(npmUpdates?.cooldown).toEqual({
      'default-days': 2,
      'semver-major-days': 14,
      'semver-minor-days': 2,
      'semver-patch-days': 2,
    });
  });

  it('runs both TypeScript toolchains in CircleCI', () => {
    const circle = parseYamlFile<{
      jobs: {
        verify: {
          steps: Array<
            | string
            | { run?: { command?: string; name?: string } }
            | { restore_cache?: { keys: string[] } }
            | { save_cache?: { key: string; paths: string[] } }
          >;
        };
      };
    }>('.circleci/config.yml');
    const runSteps = circle.jobs.verify.steps.flatMap((entry) =>
      typeof entry === 'string' || !('run' in entry) || !entry.run ? [] : [entry.run],
    );
    const command = (name: string) => runSteps.find((step) => step.name === name)?.command;

    expect(command('Verify TypeScript toolchain')).toBe('pnpm qa:typescript');
    expect(command('Typecheck')).toBe('pnpm typecheck');
    expect(command('Typecheck compatibility')).toBe('pnpm typecheck:compat');

    const buildIndex = circle.jobs.verify.steps.findIndex(
      (entry) => typeof entry !== 'string' && 'run' in entry && entry.run?.name === 'Build',
    );
    const saveIndex = circle.jobs.verify.steps.findIndex(
      (entry) => typeof entry !== 'string' && 'save_cache' in entry,
    );
    const cacheStep = circle.jobs.verify.steps[saveIndex];

    expect(saveIndex).toBeGreaterThan(buildIndex);
    expect(
      typeof cacheStep === 'string' || !('save_cache' in cacheStep)
        ? undefined
        : cacheStep.save_cache,
    ).toEqual({
      key: 'pnpm-v3-{{ arch }}-{{ checksum "pnpm-lock.yaml" }}-{{ checksum "pnpm-workspace.yaml" }}',
      paths: ['~/.local/share/pnpm/store', '~/.cache/ms-playwright', '.next/cache'],
    });
  });

  it('ignores commented properties and rejects duplicate effective configuration keys', () => {
    expect(parsePropertiesText('# gate=disabled\ngate=enabled')).toEqual({ gate: 'enabled' });
    expect(() => parsePropertiesText('gate=first\ngate=second')).toThrow(
      'Duplicate properties key: gate',
    );
    expect(() => parseYamlText('jobs: {}\njobs: {}')).toThrow();
  });
});
