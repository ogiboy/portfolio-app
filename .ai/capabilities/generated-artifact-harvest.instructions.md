# Generated Capability Artifact Policy

## Durable Inputs

- Track `skills-lock.json` so project-local skills can be restored reproducibly.
- Track `AGENTS.md`, the bounded `.ai/` guidance, and intentional project configuration.
- Keep `CLAUDE.md` only as a generated capability reference beneath project authority; repository commands in it must remain pnpm-compatible.

## Disposable Runtime State

Do not track downloaded skill bodies or orchestration/runtime databases and locks: `.agents/`, `.claude/`, `.claude-flow/`, `.omx/`, `agentdb.rvf`, `agentdb.rvf.lock`, and `ruvector.db`. Tool-specific caches such as `.pnpm-store/` and `.wrangler/` are also local-only.

Generated state is never architecture, product truth, checkpoint state, or release evidence. Recreate it from the durable manifest and installed tooling. If a generated artifact contains a generally useful rule, harvest only the smallest domain-correct rule into its canonical `.ai/` owner and record why; do not commit the entire runtime tree.

## Review

Before staging, run `git status --ignored --short` and confirm durable manifests remain tracked while runtime outputs stay ignored. A tool reinstall must not create a large source-control delta.
