import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
          vendor: ["react", "react-dom"]
        }
      }
    },
  },
  optimizeDeps: {
    include: ["three", "gsap"],
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=3600"
    }
  }
});
