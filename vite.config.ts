// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages deployment, the 'base' must be the repository name.
// Your repo is 'BookMyTurf', and the path needs a trailing slash.
export default defineConfig({
  // The base path for your application.
  // Use the repository name for GitHub Pages.
  // If you ever move the app to the root domain, change this to '/'
  base: "/BookMyTurf/",
  plugins: [react()],
});
