import createNextIntlPlugin from 'next-intl/plugin';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/request.ts',
});

const projectRoot = dirname(fileURLToPath(import.meta.url));
const wasmAssetCache = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';
const wasmControlCache = 'public, max-age=0, must-revalidate';
const wasmFramePolicy = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' http://127.0.0.1:* http://localhost:* https://oguzcantoptas.com https://www.oguzcantoptas.com https://*.vercel.app",
  "font-src 'self'",
  "img-src 'self' data:",
  "worker-src 'self' blob:",
].join('; ');

const mutableWasmFiles = [
  '/wasm/engine/index.html',
  '/wasm/engine/romlist.js',
  '/wasm/engine/settings.js',
  '/wasm/manifest.json',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async headers() {
    return [
      {
        source: '/wasm/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: wasmAssetCache },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      ...mutableWasmFiles.map((source) => ({
        source,
        headers: [{ key: 'Cache-Control', value: wasmControlCache }],
      })),
      {
        source: '/wasm/engine/main.wasm',
        headers: [{ key: 'Content-Type', value: 'application/wasm' }],
      },
      {
        source: '/wasm/engine/index.html',
        headers: [{ key: 'Content-Security-Policy', value: wasmFramePolicy }],
      },
    ];
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
