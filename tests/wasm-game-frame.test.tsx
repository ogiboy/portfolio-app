import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WasmGameFrame } from '@/components/client/wasm-game-frame';

const copy = {
  bootingBody: 'Loading engine files.',
  bootingTitle: 'Booting machine.',
  errorBody: 'Retry or open separately.',
  errorTitle: 'Boot failed.',
  idleBody: 'Nothing loads before boot.',
  idleTitle: 'Machine staged.',
  intro: 'Isolated runtime.',
  launchLabel: 'Boot demo',
  openLabel: 'Open tab',
  readyLabel: 'Machine ready',
  retryLabel: 'Retry boot',
  timeoutBody: 'Stopped after twenty seconds.',
  timeoutTitle: 'Boot timed out.',
  title: 'DOS runtime',
};

function report(
  frame: HTMLIFrameElement,
  attempt: string,
  status: 'ready' | 'error',
  source = frame.contentWindow,
) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: { attempt, channel: 'hot-wasm', status, version: 1 },
      source,
    }),
  );
}

describe('WasmGameFrame', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('does not mount the runtime before explicit boot and accepts its ready signal', () => {
    const { getByRole, getAllByText, getByTitle, queryByTitle } = render(
      <WasmGameFrame {...copy} />,
    );

    expect(queryByTitle(copy.title)).not.toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: copy.launchLabel }));

    const frame = getByTitle(copy.title) as HTMLIFrameElement;
    expect(frame).toHaveAttribute('src', expect.stringContaining('attempt=1'));
    expect(getAllByText(copy.bootingTitle).length).toBeGreaterThan(0);

    act(() => report(frame, '1', 'ready'));
    expect(getByTitle(copy.title)).toBeInTheDocument();
    expect(getByRole('link', { name: copy.openLabel })).toBeInTheDocument();
    expect(getAllByText(copy.readyLabel).length).toBeGreaterThan(0);
  });

  it('rejects stale attempts and messages from another window', () => {
    const { getAllByText, getByRole, getByTitle } = render(<WasmGameFrame {...copy} />);
    fireEvent.click(getByRole('button', { name: copy.launchLabel }));
    const frame = getByTitle(copy.title) as HTMLIFrameElement;

    act(() => report(frame, '0', 'ready'));
    act(() => report(frame, '1', 'ready', window));

    expect(getAllByText(copy.bootingTitle).length).toBeGreaterThan(0);

    act(() => report(frame, '1', 'ready'));
    expect(getAllByText(copy.readyLabel).length).toBeGreaterThan(0);
  });

  it('offers a fresh retry after an engine error', () => {
    const { getByRole, getAllByText, getByTitle } = render(<WasmGameFrame {...copy} />);
    fireEvent.click(getByRole('button', { name: copy.launchLabel }));
    const frame = getByTitle(copy.title) as HTMLIFrameElement;

    act(() => report(frame, '0', 'ready'));
    expect(getAllByText(copy.bootingTitle).length).toBeGreaterThan(0);

    act(() => report(frame, '1', 'error'));
    expect(getByRole('alert')).toHaveTextContent(copy.errorTitle);
    expect(document.querySelector('iframe')).not.toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: copy.retryLabel }));
    expect(getByTitle(copy.title)).toHaveAttribute('src', expect.stringContaining('attempt=2'));
  });

  it('stops waiting after twenty seconds and exposes recovery', () => {
    vi.useFakeTimers();
    const { getByRole } = render(<WasmGameFrame {...copy} />);
    fireEvent.click(getByRole('button', { name: copy.launchLabel }));

    act(() => vi.advanceTimersByTime(20_000));

    expect(getByRole('alert')).toHaveTextContent(copy.timeoutTitle);
    expect(getByRole('button', { name: copy.retryLabel })).toBeInTheDocument();
    expect(document.querySelector('iframe')).not.toBeInTheDocument();
  });

  it('removes the message listener and boot timeout when unmounted', () => {
    vi.useFakeTimers();
    const removeListener = vi.spyOn(window, 'removeEventListener');
    const clearTimeout = vi.spyOn(window, 'clearTimeout');
    const { getByRole, unmount } = render(<WasmGameFrame {...copy} />);

    fireEvent.click(getByRole('button', { name: copy.launchLabel }));
    unmount();

    expect(removeListener).toHaveBeenCalledWith('message', expect.any(Function));
    expect(clearTimeout).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
