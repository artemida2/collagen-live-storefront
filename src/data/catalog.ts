/**
 * Names, weights and composition are the manufacturer's, taken from
 * collagen-live.ru. Prices are the Crimean distributor's own: 2 700 ₽ a jar
 * on every position, 7 500 ₽ for a three-jar course. Nothing here is invented.
 */

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

/* Explicit extension: this module is also imported by vite.config.ts to
   generate the page's schema.org block, and Vite's config loader resolves
   without a bundler's extension guessing. */
import { asset } from '../lib/asset.ts'

/** Flavour carousels supplied by the distributor, one set per taste. */
const G = {
  mango: Array.from({ length: 9 }, (_, i) => asset(`/media/p/mango-${i + 1}.jpg`)),
  cherry: Array.from({ length: 9 }, (_, i) => asset(`/media/p/cherry-${i + 1}.jpg`)),
  granat: Array.from({ length: 9 }, (_, i) => asset(`/media/p/granat-${i + 1}.jpg`)),
  smuzi: Array.from({ length: 9 }, (_, i) => asset(`/media/p/smuzi-${i + 1}.jpg`)),
  vitc: Array.from({ length: 9 }, (_, i) => asset(`/media/p/vitc-${i + 1}.jpg`)),
  trio: [asset('/media/p/trio-1.jpg'), asset('/media/p/trio-2.jpg')],
}

export const PRODUCTS: Product[] = [
  {
    id: 'smuzi',
    kind: 'jar',
    name: 'Клубничный смузи',
    flavour: 'Клубника',
    meta: 'Пищевой коллаген в желе',
    course: 'курс 1,5 месяца',
    weight: '0,5 кг',
    price: 2700,
    was: 3000,
    img: asset('/media/p/t-smuzi.jpg'),
    gallery: G.smuzi,
    juice: 'натуральный сок клубники',
    tone: 'var(--cherry)',
    hit: true,
    note: 'Самый заказываемый вкус. Ягодный, густой, без сахара — ближе всего к смузи, чем к добавке.',
  },
  {
    id: 'granat',
    kind: 'jar',
    name: 'С соком граната',
    flavour: 'Гранат',
    meta: 'С натуральным соком',
    course: 'курс 1,5 месяца',
    weight: '0,5 кг',
    price: 2700,
    was: 3000,
    img: asset('/media/p/t-granat.jpg'),
    gallery: G.granat,
    juice: 'натуральный сок граната',
    tone: 'var(--cherry)',
    note: 'Натуральный гранатовый сок в составе: терпкий, плотный, с узнаваемой кислинкой.',
  },
  {
    id: 'mango',
    kind: 'jar',
    name: 'С соком манго и апельсина',
    flavour: 'Манго + апельсин',
    meta: 'С натуральным соком',
    course: 'курс 1,5 месяца',
    weight: '0,5 кг',
    price: 2700,
    was: 3000,
    img: asset('/media/p/t-mango.jpg'),
    gallery: G.mango,
    juice: 'натуральный сок манго и апельсина',
    tone: 'var(--orange)',
    note: 'Самый южный из вкусов. Хорошо идёт с водой и льдом, если желе не хочется есть ложкой.',
  },
  {
    id: 'cherry',
    kind: 'jar',
    name: 'С соком черешни',
    flavour: 'Черешня',
    meta: 'С натуральным соком',
    course: 'курс 1,5 месяца',
    weight: '0,5 кг',
    price: 2700,
    was: 3000,
    img: asset('/media/p/t-cherry.jpg'),
    gallery: G.cherry,
    juice: 'натуральный сок черешни',
    tone: '#8e1f38',
    note: 'Тёмная черешня без приторности — самый «взрослый» вкус в линейке.',
  },
  {
    id: 'vitc',
    kind: 'jar',
    name: 'С витамином С, без вкуса',
    flavour: 'Нейтральный',
    meta: 'Без вкуса и запаха',
    course: 'курс 1,5 месяца',
    weight: '0,5 кг',
    price: 2700,
    was: 3000,
    img: asset('/media/p/t-vitc.jpg'),
    gallery: G.vitc,
    tone: 'var(--gold)',
    note: 'Чистое желе без цвета, вкуса и запаха. Можно есть ложкой или растворить в чём угодно.',
  },

  {
    id: 'set-three-a',
    kind: 'set',
    name: 'Манго · черешня · гранат',
    flavour: 'Три вкуса',
    meta: 'С витамином С',
    course: 'курс 4,5 месяца',
    weight: '3 × 500 г',
    price: 7500,
    was: 8100,
    img: asset('/media/p/t-set-three-a.jpg'),
    gallery: [...G.trio, ...G.mango.slice(1, 6), ...G.cherry.slice(1, 4)],
    juice: 'натуральные соки манго и апельсина, граната, черешни',
    tone: 'var(--green-3)',
    note: 'Три сока в одном заказе — если ещё не решили, какой вкус ваш.',
  },
  {
    id: 'set-three-b',
    kind: 'set',
    name: 'Манго · черешня · клубника',
    flavour: 'Три вкуса',
    meta: 'С витамином С',
    course: 'курс 4,5 месяца',
    weight: '3 × 500 г',
    price: 7500,
    was: 8100,
    img: asset('/media/p/t-set-three-b.jpg'),
    gallery: [...G.trio, ...G.smuzi.slice(1, 6), ...G.cherry.slice(1, 4)],
    juice: 'натуральные соки манго и апельсина, черешни, клубники',
    tone: 'var(--green-3)',
    note: 'Тот же набор, но с клубничным смузи вместо граната.',
  },
]

export const FREE_DELIVERY_FROM = 5400

export const rub = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₽'
