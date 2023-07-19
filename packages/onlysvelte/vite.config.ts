import { defineConfig, UserConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

//vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
});
