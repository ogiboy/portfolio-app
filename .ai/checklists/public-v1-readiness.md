# Public V1 Readiness Checklist

- EN/TR public route shell is rendered and verified; project records remain explicitly shared source-language content until localized.
- Server Components own routes; client-only behavior is isolated to leaves.
- No separate/stateful backend, authentication, database, private dashboard, or database-backed guestbook has entered public v1.
- Route handlers are thin and read-only; discovery output is source-backed and labels unavailable data.
- Canonical origin is verified against the first-party production origin; branch-only sitemap/API catalog is not called live before merge/deploy verification.
- Alive UX is browser-proven rather than inferred from source: normal-motion desktop reveals purposeful progression, mobile retains natural flow, reduced-motion retains equivalent content/order/navigation, and no motion leaf delays first paint or creates horizontal overflow.
- Browser QA covers accessibility, normal and reduced motion, responsive behavior, and the isolated WASM journey when applicable.
- DNS-AID publishes only the source-backed public index entrypoint under DNSSEC. OAuth, `auth.md`, and an MCP server card remain absent unless documented prerequisites are met.
