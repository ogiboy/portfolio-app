# PR and Release Workflow

Use these distinct states; none implies the next one.

1. **Local green:** the relevant local commands passed for the exact commit.
2. **Pushed commit:** the reviewed commit exists on the PR branch.
3. **Hosted checks:** GitHub/provider checks are individually reconciled, including failures caused by hosted setup.
4. **Preview:** the intended deployment identifier and route/API configuration were observed.
5. **Browser QA:** the preview journey was exercised at required viewports/locales and evidence recorded.
6. **Review approval:** required review state is satisfied; advisory tools such as CodeRabbit are not authority.
7. **Merge:** the provider records the PR as merged into the intended base branch.
8. **Production verification:** the deployed `main` build is checked in the browser and against applicable discovery output.

For a versioned release, run `pnpm release:plan`, update package/changelog in one `chore(release): x.y.z` commit, run `pnpm release:check`, and tag only that exact commit after required hosted evidence. These commands never mutate versions, create tags, or publish automatically.

Read resumable state from `.ai/checkpoints/portfolio-overhaul.md`, then refresh every volatile claim from Git or the provider before acting. Dated Aegis baselines/checkpoints are evidence, never live provider status. Production is `main`; branch-only behavior must not be called live until merge and production verification.
