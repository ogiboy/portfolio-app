# Project Memory Instructions

Durable project memory is explicit, source-controlled, reviewable, and owned by existing repository
records. Hidden agent memory and runtime databases may help retrieve context but never override live
source, Git, providers, or the user.

## Durable Owners

- `AGENTS.md`: operational authority and the OMX-managed orchestration contract.
- `.ai/architecture.instructions.md`: current owner map and product boundaries.
- `.ai/decisions/`: accepted immutable rationale and superseding decisions.
- `.ai/roadmap/`: future sequence and deferred scope.
- `.ai/checkpoints/portfolio-overhaul.md`: sole mutable resumable state for the active overhaul.
- `.ai/daily/`: chronological working notes; historical, not current-state authority.
- `docs/aegis/`: dated intent, plans, baselines, and evidence snapshots.
- `DESIGN.md`, `README.md`, `SECURITY.md`, `CHANGELOG.md`, package scripts, source, and CI: their
  respective product, design, security, release, implementation, and delivery contracts.

Do not add flat `current-state`, `tasks`, or decision files that compete with these owners. Update the
canonical record instead.

## Local Agent Memory

Ruflo, OMX, AgentDB, RuVector, Claude-flow, and host memory systems are development aids only.

- `.swarm`, `.omx`, `.claude-flow`, `.claude`, `agentdb.rvf*`, and `ruvector.db` are local runtime
  state and remain ignored.
- Local memory may be stale, environment-specific, plaintext, or derived from another project.
- Retrieve narrowly, verify against the current checkout, and cite the durable source used.
- Never commit a runtime database or treat agent consensus, memory recall, or a generated catalog as
  architecture, checkpoint, hosted-state, or release evidence.

## Write Rules

- Preserve source, timestamp, command/query, commit/deployment identifier, result, artifact, blocker,
  and uncertainty for durable evidence.
- Keep dated historical records chronological; do not backfill future work as completed.
- Do not mutate accepted ADRs or evidence snapshots to make current status appear cleaner. Add a
  superseding decision or new evidence record.
- Update the active checkpoint after a coherent slice, changed blocker, hosted-state reconciliation,
  or handoff.
- Never store secrets, credentials, personal tokens, raw provider responses containing sensitive
  data, or machine-specific runtime dumps in `.ai`.

## Cross-Project Imports

Imported guidance is a candidate, not truth. Keep useful schemas and rewrite them for H.O.T.; reject
or adapt Producer Studio, trading, broker, Python runtime, dashboard, upload/publish, and other
foreign product assumptions. Record the adopted canonical owner rather than maintaining a mirrored
copy of another repository's `.ai` tree.
