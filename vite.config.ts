/// <reference types="vitest" />
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
type ViteConfig = UserConfig & { test: InlineConfig };

// https://vitejs.dev/config/
const config: ViteConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
  base: "/blackboard/"
};
export default defineConfig(config);
