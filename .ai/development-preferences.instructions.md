# Development Preferences

## Repository Shape

- Default to Next.js App Router Server Components. Move browser-only behavior to explicit client
  leaves.
- Keep route handlers thin, read-only, and backed by server-safe builders in `src/lib`.
- Keep localized shell/content in `src/content`; do not claim project-record EN/TR parity until the
  shared data model is localized and browser-verified.
- Shared helpers must earn their scope through real cross-owner use. Prefer explicit state machines
  and narrow modules over anonymous configuration or string bags.
- Respect `pnpm qa:modularity`; do not grow ratcheted legacy files while extracting them.
- Do not add a backend, auth, database, dashboard, or runtime agent service without an accepted ADR.

## Toolchain

- pnpm is the only package manager; `pnpm-lock.yaml` is the only dependency lockfile.
- Application commands use Node `24.16.0` from `.nvmrc`/`.node-version`; `package.json` owns the
  supported Node and pnpm ranges.
- OMX or Ruflo may run under their separately installed host Node version. That tool runtime does not
  change the application engine contract.
- Use the TypeScript compatibility and native-preview lanes already defined by package scripts; do
  not replace one with the other silently.
- Add a dependency only after proving the existing stack cannot meet the requirement.

## UI and Content

- Root `DESIGN.md` and `.ai/design-system.instructions.md` govern visual work.
- Preserve light/dark themes, EN/TR route parity, keyboard access, reduced motion, save-data, and
  coarse-pointer fallbacks.
- Use Motion only in isolated client leaves; CSS owns short interaction feedback. Do not add GSAP.
- Use real product/content language. Avoid copied operator-dashboard, SaaS, finance, Producer Studio,
  or generic AI marketing terminology.
- Loading, success, error, availability, and analytics claims must reflect actual state.

## Commit and Push

- Use Conventional Commit subjects and keep one rollback boundary per commit.
- Do not put assistant/tool names in commit or PR titles and do not add automated co-author trailers.
- Preserve and integrate compatible user changes. Never reset, rewrite history, or discard dirty work
  for convenience.
- Prefer coherent slices: governance/tooling, architecture, design/content, behavior, tests, and
  release evidence.
- Push only after the branch head is reviewable and the applicable gate passed. Keep local, pushed,
  hosted, preview, merge, and production status distinct.

## Focused Verification

Choose the smallest command that proves the touched surface:

```bash
pnpm format:check
pnpm lint
pnpm qa:typescript
pnpm qa:modularity
pnpm typecheck
pnpm typecheck:compat
pnpm release:check
pnpm test
```

For rendered or client-impacting work, add relevant Playwright checks and a production build. For a
coherent push/release candidate, run the exact full gate:

```bash
pnpm run ci
```

The full gate includes formatting, lint, TypeScript lanes, modularity, release policy, unit tests,
Playwright, build, bundle budget, and production high-severity audit. An unavailable or interrupted
required command is not a pass.

## Development Tooling

- Project-local capability bodies live under `.codex/agents`, `.codex/prompts`, `.codex/skills`, and
  `skills-lock.json`.
- `.ai` records only project-specific durable policy, decisions, plans, checkpoints, and evidence.
- Ruflo/OMX/Claude runtime databases, hooks with absolute machine paths, daemons, logs, metrics, and
  sessions remain local-only and do not enter application builds or release evidence.
