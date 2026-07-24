import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { collectDocstringCoverage } from '../scripts/qa/docstring-coverage.mjs';

const fixtures: string[] = [];

function createFixture(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-docstring-coverage-'));
  fixtures.push(root);
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(root, path, '..'), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

function reportFor(files: Record<string, string>) {
  const root = createFixture(files);
  return collectDocstringCoverage({
    root,
    config: {
      minimumCoverage: 80,
      minimumExports: 0,
      scanRoots: ['src/lib', 'src/components', 'src/content'],
      scanFiles: ['scripts/release/release-state.ts'],
      extensions: ['.ts', '.tsx'],
      excludedPathSegments: ['config', 'e2e', 'generated', 'public', 'tests', 'wasm'],
      excludedPaths: ['proxy.ts', 'scripts/qa', 'src/app', 'src/i18n'],
    },
  });
}

afterEach(() => {
  for (const fixture of fixtures.splice(0)) rmSync(fixture, { recursive: true, force: true });
});

describe('docstring coverage', () => {
  it('counts valid prose and resolves a local export alias to its declaration', () => {
    const report = reportFor({
      'src/lib/exports.ts': `/** Builds a stable result from deterministic fixture inputs. */\nconst source = () => true;\nexport { source as aliasedResult };\n`,
    });

    expect(report).toMatchObject({ coverage: 100, documentedExports: 1, totalExports: 1 });
    expect(report.findings).toEqual([]);
  });

  it('rejects tag-only and placeholder documentation', () => {
    const report = reportFor({
      'src/lib/docs.ts': `/** @returns a value */\nexport function tagged() { return true; }\n\n/** TODO document this public function fully later. */\nexport function placeholder() { return true; }\n`,
    });

    expect(report.findings).toEqual([
      {
        line: 2,
        name: 'tagged',
        path: 'src/lib/docs.ts',
        reason: 'tag-only JSDoc',
      },
      {
        line: 5,
        name: 'placeholder',
        path: 'src/lib/docs.ts',
        reason: 'placeholder JSDoc',
      },
    ]);
  });

  it('rejects JSDoc separated from its declaration by another comment', () => {
    const report = reportFor({
      'src/lib/separated.ts': `/** Documents the exported fixture with sufficiently descriptive prose. */\n// This intervening comment breaks direct association.\nexport const separated = true;\n`,
    });

    expect(report.findings).toEqual([
      expect.objectContaining({
        name: 'separated',
        reason: 'JSDoc is not immediately associated',
      }),
    ]);
  });

  it('rejects duplicate prose across distinct exported declarations', () => {
    const report = reportFor({
      'src/content/duplicate.ts': `/** Produces a complete and stable fixture result for callers. */\nexport function first() { return 1; }\n\n/** Produces a complete and stable fixture result for callers. */\nexport function second() { return 2; }\n`,
    });

    expect(report.findings.map((finding) => finding.reason)).toEqual([
      'duplicate JSDoc description',
      'duplicate JSDoc description',
    ]);
  });

  it('skips excluded roots, generated paths, public WASM, and QA scripts', () => {
    const report = reportFor({
      'src/lib/included.ts': `/** Documents this included fixture export with sufficient prose. */\nexport const included = true;\n`,
      'src/app/page.ts': 'export const ignoredApp = true;\n',
      'src/i18n/messages.ts': 'export const ignoredLocale = true;\n',
      'src/components/wasm/runtime.ts': 'export const ignoredWasm = true;\n',
      'src/content/generated/items.ts': 'export const ignoredGenerated = true;\n',
      'scripts/qa/ignored.ts': 'export const ignoredQa = true;\n',
      'proxy.ts': 'export const ignoredProxy = true;\n',
    });

    expect(report).toMatchObject({ coverage: 100, totalExports: 1 });
    expect(report.scannedFiles).toEqual(['src/lib/included.ts']);
  });

  it('accepts the exact 80 percent coverage boundary', () => {
    const report = reportFor({
      'src/lib/boundary.ts': `/** Documents export one with enough descriptive prose for the gate. */\nexport const one = 1;\n/** Documents export two with enough descriptive prose for the gate. */\nexport const two = 2;\n/** Documents export three with enough descriptive prose for the gate. */\nexport const three = 3;\n/** Documents export four with enough descriptive prose for the gate. */\nexport const four = 4;\nexport const missing = 5;\n`,
    });

    expect(report).toMatchObject({ coverage: 80, documentedExports: 4, totalExports: 5 });
    expect(report.coverage).toBeGreaterThanOrEqual(report.minimumCoverage);
    expect(report.findings).toEqual([
      expect.objectContaining({ name: 'missing', reason: 'missing JSDoc' }),
    ]);
  });

  it('loads and enforces the production scanner configuration', () => {
    const config = JSON.parse(
      readFileSync(join(process.cwd(), 'scripts/qa/docstring-coverage.config.json'), 'utf8'),
    ) as {
      minimumCoverage: number;
      minimumExports: number;
      scanRoots: string[];
      scanFiles: string[];
      excludedPaths: string[];
    };
    const report = collectDocstringCoverage();

    expect(config).toEqual(
      expect.objectContaining({
        minimumCoverage: 80,
        minimumExports: 100,
        scanRoots: ['src/lib', 'src/components', 'src/content'],
        scanFiles: ['scripts/release/release-state.ts'],
        excludedPaths: ['proxy.ts', 'scripts/qa', 'src/app', 'src/i18n'],
      }),
    );
    expect(report).toEqual(
      expect.objectContaining({
        minimumCoverage: 80,
        minimumExports: 100,
        totalExports: 107,
      }),
    );
  });
});
