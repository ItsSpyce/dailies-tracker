import { defineConfig, type Plugin } from 'vite';
import path from 'path';
import * as fs from 'fs';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-plugin-tsconfig-paths';

// will this work on the built version?
const base64ImageLoader: Plugin = {
  name: 'base64-image-loader',
  transform(_, id) {
    const [path] = id.split('?');
    if (!path.match(/\.(png|jpe?g|gif|svg)$/)) {
      return;
    }
    const data = fs.readFileSync(path);
    const base64 = data.toString('base64');
    return `export default ${base64}`;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), tsConfigPaths()],
});
