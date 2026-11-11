import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const decisionScript = resolve(
  process.cwd(),
  '.github/skills/monitor-ci/scripts/ci-poll-decide.mjs',
);

function decide(ci: Record<string, unknown>, flags: string[] = []) {
  const result = spawnSync(
    process.execPath,
    [decisionScript, JSON.stringify(ci), '0', 'medium', ...flags],
    { encoding: 'utf8' },
  );

  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

describe('CI poll decision output', () => {
  it('reports successful CI and resets the no-progress counter', () => {
    expect(decide({ cipeStatus: 'SUCCEEDED' })).toEqual({
      action: 'done',
      code: 'ci_success',
      message: 'Poll #1 | CI passed successfully!',
      noProgressCount: 0,
      envRerunCount: 0,
    });
  });

  it('marks verified fixes as ready to apply', () => {
    expect(
      decide({
        cipeStatus: 'FAILED',
        selfHealingStatus: 'COMPLETED',
        verificationStatus: 'COMPLETED',
        failedTaskIds: ['lint:portfolio-app'],
        verifiedTaskIds: ['lint:portfolio-app'],
      }),
    ).toMatchObject({
      action: 'done',
      code: 'fix_apply_ready',
      message: 'Poll #1 | Fix available and verified. Ready to apply.',
      noProgressCount: 0,
    });
  });

  it('detects a new CI attempt while in wait mode', () => {
    expect(
      decide({ cipeStatus: 'NOT_STARTED', cipeUrl: 'https://ci.example/2', commitSha: 'new-sha' }, [
        '--wait-mode',
        '--prev-cipe-url',
        'https://ci.example/1',
        '--expected-sha',
        'new-sha',
      ]),
    ).toMatchObject({
      action: 'poll',
      code: 'new_cipe_detected',
      message: 'Poll #1 | New CI Attempt detected! CI: NOT_STARTED',
      noProgressCount: 0,
      delay: 60,
      fields: 'light',
      newCipeDetected: true,
    });
  });
});
