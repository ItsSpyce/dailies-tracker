import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-plugin-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), tsConfigPaths()],
});
