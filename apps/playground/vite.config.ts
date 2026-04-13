import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Project Pages URL: https://<user>.github.io/Acko-Design-system/ — must match repo name. */
const pagesBase = "/Acko-Design-system/";

export default defineConfig({
  base:
    process.env.GITHUB_ACTIONS === "true" || process.env.CI === "true"
      ? pagesBase
      : "/",

  plugins: [react(), tailwindcss()],

  css: {
    transformer: "postcss", // disables LightningCSS transforms
  },

  build: {
    cssMinify: "esbuild", // prevents logical property rewrites
  },
});