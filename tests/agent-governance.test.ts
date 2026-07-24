import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const readProjectFile = (path: string) => readFileSync(join(root, path), 'utf8');

function isGitIgnored(path: string) {
  try {
    execFileSync('git', ['check-ignore', '--quiet', '--no-index', path], {
      cwd: root,
      stdio: 'ignore',
    });
    return true;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'status' in error && error.status === 1) {
      return false;
    }
    throw error;
  }
}

describe('project-local agent governance contracts', () => {
  it('keeps durable OMX capabilities visible while runtime state remains local', () => {
    expect(isGitIgnored('.codex/agents/explore.toml')).toBe(false);
    expect(isGitIgnored('.codex/prompts/explore.md')).toBe(false);
    expect(isGitIgnored('.codex/skills/omx-setup/SKILL.md')).toBe(false);

    for (const localPath of [
      '.codex/config.toml',
      '.codex/hooks.json',
      '.codex/.omx/native-agents.json',
      '.omx/setup-scope.json',
      '.swarm/state.json',
      '.swarm/memory.db',
      '.claude-flow/config.yaml',
      'agentdb.rvf',
      'ruvector.db',
    ]) {
      expect(isGitIgnored(localPath), localPath).toBe(true);
    }
  });

  it('keeps the worktree cleanup guarded and repository-relative', () => {
    const environment = readProjectFile('.codex/environments/environment.toml');
    const cleanup = /\[cleanup\]\s+script = '''([\s\S]*?)'''/.exec(environment)?.[1];

    expect(cleanup).toBeDefined();
    expect(cleanup).toContain('test -n "${CODEX_WORKTREE_PATH:-}"');
    expect(cleanup).toContain('test -d "$CODEX_WORKTREE_PATH"');
    expect(cleanup).toContain('cd "$CODEX_WORKTREE_PATH"');
    expect(cleanup).toContain('rm -rf -- node_modules .next .vercel');
    expect(cleanup).not.toMatch(/rm\s+-rf\s+\/(?:node_modules|\.next|\.vercel)/);
  });

  it('keeps active guidance on portfolio owners and valid package commands', () => {
    const files = [
      '.ai/capabilities.instructions.md',
      '.ai/capabilities/inventory.instructions.md',
      '.ai/capabilities/orchestration.instructions.md',
      '.ai/capabilities/routing.instructions.md',
      '.ai/capabilities/security-skills.instructions.md',
      '.ai/design-system.instructions.md',
      '.ai/development-preferences.instructions.md',
      '.ai/memory.instructions.md',
      '.ai/versioning.instructions.md',
      '.ai/security/threat-model.instructions.md',
    ];
    const guidance = files.map(readProjectFile).join('\n');

    for (const staleCommand of ['pnpm qa:usage', 'pnpm version:plan', 'pnpm release:apply']) {
      expect(guidance).not.toContain(staleCommand);
    }
    for (const staleOwner of ['tools/mflux/', 'docs/agents/', 'for UykulukSciFi Producer work']) {
      expect(guidance).not.toContain(staleOwner);
    }
    expect(readProjectFile('.ai/design-system.instructions.md')).toMatch(
      /GSAP is\s+superseded and must not return/,
    );
    expect(readProjectFile('.ai/development-preferences.instructions.md')).toContain('pnpm run ci');
  });

  it('keeps the QA suite detailed without creating a parallel mutable status owner', () => {
    const qaFiles = readdirSync(join(root, '.ai/qa')).sort();

    expect(qaFiles).toEqual(
      expect.arrayContaining([
        'README.md',
        'artifacts',
        'checklist.md',
        'evidence.md',
        'matrix.md',
        'runbook.md',
        'scenarios.md',
      ]),
    );
    expect(qaFiles).not.toEqual(expect.arrayContaining(['current-state.md', 'qa-summary.md']));

    const qaGuidance = qaFiles
      .filter((file) => file.endsWith('.md'))
      .map((file) => readProjectFile(`.ai/qa/${file}`))
      .join('\n');

    for (const contract of [
      'EN/TR',
      'reduced motion',
      'Save-Data',
      'WASM',
      'pnpm run ci',
      'sole mutable status owner',
    ]) {
      expect(qaGuidance).toContain(contract);
    }
    for (const staleCommand of ['pnpm qa:usage', 'pnpm version:plan', 'pnpm release:apply']) {
      expect(qaGuidance).not.toContain(staleCommand);
    }
  });
});
