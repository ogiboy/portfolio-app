# AI Project Workspace

This folder stores committed project-local coordination records, not secrets, credentials, runtime state, or tool output that cannot be reproduced.

## Authority

`AGENTS.md` defines operational rules. `.ai/architecture.instructions.md` defines the current owner map. Decision records explain accepted rationale, roadmap records define future sequence, and one active checkpoint owns mutable workstream state. `docs/aegis/` records dated intent, plans, snapshots, and evidence. Package scripts and CI are delivery contracts; `SECURITY.md` defines vulnerability reporting. CodeRabbit is advisory only.

## Structure

- `architecture.instructions.md`: Current code and product ownership map.
- `capabilities.instructions.md`: Bounded capability routing and authority limits.
- `capabilities/`: Task routing, inventory, orchestration, generated-artifact, and security-skill boundaries.
- `workflows/`: Repeatable feature, browser QA, security, PR/release, and external-tooling workflows.
- `checkpoints/`: Sole mutable resumable state per active workstream; not a replacement for Git or hosted status.
- `checklists/`: Small, evidence-oriented readiness checks.
- `skills/`: Project-local guidance for development-time capabilities, never runtime dependencies.
- `decisions/`: Immutable accepted rationale and superseding decisions; lifecycle rules live in `decisions/README.instructions.md`.
- `roadmap/`: Current and historical sequence records.
- `daily/`: Dated working notes retained for history; never current-state or next-action authority.
