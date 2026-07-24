# Orchestration Instructions

Use orchestration only when independent work can finish faster or with better review coverage than a
single owner. The leader always owns integration, final verification, checkpoint truth, and external
state claims.

## Choose One Execution Lane

1. **Direct work:** default for small, sequential, or shared-owner changes.
2. **Codex native subagents:** preferred in Codex App for bounded lookup, research, review, or
   disjoint implementation.
3. **OMX workflow/team:** use when its CLI runtime is deliberately active and durable staged
   coordination is worth the overhead.
4. **Ruflo:** advisory routing, local memory, diagnostics, or an explicitly planned swarm. It does
   not silently become the task owner.

Native subagents may complement an active OMX leader as described by `AGENTS.md`. Do not run
multiple autonomous swarms over the same files or treat duplicated agent agreement as verification.

## Split Criteria

Delegate when at least one condition holds:

- two or more questions are independent;
- implementation can be divided into disjoint owner paths;
- research or review can run read-only beside implementation;
- browser QA, security, performance, or test review has a separate evidence output.

Keep work with one owner when:

- the next step depends on a single unresolved result;
- several agents would edit the same authority file;
- the change affects a sensitive contract that benefits from one integrator;
- coordination cost exceeds the expected work.

## Role Map

| Need                         | Preferred role          | Boundary                                                           |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------ |
| Repository lookup            | `explore`               | narrow question, read-only result                                  |
| Official documentation       | `researcher`            | chosen technology behavior, not package selection                  |
| Package selection or upgrade | `dependency-expert`     | compare maintenance, security, compatibility, and license          |
| Architecture                 | `architect` or `critic` | design/review; leader accepts or rejects                           |
| Implementation               | `executor`              | exclusive paths and focused checks                                 |
| Tests                        | `test-engineer`         | behavior and failure coverage, no product redesign                 |
| UI/interaction               | `designer`              | `DESIGN.md`, accessibility, performance, and EN/TR constraints     |
| Completion proof             | `verifier`              | fresh commands and artifacts, no implementation ownership          |
| Git/release                  | `git-master`            | no history rewrite, merge, tag, or push without standing authority |

Installed project-local role definitions live under `.codex/agents`; prompt and workflow bodies live
under `.codex/prompts` and `.codex/skills`. These generated development files remain subordinate to
project instructions.

## Delegation Contract

Every child brief states:

- objective and success criteria;
- read/write ownership and files to avoid;
- authoritative context to read;
- expected result and validation;
- external-write restrictions;
- reminder that user and peer changes must not be reverted.

Use no more than six concurrent child agents. Prefer fewer. Spawn read-only agents without inherited
full history unless the task genuinely needs it; summarize only the context required for their lane.

## Integration

1. Read each result and verify its cited repository facts before accepting a change.
2. Stop and surface an unexpected shared-file edit rather than overwriting it.
3. Integrate one coherent rollback boundary at a time.
4. Run focused checks per lane, then one integrated gate after all slices in the feature are complete.
5. Record exact command, timestamp, commit/environment, result, artifact, and blocker for evidence
   claims.
6. Update the active checkpoint when work remains or hosted state changes.

## Runtime-State Boundary

- `.swarm`, `.omx`, `.claude-flow`, AgentDB/RuVector files, daemon state, logs, metrics, and sessions
  are local coordination state. They are not source control, architecture, or release evidence.
- Ruflo memory may help retrieve context but cannot supersede Git, the active checkpoint, source,
  provider state, or user instructions.
- Do not initialize, repair, migrate, or clean an orchestration runtime as a side effect of ordinary
  application work. Diagnostics are read-only unless the user explicitly authorizes a fix.
- Never delegate credentials, deployment, DNS, email, merge, tag, publish, or other external writes.

## Context and Handoff

Before compaction or a long pause, update `.ai/checkpoints/portfolio-overhaul.md` with objective,
completed commits, current dirty ownership, focused/full verification, hosted state, blockers, and
the next exact action. Raw transcripts and runtime databases are not handoff documents.
