import { useId } from 'react'
import { usePlayInView, useStills } from '../lib/hooks'
import { asset } from '../lib/asset'

/**
 * The jar is a hole, not a photograph.
 *
 * A plate the colour of its section has the glass punched out of it and sits
 * over a film, so what fills the jar is real moving fruit rather than a picture
 * of a jar. The lid, its knurl, the thread ring, the fill line and the label
 * band are painted back on top — that is what makes it read as the product.
 *
 * Box 320 x 372. Body 50..270 x 96..322: squat and wide, the proportion of the
 * real 0,5 kg tin rather than a cosmetics pot.
 */
const BODY =
  'M56 96 H264 a6 6 0 0 1 6 6 V302 a20 20 0 0 1 -20 20 H70 a20 20 0 0 1 -20 -20 V102 a6 6 0 0 1 6 -6 Z'

const LID = 'M64 34 H256 a6 6 0 0 1 6 6 V80 a6 6 0 0 1 -6 6 H64 a6 6 0 0 1 -6 -6 V40 a6 6 0 0 1 6 -6 Z'

const KNURL = Array.from({ length: 16 }, (_, i) => 70 + i * 12)

export default function Jar({ reduced, tone = 'paper' }: { reduced: boolean; tone?: 'paper' | 'green' }) {
  const stills = useStills()
  const v = usePlayInView<HTMLVideoElement>(!reduced && !stills)
  const uid = useId().replace(/:/g, '')
  const inside = `jar-inside-${uid}`
  const lidId = `jar-lid-${uid}`

  const onGreen = tone === 'green'
  const plate = onGreen ? 'var(--green)' : 'var(--paper)'
  const line = onGreen ? 'rgba(242,238,229,0.3)' : 'var(--ink-20)'
  const ring = onGreen ? '#cfc6b4' : '#e8e1d4'

  return (
    <div className={`jar${onGreen ? ' jar--green' : ''}`}>
      {stills ? (
        <img className="jar__v" src={asset('/media/poster-jar.jpg')} alt="" width={1080} height={720} loading="lazy" />
      ) : (
        <video
          ref={v}
          className="jar__v"
          src={asset('/media/jar.mp4')}
          poster={asset('/media/poster-jar.jpg')}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
        />
      )}

      <svg className="jar__plate" viewBox="0 0 320 372" role="img" aria-label="Банка Collagen Live Wellness, 0,5 кг">
        <defs>
          <clipPath id={inside}>
            <path d={BODY} />
          </clipPath>
          <linearGradient id={lidId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fefdfa" />
            <stop offset="0.42" stopColor="#f2eee5" />
            <stop offset="1" stopColor="#ddd5c6" />
          </linearGradient>
        </defs>

        {/* the plate, with the glass punched out */}
        <path fill={plate} fillRule="evenodd" d={`M0 0H320V372H0Z ${BODY}`} />

        {/* what is in the glass, painted back over the film */}
        <g clipPath={`url(#${inside})`}>
          <rect x="0" y="0" width="320" height="372" fill="rgba(180, 108, 28, 0.05)" />
          <rect x="65" y="104" width="10" height="216" fill="rgba(255, 253, 248, 0.32)" />
          <rect x="80" y="104" width="3" height="216" fill="rgba(255, 253, 248, 0.17)" />
          <rect x="249" y="104" width="7" height="216" fill="rgba(255, 253, 248, 0.2)" />

          {/* the label — the one thing that makes this the product */}
          <rect x="50" y="216" width="220" height="70" fill="rgba(247, 243, 236, 0.94)" />
          <line x1="50" y1="216" x2="270" y2="216" stroke="rgba(28,27,23,0.16)" strokeWidth="1" />
          <line x1="50" y1="286" x2="270" y2="286" stroke="rgba(28,27,23,0.16)" strokeWidth="1" />
          <text x="160" y="244" textAnchor="middle" className="jar__brand">
            COLLAGEN LIVE
          </text>
          <text x="160" y="261" textAnchor="middle" className="jar__sub">
            WELLNESS
          </text>
          <text x="160" y="277" textAnchor="middle" className="jar__meta">
            ПИЩЕВОЙ КОЛЛАГЕН В ЖЕЛЕ · 0,5 КГ
          </text>
        </g>

        {/* glass */}
        <g fill="none" stroke={line} strokeWidth="1">
          <path d={BODY} />
          <path d="M50 128H270" strokeDasharray="2 4" opacity=".55" />
        </g>

        {/* thread ring, then the lid over it */}
        <rect x="68" y="80" width="184" height="18" rx="2" fill={ring} stroke={line} strokeWidth="1" />
        <path d={LID} fill={`url(#${lidId})`} stroke={line} strokeWidth="1" />
        <g stroke="rgba(28,27,23,0.085)" strokeWidth="1">
          {KNURL.map((x) => (
            <line key={x} x1={x} y1="42" x2={x} y2="78" />
          ))}
        </g>
        <path d="M60 58H260" stroke="rgba(255,255,255,0.72)" strokeWidth="1" />
      </svg>
    </div>
  )
}
