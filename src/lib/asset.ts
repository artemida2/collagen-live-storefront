/**
 * Runtime asset paths.
 *
 * Vite rewrites asset URLs it can see at build time — in index.html and in
 * CSS `url()` — but not string literals inside components, so every
 * `/media/...` referenced from TS goes through here.
 *
 * The optional chain is not defensive noise: vite.config.ts imports the
 * catalogue to generate the page's schema.org block, and there `import.meta`
 * carries no `env`. Without the fallback every product image in that markup
 * would be the string "undefined".
 */
export const asset = (p: string) => (import.meta.env?.BASE_URL ?? '/') + p.replace(/^\//, '')
