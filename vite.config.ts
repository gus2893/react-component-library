import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const external = (id: string) =>
  id === 'react' || id === 'react-dom' || id.startsWith('react/') || id.startsWith('react-dom/');

// Library-mode build. Type declarations are emitted separately by `npm run build:types`.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'styles',
    },
    cssCodeSplit: false,
    sourcemap: true,
    // Ship readable code; consuming apps minify in their own bundlers.
    minify: false,
    emptyOutDir: true,
    target: 'es2020',
    rolldownOptions: {
      external,
      output: {
        banner: "'use client';",
        exports: 'named',
      },
    },
  },
});
