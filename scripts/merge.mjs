/**
 * Two builds, one site.
 *
 * The React landing is built by Vite into dist/; the content pages are built
 * by Astro into pages/dist/. This copies the second on top of the first and
 * then writes the sitemap by walking what actually ended up there — a sitemap
 * maintained by hand goes stale the first time someone adds a page in the
 * admin panel and nobody remembers this file exists.
 */
import { cp, mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/* fileURLToPath, not URL.pathname: this repository lives under a folder with
   a space in its name, and pathname hands back the percent-encoded form. */
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
const PAGES = join(ROOT, 'pages', 'dist')
const SITE = 'https://crimeacollagen.ru'

/** Pages that exist but should never be offered to a search engine. */
const HIDDEN = ['admin']

if (!existsSync(DIST)) {
  throw new Error('Нет папки dist — сначала должна пройти сборка лендинга (vite build).')
}
if (!existsSync(PAGES)) {
  throw new Error('Нет папки pages/dist — сначала должна пройти сборка страниц (astro build).')
}

await cp(PAGES, DIST, { recursive: true, force: true })

/** Every directory holding an index.html is one address on the site. */
async function walk(dir) {
  const out = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, item.name)
    if (item.isDirectory()) out.push(...(await walk(full)))
    else if (item.name === 'index.html') out.push(relative(DIST, dir).split(sep).filter(Boolean))
  }
  return out
}

const routes = (await walk(DIST))
  .filter((segments) => !HIDDEN.includes(segments[0]))
  .map((segments) => (segments.length ? `/${segments.join('/')}/` : '/'))
  .sort((a, b) => a.length - b.length || a.localeCompare(b))

const today = new Date().toISOString().slice(0, 10)
const body = routes
  .map((r) => `  <url>\n    <loc>${SITE}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')

await mkdir(DIST, { recursive: true })
await writeFile(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
)

console.log(`Склеено. Адресов в карте сайта: ${routes.length}`)
for (const r of routes) console.log('  ' + r)
