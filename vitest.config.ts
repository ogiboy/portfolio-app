import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const srcPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov', 'html'],
      include: [
        'scripts/qa/docstring-coverage.mjs',
        'scripts/release/release-state.ts',
        'src/lib/**/*.ts',
        'src/content/**/*.ts',
        'src/i18n/routing.ts',
        'src/components/client/analytics-preference.tsx',
        'src/components/client/cinematic-work-rail.tsx',
        'src/components/client/locale-switcher.tsx',
        'src/components/client/mobile-navigation.tsx',
        'src/components/client/navigation-link.tsx',
        'src/components/client/site-telemetry.tsx',
        'src/components/client/theme-toggle.tsx',
        'src/components/client/use-analytics-preference.ts',
        'src/components/client/use-cinematic-motion-eligibility.ts',
        'src/components/client/wasm-game-frame.tsx',
        'src/components/client/wasm-runtime/**/*.ts',
        'src/components/client/webmcp-tools.tsx',
        'src/components/seo/json-ld.tsx',
        'src/components/site/hot-mark.tsx',
        'src/components/site/project-card.tsx',
        'src/components/ui/**/*.tsx',
      ],
      exclude: [
        'src/app/**',
        'src/proxy.ts',
        'src/i18n/request.ts',
        'src/i18n/navigation.ts',
        'src/components/Providers.tsx',
        'src/components/client/motion-features.ts',
        'src/components/site/site-header.tsx',
        'src/components/site/site-footer.tsx',
        'src/lib/social-image.tsx',
        'src/types/**',
        'e2e/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.svg',
        '**/*.png',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
