import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

/**
 * Content lives in /content at the repository root, not under src, because it
 * is written in the admin panel by the distributor rather than by a developer:
 * the CMS paths in public/admin/config.yml read as plain folders, and nobody
 * editing a price has to wonder what `src` means.
 *
 * Every collection carries `seoTitle` and `seoDescription` separately from the
 * page's own heading. A heading is written for a reader who has already
 * arrived; a title in search results is written for someone deciding whether
 * to arrive at all, and it is the one place where the town and the price
 * belong even when the page reads better without them.
 */

/** Ask/answer pairs are the same shape everywhere they appear. */
const faq = z
  .array(z.object({ q: z.string(), a: z.string() }))
  .optional()

/**
 * `draft` takes a page off the site without deleting a word of it: the build
 * never generates the route. That is deliberately stronger than `noindex`,
 * which leaves the page reachable by anyone holding the link — an unfinished
 * price list should not be one shared URL away from a customer.
 */
const seo = {
  seoTitle: z.string(),
  seoDescription: z.string(),
  noindex: z.boolean().optional(),
  draft: z.boolean().optional(),
}

/** A-01 · a town the distributor delivers to. */
const goroda = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/goroda' }),
  schema: z.object({
    ...seo,
    city: z.string(),
    cityIn: z.string(),
    heading: z.string(),
    lede: z.string(),
    deliveryTime: z.string(),
    deliveryPrice: z.string(),
    pickup: z.string().optional(),
    heat: z.string().optional(),
    faq,
    order: z.number().default(50),
  }),
})

/** C-10 · one decision, taken apart. */
const razbory = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/razbory' }),
  schema: z.object({
    ...seo,
    heading: z.string(),
    shortAnswer: z.string(),
    aLabel: z.string(),
    bLabel: z.string(),
    rows: z.array(z.object({ aspect: z.string(), a: z.string(), b: z.string() })),
    conclusion: z.string(),
    disclaimer: z.string().optional(),
  }),
})

/** C-11 · how to do the thing, in order. */
const instrukcii = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/instrukcii' }),
  schema: z.object({
    ...seo,
    heading: z.string(),
    lede: z.string(),
    steps: z.array(z.object({ title: z.string(), text: z.string() })),
    ifThen: faq,
    warning: z.string().optional(),
  }),
})

/** A-04 · a price list the distributor keeps current herself. */
const ceny = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/ceny' }),
  schema: z.object({
    ...seo,
    heading: z.string(),
    lede: z.string(),
    updated: z.coerce.date(),
    groups: z.array(
      z.object({
        name: z.string(),
        note: z.string().optional(),
        items: z.array(z.object({ name: z.string(), price: z.string(), note: z.string().optional() })),
      }),
    ),
    footnote: z.string().optional(),
  }),
})


/**
 * The free page: blocks stacked in whatever order the editor wants.
 *
 * The set of blocks is closed on purpose. A builder that can produce any
 * layout can produce an ugly one, and the person assembling these pages is
 * not a designer and should not have to be. Ten blocks and three page
 * layouts, every one of them already carrying the site's spacing and type —
 * the freedom is in the order and the words, not in the design.
 */
const block = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), heading: z.string().optional(), body: z.string() }),
  z.object({
    type: z.literal('facts'),
    heading: z.string().optional(),
    items: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
  z.object({
    type: z.literal('steps'),
    heading: z.string().optional(),
    items: z.array(z.object({ title: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal('qa'),
    heading: z.string().optional(),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
  z.object({
    type: z.literal('cards'),
    heading: z.string().optional(),
    items: z.array(z.object({ title: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal('price'),
    heading: z.string().optional(),
    note: z.string().optional(),
    items: z.array(z.object({ name: z.string(), price: z.string(), note: z.string().optional() })),
  }),
  z.object({ type: z.literal('quote'), text: z.string(), author: z.string().optional() }),
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('cta'),
    heading: z.string(),
    text: z.string().optional(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
  }),
  z.object({ type: z.literal('note'), text: z.string() }),
])

export type Block = z.infer<typeof block>

/** E · a page the editor assembles out of blocks rather than fills in. */
const stranicy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/stranicy' }),
  schema: z.object({
    ...seo,
    heading: z.string(),
    lede: z.string().optional(),
    layout: z.enum(['standard', 'narrow', 'promo']).default('standard'),
    blocks: z.array(block),
  }),
})

export const collections = { goroda, razbory, instrukcii, ceny, stranicy }
