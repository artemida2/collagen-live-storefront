import { motion } from 'motion/react'
import { useState } from 'react'
import { FAQ, PLACEHOLDER } from '../data/content'

const POINTS: [string, string][] = [
  ['Доставка по России', 'Курьером и в пункты выдачи. Отгружаем со своего склада, заказ подтверждает менеджер по телефону.'],
  ['Бесплатно от 8 000 ₽', 'Порог производителя: при заказе на 8 000 ₽ и больше доставку не оплачиваете.'],
  ['Холодная логистика', 'Продукт живой и хранится при +2…+6 °C — упаковываем так, чтобы он доехал в этом режиме.'],
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
          <span className="mono">{PLACEHOLDER.hours}</span>
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
              Отгружаем по всей России
            </motion.h2>

            <ul className="del__points">
              {POINTS.map(([t, b], i) => (
                <motion.li
                  key={t}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="del__t">{t}</h3>
                  <p className="prose">{b}</p>
                </motion.li>
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
