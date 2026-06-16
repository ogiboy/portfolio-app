# Decision: pnpm Package Manager

## Status
Accepted

## Context
The worktree had a tracked `package-lock.json` deletion and an untracked `pnpm-lock.yaml`. npm audit was blocked because the npm lockfile was absent, while pnpm already represented the current dependency graph.

## Decision
Use pnpm as the single package manager and `pnpm-lock.yaml` as the only lockfile. Add `packageManager` to `package.json` and configure CI around pnpm.

## Consequences
- Remove npm lock drift.
- CI installs with pnpm and frozen lockfile.
- Developers should not run npm install in this repository.
