import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'src/tests/setup.ts')],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/tests', '**/*.d.ts'],
      enabled: true,
    },
  },
});
