# Decision: shadcn-Based Brutalist Design System

## Status

Accepted

## Context

The redesign needs accessible primitives without shipping default-looking component-library UI.

## Decision

Use shadcn/Radix primitives as source-owned UI foundation and customize them with Brutalist Dev Lab tokens, typography, and layout rules.

## Consequences

- `components.json`, `src/components/ui`, and `src/lib/utils.ts` define the UI foundation.
- Default shadcn visuals must be overridden by project tokens.
- Avoid generic purple/glass/Inter defaults.
