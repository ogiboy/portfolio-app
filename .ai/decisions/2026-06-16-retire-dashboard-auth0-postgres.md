# Decision: Retire Legacy Private Features

## Status

Accepted

## Context

The app currently includes Auth0, a dashboard, Redux theme/modal state, and Vercel Postgres guestbook APIs. These add security, dependency, and runtime surface that does not serve the public portfolio v1.

## Decision

Remove application code for Auth0, dashboard UI, Redux state, axios/lodash form handling, and Postgres guestbook APIs. Do not delete or mutate live database data.

## Consequences

- Public-v1 dependency surface becomes smaller.
- `/dashboard` can redirect to the public portfolio or be removed from navigation.
- Database tables and external Auth0 configuration remain untouched.
