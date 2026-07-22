# Public V1 Readiness Checklist

- EN/TR public route shell is rendered and verified; project records remain explicitly shared source-language content until localized.
- Server Components own routes; client-only behavior is isolated to leaves.
- No separate/stateful backend, authentication, database, private dashboard, or database-backed guestbook has entered public v1.
- Route handlers are thin and read-only; discovery output is source-backed and labels unavailable data.
- Canonical origin is verified against the first-party production origin; branch-only sitemap/API catalog is not called live before merge/deploy verification.
- Browser QA covers accessibility, reduced motion, responsive behavior, and the isolated WASM journey when applicable.
- OAuth, `auth.md`, MCP server card, and DNS-AID remain absent unless documented prerequisites are met.
