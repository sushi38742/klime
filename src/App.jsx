import { useRef, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import MountainSVG from './components/MountainSVG'
import Navbar from './components/Navbar'
import ZonePeak from './components/ZonePeak'
import ZoneComparison from './components/ZoneComparison'
import ZoneRidgeline from './components/ZoneRidgeline'
import ZoneMidMountain from './components/ZoneMidMountain'
import ZoneGuides from './components/ZoneGuides'
import ZoneFAQ from './components/ZoneFAQ'
import ZoneBaseCamp from './components/ZoneBaseCamp'

// Focal point expressed as fractions (0–1) of the SVG viewBox (1440×900).
// tx = vw*(0.5 - fx*scale)  ty = vh*(0.5 - fy*scale)
// This centers the focal point regardless of actual viewport size.
const ZONES = [
  { id: 'peak',       start: 0.000, end: 0.125, fx: 0.500, fy: 0.111, scale: 2.9  },
  { id: 'compare',   start: 0.125, end: 0.250, fx: 0.500, fy: 0.233, scale: 2.35 },
  { id: 'ridgeline', start: 0.250, end: 0.375, fx: 0.500, fy: 0.383, scale: 1.9  },
  { id: 'mid',       start: 0.375, end: 0.500, fx: 0.500, fy: 0.533, scale: 1.55 },
  { id: 'ai',        start: 0.500, end: 0.625, fx: 0.500, fy: 0.656, scale: 1.35 },
  { id: 'guides',    start: 0.625, end: 0.750, fx: 0.500, fy: 0.756, scale: 1.18 },
  { id: 'faq',       start: 0.750, end: 0.875, fx: 0.500, fy: 0.856, scale: 1.06 },
  { id: 'basecamp',  start: 0.875, end: 1.000, fx: 0.500, fy: 0.953, scale: 1.00 },
]

function computeTransform(z) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    scale: z.scale,
    tx: vw * (0.5 - z.fx * z.scale),
    ty: vh * (0.5 - z.fy * z.scale),
  }
}

function lerp(a, b, t) { return a + (b - a) * t }
function smoothstep(t) { return t * t * (3 - 2 * t) }

const OVERLAY = {
  position: 'fixed',
  inset: 0,
  zIndex: 10,
  opacity: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
}

export default function App() {
  const scrollProgress = useRef(0)
  const mountainRef = useRef()
  const fillRef = useRef()
  const rafRef = useRef()
  const cur = useRef(null)          // current interpolated transform
  const zoneRefs = useRef({})

  useEffect(() => {
    // Initialise current transform from first zone using real viewport
    cur.current = computeTransform(ZONES[0])

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ({ progress }) => { scrollProgress.current = progress })

    const animate = (time) => {
      lenis.raf(time)
      const p = scrollProgress.current

      // Find which pair of zones to interpolate between
      let from = ZONES[0], to = ZONES[0], t = 0
      for (let i = 0; i < ZONES.length - 1; i++) {
        if (p >= ZONES[i].start && p <= ZONES[i + 1].start) {
          from = ZONES[i]
          to = ZONES[i + 1]
          t = (p - from.start) / (to.start - from.start)
          break
        }
      }
      if (p >= ZONES[ZONES.length - 1].start) {
        from = to = ZONES[ZONES.length - 1]
        t = 1
      }

      const e = smoothstep(Math.max(0, Math.min(1, t)))
      const fromT = computeTransform(from)
      const toT = computeTransform(to)

      const targetScale = lerp(fromT.scale, toT.scale, e)
      const targetTx = lerp(fromT.tx, toT.tx, e)
      const targetTy = lerp(fromT.ty, toT.ty, e)

      // Momentum lerp
      const k = 0.07
      cur.current.scale = lerp(cur.current.scale, targetScale, k)
      cur.current.tx    = lerp(cur.current.tx,    targetTx,    k)
      cur.current.ty    = lerp(cur.current.ty,    targetTy,    k)

      if (mountainRef.current) {
        const { scale, tx, ty } = cur.current
        mountainRef.current.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`
      }

      if (fillRef.current) {
        fillRef.current.style.height = `${p * 100}%`
      }

      // Fade zones in/out
      ZONES.forEach((zone) => {
        const el = zoneRefs.current[zone.id]
        if (!el) return
        let opacity = 0
        if (p >= zone.start && p <= zone.end) {
          const span = zone.end - zone.start
          const fade = span * 0.28
          const fromStart = p - zone.start
          const fromEnd = zone.end - p
          opacity = Math.min(fromStart / fade, fromEnd / fade, 1)
        }
        el.style.opacity = opacity
        el.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none'
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ height: '800vh', position: 'relative' }}>
      {/* Fixed mountain backdrop */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, background: '#020710' }}>
        <div
          ref={mountainRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transformOrigin: '0 0', willChange: 'transform' }}
        >
          <MountainSVG />
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Altitude indicator */}
      <div style={{ position: 'fixed', right: '22px', top: '50%', transform: 'translateY(-50%)', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1L11 10H1L6 1Z" stroke="#F0F2F7" strokeWidth="1.1" fill="none" opacity="0.35" />
        </svg>
        <div style={{ width: '1.5px', height: '110px', background: 'rgba(240,242,247,0.1)', borderRadius: '1px', position: 'relative', overflow: 'hidden' }}>
          <div ref={fillRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0%', background: 'linear-gradient(to bottom,#2B5BFF,rgba(43,91,255,0.3))', boxShadow: '0 0 5px rgba(43,91,255,0.9)', borderRadius: '1px' }} />
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 10L6 2L11 10H1Z" stroke="#F0F2F7" strokeWidth="1.1" fill="none" opacity="0.35" />
          <path d="M4 10V8H8V10" stroke="#F0F2F7" strokeWidth="1.1" opacity="0.35" />
        </svg>
      </div>

      {/* Content overlays — fixed, fade per zone */}
      {[
        ['peak',      <ZonePeak />],
        ['compare',   <ZoneComparison />],
        ['ridgeline', <ZoneRidgeline />],
        ['mid',       <ZoneMidMountain onlyFirst />],
        ['ai',        <ZoneMidMountain onlyAI />],
        ['guides',    <ZoneGuides />],
        ['faq',       <ZoneFAQ />],
        ['basecamp',  <ZoneBaseCamp />],
      ].map(([id, el]) => (
        <div key={id} ref={r => { zoneRefs.current[id] = r }} style={OVERLAY}>
          {el}
        </div>
      ))}
    </div>
  )
}
