# Portfolio QA Scenario Catalog

Run the scenarios selected by the risk checklist. Each scenario has one user-visible contract;
split evidence rather than treating a broad smoke pass as proof of every behavior.

## S01: EN/TR Public Route Shell

**Risk:** route, localization, navigation, recovery.

Visit `/en` and `/tr`, then primary destinations: About, Projects, Lab, Process, Contact, and
Privacy where exposed. Test desktop and 390 px mobile.

**Expected:** each locale presents equivalent navigation and recovery actions; the route shell does
not falsely claim localized project records when shared source-language records remain intentional.
Mobile navigation opens accessibly, Escape/close works, and focus returns to its trigger.

## S02: Theme, Keyboard, and Intent Feedback

**Risk:** accessibility, theme persistence, Signal/Latch behavior.

Switch light/dark themes, reload, then use keyboard-only traversal through header, navigation,
cards, and controls. Repeat with a coarse-pointer/mobile emulation.

**Expected:** theme class, data attribute, and native color scheme agree; visible focus is present;
keyboard and pointer expose the same destinations; no information depends on hover; controls give
short, purposeful feedback without delaying navigation.

## S03: Motion, Save-Data, and JavaScript Resilience

**Risk:** motion regressions, client-leaf failures, progressive enhancement.

Observe the home route at desktop fine-pointer normal motion, then repeat reduced motion,
Save-Data, coarse pointer, mobile, and JavaScript-disabled/initial-HTML conditions.

**Expected:** normal desktop can use one meaningful cinematic rail, while constrained paths preserve
projects in source order and natural flow. Reduced motion removes Scan/continuous movement but
retains content, order, and navigation. With JavaScript unavailable, server-rendered content and
ordinary links remain usable; optional client controls are honestly unavailable.

## S04: Search, Static Generation, and SEO

**Risk:** discovery, indexing, localization, metadata drift.

Inspect representative EN/TR home, project archive, project detail, about, privacy, and lab pages,
plus `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` or the served manifest, and generated
Open Graph/Twitter routes where changed.

**Expected:** titles, descriptions, canonical URLs, reciprocal language alternatives, JSON-LD,
robots and sitemap entries agree with the public canonical origin. Statically rendered routes expose
meaningful initial HTML. A branch or local URL is not represented as production evidence.

## S05: Agent and Public API Discovery

**Risk:** agent compatibility, read-only truth, content negotiation.

Exercise `/api/portfolio`, `/api/health`, `/openapi.json`, `/api/docs`,
`/.well-known/api-catalog`, `/.well-known/agent-skills/index.json`, the navigation skill route, and
`/api/agent/markdown?pathname=/en`. Also request an unsupported pathname.

**Expected:** public JSON/Markdown declares read-only, source-backed portfolio facts with correct
media type and cache behavior. Unsupported Markdown paths are rejected and no response becomes a
search-indexed private surface. WebMCP remains an optional browser enhancement, never a required
source of product truth.

## S06: Analytics Preference and Privacy

**Risk:** visitor control, storage failure, misleading telemetry claims.

On each localized Privacy route, verify default behavior, enable, disable, reload, and an emulated
storage-write failure.

**Expected:** a stored opt-out keeps aggregate analytics disabled until explicit enable; the UI
announces saved state or a truthful save error. The portfolio does not imply accounts, advertising
profiles, or collection of contact/form/authentication data that public v1 does not have.

## S07: Error and Not-Found Recovery

**Risk:** resilience, localization, navigation dead ends.

Visit a missing localized route and exercise a controlled route-render error boundary when the
changed surface supports it.

**Expected:** the page uses localized, non-blaming recovery language with retry plus safe
home/archive destinations. A recovery control never claims success before the underlying route has
recovered.

## S08: WASM Explicit Boot and Recovery

**Risk:** optional-runtime isolation, state transition, storage recovery.

On both localized lab routes, inspect pre-Boot network activity; activate Boot; observe ready;
exercise timeout/error/retry separately when applicable; use the separate-tab link; then test a
cleared or unavailable client-storage condition if persistence changed.

**Expected:** no iframe or `/wasm/*` engine request before explicit Boot. The state is honestly
idle, booting, ready, timeout, or error. Retry starts a fresh attempt; stale/unrelated messages do
not settle ready; recovery is actionable; unavailable storage never becomes a false saved-state
claim.

## S09: Bundle and Route Isolation

**Risk:** first-load regression, unwanted runtime preload.

Run:

```bash
pnpm build
pnpm qa:bundle-budget
```

**Expected:** home initial JavaScript stays within the baseline plus 15 KiB gzip, the optional
Motion feature stays below 20 KiB gzip, and `/projects` plus both lab routes do not receive the
cinematic rail chunk. Verify the build immediately precedes the budget check.

## S10: Preview and Production Reconciliation

**Risk:** false completion from local success.

After a push, identify the exact preview deployment; run S01, S04, S05, and changed visual/WASM
rows against it. After an authorized merge, identify the actual production deployment and repeat
those observations.

**Expected:** preview and production evidence includes target URL, deployment identifier, timestamp,
commit/merge relationship, route/API response facts, and browser matrix outcome. Hosted checks,
review approval, merge, and production are recorded separately; an unmerged preview is never live
production.
