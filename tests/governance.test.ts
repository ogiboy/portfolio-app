import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const readProjectFile = (path: string) => readFileSync(join(root, path), 'utf8');

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
});
