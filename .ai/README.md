# AI Project Workspace

This folder stores committed project-local coordination records, not secrets, credentials, agent
runtime databases, or tool output that cannot be reproduced.

## Authority

`AGENTS.md` defines operational rules. `.ai/architecture.instructions.md` defines the current owner map. Decision records explain accepted rationale, roadmap records define future sequence, and one active checkpoint owns mutable workstream state. `docs/aegis/` records dated intent, plans, snapshots, and evidence. Package scripts and CI are delivery contracts; `SECURITY.md` defines vulnerability reporting. CodeRabbit is advisory only.

## Structure

- `architecture.instructions.md`: Current code and product ownership map.
- `design-system.instructions.md`: Implementation routing beneath the canonical root `DESIGN.md`.
- `development-preferences.instructions.md`: Portfolio-specific code, toolchain, commit, and gate rules.
- `memory.instructions.md`: Durable project records versus local agent-memory boundaries.
- `versioning.instructions.md`: Manual SemVer and release evidence contract.
- `capabilities.instructions.md`: Bounded capability routing and authority limits.
- `capabilities/`: Task routing, inventory, orchestration, generated-artifact, and security-skill boundaries.
- `workflows/`: Repeatable feature, browser QA, security, PR/release, and external-tooling workflows.
- `security/`: Portfolio threat model, defensive skill map, and security-scope reconciliation.
- `checkpoints/`: Sole mutable resumable state per active workstream; not a replacement for Git or hosted status.
- `checklists/`: Small, evidence-oriented readiness checks.
- `qa/`: Detailed risk tiers, runbook, scenarios, browser/performance matrix, and evidence schema;
  never a parallel mutable status owner.
- `skills/`: Project-local guidance for development-time capabilities, never runtime dependencies.
- `decisions/`: Immutable accepted rationale and superseding decisions; lifecycle rules live in `decisions/README.instructions.md`.
- `roadmap/`: Current and historical sequence records.
- `daily/`: Dated working notes retained for history; never current-state or next-action authority.

## Development Tooling Boundary

Reviewed project-local OMX role, prompt, and workflow bodies live under `.codex/agents`,
`.codex/prompts`, and `.codex/skills`; `skills-lock.json` records restorable skill inputs. Local OMX,
Ruflo, Claude-flow, AgentDB, RuVector, daemon, hook, log, and swarm state remains ignored and cannot
replace this folder's authority records.
