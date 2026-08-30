/**
 * Runtime asset paths.
 *
 * Vite rewrites asset URLs it can see at build time — in index.html and in
 * CSS `url()` — but not string literals inside components. On GitHub Pages the
 * site is served from a subpath, so every `/media/...` referenced from TS must
 * go through here or it will 404 in production.
 */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')
