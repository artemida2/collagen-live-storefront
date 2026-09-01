import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the root of crimeacollagen.ru (see public/CNAME) and from the
// root in dev, so the default base holds everywhere.
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5190, strictPort: true },
  preview: { host: '127.0.0.1', port: 5191, strictPort: true },
})
