import * as path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "https://www.thecocktaildb.com/api" },
    port: 3000,
  },
  resolve: {
    alias: {
      $src: path.resolve(__dirname, "src"),
      $components: path.resolve(__dirname, "src/components"),
      $utils: path.resolve(__dirname, "src/utils"),
      $hooks: path.resolve(__dirname, "src/hooks"),
      $routes: path.resolve(__dirname, "src/routes"),
      $api: path.resolve(__dirname, "src/api"),
      $assets: path.resolve(__dirname, "src/assets"),
      $pages: path.resolve(__dirname, "src/pages"),
      $types: path.resolve(__dirname, "src/types"),
    },
  },
});
