import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/BookMyTurf/", // 👈 this is required for GitHub Pages
});
