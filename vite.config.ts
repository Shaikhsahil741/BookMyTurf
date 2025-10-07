import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/BookMyTurf/", // IMPORTANT for GitHub Pages
  plugins: [react()],
});
