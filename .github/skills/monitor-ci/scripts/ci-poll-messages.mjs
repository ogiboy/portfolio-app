export const resetProgressCodes = new Set([
  'ci_success',
  'fix_auto_applying',
  'fix_auto_apply_skipped',
  'fix_needs_review',
  'fix_apply_ready',
  'fix_needs_local_verify',
]);

export function createMessages({ cipeStatus, selfHealingStatus, verificationStatus }) {
  return {
    new_cipe_detected: () => `New CI Attempt detected! CI: ${cipeStatus || 'N/A'}`,
    no_new_cipe: () => 'New CI Attempt timeout exceeded. No new CI Attempt detected.',
    waiting_for_cipe: () => 'Waiting for new CI Attempt...',
    polling_timeout: () => 'Polling timeout exceeded.',
    circuit_breaker: () => 'No progress after 13 consecutive polls. Stopping.',
    ci_success: () => 'CI passed successfully!',
    cipe_canceled: () => 'CI Attempt was canceled.',
    cipe_timed_out: () => 'CI Attempt timed out.',
    cipe_no_tasks: () => 'CI failed but no Nx tasks were recorded.',
    environment_rerun_cap: () => 'Environment rerun cap (2) exceeded. Bailing.',
    environment_issue: () => 'CI: FAILED | Classification: ENVIRONMENT_STATE',
    self_healing_throttled: () => 'Self-healing throttled — too many unapplied fixes.',
    ci_running: () => `CI: ${cipeStatus}`,
    sh_running: () => `CI: ${cipeStatus} | Self-healing: ${selfHealingStatus}`,
    flaky_rerun: () => 'CI: FAILED | Classification: FLAKY_TASK (auto-rerun in progress)',
    fix_auto_applied: () => 'CI: FAILED | Fix auto-applied, new CI Attempt spawning',
    verification_pending: () =>
      `CI: FAILED | Self-healing: COMPLETED | Verification: ${verificationStatus}`,
    fix_auto_applying: () => 'Fix verified! Auto-applying...',
    fix_auto_apply_skipped: (extra) =>
      `Fix verified but auto-apply was skipped. ${
        extra?.autoApplySkipReason
          ? `Reason: ${extra.autoApplySkipReason}`
          : 'Offer to apply manually.'
      }`,
    fix_needs_review: () =>
      `Fix available but needs review. Verification: ${verificationStatus || 'N/A'}`,
    fix_apply_ready: () => 'Fix available and verified. Ready to apply.',
    fix_needs_local_verify: (extra) =>
      `Fix available. ${extra.verifiableTaskIds.length} task(s) need local verification.`,
    fix_failed: () => 'Self-healing failed to generate a fix.',
    no_fix: () => 'CI failed, no fix available.',
    fallback: () =>
      `CI: ${cipeStatus || 'N/A'} | Self-healing: ${
        selfHealingStatus || 'N/A'
      } | Verification: ${verificationStatus || 'N/A'}`,
  };
}

export function formatMessage(
  msg,
  { verbosity, pollCount, prevStatus, cipeStatus, selfHealingStatus, verificationStatus },
) {
  if (verbosity === 'minimal') {
    const currentStatus = `${cipeStatus}|${selfHealingStatus}|${verificationStatus}`;
    if (currentStatus === (prevStatus || '')) return null;
    return msg;
  }
  if (verbosity === 'verbose') {
    return [
      `Poll #${pollCount + 1} | CI: ${cipeStatus || 'N/A'} | Self-healing: ${
        selfHealingStatus || 'N/A'
      } | Verification: ${verificationStatus || 'N/A'}`,
      msg,
    ].join('\n');
  }
  return `Poll #${pollCount + 1} | ${msg}`;
}
