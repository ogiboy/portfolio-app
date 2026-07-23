import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WebMcpTools } from '@/components/client/webmcp-tools';

describe('WebMcpTools', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    delete document.modelContext;
    delete navigator.modelContext;
  });

  it('does nothing when document.modelContext is unavailable', () => {
    expect(() => render(<WebMcpTools />)).not.toThrow();
  });

  it('registers two read-only tools and aborts their registrations on cleanup', async () => {
    const registerTool = vi.fn().mockResolvedValue(undefined);
    document.modelContext = { registerTool };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          name: 'Portfolio',
          version: '0.2.0',
          contact: { email: 'hello@example.com' },
          projects: [
            {
              name: 'Weather Simplified',
              slug: 'weather-simplified',
              category: 'Utility',
              description: 'Weather project',
              year: '2023',
              stack: ['React'],
            },
          ],
        }),
        { status: 200 },
      ),
    );

    const view = render(<WebMcpTools />);
    await waitFor(() => expect(registerTool).toHaveBeenCalledTimes(2));
    const [[overview, overviewOptions], [search]] = registerTool.mock.calls;

    expect(overview).toMatchObject({
      name: 'portfolio_overview',
      annotations: { readOnlyHint: true },
    });
    expect(search).toMatchObject({
      name: 'search_public_portfolio_projects',
      annotations: { readOnlyHint: true },
    });

    await expect(search.execute({ query: 'weather' })).resolves.toMatchObject({
      structuredContent: { count: 1 },
    });
    expect(fetchMock).toHaveBeenCalledWith('/api/portfolio', {
      headers: { Accept: 'application/json' },
    });

    view.unmount();
    expect(overviewOptions.signal.aborted).toBe(true);
  });

  it('supports the legacy navigator provideContext API used by agent scanners', async () => {
    const provideContext = vi.fn().mockResolvedValue(undefined);
    navigator.modelContext = { provideContext };

    const view = render(<WebMcpTools />);
    await waitFor(() => expect(provideContext).toHaveBeenCalledTimes(1));

    const [{ tools }] = provideContext.mock.calls[0];
    expect(tools.map((tool: ModelContextTool) => tool.name)).toEqual([
      'portfolio_overview',
      'search_public_portfolio_projects',
    ]);
    expect(tools.every((tool: ModelContextTool) => tool.annotations.readOnlyHint)).toBe(true);

    view.unmount();
    await waitFor(() => expect(provideContext).toHaveBeenLastCalledWith({ tools: [] }));
  });

  it('aborts pending registrations and reports non-abort registration failures', async () => {
    let rejectRegistration: (reason: Error) => void = () => undefined;
    const pendingRegistration = new Promise<void>((_resolve, reject) => {
      rejectRegistration = reject;
    });
    const registerTool = vi.fn().mockReturnValue(pendingRegistration);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    document.modelContext = { registerTool };

    const view = render(<WebMcpTools />);
    await waitFor(() => expect(registerTool).toHaveBeenCalledTimes(2));
    const signal = registerTool.mock.calls[0][1].signal as AbortSignal;
    view.unmount();
    rejectRegistration(new Error('registration cancelled'));
    await Promise.resolve();

    expect(signal.aborted).toBe(true);
    expect(consoleError).not.toHaveBeenCalled();

    registerTool.mockReset().mockRejectedValue(new Error('registration denied'));
    render(<WebMcpTools />);
    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        'WebMCP tool registration failed.',
        expect.objectContaining({ message: 'registration denied' }),
      ),
    );
  });
});
