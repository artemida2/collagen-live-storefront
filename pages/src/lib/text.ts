/**
 * The free page's text block holds prose typed into a form, not a markdown
 * file, so Astro's own pipeline never sees it. Rather than pull in a markdown
 * library to support the two things people actually use, this escapes the
 * input and then allows exactly those two: **bold** and [links](/somewhere).
 *
 * Escaping happens first and unconditionally. The content is written by a
 * trusted editor today, but "the input was trusted" is how these functions
 * turn into holes later, and doing it in the right order costs nothing.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c)

/** Same-site paths and plain protocols only — no javascript: smuggled in. */
const safeHref = (href: string) => (/^(\/|https?:\/\/|mailto:|tel:)/i.test(href) ? href : '#')

function inline(text: string): string {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label: string, href: string) => {
      /* The href was escaped with everything else; &amp; has to become & again
         or every query string in a link arrives broken. */
      return `<a href="${safeHref(href.replace(/&amp;/g, '&'))}">${label}</a>`
    })
}

/** Blank lines separate paragraphs, the way they do when people type. */
export function prose(body: string): string {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${inline(p.replace(/\n/g, ' '))}</p>`)
    .join('\n')
}
