import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { PRODUCTS, rub, type Product } from '../data/catalog'

type Tab = 'jar' | 'set'

const TABS: [Tab, string, string][] = [
  ['jar', 'Банки 0,5 кг', 'курс на 1,5 месяца'],
  ['set', 'Сеты из трёх банок', 'курс на 4,5 месяца'],
]

function Card({ p, added, onAdd, onOpen }: { p: Product; added: boolean; onAdd: () => void; onOpen: () => void }) {
  return (
    <motion.li
      className="card"
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="card__open" onClick={onOpen} aria-label={`Подробнее: ${p.name}`}>
        <span className="mono card__more">Подробнее</span>
      </button>

      <div className="card__media">
        <img src={p.img} alt={p.name} width={700} height={700} loading="lazy" decoding="async" />
        {p.hit && <span className="card__hit mono">Хит</span>}
        <span className="card__tone" style={{ background: p.tone }} />
      </div>

      <div className="card__b">
        <div className="card__meta mono">
          <span>{p.meta}</span>
          <span>{p.weight}</span>
        </div>
        <h3 className="card__t">{p.name}</h3>
        <p className="card__note">{p.note}</p>

        <div className="card__foot">
          <div className="card__price">
            <span className="card__p num">{rub(p.price)}</span>
            {p.was && <s className="card__was num">{rub(p.was)}</s>}
            <span className="mono card__course">{p.course}</span>
          </div>
          <button className={`add${added ? ' is-added' : ''}`} onClick={onAdd}>
            <span>{added ? 'В корзине' : 'В корзину'}</span>
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              {added ? (
                <path d="M2 7.5l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </motion.li>
  )
}

export default function Shop({
  inCart,
  onAdd,
  onOpen,
}: {
  inCart: (id: string) => boolean
  onAdd: (id: string) => void
  onOpen: (p: Product) => void
}) {
  const [tab, setTab] = useState<Tab>('jar')
  const list = useMemo(() => PRODUCTS.filter((p) => p.kind === tab), [tab])

  return (
    <section className="sec shop" id="shop">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">05</span>
            <span>Вкусы и объёмы</span>
          </div>
          <span className="mono">2 700 ₽ за банку · скидка от трёх банок</span>
        </div>

        <div className="shop__top">
          <motion.h2
            className="disp shop__h"
            initial={{ y: 22, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Одно желе, пять вкусов
          </motion.h2>

          <div className="shop__tabs" role="tablist">
            {TABS.map(([id, label, sub]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                className={`shop__tab${tab === id ? ' is-on' : ''}`}
                onClick={() => setTab(id)}
              >
                <span>{label}</span>
                <span className="mono">{sub}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="shop__grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <Card key={p.id} p={p} added={inCart(p.id)} onAdd={() => onAdd(p.id)} onOpen={() => onOpen(p)} />
            ))}
          </AnimatePresence>
        </ul>

        <p className="mono shop__note">
          Состав и названия — производителя Collagen Live. Сет из трёх банок дешевле поштучной покупки на
          600 ₽. Бесплатная доставка по Крыму при заказе от 5 400 ₽
        </p>
      </div>
    </section>
  )
}
