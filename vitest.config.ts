import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Headless unit tests (jsdom). No browser / Playwright required.
// Storybook browser tests live in vitest.storybook.config.ts (`npm run test:storybook`).
export default defineConfig({
  plugins: [react()],
  test: {
    name: 'unit',
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/test/**', 'src/**/index.ts'],
    },
  },
});
