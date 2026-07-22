# Orchestration Instructions

Use one accountable owner for each work item. Split independent read-only discovery, implementation, and verification only when the handoff improves speed or safety.

- State scope, owner files, authority, and required evidence before a handoff.
- A delegate reports facts, changed files, commands, and blockers; the coordinating owner integrates and verifies the final result.
- Do not give a subagent authority to merge, deploy, publish, change DNS, use credentials, or mutate hosted settings.
- Reconcile shared-worktree changes before editing. Preserve unrelated dirty files and never use reset or history rewrites to simplify a handoff.
- Use exactly one mutable checkpoint per active workstream. It must satisfy `.ai/checkpoints/README.instructions.md`; dated Aegis records remain immutable evidence.
