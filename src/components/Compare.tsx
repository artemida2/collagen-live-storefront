import { motion } from 'motion/react'
import { usePlayInView, useStills } from '../lib/hooks'
import { asset } from '../lib/asset'

const DRY = [
  ['01', 'Сырьё сушат при температуре ниже 40 °C'],
  ['02', 'Затем нагревают до 120 °C'],
  ['03', 'И только потом измельчают в порошок'],
]

const LIVE = [
  ['01', 'Щадящее извлечение по технологии Multiferment DDL'],
  ['02', 'Молекула не разрушается, структура не нарушается'],
  ['03', 'Остаётся желе — самая органичная для коллагена форма'],
]

const reveal = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Compare({ reduced }: { reduced: boolean }) {
  const stills = useStills()
  const dry = usePlayInView<HTMLVideoElement>(!reduced && !stills)

  return (
    <section className="sec compare" id="compare">
      <div className="compare__plate">
        <div className="shell">
          <div className="sec-head">
            <div className="sec-head__id mono">
              <span className="sec-head__n">01</span>
              <span>Почему живой</span>
            </div>
            <span className="mono">Технология против температуры</span>
          </div>

          <div className="compare__intro">
            <motion.h2 className="disp compare__h" {...reveal}>
              Разница между порошком и желе — <em>не в форме выпуска.</em> Она в температуре.
            </motion.h2>
            <motion.p className="prose" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              Ниже — два способа получить один и тот же белок. Слева то, что происходит с сырьём при
              производстве порошкового коллагена. Справа — то, что делают с ним по технологии Multiferment DDL.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="compare__row">
        <article className="chalf chalf--dry">
          <div className="chalf__media chalf__media--dry">
            {stills ? (
              <img className="chalf__v" src={asset('/media/poster-dry.jpg')} alt="" width={1280} height={720} loading="lazy" />
            ) : (
              <video
                ref={dry}
                className="chalf__v"
                src={asset('/media/dry.mp4')}
                poster={asset('/media/poster-dry.jpg')}
                muted
                playsInline
                loop
                preload="metadata"
              />
            )}
            <span className="chalf__tag chalf__tag--dark">Порошок</span>
            <span className="chalf__temp num">120 °C</span>
          </div>
          <div className="chalf__body">
            <ol className="chalf__steps">
              {DRY.map(([n, t]) => (
                <li key={n}>
                  <span className="mono chalf__n">{n}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="chalf__verdict">
              Высокая температура видоизменяет молекулы коллагена, из-за чего он теряет часть природных
              свойств.
            </p>
          </div>
        </article>

        {/* transparent media — the fixed live film shows through it */}
        <article className="chalf chalf--live">
          <div className={`chalf__media chalf__media--live${stills ? ' is-still' : ''}`}>
            <span className="chalf__tag">Collagen Live</span>
            <span className="chalf__temp chalf__temp--ok num">96 %</span>
          </div>
          <div className="chalf__body">
            <ol className="chalf__steps">
              {LIVE.map(([n, t]) => (
                <li key={n}>
                  <span className="mono chalf__n chalf__n--ok">{n}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="chalf__verdict">
              <strong>Поэтому производитель называет его живым</strong> — сохранившим максимум своих
              природных свойств. Заявленное усвоение — 96 %.
            </p>
          </div>
        </article>
      </div>

      <div className="compare__foot">
        <div className="shell mono compare__foot-in">
          <span>Формулировки и цифры приведены по описанию производителя Collagen Live</span>
          <span>collagen-live.ru</span>
        </div>
      </div>
    </section>
  )
}
