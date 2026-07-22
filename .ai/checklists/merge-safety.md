# Merge Safety Checklist

- Confirm base branch, head commit, and unrelated dirty worktree files.
- Record local green for the exact head commit.
- Confirm that commit is pushed.
- Reconcile every required hosted check; a hosted setup failure is a failure, not green.
- Record preview browser QA and required review approval separately.
- Confirm merge in the provider, then verify the resulting production deployment.
- Do not merge, deploy, publish, change DNS, or mutate hosted settings without explicit authority.
