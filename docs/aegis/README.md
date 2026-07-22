# Aegis Workspace

This folder records dated initiative intent, baselines, plans, checkpoint snapshots, and verification evidence for non-trivial work. It is immutable evidence after acceptance, not operational or live-state authority: follow `AGENTS.md`, `.ai/architecture.instructions.md`, and the active `.ai/checkpoints/portfolio-overhaul.md`.

## Record Lifecycle

Every new baseline, checkpoint snapshot, and evidence bundle starts with:

```text
Status: Draft | Accepted | Superseded
Captured:
Source commit:
Source fingerprint:
Accepted in commit:
Supersedes:
```

`Draft` records may change during the owned slice. Acceptance is a separate commit that records the exact source commit and replaces `pending` with its acceptance commit identifier. Once `Accepted`, the record is immutable. Corrections or later observations require a new dated record with `Supersedes`; the earlier record remains intact.

## Folders

- `baseline/`: Historical dated snapshots; see `BASELINE-GOVERNANCE.md`.
- `plans/`: Executable, bounded work plans with scope and verification boundaries.
- `specs/`: Accepted design records, including historical designs.
- `work/`: Initiative execution records, checkpoints, and evidence.
- `release/`: Release checklists and status follow-ups.

Keep local, pushed, hosted-check, preview, browser, review, merge, production, and external evidence separate. Current hosted truth must be rechecked before a release or merge claim.
