import { motion } from 'motion/react'
import { asset } from '../lib/asset'

const STEPS: [string, string, string][] = [
  ['01', 'Ложка в день', 'Желе едят прямо из банки или растворяют в воде, соке, смузи — вкус этому не мешает.'],
  ['02', 'Банка = 1,5 месяца', 'Курс рассчитан на 45 дней. Килограммовая банка — на три месяца.'],
  ['03', 'Живёт в холодильнике', 'При +2…+6 °C, без заморозки. Срок годности — 6 месяцев, после вскрытия не более 3.'],
]

export default function Ritual() {
  return (
    <section className="sec sec--green on-green ritual" id="ritual">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">06</span>
            <span>Как принимать</span>
          </div>
          <span className="mono">45 дней на банку</span>
        </div>

        <div className="ritual__grid">
          <motion.figure
            className="ritual__fig"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={asset('/media/kitchen.jpg')}
              alt="Банка Collagen Live на кухонном столе за завтраком"
              width={1600}
              height={1000}
              loading="lazy"
            />
          </motion.figure>

          <div className="ritual__copy">
            <motion.h2
              className="disp ritual__h"
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Проще всего привязать к завтраку
            </motion.h2>

            <ol className="ritual__steps">
              {STEPS.map(([n, t, b]) => (
                <li key={n}>
                  <span className="mono ritual__n">{n}</span>
                  <div>
                    <h3 className="ritual__t">{t}</h3>
                    <p className="prose">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
