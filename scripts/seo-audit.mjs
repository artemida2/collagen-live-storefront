/**
 * Reads the built site the way a crawler would and reports what is wrong.
 *
 * Everything here is checked against dist/ rather than against the source,
 * because the source is not what a search engine sees: the landing renders
 * from JavaScript, the pages render from Astro, and only the merged output
 * tells the truth about either.
 *
 *   node scripts/seo-audit.mjs
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
const SITE = 'https://crimeacollagen.ru'

async function walk(dir) {
  const out = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, item.name)
    if (item.isDirectory()) out.push(...(await walk(full)))
    else if (item.name === 'index.html') out.push(full)
  }
  return out
}

const files = await walk(DIST)
const pages = []

for (const file of files) {
  const html = await readFile(file, 'utf8')
  const route = '/' + relative(DIST, file).split(sep).slice(0, -1).filter(Boolean).join('/') + '/'
  const url = route === '//' ? '/' : route
  const pick = (re) => (html.match(re) || [])[1]

  pages.push({
    url,
    admin: url.startsWith('/admin/'),
    title: pick(/<title>([^<]*)<\/title>/),
    description: pick(/<meta\s+name="description"\s+content="([^"]*)"/),
    canonical: pick(/<link\s+rel="canonical"\s+href="([^"]*)"/),
    robots: pick(/<meta\s+name="robots"\s+content="([^"]*)"/),
    og: /property="og:image"/.test(html),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()),
    ld: (html.match(/application\/ld\+json/g) || []).length,
    imgsNoAlt: (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length,
    links: [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]),
    words: Math.round(
      (html
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim().length) / 6,
    ),
  })
}

const site = pages.filter((p) => !p.admin)
const problems = []
const notes = []

/* Every page needs its own title and its own description: a search engine
   showing two identical rows has no reason to keep both pages. */
const dupe = (field) => {
  const seen = new Map()
  for (const p of site) {
    const v = (p[field] || '').trim()
    if (!v) continue
    seen.set(v, [...(seen.get(v) || []), p.url])
  }
  return [...seen.entries()].filter(([, urls]) => urls.length > 1)
}

for (const p of site) {
  if (!p.title) problems.push(`${p.url} — нет заголовка <title>`)
  if (!p.description) problems.push(`${p.url} — нет описания для поиска`)
  if (!p.canonical) problems.push(`${p.url} — нет canonical`)
  if (p.canonical && p.canonical !== SITE + (p.url === '/' ? '/' : p.url))
    problems.push(`${p.url} — canonical указывает не на себя: ${p.canonical}`)
  if (p.h1.length === 0) problems.push(`${p.url} — нет заголовка H1`)
  if (p.h1.length > 1) problems.push(`${p.url} — заголовков H1 больше одного (${p.h1.length})`)
  if (!p.og) problems.push(`${p.url} — нет картинки для соцсетей`)
  if (p.ld === 0) problems.push(`${p.url} — нет разметки schema.org`)
  if (p.imgsNoAlt) problems.push(`${p.url} — картинок без описания: ${p.imgsNoAlt}`)
  if (p.title && p.title.length > 70) notes.push(`${p.url} — заголовок длиннее 70 знаков (${p.title.length}), в выдаче обрежется`)
  if (p.description && p.description.length > 170)
    notes.push(`${p.url} — описание длиннее 170 знаков (${p.description.length}), в выдаче обрежется`)
  if (p.words < 300) notes.push(`${p.url} — мало текста: ~${p.words} слов`)
}

for (const [v, urls] of dupe('title')) problems.push(`одинаковый заголовок на ${urls.length} страницах: «${v.slice(0, 60)}» — ${urls.join(', ')}`)
for (const [v, urls] of dupe('description')) problems.push(`одинаковое описание на ${urls.length} страницах — ${urls.join(', ')}`)

/* A page nothing links to is a page a crawler reaches only through the
   sitemap, which is the weakest signal there is. */
const routes = new Set(site.map((p) => p.url))
const linked = new Set()
for (const p of site) for (const l of p.links) if (routes.has(l)) linked.add(l)
const orphans = [...routes].filter((r) => r !== '/' && !linked.has(r))

const broken = new Set()
for (const p of site) {
  for (const l of p.links) {
    if (routes.has(l)) continue
    if (l.startsWith('/media/') || l.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(l)) continue
    broken.add(`${p.url} → ${l}`)
  }
}

const noindexed = site.filter((p) => /noindex/.test(p.robots || ''))

console.log(`Проверено страниц: ${site.length} (плюс админка, она исключена)\n`)

if (problems.length) {
  console.log(`ОШИБКИ (${problems.length}):`)
  for (const p of problems) console.log('  · ' + p)
} else {
  console.log('ОШИБОК НЕТ: у каждой страницы свой заголовок, описание, canonical, один H1, разметка и картинка для соцсетей.')
}

console.log(`\nБитые внутренние ссылки: ${broken.size ? '\n  · ' + [...broken].join('\n  · ') : 'нет'}`)
console.log(`Страницы, на которые никто не ссылается: ${orphans.length ? '\n  · ' + orphans.join('\n  · ') : 'нет'}`)
console.log(`Закрыты от индексации: ${noindexed.length ? noindexed.map((p) => p.url).join(', ') : 'нет'}`)

if (notes.length) {
  console.log(`\nЗАМЕЧАНИЯ (${notes.length}) — не ошибки, но стоит знать:`)
  for (const n of notes.slice(0, 25)) console.log('  · ' + n)
  if (notes.length > 25) console.log(`  … и ещё ${notes.length - 25}`)
}

const w = site.map((p) => p.words).sort((a, b) => a - b)
console.log(`\nОбъём текста: медиана ~${w[Math.floor(w.length / 2)]} слов, минимум ~${w[0]}, максимум ~${w[w.length - 1]}`)

process.exit(problems.length ? 1 : 0)
