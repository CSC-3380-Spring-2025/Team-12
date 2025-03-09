import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url"; // Import fileURLToPath from the url module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)), // Map @assets to src/assets
    },
  },
});