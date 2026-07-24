# Development Tooling Workflow

Use this workflow when installing, refreshing, or reconciling project-local skills, OMX, Ruflo,
Claude-flow, hooks, or agent/runtime configuration.

## Durable Versus Local

Commit and review:

- `AGENTS.md` outside and inside stable OMX-managed markers;
- `CLAUDE.md` as subordinate generated capability guidance;
- `skills-lock.json`;
- `.codex/agents`, `.codex/prompts`, and `.codex/skills`;
- the guarded, repository-relative `.codex/environments/environment.toml` bootstrap;
- harvested portfolio-specific rules under `.ai`.

Keep local and ignored:

- `.codex/config.toml`, `.codex/hooks.json`, `.codex/.omx`;
- `.omx`, `.swarm`, `.claude`, `.claude-flow`;
- AgentDB/RuVector databases, WAL/lock files, daemon/session/log/metric state;
- downloaded host skill bodies under `.agents`.

## Safe Reconciliation

1. Record worktree, branch, commit, dirty files, and ignored-state summary.
2. Read the setup tool's current local skill/docs before rerunning a setup command.
3. Use project scope and merge/preserve modes; never overwrite project guidance blindly.
4. Do not use `--fix`, `--force`, cleanup, migration, or daemon lifecycle commands unless the user
   requested that effect and the generated-file blast radius is known.
5. Inspect generated diffs for absolute paths, credentials, foreign project names, invalid commands,
   and duplicated authority.
6. Harvest useful rules into existing portfolio owners; do not mirror another project's `.ai` tree.
7. Preserve runtime files on disk while keeping databases, hooks, and machine-specific state out of
   Git.

## Verification

```bash
omx doctor
ruflo doctor
git status --ignored --short
git diff --check
pnpm format:check
pnpm exec vitest run tests/governance.test.ts
```

Record tool versions and warnings. A doctor warning is not automatically an application defect; an
optional missing plugin, plaintext local memory, or separate tool Node runtime must be classified
against the portfolio threat model before action.

Application checks must still run under the Node/pnpm contract in `.nvmrc`, `.node-version`, and
`package.json`. Tooling diagnostics running under a separate host Node installation do not change
that contract.
