import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import nextConfig from '../next.config.mjs';

type HeaderRule = {
  headers: Array<{ key: string; value: string }>;
  source: string;
};

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const digest = (path: string) =>
  createHash('sha256')
    .update(readFileSync(resolve(root, path)))
    .digest('hex');

function headerValue(rule: HeaderRule, key: string) {
  return rule.headers.find((header) => header.key === key)?.value;
}

async function wasmHeaderRules() {
  const rules = (await nextConfig.headers?.()) as HeaderRule[];
  return new Map(rules.map((rule) => [rule.source, rule]));
}

describe('WASM static delivery', () => {
  it('serves public assets without a serverless passthrough route', () => {
    expect(existsSync(resolve(root, 'src/app/wasm/[...path]/route.ts'))).toBe(false);
    expect(existsSync(resolve(root, 'public/wasm/engine/main.wasm'))).toBe(true);
    expect(existsSync(resolve(root, 'public/wasm/engine/vendor'))).toBe(false);
  });

  it('applies revalidating cache and security headers from one config owner', async () => {
    const rules = await wasmHeaderRules();
    const assets = rules.get('/wasm/:path*')!;
    const manifest = rules.get('/wasm/manifest.json')!;
    const runtime = rules.get('/wasm/engine/main.wasm')!;
    const frame = rules.get('/wasm/engine/index.html')!;

    expect(headerValue(assets, 'Cache-Control')).toContain('max-age=3600');
    expect(headerValue(assets, 'Cache-Control')).not.toContain('immutable');
    expect(headerValue(assets, 'Access-Control-Allow-Origin')).toBe('*');
    expect(headerValue(assets, 'Cross-Origin-Resource-Policy')).toBe('cross-origin');
    expect(headerValue(manifest, 'Cache-Control')).toBe('public, max-age=0, must-revalidate');
    expect(headerValue(runtime, 'Content-Type')).toBe('application/wasm');
    expect(headerValue(frame, 'Content-Security-Policy')).toContain('wasm-unsafe-eval');
    expect(headerValue(frame, 'Content-Security-Policy')).not.toContain("'unsafe-inline' 'wasm");
  });

  it('pins the verified DosWasmX runtime without legacy wrapper libraries', () => {
    const manifest = JSON.parse(read('public/wasm/manifest.json')) as {
      runtime: { id: string; revision: string; version: string };
    };
    const html = read('public/wasm/engine/index.html');

    expect(manifest.runtime).toEqual({
      id: 'doswasmx',
      revision: 'doswasmx-v0.3-hot.1',
      version: '0.3',
    });
    expect(digest('public/wasm/engine/main.wasm')).toBe(
      '8c10572678e46fd1fd97d0b23eca8589c8b55aa82e4e9df9fb58160c2bd4631a',
    );
    expect(digest('public/wasm/engine/main.js')).toBe(
      'd6dd83fa43d37b3510ae5ee09307a46fbf4c4ae1afba6d64ca0e7cac64d3f0c2',
    );
    expect(html).not.toContain('vendor/jquery');
    expect(html).not.toContain('vendor/rivets');
    expect(html).not.toContain('https://code.jquery.com');
    expect(html).not.toContain('https://cdnjs.cloudflare.com');
  });

  it('uses a stable runtime revision without the unused eval formatters', () => {
    const settings = read('public/wasm/engine/settings.js');
    const runtime = read('public/wasm/engine/script.js');

    expect(settings).toContain('PORTAL_RUNTIME_REVISION');
    expect(settings).not.toContain('script.js?v=${Date.now()}');
    expect(runtime).not.toMatch(/\beval\s*\(/);
    expect(runtime).not.toMatch(/\b(?:jQuery|rivets|toastr)\b/);
    expect(runtime.match(/rivetsData/g)).toHaveLength(1);
    expect(runtime).toContain('this.rivetsData = this.state;');
    expect(read('public/wasm/engine/main.js')).toContain(
      'myApp.rivetsData.inputController.updateDosControls()',
    );
    expect(runtime).toContain("window['indexedDB'] == undefined");
  });
});
