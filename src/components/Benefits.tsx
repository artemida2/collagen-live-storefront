import { motion } from 'motion/react'
import { BENEFITS } from '../data/content'

export default function Benefits() {
  return (
    <section className="sec sec--paper2 ben" id="benefits">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">04</span>
            <span>Что даёт коллаген</span>
          </div>
          <span className="mono">Восемь направлений</span>
        </div>

        <div className="ben__top">
          <motion.h2
            className="disp ben__h"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            С возрастом уровень коллагена падает сам. Курс возвращает то, что организм перестал производить
          </motion.h2>
          <figure className="ben__fig">
            <img src="/media/hand.jpg" alt="Банка Collagen Live в руках" width={960} height={1280} loading="lazy" />
          </figure>
        </div>

        <ul className="ben__grid">
          {BENEFITS.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mono ben__n num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ben__t">{b.title}</h3>
              <p className="ben__b">{b.body}</p>
            </motion.li>
          ))}
        </ul>

        <p className="mono ben__note">
          Формулировки приведены по описанию производителя. Не является лекарственным средством
        </p>
      </div>
    </section>
  )
}
