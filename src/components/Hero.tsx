import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const FACTS: [string, string][] = [
  ['96 %', 'усвоение по данным производителя'],
  ['3 типа', 'коллагена I, II и III'],
  ['19 + 16', 'аминокислот и микроэлементов'],
  ['8 000 ₽', 'бесплатная доставка по России от этой суммы'],
]

const up = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.07 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero({ started, onGo }: { started: boolean; onGo: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0px', '-90px'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const on = started ? 'show' : 'hidden'

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__scrim" aria-hidden="true" />

      <motion.div className="hero__body shell" style={{ y, opacity: fade }}>
        <div className="hero__copy">
          <h1 className="hero__h">
            <span className="hero__clip">
              <motion.span className="disp hero__word" variants={up} initial="hidden" animate={on} custom={0}>
                Живой коллаген.
              </motion.span>
            </span>
            <span className="hero__clip">
              <motion.span
                className="disp hero__word hero__word--em"
                variants={up}
                initial="hidden"
                animate={on}
                custom={1}
              >
                Не порошок.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 14 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            Collagen Live — пищевой коллаген в форме желе. Его получают по технологии Multiferment DDL,
            при которой молекула не разрушается нагревом. Поэтому производитель называет его живым.
          </motion.p>

          <motion.div
            className="hero__acts"
            initial={{ opacity: 0, y: 14 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="btn btn--solid" onClick={() => onGo('shop')}>
              <span>Выбрать вкус</span>
            </button>
            <button className="btn btn--ghost" onClick={() => onGo('compare')}>
              <span>Чем отличается от порошка</span>
            </button>

            <span className="hero__price">
              <span className="hero__price-p num">2 200 ₽</span>
              <s className="hero__price-was num">3 000 ₽</s>
              <span className="mono">0,5 кг · курс на 1,5 месяца</span>
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.ul
        className="hero__facts shell"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.55 }}
      >
        {FACTS.map(([n, t]) => (
          <li key={n}>
            <span className="hero__fact-n num">{n}</span>
            <span className="mono">{t}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
