/// <reference types="vitest" />
import { type UserConfig, defineConfig } from 'vite';

export default defineConfig(() => {
  const config: UserConfig = {
    test: {
      include: ['src/main/**/*.spec.ts'],
      name: 'electron-main-tests',
      environment: 'node',
      setupFiles: ['src/main/setupUnitTests.ts'],
    },
  };
  return config;
});
