// @ts-check
import { defineConfig } from 'astro/config'

/**
 * The content pages are a second, static site that lives beside the React
 * landing rather than inside it. The landing is one continuous scroll
 * experience and had no business being cut into islands; these pages are
 * documents and had no business being rendered by JavaScript. Both build
 * separately and are merged into one `dist/` by scripts/merge.mjs.
 */
export default defineConfig({
  site: 'https://crimeacollagen.ru',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1', port: 5192 },
})
