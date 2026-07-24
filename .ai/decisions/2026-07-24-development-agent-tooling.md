# Decision: Project-Local Development Agent Tooling

## Status

Accepted

## Context

The project now has a project-scoped OMX setup and a Ruflo initialization. The setup generated a
large mix of reusable role/prompt/skill bodies, machine-specific hook/configuration, mutable runtime
databases, daemon state, and copied governance text from other repositories. Treating every generated
file alike would either lose useful project capabilities or commit non-portable and potentially
sensitive runtime state.

## Decision

- Preserve and commit the reviewed project-local OMX capability surface under `.codex/agents`,
  `.codex/prompts`, and `.codex/skills` together with the OMX-managed `AGENTS.md` section.
- Preserve the tracked `.codex/environments/environment.toml` as the worktree bootstrap contract;
  its cleanup must be guarded and repository-relative rather than targeting filesystem-root paths.
- Keep `skills-lock.json` as the restorable project skill manifest and keep `CLAUDE.md` as subordinate
  generated guidance.
- Keep `.codex/config.toml`, `.codex/hooks.json`, `.codex/.omx`, `.omx`, `.swarm`, `.claude`,
  `.claude-flow`, AgentDB/RuVector files, daemon/session/log/metric state, and downloaded `.agents`
  bodies local and ignored. They contain absolute machine paths, mutable trust/runtime state, or
  host-owned installations.
- Ruflo and OMX are development tools, not Next.js runtime dependencies, application services,
  release evidence, or alternate product-state owners.
- Harvest reusable external-project patterns only after rewriting them for H.O.T. and placing them in
  the existing canonical owner. Do not copy trading, Producer Studio, Python worker, dashboard,
  upload/publish, or other foreign product truth.
- Preserve the application toolchain contract at Node `24.16.0` and pnpm 11. A separately installed
  OMX/Ruflo CLI may execute under its host Node runtime without changing app engines or CI.
- Validate setup through `omx doctor`, `ruflo doctor`, ignored-state inspection, governance tests, and
  the normal package gates. Do not run setup `--force`, doctor `--fix`, runtime cleanup, migration, or
  daemon lifecycle commands as an unrelated side effect.

## Consequences

- Clones retain the reviewed role/prompt/workflow vocabulary and can restore skill bodies without
  committing local memory databases or machine paths.
- Re-running setup may update a large generated capability surface; those diffs require normal review
  and must not overwrite portfolio-specific authority.
- Ruflo warnings about optional plugins or plaintext local memory are local tooling observations and
  do not become application defects automatically.
- `.ai` remains the project-specific durable governance layer; generated tool catalogs remain
  subordinate inputs.

## Compatibility and Rollback

The decision changes development governance only and does not affect public routes or bundles.
Rollback means stop tracking the project-local OMX capability bodies in a later accepted decision;
do not delete user runtime files or rewrite history to perform that rollback.
