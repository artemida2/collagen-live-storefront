import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { rub, type Product } from '../data/catalog'
import { COMPOSITION_BASE, CONTRA, DETAILS, HOWTO, INDICATIONS } from '../data/content'

type Panel = 'howto' | 'details' | 'composition' | 'care'

const PANELS: [Panel, string][] = [
  ['howto', 'Как принимать'],
  ['details', 'Детали'],
  ['composition', 'Состав'],
  ['care', 'Показания и противопоказания'],
]

/**
 * The product opens over the page rather than on a route of its own: the
 * catalogue is thirteen items, the cart and the scroll position survive, and
 * the gallery — nine to fourteen large frames per taste — is only mounted
 * while the panel is open, so nothing here costs the landing page anything.
 */
export default function ProductModal({
  product,
  onClose,
  onAdd,
  inCart,
}: {
  product: Product | null
  onClose: () => void
  onAdd: (id: string) => void
  inCart: boolean
}) {
  const [i, setI] = useState(0)
  const [open, setOpen] = useState<Panel | null>('howto')

  useEffect(() => {
    setI(0)
    setOpen('howto')
  }, [product?.id])

  const n = product?.gallery.length ?? 0
  const go = useCallback((d: number) => setI((v) => (n ? (v + d + n) % n : 0)), [n])

  useEffect(() => {
    if (!product) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    addEventListener('keydown', key)
    return () => removeEventListener('keydown', key)
  }, [product, onClose, go])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', !!product)
    return () => document.documentElement.classList.remove('is-locked')
  }, [product])

  return (
    <AnimatePresence>
      {product && (
        <div className="pm" role="dialog" aria-modal="true" aria-label={product.name}>
          <motion.div
            className="pm__veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="pm__panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="pm__x" onClick={onClose} aria-label="Закрыть">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>

            <div className="pm__gal">
              <div className="pm__stage">
                <img
                  key={product.gallery[i]}
                  src={product.gallery[i]}
                  alt={`${product.name} — кадр ${i + 1} из ${n}`}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                />
                {n > 1 && (
                  <>
                    <button className="pm__arr pm__arr--l" onClick={() => go(-1)} aria-label="Предыдущее фото">
                      <svg viewBox="0 0 12 20" fill="none">
                        <path d="M10 1L2 10l8 9" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                    <button className="pm__arr pm__arr--r" onClick={() => go(1)} aria-label="Следующее фото">
                      <svg viewBox="0 0 12 20" fill="none">
                        <path d="M2 1l8 9-8 9" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                    <span className="mono pm__count num">
                      {i + 1} / {n}
                    </span>
                  </>
                )}
              </div>

              {n > 1 && (
                <ul className="pm__thumbs">
                  {product.gallery.map((src, k) => (
                    <li key={src}>
                      <button
                        className={`pm__thumb${k === i ? ' is-on' : ''}`}
                        onClick={() => setI(k)}
                        aria-label={`Кадр ${k + 1}`}
                      >
                        <img src={src} alt="" loading="lazy" decoding="async" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pm__info">
              <div className="pm__head">
                <span className="mono">
                  {product.meta} · {product.weight}
                </span>
                <h2 className="pm__h">{product.name}</h2>
                <p className="pm__note">{product.note}</p>
              </div>

              <div className="pm__buy">
                <div className="pm__price">
                  <span className="pm__p num">{rub(product.price)}</span>
                  {product.was && <s className="pm__was num">{rub(product.was)}</s>}
                  <span className="mono">{product.course}</span>
                </div>
                <button className={`btn btn--solid${inCart ? ' is-in' : ''}`} onClick={() => onAdd(product.id)}>
                  <span>{inCart ? 'В корзине' : 'В корзину'}</span>
                </button>
              </div>

              <ul className="pm__panels">
                {PANELS.map(([id, label]) => (
                  <li key={id} className={`pmp${open === id ? ' is-open' : ''}`}>
                    <button className="pmp__q" onClick={() => setOpen(open === id ? null : id)} aria-expanded={open === id}>
                      <span>{label}</span>
                      <span className="pmp__mark" aria-hidden="true" />
                    </button>
                    <div className="pmp__a">
                      <div className="pmp__in">
                        {id === 'howto' && <p>{HOWTO}</p>}

                        {id === 'details' && (
                          <dl className="pm__specs mono">
                            {DETAILS.map(([k, v]) => (
                              <div key={k}>
                                <dt>{k}</dt>
                                <dd className="num">{v}</dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        {id === 'composition' && (
                          <>
                            <ul className="pm__comp">
                              {(product.juice
                                ? [COMPOSITION_BASE[0], COMPOSITION_BASE[1], COMPOSITION_BASE[2], product.juice, ...COMPOSITION_BASE.slice(3)]
                                : COMPOSITION_BASE
                              ).map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                            <p className="pm__fine">
                              Без сахара, красителей и ароматизаторов. Изготовлен из сертифицированного
                              сырья птицы. Сертификаты халяль и organic, гипоаллергенный.
                            </p>
                          </>
                        )}

                        {id === 'care' && (
                          <>
                            <ul className="pm__ind">
                              {INDICATIONS.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                            <p className="pm__contra">
                              <strong>Противопоказания.</strong> {CONTRA}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mono pm__src">
                Состав, детали и рекомендации приведены по описанию производителя Collagen Live
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
