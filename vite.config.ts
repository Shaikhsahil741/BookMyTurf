import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This ensures paths work for GitHub Pages and locally
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/BookMyTurf/" : "/",
});
