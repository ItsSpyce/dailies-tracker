/// <reference types="vitest" />
import { type UserConfig, defineConfig } from 'vite';

export default defineConfig(() => {
  const config: UserConfig = {
    test: {
      include: ['src/app/**/*.spec.ts'],
      name: 'electron-renderer-tests',
      environment: 'happy-dom',
      setupFiles: ['src/app/setupUnitTests.ts'],
    },
  };
  return config;
});
