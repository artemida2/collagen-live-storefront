/**
 * Splits one file of many articles into one markdown file per article.
 *
 * The point of this script is that a model never has to read the articles.
 * Handing a hundred texts to a language model to "convert" them costs the
 * whole corpus twice over — once going in, once coming out — for work a
 * hundred lines of string handling does for free.
 *
 *   node scripts/split-articles.mjs путь/к/файлу.txt
 *   node scripts/split-articles.mjs путь/к/файлу.txt --dry
 *
 * Expected shape, repeated:
 *
 *   === СТАТЬЯ ===
 *   адрес: kak-hranit-kollagen
 *   заголовок: Как хранить коллаген
 *   описание: Одно предложение для поиска, до 160 знаков.
 *   обложка: /media/glass.jpg
 *   подпись-обложки: Банка коллагена и стакан воды с лимоном
 *   ---
 *   Текст статьи в markdown.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = join(ROOT, 'content', 'stati')

const [, , source, ...flags] = process.argv
const dry = flags.includes('--dry')

if (!source) {
  console.error('Укажите файл: node scripts/split-articles.mjs articles.txt')
  process.exit(1)
}

const raw = await readFile(source, 'utf8')

/* The separator is matched loosely — a stray space or a lowercase word should
   not silently swallow an article into the previous one. */
const chunks = raw
  .split(/^\s*={2,}\s*СТАТЬЯ\s*={2,}\s*$/im)
  .map((c) => c.trim())
  .filter(Boolean)

if (chunks.length === 0) {
  console.error('В файле не найдено ни одного разделителя «=== СТАТЬЯ ===».')
  process.exit(1)
}

/** Header keys, in the words the writer types. */
const KEYS = {
  'адрес': 'address',
  'заголовок': 'heading',
  'описание': 'seoDescription',
  'заголовок-в-поиске': 'seoTitle',
  'вступление': 'lede',
  'обложка': 'cover',
  'подпись-обложки': 'coverAlt',
  'дата': 'date',
  'скрыть': 'draft',
}

const problems = []
const written = []
const today = new Date().toISOString().slice(0, 10)

/** YAML-safe: quote everything and escape the quotes inside. */
const q = (v) => `"${String(v).replace(/"/g, '\\"')}"`

for (const [i, chunk] of chunks.entries()) {
  const at = `статья №${i + 1}`
  const [head, ...rest] = chunk.split(/^\s*---\s*$/m)
  const body = rest.join('---').trim()

  if (!rest.length) {
    problems.push(`${at}: нет строки «---», отделяющей шапку от текста`)
    continue
  }

  const meta = {}
  for (const line of head.split('\n')) {
    const m = line.match(/^\s*([а-яё-]+)\s*:\s*(.*)$/i)
    if (!m) continue
    const key = KEYS[m[1].trim().toLowerCase()]
    if (key) meta[key] = m[2].trim()
  }

  for (const required of ['address', 'heading', 'seoDescription']) {
    if (!meta[required]) problems.push(`${at}: не заполнено поле «${required}»`)
  }
  if (meta.address && !/^[a-z0-9-]+$/.test(meta.address)) {
    problems.push(`${at}: адрес «${meta.address}» — только латиница в нижнем регистре, цифры и дефис`)
  }
  if (!body) problems.push(`${at}: пустой текст`)
  if (problems.length && problems[problems.length - 1].startsWith(at)) continue

  /* Sensible fallbacks: the writer should not have to repeat themselves. */
  const lede = meta.lede || meta.seoDescription
  const seoTitle = meta.seoTitle || meta.heading

  const front = [
    '---',
    `address: ${q(meta.address)}`,
    `heading: ${q(meta.heading)}`,
    `lede: ${q(lede)}`,
    `date: ${meta.date || today}`,
    meta.cover ? `cover: ${q(meta.cover)}` : null,
    meta.cover ? `coverAlt: ${q(meta.coverAlt || meta.heading)}` : null,
    `draft: ${meta.draft === 'да' ? 'true' : 'false'}`,
    'noindex: false',
    `seoTitle: ${q(seoTitle)}`,
    `seoDescription: ${q(meta.seoDescription)}`,
    '---',
    '',
  ]
    .filter((l) => l !== null)
    .join('\n')

  written.push({ file: `${meta.address}.md`, heading: meta.heading, cover: meta.cover, body, front })
}

/**
 * Two corrections applied to every batch, because both are mistakes a writer
 * makes from outside the site and cannot see from there.
 *
 * A link to a sibling article gets written as /slug/ — that is where the
 * writer imagines it lives. Articles are served from /stati/<slug>/, so every
 * one of those links would 404. Rewritten here, and only when a single path
 * segment names an article we actually have: /dostavka/ and /#shop are left
 * alone because they are not one of ours.
 *
 * And an article whose cover photograph appears again inside its own body
 * shows the same picture twice on one short page. The second one goes.
 */
const known = new Set([
  ...written.map((w) => w.file.replace(/\.md$/, '')),
  ...(existsSync(OUT) ? (await readdir(OUT)).map((f) => f.replace(/\.md$/, '')) : []),
])

const fixes = { links: 0, images: 0 }
const rxEscape = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

for (const w of written) {
  w.body = w.body.replace(/\]\(\/([a-z0-9-]+)\/\)/g, (whole, slug) => {
    if (!known.has(slug)) return whole
    fixes.links += 1
    return `](/stati/${slug}/)`
  })

  if (w.cover) {
    const dup = new RegExp(`^!\\[[^\\]]*\\]\\(${rxEscape(w.cover)}\\)\\s*$`, 'gm')
    const before = w.body
    w.body = w.body.replace(dup, '').replace(/\n{3,}/g, '\n\n')
    if (w.body !== before) fixes.images += 1
  }

  w.text = w.front + w.body.trim() + '\n'
}

if (problems.length) {
  console.error('Файл не разобран, ничего не записано:\n')
  for (const p of problems) console.error('  · ' + p)
  process.exit(1)
}

/* Duplicate addresses would silently overwrite one another. */
const seen = new Map()
for (const w of written) {
  if (seen.has(w.file)) {
    console.error(`Два раза встречается адрес «${w.file.replace('.md', '')}». Адреса должны быть разными.`)
    process.exit(1)
  }
  seen.set(w.file, true)
}

if (dry) {
  console.log(`Разбор прошёл. Статей: ${written.length}. Ничего не записано (режим --dry).`)
  if (fixes.links) console.log(`Будет исправлено ссылок на соседние статьи: ${fixes.links}`)
  if (fixes.images) console.log(`Будет убрано повторов обложки внутри текста: ${fixes.images}`)
  console.log('')
  for (const w of written) console.log('  ' + w.file.padEnd(38) + w.heading)
  process.exit(0)
}

await mkdir(OUT, { recursive: true })
const existed = existsSync(OUT) ? new Set(await readdir(OUT)) : new Set()

for (const w of written) await writeFile(join(OUT, w.file), w.text)

console.log(`Записано статей: ${written.length} → content/stati/`)
if (fixes.links) console.log(`Исправлено ссылок на соседние статьи: ${fixes.links}`)
if (fixes.images) console.log(`Убрано повторов обложки внутри текста: ${fixes.images}`)
console.log('')
for (const w of written) {
  console.log(`  ${existed.has(w.file) ? 'обновлена' : 'создана  '}  /stati/${w.file.replace('.md', '')}/  ${w.heading}`)
}
console.log('\nДальше: npm run build')
