# Checkpoint Schema

Use a checkpoint for any handoff-prone, multi-step, or externally reconciled workstream. A workstream has exactly one mutable checkpoint. It is resumable state, not completion authority, and it never overrides source, Git, or provider truth.

```text
Status:
Updated:
Objective (immutable until closure):
Non-negotiable constraints (immutable):
Completion criteria (immutable):
Worktree / branch / commit:
Last completed slice / commit:
Current task:
Completed:
Pending:
Owned dirty files:
Unrelated changes:
Decisions:
Required gates / delivery expectations:
Evidence:
Hosted state:
Blockers:
Drift:
Compatibility boundary:
Next action:
Closure / archive condition:
```

Every field is required. Use `none known` or `not checked` explicitly rather than omitting uncertainty. Record exact identifiers and evidence classes rather than conclusions without provenance.

The active checkpoint is intentionally mutable. Update it after each durable slice, hosted-state reconciliation, or blocker change. Once all completion criteria are proven, mark it closed and archive it without rewriting the final historical state. Dated Aegis checkpoints and baselines are immutable snapshots that point back to this file; they must not mirror mutable status.
