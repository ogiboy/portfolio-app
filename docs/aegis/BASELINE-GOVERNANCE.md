# Baseline Governance

## Purpose

Baseline records capture dated project truth. They are evidence inputs, not completion authority.

## Dual Baseline

- Historical pre-change baselines preserve what was known at their recorded date. Do not rewrite them to make later architecture, hosted state, or verification appear historical.
- Later post-change baselines record dated observations after a material governance or delivery change. They must link historical records rather than overwrite them.
- A baseline is not a live dashboard. Reconcile volatile Git, PR, preview, DNS, and production state again before acting on it.
- `.ai/checkpoints/portfolio-overhaul.md` is the sole mutable state owner for the active overhaul. Baselines and dated Aegis checkpoints point to it; they never mirror or replace it.

## Rules

- Create a new dated baseline when architecture, delivery workflow, source-of-truth boundaries, or materially relevant hosted state changes.
- Keep implementation specs separate from baseline snapshots.
- Label facts as observed, user-provided, inferred, or unverified and preserve source/date/commit or deployment where applicable.
- Verify claims with commands or provider/browser evidence before marking work complete.
- After a baseline is accepted, correct it only through a new dated baseline that links and supersedes the earlier observation.
