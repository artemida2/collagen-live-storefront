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

const seo = {
  seoTitle: z.string(),
  seoDescription: z.string(),
  noindex: z.boolean().optional(),
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

export const collections = { goroda, razbory, instrukcii, ceny }
