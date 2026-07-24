import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveConfig } from 'vitest/node';
import { parseDocument } from 'yaml';

const root = process.cwd();
const readProjectFile = (path: string) => readFileSync(join(root, path), 'utf8');

function parseYamlFile<T>(path: string) {
  const document = parseDocument(readProjectFile(path), { uniqueKeys: true });
  if (document.errors.length > 0) {
    throw new Error(document.errors.map((error) => error.message).join('\n'));
  }
  return document.toJS() as T;
}

type RunStep = {
  name?: string;
  run?: string;
  command?: string;
};

describe('quality gate contracts', () => {
  it('enforces eighty percent V8 coverage across every supported metric', async () => {
    const { vitestConfig } = await resolveConfig({
      root,
      config: 'vitest.config.ts',
      mode: 'test',
    });
    const coverage = vitestConfig.coverage;
    const reporters = coverage.reporter.map(([name]) => name);

    expect(coverage.provider).toBe('v8');
    expect(reporters).toEqual(expect.arrayContaining(['text', 'json-summary', 'lcov', 'html']));
    expect(new Set(reporters).size).toBe(reporters.length);
    expect(coverage.thresholds).toEqual({
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    });
    expect(coverage.include).toEqual([
      'scripts/qa/docstring-coverage.mjs',
      'scripts/release/release-state.ts',
      'src/lib/**/*.ts',
      'src/content/**/*.ts',
      'src/i18n/routing.ts',
      'src/components/client/analytics-preference.tsx',
      'src/components/client/cinematic-work-rail.tsx',
      'src/components/client/locale-switcher.tsx',
      'src/components/client/mobile-navigation.tsx',
      'src/components/client/navigation-link.tsx',
      'src/components/client/site-telemetry.tsx',
      'src/components/client/theme-toggle.tsx',
      'src/components/client/use-analytics-preference.ts',
      'src/components/client/use-cinematic-motion-eligibility.ts',
      'src/components/client/wasm-game-frame.tsx',
      'src/components/client/wasm-runtime/**/*.ts',
      'src/components/client/webmcp-tools.tsx',
      'src/components/seo/json-ld.tsx',
      'src/components/site/hot-mark.tsx',
      'src/components/site/project-card.tsx',
      'src/components/ui/**/*.tsx',
    ]);
    expect(coverage.exclude).toEqual(
      expect.arrayContaining([
        'src/app/**',
        'src/proxy.ts',
        'src/i18n/request.ts',
        'src/i18n/navigation.ts',
        'src/components/Providers.tsx',
        'src/components/client/motion-features.ts',
        'src/components/site/site-header.tsx',
        'src/components/site/site-footer.tsx',
        'src/lib/social-image.tsx',
        'src/types/**',
        'e2e/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.svg',
        '**/*.png',
      ]),
    );
  });

  it('keeps package scripts wired to both deterministic quality gates', () => {
    const manifest = JSON.parse(readProjectFile('package.json')) as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    expect(manifest.devDependencies['@vitest/coverage-v8']).toBe('^4.1.10');
    expect(manifest.scripts['test:coverage']).toBe('vitest run --coverage');
    expect(manifest.scripts['qa:docstrings']).toBe(
      'node scripts/qa/docstring-coverage.mjs --enforce-threshold',
    );
    expect(manifest.scripts['qa:docstrings:report']).toBe('node scripts/qa/docstring-coverage.mjs');

    const ciSteps = manifest.scripts.ci.split(' && ');
    expect(ciSteps).toContain('pnpm qa:docstrings');
    expect(ciSteps).toContain('pnpm test:coverage');
    expect(ciSteps).not.toContain('pnpm test');
  });

  it('runs documentation and unit coverage gates in GitHub Actions', () => {
    const workflow = parseYamlFile<{
      jobs: { verify: { steps: RunStep[] } };
    }>('.github/workflows/ci.yml');
    const steps = workflow.jobs.verify.steps;
    const step = (name: string) => steps.find((candidate) => candidate.name === name);

    expect(step('Documentation coverage')?.run).toBe('pnpm qa:docstrings');
    expect(step('Unit tests and coverage')?.run).toBe('pnpm test:coverage');
    expect(step('Unit tests')).toBeUndefined();
  });

  it('mirrors documentation and unit coverage gates in CircleCI', () => {
    const workflow = parseYamlFile<{
      jobs: { verify: { steps: Array<{ run?: RunStep }> } };
    }>('.circleci/config.yml');
    const runSteps = workflow.jobs.verify.steps
      .map((step) => step.run)
      .filter((step): step is RunStep => Boolean(step));
    const step = (name: string) => runSteps.find((candidate) => candidate.name === name);

    expect(step('Documentation coverage')?.command).toBe('pnpm qa:docstrings');
    expect(step('Unit tests and coverage')?.command).toBe('pnpm test:coverage');
    expect(step('Unit tests')).toBeUndefined();
  });
});
