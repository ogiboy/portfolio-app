import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsPreference } from '@/components/client/analytics-preference';
import { SiteTelemetry } from '@/components/client/site-telemetry';
import { analyticsPreferenceEvent, analyticsStorageKey } from '@/lib/analytics-preference';

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics" />,
}));

vi.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />,
}));

const labels = {
  enabledLabel: 'Analytics enabled',
  disabledLabel: 'Analytics disabled',
  enableAction: 'Enable analytics',
  disableAction: 'Disable analytics',
};

describe('analytics preference', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('mounts aggregate telemetry by default and removes it when the preference changes', async () => {
    render(
      <>
        <SiteTelemetry />
        <AnalyticsPreference {...labels} />
      </>,
    );

    expect(await screen.findByTestId('analytics')).toBeInTheDocument();
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();

    window.localStorage.setItem(analyticsStorageKey, '1');
    window.dispatchEvent(new Event(analyticsPreferenceEvent));
    await waitFor(() => expect(screen.queryByTestId('analytics')).not.toBeInTheDocument());
    expect(screen.getByText(labels.disabledLabel)).toBeInTheDocument();
  });

  it('keeps a stored opt-out disabled until the visitor enables analytics', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(analyticsStorageKey, '1');
    render(
      <>
        <SiteTelemetry />
        <AnalyticsPreference {...labels} />
      </>,
    );

    expect(await screen.findByText(labels.disabledLabel)).toBeInTheDocument();
    expect(screen.queryByTestId('analytics')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: labels.enableAction }));

    expect(window.localStorage.getItem(analyticsStorageKey)).toBeNull();
    expect(await screen.findByTestId('analytics')).toBeInTheDocument();
  });
});
