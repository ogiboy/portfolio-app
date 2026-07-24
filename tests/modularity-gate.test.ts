import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const temporaryRoots: string[] = [];
const gatePath = join(process.cwd(), 'scripts/qa/modularity-gate.mjs');

function writeFixture(root: string, path: string, contents: string) {
  const target = join(root, path);
  mkdirSync(join(target, '..'), { recursive: true });
  writeFileSync(target, contents);
}

function runGate(root: string) {
  const result = spawnSync(process.execPath, [gatePath, '--fail-on-findings'], {
    cwd: root,
    encoding: 'utf8',
  });

  expect(result.status).toBe(1);
  expect(result.stderr).toBe('');
  return JSON.parse(result.stdout) as { findings: string[] };
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe('modularity gate', () => {
  it('applies trailing-slash path limits only to exact paths or descendants', () => {
    const root = mkdtempSync(join(tmpdir(), 'portfolio-modularity-'));
    temporaryRoots.push(root);

    writeFixture(
      root,
      'scripts/qa/modularity-baseline.json',
      JSON.stringify({
        scanRoots: ['src'],
        limits: { '.ts': 100 },
        pathLimits: {
          'src/lib/wasm/': 5,
          'src/lib/wasm/exact.ts': 3,
          'src/lib/wasm/runtime/': 3,
        },
        debtCeilings: {},
        generatedArtifacts: {},
      }),
    );
    writeFixture(root, 'src/lib/wasm/exact.ts', '1\n2\n3\n4');
    writeFixture(root, 'src/lib/wasm/runtime/child.ts', '1\n2\n3\n4');
    writeFixture(root, 'src/lib/wasm/runtime.ts', '1\n2\n3\n4');
    writeFixture(root, 'src/lib/wasm-tools/other.ts', '1\n2\n3\n4');

    const report = runGate(root);

    expect(report.findings).toEqual([
      'src/lib/wasm/exact.ts: 4 lines exceeds the 3-line module limit',
      'src/lib/wasm/runtime/child.ts: 4 lines exceeds the 3-line module limit',
    ]);
  });
});
