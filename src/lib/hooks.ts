import Lenis from 'lenis'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTS, type Product } from '../data/catalog'

/** Live media query. Used to keep video off phones entirely, not just hide it. */
export function useMediaQuery(query: string) {
  const [hit, setHit] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const on = () => setHit(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return hit
}

/**
 * Below this width the page ships posters instead of video: three 2–3 MB files
 * over mobile data buy nothing that a still frame does not already show.
 */
export function useStills() {
  const narrow = useMediaQuery('(max-width: 760px)')
  const saveData = useMediaQuery('(prefers-reduced-data: reduce)')
  return narrow || saveData
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function useLenis(enabled: boolean) {
  const ref = useRef<Lenis | null>(null)
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.1, wheelMultiplier: 0.95, autoRaf: true })
    ref.current = lenis
    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis
    return () => {
      lenis.destroy()
      ref.current = null
    }
  }, [enabled])
  return ref
}

export function scrollToId(id: string, lenis?: Lenis | null) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.25 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Pauses a video whenever it leaves the viewport — never more than one decode at a time. */
export function usePlayInView<T extends HTMLVideoElement>(active: boolean) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (!active) {
      v.pause()
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { rootMargin: '120px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [active])
  return ref
}

/* ── cart ───────────────────────────────────────────────────────────── */

export type Line = { id: string; qty: number }

export type CartApi = {
  lines: Line[]
  items: (Line & { product: Product })[]
  count: number
  total: number
  add: (id: string) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const STORE = 'cl-cart-v1'

export function useCart(): CartApi {
  const [lines, setLines] = useState<Line[]>(() => {
    try {
      const raw = localStorage.getItem(STORE)
      return raw ? (JSON.parse(raw) as Line[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(lines))
    } catch {
      /* private mode — the cart simply does not survive a reload */
    }
  }, [lines])

  const add = useCallback((id: string) => {
    setLines((ls) => {
      const hit = ls.find((l) => l.id === id)
      return hit ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { id, qty: 1 }]
    })
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))))
  }, [])

  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), [])
  const clear = useCallback(() => setLines([]), [])

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.id)
          return product ? { ...l, product } : null
        })
        .filter((x): x is Line & { product: Product } => x !== null),
    [lines],
  )

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + i.qty * i.product.price, 0)

  return { lines, items, count, total, add, setQty, remove, clear }
}
