import { motion } from 'motion/react'
import { AMINO, CERTS, ELEMENTS, FREE_OF, TYPES } from '../data/content'

const reveal = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Composition() {
  return (
    <section className="sec comp" id="composition">
      <div className="shell">
        <div className="sec-head">
          <div className="sec-head__id mono">
            <span className="sec-head__n">03</span>
            <span>Состав</span>
          </div>
          <span className="mono">Что в банке 0,5 кг</span>
        </div>

        <motion.h2 className="disp comp__h" {...reveal}>
          Три типа коллагена, 19 аминокислот, 16 микроэлементов и витамин C
        </motion.h2>

        <ul className="comp__types">
          {TYPES.map((t) => (
            <li key={t.no}>
              <span className="comp__roman">{t.no}</span>
              <h3 className="comp__t">{t.title}</h3>
              <p className="prose comp__b">{t.body}</p>
            </li>
          ))}
        </ul>

        <div className="comp__lists">
          <div className="comp__list">
            <div className="comp__list-h">
              <span className="comp__count num">19</span>
              <span className="mono">аминокислот</span>
            </div>
            <ul>
              {AMINO.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="comp__list">
            <div className="comp__list-h">
              <span className="comp__count num">16</span>
              <span className="mono">макро- и микроэлементов</span>
            </div>
            <ul>
              {ELEMENTS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="comp__aside">
            <figure className="comp__fig">
              <img src="/media/glass.jpg" alt="Банка Collagen Live рядом со стаканом воды" width={1040} height={1380} />
            </figure>
            <div className="comp__vc">
              <span className="mono">Витамин C</span>
              <p className="prose">
                Помогает организму вырабатывать свой собственный коллаген — и делает Collagen Live ещё
                эффективнее. А заодно укрепляет иммунитет.
              </p>
            </div>
          </div>
        </div>

        <div className="comp__clean">
          <ul className="comp__chips">
            {FREE_OF.map((f) => (
              <li key={f} className="mono">
                {f}
              </li>
            ))}
          </ul>
          <ul className="comp__chips comp__chips--ok">
            {CERTS.map((c) => (
              <li key={c} className="mono">
                {c}
              </li>
            ))}
          </ul>
          <span className="mono comp__src">Изготовлен из сертифицированного сырья птицы</span>
        </div>

        <p className="mono comp__attr">
          Состав и формулировки приведены по описанию производителя Collagen Live
        </p>
      </div>
    </section>
  )
}
