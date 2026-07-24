import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsPreference } from '@/components/client/analytics-preference';
import { SiteTelemetry } from '@/components/client/site-telemetry';
import { analyticsStorageKey, saveAnalyticsPreference } from '@/lib/analytics-preference';

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
  savedLabel: 'Preference saved.',
  errorLabel: 'Preference could not be saved.',
};

describe('analytics preference', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('mounts aggregate telemetry by default and removes it when the preference changes', async () => {
    const user = userEvent.setup();
    render(
      <>
        <SiteTelemetry />
        <AnalyticsPreference {...labels} />
      </>,
    );

    expect(await screen.findByTestId('analytics')).toBeInTheDocument();
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: labels.disableAction }));

    expect(window.localStorage.getItem(analyticsStorageKey)).toBe('1');
    await waitFor(() => expect(screen.queryByTestId('analytics')).not.toBeInTheDocument());
    expect(screen.getByRole('status')).toHaveTextContent(labels.disabledLabel);
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

  it('latches a confirmed saved choice before returning to the settled preference state', async () => {
    vi.useFakeTimers();
    render(<AnalyticsPreference {...labels} />);

    fireEvent.click(screen.getByRole('button', { name: labels.disableAction }));

    expect(window.localStorage.getItem(analyticsStorageKey)).toBe('1');
    expect(screen.getByRole('status')).toHaveTextContent('Analytics disabled. Preference saved.');
    expect(screen.getByRole('status').parentElement).toHaveAttribute('data-latch', 'saved');

    act(() => vi.advanceTimersByTime(220));

    expect(screen.getByRole('status')).toHaveTextContent(labels.disabledLabel);
    expect(screen.getByRole('status').parentElement).toHaveAttribute('data-latch', 'idle');
  });

  it('saves the choice through keyboard activation', async () => {
    const user = userEvent.setup();
    render(<AnalyticsPreference {...labels} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(window.localStorage.getItem(analyticsStorageKey)).toBe('1');
    expect(screen.getByRole('status')).toHaveTextContent('Analytics disabled. Preference saved.');
  });

  it('reports an error result when browser storage rejects the update', () => {
    const storage = {
      getItem: () => null,
      removeItem: () => undefined,
      setItem: () => {
        throw new Error('Storage unavailable');
      },
    };

    expect(saveAnalyticsPreference(storage, false)).toBe('error');
  });
});
