import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

const root = process.cwd();
const settingsSource = readFileSync(resolve(root, 'public/wasm/engine/settings.js'), 'utf8');
const frameHtml = readFileSync(resolve(root, 'public/wasm/engine/index.html'), 'utf8');

type GameManifest = {
  defaultGame: string;
  games: Array<{
    files: string[];
    id: string;
  }>;
};

function classListStub() {
  return {
    add: vi.fn(),
    remove: vi.fn(),
  };
}

async function executeSettings(files: string[]) {
  const manifest: GameManifest = {
    defaultGame: 'security-test',
    games: [{ files, id: 'security-test' }],
  };
  const postMessage = vi.fn();
  const parseMultipleFiles = vi.fn().mockResolvedValue(undefined);
  const fetch = vi.fn(async (...args: [string | URL, RequestInit?]) => {
    const [input] = args;
    const requestUrl = new URL(String(input), 'https://portfolio.test');
    if (requestUrl.pathname === '/wasm/manifest.json') {
      return {
        json: async () => manifest,
        ok: true,
      };
    }

    return {
      arrayBuffer: async () => new ArrayBuffer(8),
      ok: true,
    };
  });
  const progress = { style: { width: '' }, textContent: '' };
  const panel = {
    classList: classListStub(),
    replaceChildren: vi.fn(),
  };
  const app = {
    Run: vi.fn(),
    configuration: { startupScript: '' },
    parseMultipleFiles,
    state: { moduleInitializing: false },
  };
  const documentStub = {
    body: { classList: classListStub() },
    createElement: (tagName: string) => {
      if (tagName === 'script') {
        return {
          onerror: undefined as (() => void) | undefined,
          onload: undefined as (() => void) | undefined,
          src: '',
        };
      }
      return { style: { cssText: '' }, textContent: '' };
    },
    getElementById: (id: string) => {
      if (id === 'myProgress') return progress;
      if (id === 'topPanel') return panel;
      return null;
    },
    head: {
      appendChild: (script: { onload?: () => void }) => {
        queueMicrotask(() => script.onload?.());
        return script;
      },
    },
  };
  const parent = { postMessage };
  const windowStub = {
    DOSWASMSETTINGS: undefined,
    PORTAL_MANIFEST: undefined,
    PORTAL_RUNTIME_REVISION: undefined,
    ROMLIST: undefined,
    location: new URL(
      'https://portfolio.test/wasm/engine/index.html?game=security-test&attempt=attempt-1',
    ),
    myApp: app,
    parent,
  };

  runInNewContext(settingsSource, {
    ArrayBuffer,
    URL,
    URLSearchParams,
    Uint8Array,
    console: {
      error: vi.fn(),
      warn: vi.fn(),
    },
    document: documentStub,
    fetch,
    queueMicrotask,
    setTimeout,
    window: windowStub,
  });

  await vi.waitFor(() => expect(postMessage).toHaveBeenCalled(), { timeout: 1_000 });

  return { fetch, postMessage };
}

describe('WASM frame security boundaries', () => {
  it('targets the frame origin instead of broadcasting status messages', async () => {
    const { postMessage } = await executeSettings([]);

    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        attempt: 'attempt-1',
        channel: 'hot-wasm',
        status: 'ready',
        version: 1,
      }),
      'https://portfolio.test',
    );
  });

  it('loads approved game assets from the same-origin WASM ROM boundary', async () => {
    const { fetch, postMessage } = await executeSettings(['roms/doom/DOOM1.WAD']);
    const requests = fetch.mock.calls.map(([input]) => String(input));

    expect(requests).toContain('https://portfolio.test/wasm/roms/doom/DOOM1.WAD');
    expect(fetch.mock.calls[1]?.[1]).toMatchObject({
      credentials: 'same-origin',
      redirect: 'error',
    });
    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({ status: 'ready' }),
      'https://portfolio.test',
    );
  });

  it.each([
    '../private.txt',
    '/wasm/engine/main.js',
    'roms/doom/../../engine/main.js',
    'roms\\doom\\DOOM1.WAD',
    'https://attacker.test/payload.bin',
    '//attacker.test/payload.bin',
  ])('rejects an unapproved manifest asset before fetch: %s', async (filePath) => {
    const { fetch, postMessage } = await executeSettings([filePath]);
    const requests = fetch.mock.calls.map(([input]) => String(input));

    expect(requests).toEqual(['/wasm/manifest.json']);
    expect(postMessage).toHaveBeenLastCalledWith(
      expect.objectContaining({ status: 'error' }),
      'https://portfolio.test',
    );
  });

  it.each([
    ['romselect', 'Game selection'],
    ['file-upload', 'Game files'],
    ['file-import', 'Saved game files'],
  ])('associates %s with an accessible label', (id, label) => {
    const parsed = new DOMParser().parseFromString(frameHtml, 'text/html');
    const control = parsed.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;

    expect(control).not.toBeNull();
    expect(control?.labels).toHaveLength(1);
    expect(control?.labels?.[0]?.textContent?.trim()).toBe(label);
  });
});
