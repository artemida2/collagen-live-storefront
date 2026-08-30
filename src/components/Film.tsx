import { motion, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useStills } from '../lib/hooks'

/**
 * The live film, fixed behind the whole page. Sections above it are opaque;
 * the two places that show it — the hero and the "живой" half of the
 * comparison — are simply holes in those plates, so one decode serves both.
 * The master is 1280x720 with real picture across the full frame.
 */
export default function Film({
  progress,
  reduced,
  onReady,
}: {
  progress: MotionValue<number>
  reduced: boolean
  onReady: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const stills = useStills()
  const scale = useTransform(progress, [0, 1], [1.08, 1.18])

  /**
   * The fixed film is only ever visible through the hero and through the
   * "живой" window in the comparison. Past that it is fully covered, so it
   * stops decoding rather than burning a core for the rest of the page.
   */
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduced || stills) {
      v.pause()
      return
    }
    let visible = true
    const sync = () => {
      if (visible) void v.play().catch(() => {})
      else v.pause()
    }
    const onScroll = () => {
      const stop = document.getElementById('tech')
      const limit = stop ? stop.getBoundingClientRect().top + window.scrollY - window.innerHeight : Infinity
      const next = window.scrollY < limit
      if (next !== visible) {
        visible = next
        sync()
      }
    }
    if (v.readyState >= 2) sync()
    else v.addEventListener('canplay', sync, { once: true })
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [reduced, stills])

  useEffect(() => {
    if (stills) onReady()
  }, [stills, onReady])

  return (
    <div className="film" aria-hidden="true">
      {stills ? (
        <img className="film__v" src="/media/poster-live.jpg" alt="" width={1280} height={720} />
      ) : (
      <motion.video
        ref={ref}
        className="film__v"
        style={reduced ? undefined : { scale }}
        src="/media/live.mp4"
        poster="/media/poster-live.jpg"
        muted
        playsInline
        loop
        preload="auto"
        onLoadedData={onReady}
        onError={onReady}
      />
      )}
      <div className="film__warm" />
    </div>
  )
}
