# Decision: Dependency Cooldown and Audited Release Exceptions

## Status

Accepted; amends `2026-06-16-package-manager.md` without changing pnpm ownership.

## Context

Dependabot PR #28 selected current Radix and next-intl patch releases before they had aged through pnpm's supply-chain policy. GitHub Actions, CircleCI, and Vercel all rejected the same lockfile during installation. The Radix releases are provenance-attested republishes, while next-intl 4.13.4 is a scoped routing fix. The repository needs a policy that allows reviewed urgent versions without weakening the default quarantine or repeatedly producing predictably red update PRs.

## Decision

- Keep Corepack and the `packageManager` field as the single pnpm version owner, now pinned to pnpm 11.17.0.
- Declare `minimumReleaseAge: 1440` explicitly in `pnpm-workspace.yaml` so the 24-hour quarantine does not depend on an implicit package-manager default.
- Permit an early release only through an exact package-and-version selector in `minimumReleaseAgeExclude`. Do not exempt a package name or organization wildcard when a specific release is sufficient.
- Keep reviewed overrides for the affected Radix and next-intl release lines so local, CI, Vercel, and Dependabot resolution converge on the same versions.
- Keep Radix Slot as a transitive client-primitive dependency. Server-owned links receive the shared `buttonVariants` classes directly, while the reusable `Button` renders only a native button and does not import the client-only Slot package.
- Render the decorative separator as a native semantic element. The latest Radix Separator reaches the same client-only primitive graph and is not a valid dependency for a server-owned presentational line.
- Replace deprecated Phosphor aliases with named `lucide-react` imports. Keep icons decorative with `aria-hidden` when adjacent text already names the action, and permit only the reviewed `lucide-react@1.26.0` release through the quarantine.
- Delay normal npm version-update PRs for two days through Dependabot cooldown. Keep major updates at a 14-day cooldown. Dependabot security updates remain outside the cooldown.
- Parse and assert the effective pnpm and Dependabot configuration in governance tests so comments, duplicate keys, or unrelated text cannot satisfy the policy.

## Consequences

- Normal Dependabot version PRs should open after pnpm's quarantine has elapsed instead of failing every installation surface.
- A deliberately expedited release remains reviewable as a narrow version exception rather than a global policy relaxation.
- The workspace file carries more explicit package selectors during an expedited update; they can be removed after the affected versions have aged and the lockfile is regenerated.
- Link styling remains server-renderable instead of turning every button-shaped link into a client boundary.
- Named Lucide imports remain tree-shakeable and can be rendered from the existing Server Component owners without a new global client boundary.
- Security updates remain prompt and are handled through their own review and audit path.

## Compatibility and Rollback

The application runtime and public routes do not change. Rollback restores the prior direct dependency ranges and pnpm pin, removes only the new exact-version exceptions, regenerates `pnpm-lock.yaml` under Node 24.16.0, and leaves the two-day Dependabot cooldown in place unless provider behavior proves it harmful.
