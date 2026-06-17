import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MIME_TYPES: Record<string, string> = {
  '.cfg': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.dat': 'application/octet-stream',
  '.doc': 'text/plain; charset=utf-8',
  '.exe': 'application/octet-stream',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.str': 'text/plain; charset=utf-8',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.wad': 'application/octet-stream',
  '.wasm': 'application/wasm',
};

const MUTABLE_FILES = new Set(['index.html', 'manifest.json', 'settings.js', 'romlist.js']);

function resolveWasmPath(parts: string[]) {
  const baseDir = path.resolve(process.cwd(), 'public', 'wasm');
  const target = path.resolve(baseDir, ...parts);
  const insideBase = target === baseDir || target.startsWith(`${baseDir}${path.sep}`);

  return insideBase ? target : null;
}

function headersFor(target: string) {
  const basename = path.basename(target);
  const ext = path.extname(target);
  const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
  const cacheControl = MUTABLE_FILES.has(basename)
    ? 'public, max-age=60, stale-while-revalidate=86400'
    : 'public, max-age=31536000, immutable';

  const headers: Record<string, string> = {
    'Cache-Control': cacheControl,
    'Content-Type': contentType,
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-Content-Type-Options': 'nosniff',
  };

  if (ext === '.html') {
    headers['Content-Security-Policy'] = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://code.jquery.com https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self'",
      "font-src 'self'",
      "img-src 'self' data:",
      "worker-src 'self' blob:",
    ].join('; ');
  }

  return headers;
}

export async function GET(
  _request: Request,
  { params }: Readonly<{ params: Promise<{ path?: string[] }> }>,
) {
  const { path: routePath } = await params;
  const target = resolveWasmPath(routePath ?? ['engine', 'index.html']);

  if (!target) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  try {
    const data = await fs.readFile(target);
    return new NextResponse(data, {
      headers: headersFor(target),
      status: 200,
    });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}
