/**
 * Names, weights and composition are the manufacturer's, taken from
 * collagen-live.ru. Prices are the Crimean distributor's own. Nothing here is
 * invented.
 *
 * The catalogue is split in two on purpose. Everything the distributor may
 * want to change on a Tuesday — price, name, the line under it — lives in
 * src/content/products/*.json and is edited at /admin. Everything that would
 * break the page if it were wrong — the id the cart stores, the photographs,
 * the colour the card is tinted with, the order the shelf is laid out in —
 * stays in code, where a mistake fails the build instead of reaching a
 * customer.
 */

import { asset } from '../lib/asset.ts'
import cherry from '../content/products/cherry.json' with { type: 'json' }
import granat from '../content/products/granat.json' with { type: 'json' }
import mango from '../content/products/mango.json' with { type: 'json' }
import setThreeA from '../content/products/set-three-a.json' with { type: 'json' }
import setThreeB from '../content/products/set-three-b.json' with { type: 'json' }
import smuzi from '../content/products/smuzi.json' with { type: 'json' }
import vitc from '../content/products/vitc.json' with { type: 'json' }

export type Product = {
  id: string
  kind: 'jar' | 'set'
  name: string
  flavour: string
  meta: string
  course: string
  weight: string
  price: number
  was?: number
  img: string
  gallery: string[]
  juice?: string
  tone: string
  hit?: boolean
  note: string
}

/** The half of a product that /admin may rewrite. */
type Editable = Omit<Product, 'id' | 'kind' | 'img' | 'gallery' | 'tone'>

/** Flavour carousels supplied by the distributor, one set per taste. */
const G = {
  mango: Array.from({ length: 9 }, (_, i) => asset(`/media/p/mango-${i + 1}.jpg`)),
  cherry: Array.from({ length: 9 }, (_, i) => asset(`/media/p/cherry-${i + 1}.jpg`)),
  granat: Array.from({ length: 9 }, (_, i) => asset(`/media/p/granat-${i + 1}.jpg`)),
  smuzi: Array.from({ length: 9 }, (_, i) => asset(`/media/p/smuzi-${i + 1}.jpg`)),
  vitc: Array.from({ length: 9 }, (_, i) => asset(`/media/p/vitc-${i + 1}.jpg`)),
  trio: [asset('/media/p/trio-1.jpg'), asset('/media/p/trio-2.jpg')],
}

/**
 * The shelf, in the order it is laid out. Jars first, sets last: the page
 * reads as five tastes and then a way to buy three of them.
 */
const SHELF: { id: string; kind: Product['kind']; tone: string; gallery: string[]; text: Editable }[] = [
  { id: 'smuzi', kind: 'jar', tone: 'var(--cherry)', gallery: G.smuzi, text: smuzi },
  { id: 'granat', kind: 'jar', tone: 'var(--cherry)', gallery: G.granat, text: granat },
  { id: 'mango', kind: 'jar', tone: 'var(--orange)', gallery: G.mango, text: mango },
  { id: 'cherry', kind: 'jar', tone: '#8e1f38', gallery: G.cherry, text: cherry },
  { id: 'vitc', kind: 'jar', tone: 'var(--gold)', gallery: G.vitc, text: vitc },
  {
    id: 'set-three-a',
    kind: 'set',
    tone: 'var(--green-3)',
    gallery: [...G.trio, ...G.mango.slice(1, 6), ...G.cherry.slice(1, 4)],
    text: setThreeA,
  },
  {
    id: 'set-three-b',
    kind: 'set',
    tone: 'var(--green-3)',
    gallery: [...G.trio, ...G.smuzi.slice(1, 6), ...G.cherry.slice(1, 4)],
    text: setThreeB,
  },
]

/**
 * The catalogue is edited by someone who cannot read a stack trace, through a
 * form that will happily accept an empty name or a price of nothing. The build
 * is the last place a bad value can be stopped before it is a wrong price in
 * front of a customer, so it is stopped here, by the file it came from.
 */
function check({ id, text }: { id: string; text: Editable }): Editable {
  const where = `src/content/products/${id}.json`
  const fail = (what: string) => {
    throw new Error(`Каталог: ${what}. Проверьте файл ${where} — исправьте и сохраните заново.`)
  }

  for (const field of ['name', 'flavour', 'meta', 'course', 'weight', 'note'] as const) {
    if (typeof text[field] !== 'string' || !text[field].trim()) fail(`поле «${field}» пустое`)
  }
  if (!Number.isInteger(text.price) || text.price <= 0) fail('цена должна быть целым числом больше нуля')
  if (text.was !== undefined) {
    if (!Number.isInteger(text.was) || text.was <= 0) fail('старая цена должна быть целым числом больше нуля')
    if (text.was <= text.price) fail('старая цена должна быть больше текущей, иначе скидка не имеет смысла')
  }

  return text
}

export const PRODUCTS: Product[] = SHELF.map(({ id, kind, tone, gallery, text }) => ({
  ...check({ id, text }),
  id,
  kind,
  tone,
  gallery,
  img: asset(`/media/p/t-${id}.jpg`),
}))

export const FREE_DELIVERY_FROM = 5400

export const rub = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₽'
