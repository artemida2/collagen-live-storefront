import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { DOCS, type Doc } from '../data/legal'
import { useScrollLock } from '../lib/hooks'

/**
 * The four documents Russian law requires this shop to publish live over the
 * page rather than on routes of their own: a single-page site has no router,
 * and a buyer who opens the offer from the order form must be able to close it
 * and find the form still filled in.
 */
export default function LegalModal({
  docId,
  onOpen,
  onClose,
}: {
  docId: string | null
  onOpen: (id: string) => void
  onClose: () => void
}) {
  const doc: Doc | undefined = DOCS.find((d) => d.id === docId)

  useEffect(() => {
    if (!doc) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [doc, onClose])

  useScrollLock(!!doc)

  return (
    <AnimatePresence>
      {doc && (
        <div className="lg" role="dialog" aria-modal="true" aria-label={doc.title}>
          <motion.div
            className="lg__veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="lg__panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="lg__head">
              <div>
                <span className="mono">Документы</span>
                <h2 className="lg__h">{doc.title}</h2>
              </div>
              <button className="lg__x" onClick={onClose} aria-label="Закрыть">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </header>

            <nav className="lg__tabs" aria-label="Документы">
              {DOCS.map((d) => (
                <button
                  key={d.id}
                  className={`lg__tab${d.id === doc.id ? ' is-on' : ''}`}
                  aria-current={d.id === doc.id}
                  onClick={() => onOpen(d.id)}
                >
                  {d.title}
                </button>
              ))}
            </nav>

            <div className="lg__body">
              <p className="mono lg__short">{doc.short}</p>

              {doc.blocks.map((b, i) => (
                <section key={b.h ?? i} className="lg__block">
                  {b.h && <h3 className="lg__bh">{b.h}</h3>}
                  {b.p?.map((t) => (
                    <p key={t} className="lg__p">
                      {t}
                    </p>
                  ))}
                  {b.ul && (
                    <ul className="lg__ul">
                      {b.ul.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  {b.dl && (
                    <dl className="lg__dl mono">
                      {b.dl.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd className="num">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
