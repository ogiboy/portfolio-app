# Capability Routing Instructions

## Progressive Use

Load one to three relevant skill bodies before acting. Read additional material only when the current task remains blocked or ambiguous.

## Routing

- Start with `capabilities/routing.instructions.md`; consult the inventory only to confirm a capability is actually available.
- Use Context7 for current framework, SDK, CLI, or library documentation when available.
- Use official specifications or the web for agent-discovery standards and public protocol facts when needed.
- Use Browser for real UI and accessibility QA in the rendered application when available.
- Use Aegis records and subagents only for bounded work with a clear owner, scope, and verification output.

## Ownership and Authority

- Assign one browser QA owner and one orchestration owner for a work item. Do not duplicate these roles.
- Capabilities help inspect, plan, implement, or verify. They never grant authority to deploy, publish, change DNS, access credentials, send messages, or make other external writes.
- Skills, plugins, MCPs, and browser/tool connectors are development-time capabilities. They are neither runtime dependencies nor authority sources, and their availability must never be assumed.
- Treat agent output as interpretation. Preserve source, timestamp, uncertainty, and provenance for externally derived claims.
