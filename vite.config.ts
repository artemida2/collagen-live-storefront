import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from a repository subpath on GitHub Pages, from the root in dev.
const BASE = (globalThis as { process?: { env?: Record<string, string> } }).process?.env?.DEPLOY_BASE ?? "/"

export default defineConfig({
  base: BASE,
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5190, strictPort: true },
  preview: { host: '127.0.0.1', port: 5191, strictPort: true },
})
