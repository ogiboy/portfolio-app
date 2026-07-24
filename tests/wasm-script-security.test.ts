import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext, Script } from 'node:vm';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const runtime = readFileSync(resolve(root, 'public/wasm/engine/script.js'), 'utf8');
const cloudSaveAdapter = readFileSync(
  resolve(root, 'public/wasm/engine/cloud-save-adapter.js'),
  'utf8',
);
const runtimeSecurity = readFileSync(
  resolve(root, 'public/wasm/engine/runtime-security.js'),
  'utf8',
);

type SleepMessage = {
  data: unknown;
  source: unknown;
};

type SecurityHelpers = {
  replyToLocalSleepMessage: (event: SleepMessage) => boolean;
  resolveApprovedAssetUrl: (path: string) => URL;
  resolveApprovedCloudUrl: (
    baseUrl: string,
    route: string,
    params?: Record<string, unknown>,
  ) => URL;
  secureRandomInteger: (maxExclusive: number) => number;
};

type SecurityWindow = {
  HotWasmSecurity?: SecurityHelpers;
  crypto: { getRandomValues: (values: Uint32Array) => Uint32Array };
  dispatchEvent: (event: TestMessageEvent) => boolean;
  location: { href: string };
  setTimeout: (callback: () => void) => number;
};

class TestMessageEvent {
  readonly data: unknown;
  readonly source: unknown;
  readonly type: string;

  constructor(type: string, init: { data: unknown; source: unknown }) {
    this.type = type;
    this.data = init.data;
    this.source = init.source;
  }
}

function loadSecurityHarness(randomValues = [42]) {
  const dispatched: TestMessageEvent[] = [];
  let randomIndex = 0;
  const frameWindow: SecurityWindow = {
    crypto: {
      getRandomValues(values) {
        values[0] = randomValues[Math.min(randomIndex, randomValues.length - 1)];
        randomIndex += 1;
        return values;
      },
    },
    dispatchEvent(event) {
      dispatched.push(event);
      return true;
    },
    location: { href: 'https://www.oguzcantoptas.com/wasm/engine/index.html' },
    setTimeout(callback) {
      callback();
      return 1;
    },
  };

  runInNewContext(runtimeSecurity, {
    MessageEvent: TestMessageEvent,
    URL,
    Uint32Array,
    window: frameWindow,
  });

  return {
    dispatched,
    frameWindow,
    helpers: frameWindow.HotWasmSecurity as SecurityHelpers,
  };
}

describe('DosWasmX authored wrapper security', () => {
  it('parses without turning the runtime object into a thenable', () => {
    expect(() => new Script(runtimeSecurity)).not.toThrow();
    expect(() => new Script(runtime)).not.toThrow();
    expect(runtime).not.toMatch(/\bthis\.then\s*=/);
  });

  it('uses the frozen security namespace and Web Crypto for runtime suffixes', () => {
    const { frameWindow, helpers } = loadSecurityHarness();

    expect(helpers.secureRandomInteger(10)).toBe(2);
    expect(Object.isFrozen(frameWindow.HotWasmSecurity)).toBe(true);
    expect(runtimeSecurity).toContain('global.crypto.getRandomValues(values)');
    expect(`${runtimeSecurity}\n${runtime}`).not.toContain('Math.random');
  });

  it('rejects biased draws and invalid random bounds', () => {
    const { helpers } = loadSecurityHarness([0xffffffff, 42]);

    expect(helpers.secureRandomInteger(10)).toBe(2);
    expect(() => helpers.secureRandomInteger(0)).toThrow('Random integer bound is not approved.');
    expect(() => helpers.secureRandomInteger(1.5)).toThrow('Random integer bound is not approved.');
  });

  it('allows only same-origin assets below the WASM root', () => {
    const { helpers } = loadSecurityHarness();

    expect(helpers.resolveApprovedAssetUrl('roms/game.zip').href).toBe(
      'https://www.oguzcantoptas.com/wasm/engine/roms/game.zip',
    );
    expect(helpers.resolveApprovedAssetUrl('/wasm/roms/game.zip').pathname).toBe(
      '/wasm/roms/game.zip',
    );
    expect(() => helpers.resolveApprovedAssetUrl('/api/private')).toThrow(
      'Runtime asset URL is not approved.',
    );
    expect(() => helpers.resolveApprovedAssetUrl('https://attacker.example/wasm/game.zip')).toThrow(
      'Runtime asset URL is not approved.',
    );
    expect(() =>
      helpers.resolveApprovedAssetUrl('https://user:secret@www.oguzcantoptas.com/wasm/game.zip'),
    ).toThrow('Runtime asset URL is not approved.');

    expect(runtime).toContain("req.open('GET', approvedAssetUrl.href)");
    expect(runtime).not.toContain("req.open('GET', path)");
  });

  it('builds cloud requests from an approved base and fixed route', () => {
    const { helpers } = loadSecurityHarness();

    expect(
      helpers.resolveApprovedCloudUrl('https://saves.example/api', 'LoadStaveState', {
        name: 'save & one',
        password: 'p@ss&word',
      }).href,
    ).toBe('https://saves.example/api/LoadStaveState?name=save+%26+one&password=p%40ss%26word');
    expect(
      helpers.resolveApprovedCloudUrl('http://localhost:8787/api', 'LoadStaveState').href,
    ).toBe('http://localhost:8787/api/LoadStaveState');
    expect(() =>
      helpers.resolveApprovedCloudUrl('http://saves.example/api', 'LoadStaveState'),
    ).toThrow('Cloud save URL is not approved.');
    expect(() =>
      helpers.resolveApprovedCloudUrl('https://saves.example/api', 'UnapprovedRoute'),
    ).toThrow('Cloud route is not approved.');

    expect(cloudSaveAdapter).toContain("this.cloudUrl('LoadStaveState'");
    expect(runtimeSecurity).toContain('target.searchParams.set(key, String(value))');
    expect(runtime).not.toMatch(/CLOUDSAVEURL\s*\+/);
    expect(runtime).not.toMatch(/new URL\([^\n]*CLOUDSAVEURL/);
  });

  it('keeps tainted values out of operational logs', () => {
    expect(runtime).not.toContain("console.log('loading ' + path)");
    expect(runtime).not.toContain("console.log('loaded drive from db: ' + imgName)");
    expect(runtime).not.toContain("console.log('login result: ' + result)");
    expect(runtime).not.toContain("console.log('getSaveStates result: ', result)");
  });

  it('keeps cloud-save passwords ephemeral across login flows', () => {
    const loginFlowStart = runtime.indexOf('  setupLogin() {');
    const loginFlowEnd = runtime.indexOf('  postLoginProcess() {', loginFlowStart);
    const loginFlow = runtime.slice(loginFlowStart, loginFlowEnd);

    expect(runtime).not.toContain('doswasmx-password');
    expect(loginFlow).not.toContain('localStorage');
    expect(loginFlow).toContain("this.state.password = '';");
    expect(loginFlow).toContain('async loginSilent()');
    expect(loginFlow).toContain('logout()');
  });

  it('uses the selected base key when looking up local savestates', () => {
    const methodStart = runtime.indexOf('findSavestateInDatabase()');
    const methodEnd = runtime.indexOf('/**', methodStart);
    const findSavestateMethod = runtime.slice(methodStart, methodEnd);

    expect(findSavestateMethod).toContain('let imgKey = myClass.base_name;');
    expect(findSavestateMethod).toContain("if (!myClass.state.loggedIn) imgKey = 'win95';");
    expect(findSavestateMethod).toContain("imgKey += '.savestate';");
    expect(findSavestateMethod).not.toContain("imgKey += +'.savestate';");
  });

  it('keeps the sleep handshake inside the originating frame', () => {
    const { dispatched, frameWindow, helpers } = loadSecurityHarness();
    const data = { name: 'ws-sync-sleep', props: { sessionId: '123' } };

    expect(helpers.replyToLocalSleepMessage({ data, source: {} })).toBe(false);
    expect(dispatched).toEqual([]);
    expect(helpers.replyToLocalSleepMessage({ data, source: frameWindow })).toBe(true);
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toMatchObject({
      data: { name: 'wc-sync-sleep', props: { sessionId: '123' } },
      source: frameWindow,
      type: 'message',
    });
    expect(`${runtimeSecurity}\n${runtime}`).not.toMatch(
      /\bpostMessage\s*\([\s\S]{0,160},\s*['"]\*['"]\s*\)/,
    );
  });
});
