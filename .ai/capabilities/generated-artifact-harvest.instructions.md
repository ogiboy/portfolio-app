# Generated Capability Artifact Policy

## Durable Inputs

- Track `skills-lock.json` so project-local skills can be restored reproducibly.
- Track `AGENTS.md`, the bounded `.ai/` guidance, and intentional project configuration.
- Keep `CLAUDE.md` only as a generated capability reference beneath project authority; repository commands in it must remain pnpm-compatible.
- Track the reviewed project-local OMX role, prompt, and workflow bodies under `.codex/agents`,
  `.codex/prompts`, and `.codex/skills`. They are development inputs, not product source.
- Keep the already tracked `.codex/environments/environment.toml` safe and repository-relative;
  cleanup commands must validate `CODEX_WORKTREE_PATH` before deleting generated directories.

## Disposable Runtime State

Do not track host-downloaded skill bodies or orchestration/runtime databases and locks: `.agents/`,
`.claude/`, `.claude-flow/`, `.omx/`, `.swarm/`, `agentdb.rvf`, `agentdb.rvf.lock`, and
`ruvector.db`. Keep `.codex/config.toml`, `.codex/hooks.json`, and `.codex/.omx/` local because OMX
setup writes absolute machine paths and mutable trust hashes there. Tool-specific caches such as
`.pnpm-store/` and `.wrangler/` are also local-only.

Generated state is never architecture, product truth, checkpoint state, or release evidence. Recreate
local runtime state from the durable manifest and installed tooling. If a generated artifact contains
a generally useful rule, harvest only the smallest domain-correct rule into its canonical `.ai/`
owner and record why; do not commit the runtime database, daemon state, log, metric, or session tree.

Imported guidance from another repository must be rewritten for H.O.T. before it is retained. Record
the source pattern, adopted rule, rejected foreign assumptions, canonical owner, and validation in a
dated decision or evidence record.

## Review

Before staging, run `git status --ignored --short` and confirm durable manifests and reviewed OMX
capability bodies remain visible while runtime outputs stay ignored. A tool reinstall must not create
a large source-control delta outside the explicitly reviewed `.codex` capability surface.
