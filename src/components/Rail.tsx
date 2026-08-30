import { useEffect, useState } from 'react'
import { PLACEHOLDER } from '../data/content'

const NAV: [string, string][] = [
  ['Почему живой', 'compare'],
  ['Состав', 'composition'],
  ['Вкусы', 'shop'],
  ['Доставка', 'delivery'],
]

export default function Rail({
  count,
  onGo,
  onCart,
}: {
  count: number
  onGo: (id: string) => void
  onCart: () => void
}) {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.7)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`rail${solid ? ' is-solid' : ''}`}>
      <div className="rail__in">
        <button className="rail__brand" onClick={() => onGo('top')}>
          <span className="rail__mark">Collagen Live</span>
          <span className="mono rail__sub">официальный дистрибьютор</span>
        </button>

        <nav className="rail__nav">
          {NAV.map(([label, id]) => (
            <button key={id} className="rail__link" onClick={() => onGo(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="rail__right">
          <a className="mono rail__tel" href={`tel:${PLACEHOLDER.phone.replace(/[^+\d]/g, '')}`}>
            {PLACEHOLDER.phone}
          </a>
          <button className="rail__cart" onClick={onCart} aria-label="Открыть корзину">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 4h2l2 8h8l2-6H5.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <circle cx="7.5" cy="14.5" r="1.2" fill="currentColor" />
              <circle cx="13.5" cy="14.5" r="1.2" fill="currentColor" />
            </svg>
            <span className="mono">Корзина</span>
            {count > 0 && <span className="rail__count num">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
