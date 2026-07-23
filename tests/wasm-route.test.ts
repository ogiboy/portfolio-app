import { describe, expect, it } from 'vitest';
import { GET } from '@/app/wasm/[...path]/route';

const params = (path: string[]) => Promise.resolve({ path });

describe('wasm asset route', () => {
  it('serves the manifest with JSON content type', async () => {
    const response = await GET(new Request('http://localhost/wasm/manifest.json'), {
      params: params(['manifest.json']),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(response.headers.get('cache-control')).toContain('max-age=60');
  });

  it('serves the engine HTML with a scoped CSP for WASM execution', async () => {
    const response = await GET(new Request('http://localhost/wasm/engine/index.html'), {
      params: params(['engine', 'index.html']),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    expect(response.headers.get('content-security-policy')).toContain('wasm-unsafe-eval');
    expect(response.headers.get('content-security-policy')).toContain('http://localhost');
    expect(response.headers.get('content-security-policy')).not.toContain('code.jquery.com');
    expect(response.headers.get('content-security-policy')).not.toContain('cdnjs.cloudflare.com');
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
    expect(response.headers.get('cross-origin-resource-policy')).toBe('cross-origin');

    const html = await response.text();
    expect(html).toContain('vendor/jquery-3.3.1.min.js');
    expect(html).toContain('vendor/rivets-0.9.6.bundled.min.js');
    expect(html).not.toContain('https://code.jquery.com');
    expect(html).not.toContain('https://cdnjs.cloudflare.com');
  });

  it('serves the engine wasm with an immutable application/wasm response', async () => {
    const response = await GET(new Request('http://localhost/wasm/engine/main.wasm'), {
      params: params(['engine', 'main.wasm']),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/wasm');
    expect(response.headers.get('cache-control')).toContain('immutable');
  });

  it('blocks path traversal outside the public wasm directory', async () => {
    const response = await GET(new Request('http://localhost/wasm/%2e%2e/package.json'), {
      params: params(['..', 'package.json']),
    });

    expect(response.status).toBe(404);
  });
});
