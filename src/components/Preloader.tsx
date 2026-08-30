import { useEffect, useRef, useState } from 'react'

/** Short and quiet: the wordmark, one hairline filling, then the sheet lifts. */
export default function Preloader({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const [gone, setGone] = useState(reduced)
  const [lifting, setLifting] = useState(reduced)
  const barRef = useRef<HTMLSpanElement>(null)
  const born = useRef(performance.now())

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const DUR = 1200
    const tick = () => {
      const t = Math.min(1, (performance.now() - born.current) / DUR)
      if (barRef.current) barRef.current.style.transform = `scaleX(${1 - Math.pow(1 - t, 3)})`
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const wait = Math.max(0, 1250 - (performance.now() - born.current))
    const a = setTimeout(() => setLifting(true), ready ? wait : wait + 350)
    return () => clearTimeout(a)
  }, [ready, reduced])

  useEffect(() => {
    if (!lifting || reduced) return
    const t = setTimeout(() => setGone(true), 1100)
    return () => clearTimeout(t)
  }, [lifting, reduced])

  useEffect(() => {
    document.documentElement.classList.toggle('is-held', !gone)
    return () => document.documentElement.classList.remove('is-held')
  }, [gone])

  if (gone) return null

  return (
    <div className={`pre${lifting ? ' is-lifting' : ''}`} aria-hidden="true">
      <div className="pre__sheet" />
      <div className="pre__core">
        <span className="pre__mark">Collagen&nbsp;Live</span>
        <span className="mono pre__sub">ЖИВОЙ КОЛЛАГЕН · ОФИЦИАЛЬНЫЙ ДИСТРИБЬЮТОР</span>
        <span className="pre__bar">
          <span ref={barRef} className="pre__bar-fill" />
        </span>
      </div>
    </div>
  )
}
