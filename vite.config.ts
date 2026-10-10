import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  // Vite's own hashed bundle goes to /_app so it never collides with /assets (logos, videos, works)
  build: { assetsDir: "_app", chunkSizeWarningLimit: 700 },
})
