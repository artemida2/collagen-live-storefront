import { motion } from 'motion/react'
import Jar from './Jar'

const STATS: [string, string, string][] = [
  ['96 %', 'усвоение', 'заявлено производителем для Collagen Live'],
  ['3', 'типа коллагена', 'I, II и III в одной банке'],
  ['+2…+6 °C', 'хранение', 'в холодильнике, как любой свежий продукт'],
]

const reveal = {
  initial: { y: 26, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Tech({ reduced }: { reduced: boolean }) {
  return (
    <section className="sec sec--green on-green tech" id="tech">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">02</span>
            <span>Технология</span>
          </div>
          <span className="mono">Multiferment DDL</span>
        </div>

        <div className="tech__grid">
          <div className="tech__copy">
            <motion.h2 className="disp tech__h" {...reveal}>
              Самый щадящий из известных способов извлечь коллаген
            </motion.h2>
            <motion.p className="prose" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
              Производитель выпускает Collagen Live по технологии <strong>Multiferment DDL</strong> — на
              сегодняшний день наиболее современной. При таком извлечении молекулы коллагена не разрушаются
              и его структура не нарушается. В результате получается желе — самая органичная для коллагена
              форма.
            </motion.p>
            <motion.p className="prose" {...reveal} transition={{ ...reveal.transition, delay: 0.14 }}>
              У желе есть цена: банка живёт в холодильнике при +2…+6 °C и не подлежит заморозке, а срок
              годности — шесть месяцев вместо года с лишним у порошка. Как и любой свежий пищевой
              продукт, а не порошок в банке на полке.
            </motion.p>
          </div>

          <motion.figure
            className="tech__fig"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Jar reduced={reduced} tone="green" />
            <figcaption className="mono">Желе, а не порошок. Едят ложкой или растворяют в воде</figcaption>
          </motion.figure>
        </div>

        <ul className="tech__stats">
          {STATS.map(([n, l, s]) => (
            <li key={l}>
              <span className="tech__n num">{n}</span>
              <span className="tech__l">{l}</span>
              <span className="mono">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
