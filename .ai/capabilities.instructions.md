# Capability Routing Instructions

Use this file before selecting skills, plugins, MCP servers, connectors, browser tools, or
subagents for H.O.T. portfolio work.

## Progressive Selection

1. Read the user request, `AGENTS.md`, `.ai/architecture.instructions.md`, and the canonical owner
   for the touched surface.
2. Classify the task with `.ai/capabilities/routing.instructions.md`.
3. Consult `.ai/capabilities/inventory.instructions.md` only to choose a capability family; verify
   current availability before relying on a named tool or version.
4. For security-sensitive work, also read
   `.ai/capabilities/security-skills.instructions.md`.
5. Load one primary workflow skill and at most two narrowly relevant specialist bodies. Do not load
   an entire plugin family as ceremony.
6. Use `.ai/capabilities/orchestration.instructions.md` only when delegation materially reduces
   uncertainty or wall-clock time.
7. Record durable decisions, checkpoint state, and reproducible evidence in their existing owners.

## Preferred Routes

- Aegis is the default governance and evidence workflow.
- Project-local OMX roles and workflows may coordinate bounded development work when the active host
  exposes them. They remain subordinate to project instructions.
- Ruflo may provide advisory routing, local memory, or an explicitly selected swarm. Its generated
  state is not product truth, release evidence, or application runtime.
- Context7 and current official documentation own version-sensitive framework, SDK, API, and CLI
  questions.
- Browser tooling owns rendered EN/TR, responsive, accessibility, reduced-motion, performance, and
  WASM journey verification.
- Hosted connectors may reconcile GitHub, Vercel, Cloudflare, CircleCI, SonarCloud, or review state.
  Provider reads are dated evidence; provider writes require explicit user authority.

## Context Budget

- Do not enumerate the full installed capability catalog in a task thread.
- Start with one to three selected skill bodies per agent, one specialist tool family, and one
  browser-control surface when needed.
- Prefer repository truth and focused source excerpts over old chats, raw logs, or generated runtime
  databases.
- Summarize large tool output before handing it to another agent.
- Create or refresh the active checkpoint before a long task becomes difficult to resume.

## Ownership and Authority

- Capabilities help inspect, plan, implement, or verify. They do not override `AGENTS.md`, accepted
  decisions, source ownership, Git state, hosted state, or the active user request.
- Skills, plugins, MCPs, OMX, Ruflo, and browser connectors are development-time tools. They are not
  application dependencies unless an accepted decision and normal package/source review say so.
- No capability grants authority to deploy, merge, publish, change DNS, mutate Cloudflare/Vercel,
  send messages, access credentials, or perform another external write.
- Treat all agent and external-tool output as interpretation. Preserve source, timestamp, commit or
  deployment identifier, uncertainty, and provenance for claims that matter.

## Related Files

- `capabilities/inventory.instructions.md`: capability families and project boundaries.
- `capabilities/routing.instructions.md`: task-family routing.
- `capabilities/orchestration.instructions.md`: delegation and coordination rules.
- `capabilities/security-skills.instructions.md`: defensive security routing.
- `capabilities/generated-artifact-harvest.instructions.md`: durable setup versus runtime state.
- `checklists/context-budget.md`: bounded-context and handoff checks.
