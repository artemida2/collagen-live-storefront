import { motion } from 'motion/react'
import { useState } from 'react'
import { FAQ } from '../data/content'
import { COMPANY } from '../data/legal'

const POINTS: [string, string][] = [
  ['Доставка по всему Крыму', 'Симферополь, Севастополь, Ялта, Евпатория, Феодосия, Керчь и дальше по полуострову. Отгружаем со своего склада, заказ подтверждает менеджер по телефону.'],
  ['Бесплатно от 5 400 ₽', 'При заказе на 5 400 ₽ и больше — это две банки — доставку по Крыму не оплачиваете.'],
  ['Холодная логистика', 'Продукт хранится при +2…+6 °C, поэтому едет в термопакете с хладоэлементом — как отгружает производитель.'],
  ['Оплата после подтверждения', 'Онлайн-оплаты на сайте нет: менеджер перезванивает, подтверждает состав заказа и сроки.'],
]

export default function Delivery() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="sec del" id="delivery">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">07</span>
            <span>Доставка и вопросы</span>
          </div>
          <span className="mono">{COMPANY.hours}</span>
        </div>

        <div className="del__grid">
          <div className="del__left">
            <motion.h2
              className="disp del__h"
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Отгружаем по всему Крыму
            </motion.h2>

            <ul className="del__points">
              {POINTS.map(([t, b]) => (
                <li key={t}>
                  <h3 className="del__t">{t}</h3>
                  <p className="prose">{b}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="del__faq">
            <span className="mono del__faq-h">Частые вопросы</span>
            <ul>
              {FAQ.map((f, i) => (
                <li key={f.q} className={`faq${open === i ? ' is-open' : ''}`}>
                  <button className="faq__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                    <span>{f.q}</span>
                    <span className="faq__mark" aria-hidden="true" />
                  </button>
                  <div className="faq__a">
                    <p>{f.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
