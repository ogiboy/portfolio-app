# Decision Record Lifecycle

## Statuses

- `Proposed`: under review and not yet authoritative.
- `Accepted`: authoritative rationale from its acceptance point.
- `Superseded`: replaced by a named later decision; retained for history.
- `Rejected`: considered and explicitly not adopted.

## Immutability

Once accepted, a decision record is immutable except for an explicitly labeled typo or broken-link correction that does not change meaning. Do not rewrite an accepted record to make later policy appear historical.

Material changes require a new dated decision with `Supersedes:` or `Amends:` metadata naming every affected record. The new record explains why the prior decision changed. Consumers resolve the lifecycle from the newest accepted record; the earlier file remains untouched.

Every decision must state status, context, decision, consequences, and any compatibility or rollback boundary. Decisions may define architecture and policy, but they do not prove current runtime, Git, provider, or production state.
