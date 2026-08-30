import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FREE_DELIVERY_FROM, rub } from '../data/catalog'
import type { CartApi } from '../lib/hooks'

export default function CartDrawer({
  open,
  onClose,
  cart,
}: {
  open: boolean
  onClose: () => void
  cart: CartApi
}) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', city: '' })

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open, onClose])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open)
    return () => document.documentElement.classList.remove('is-locked')
  }, [open])

  const left = Math.max(0, FREE_DELIVERY_FROM - cart.total)
  const pct = Math.min(1, cart.total / FREE_DELIVERY_FROM)
  const valid = form.name.trim().length > 1 && form.phone.replace(/\D/g, '').length >= 10

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Корзина">
          <motion.div
            className="drawer__veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer__panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="drawer__head">
              <div>
                <span className="mono">Ваш заказ</span>
                <h2 className="drawer__h">Корзина</h2>
              </div>
              <button className="drawer__x" onClick={onClose} aria-label="Закрыть">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </header>

            {sent ? (
              <div className="drawer__done">
                <span className="drawer__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <h3 className="drawer__done-h">Заявка собрана</h3>
                <p className="prose">
                  {form.name}, спасибо. Менеджер перезвонит на {form.phone} в рабочие часы, подтвердит состав
                  заказа и сроки доставки{form.city ? ` в город ${form.city}` : ''}.
                </p>
                <p className="mono drawer__demo">
                  Демонстрационная версия: форма пока не отправляет данные — нужен бэкенд или интеграция с CRM
                </p>
                <button
                  className="btn btn--solid btn--wide"
                  onClick={() => {
                    cart.clear()
                    setSent(false)
                    onClose()
                  }}
                >
                  <span>Готово</span>
                </button>
              </div>
            ) : cart.items.length === 0 ? (
              <div className="drawer__empty">
                <p className="prose">В корзине пока пусто. Начните с клубничного смузи — это самый заказываемый вкус.</p>
                <button className="btn btn--ghost" onClick={onClose}>
                  <span>Вернуться к вкусам</span>
                </button>
              </div>
            ) : (
              <>
                <ul className="drawer__list">
                  {cart.items.map(({ id, qty, product }) => (
                    <li key={id} className="dline">
                      <img src={product.img} alt="" width={700} height={700} />
                      <div className="dline__b">
                        <h3 className="dline__t">{product.name}</h3>
                        <span className="mono">
                          {product.weight} · {product.course}
                        </span>
                        <div className="dline__row">
                          <div className="qty">
                            <button onClick={() => cart.setQty(id, qty - 1)} aria-label="Меньше">
                              −
                            </button>
                            <span className="num">{qty}</span>
                            <button onClick={() => cart.setQty(id, qty + 1)} aria-label="Больше">
                              +
                            </button>
                          </div>
                          <span className="dline__p num">{rub(product.price * qty)}</span>
                        </div>
                      </div>
                      <button className="dline__x" onClick={() => cart.remove(id)} aria-label="Убрать">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="drawer__ship">
                  <div className="drawer__bar">
                    <span style={{ transform: `scaleX(${pct})` }} />
                  </div>
                  <span className="mono">
                    {left > 0 ? `До бесплатной доставки — ${rub(left)}` : 'Доставка бесплатно'}
                  </span>
                </div>

                <form className="drawer__form" onSubmit={submit}>
                  <div className="drawer__total">
                    <span className="mono">Итого</span>
                    <span className="drawer__sum num">{rub(cart.total)}</span>
                  </div>

                  <label className="field">
                    <span className="mono">Имя</span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Как к вам обращаться"
                      autoComplete="name"
                    />
                  </label>
                  <label className="field">
                    <span className="mono">Телефон</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 ___ ___-__-__"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="field">
                    <span className="mono">Город</span>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Куда везём"
                      autoComplete="address-level2"
                    />
                  </label>

                  <button className="btn btn--solid btn--wide" disabled={!valid} type="submit">
                    <span>Оформить заявку</span>
                  </button>
                  <p className="mono drawer__fine">
                    Оплата не проводится на сайте. Менеджер перезвонит и подтвердит заказ
                  </p>
                </form>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
