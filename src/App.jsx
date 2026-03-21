import { useRef, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import MountainSVG from './components/MountainSVG'
import Navbar from './components/Navbar'
import AltitudeIndicator from './components/AltitudeIndicator'
import ZonePeak from './components/ZonePeak'
import ZoneComparison from './components/ZoneComparison'
import ZoneRidgeline from './components/ZoneRidgeline'
import ZoneMidMountain from './components/ZoneMidMountain'
import ZoneGuides from './components/ZoneGuides'
import ZoneFAQ from './components/ZoneFAQ'
import ZoneBaseCamp from './components/ZoneBaseCamp'

// Zone definitions: scroll position 0–1 for each zone's midpoint
// Total scroll: 800vh, 8 zones of roughly 100vh each
// Focal point on SVG (1440x900) and zoom scale for each zone
const ZONES = [
  { id: 'peak',       start: 0.000, end: 0.125, fx: 720, fy: 100,  scale: 2.9  },
  { id: 'compare',   start: 0.125, end: 0.250, fx: 720, fy: 210,  scale: 2.35 },
  { id: 'ridgeline', start: 0.250, end: 0.375, fx: 710, fy: 345,  scale: 1.9  },
  { id: 'mid',       start: 0.375, end: 0.500, fx: 720, fy: 480,  scale: 1.55 },
  { id: 'ai',        start: 0.500, end: 0.625, fx: 720, fy: 590,  scale: 1.35 },
  { id: 'guides',    start: 0.625, end: 0.750, fx: 720, fy: 680,  scale: 1.18 },
  { id: 'faq',       start: 0.750, end: 0.875, fx: 720, fy: 770,  scale: 1.06 },
  { id: 'basecamp',  start: 0.875, end: 1.000, fx: 720, fy: 858,  scale: 1.00 },
]

// Given focal point (fx, fy in SVG space 1440x900) and scale,
// compute CSS translate so focal point is centered in viewport.
// transform: translate(tx, ty) scale(s) — origin top-left
function zoneTransform(z) {
  const tx = 720 - z.fx * z.scale
  const ty = 450 - z.fy * z.scale
  return { scale: z.scale, tx, ty }
}

function lerp(a, b, t) { return a + (b - a) * t }

// Smooth easing for zone blend
function smoothstep(t) { return t * t * (3 - 2 * t) }

export default function App() {
  const scrollProgress = useRef(0)
  const mountainRef = useRef()
  const fillRef = useRef() // altitude indicator fill
  const rafRef = useRef()
  const currentTransform = useRef({ scale: ZONES[0].scale, tx: 720 - ZONES[0].fx * ZONES[0].scale, ty: 450 - ZONES[0].fy * ZONES[0].scale })
  const zoneRefs = useRef({})

  // Content zone refs for fade in/out
  const setZoneRef = (id) => (el) => { zoneRefs.current[id] = el }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const precomputed = ZONES.map(z => ({ ...z, ...zoneTransform(z) }))

    lenis.on('scroll', ({ progress }) => {
      scrollProgress.current = progress
    })

    const animate = (time) => {
      lenis.raf(time)

      const p = scrollProgress.current

      // Find current zone pair to interpolate between
      let fromZone = precomputed[0]
      let toZone = precomputed[0]
      let t = 0

      for (let i = 0; i < precomputed.length - 1; i++) {
        const z = precomputed[i]
        const zNext = precomputed[i + 1]
        if (p >= z.start && p <= zNext.start) {
          fromZone = z
          toZone = zNext
          t = (p - z.start) / (zNext.start - z.start)
          break
        }
      }
      if (p >= precomputed[precomputed.length - 1].start) {
        fromZone = precomputed[precomputed.length - 1]
        toZone = precomputed[precomputed.length - 1]
        t = 1
      }

      const ease = smoothstep(Math.max(0, Math.min(1, t)))

      const targetScale = lerp(fromZone.scale, toZone.scale, ease)
      const targetTx = lerp(fromZone.tx, toZone.tx, ease)
      const targetTy = lerp(fromZone.ty, toZone.ty, ease)

      // Smooth current transform toward target (lerp for momentum)
      const lerpFactor = 0.07
      currentTransform.current.scale = lerp(currentTransform.current.scale, targetScale, lerpFactor)
      currentTransform.current.tx = lerp(currentTransform.current.tx, targetTx, lerpFactor)
      currentTransform.current.ty = lerp(currentTransform.current.ty, targetTy, lerpFactor)

      if (mountainRef.current) {
        const { scale, tx, ty } = currentTransform.current
        mountainRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
      }

      // Altitude indicator
      if (fillRef.current) {
        fillRef.current.style.height = `${p * 100}%`
      }

      // Zone content visibility
      ZONES.forEach((zone) => {
        const el = zoneRefs.current[zone.id]
        if (!el) return
        const mid = (zone.start + zone.end) / 2
        const halfSpan = (zone.end - zone.start) * 0.5
        const fadeDist = (zone.end - zone.start) * 0.3
        let opacity = 0
        if (p >= zone.start && p <= zone.end) {
          const fromStart = p - zone.start
          const fromEnd = zone.end - p
          const fadeInAmt = Math.min(1, fromStart / fadeDist)
          const fadeOutAmt = Math.min(1, fromEnd / fadeDist)
          opacity = Math.min(fadeInAmt, fadeOutAmt)
        }
        el.style.opacity = opacity
        el.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none'
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
      {/* Fixed mountain behind everything */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        background: '#020710',
      }}>
        <div
          ref={mountainRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          <MountainSVG />
        </div>
      </div>

      {/* Fixed UI chrome */}
      <Navbar />
      <AltitudeFill fillRef={fillRef} />

      {/* Fixed content zones — each fades in/out as camera reaches that mountain area */}
      <div ref={setZoneRef('peak')} style={zoneOverlayStyle(0)}>
        <ZonePeak />
      </div>
      <div ref={setZoneRef('compare')} style={zoneOverlayStyle(0)}>
        <ZoneComparison />
      </div>
      <div ref={setZoneRef('ridgeline')} style={zoneOverlayStyle(0)}>
        <ZoneRidgeline />
      </div>
      <div ref={setZoneRef('mid')} style={zoneOverlayStyle(0)}>
        <ZoneMidMountain onlyFirst />
      </div>
      <div ref={setZoneRef('ai')} style={zoneOverlayStyle(0)}>
        <ZoneMidMountain onlyAI />
      </div>
      <div ref={setZoneRef('guides')} style={zoneOverlayStyle(0)}>
        <ZoneGuides />
      </div>
      <div ref={setZoneRef('faq')} style={zoneOverlayStyle(0)}>
        <ZoneFAQ />
      </div>
      <div ref={setZoneRef('basecamp')} style={zoneOverlayStyle(0)}>
        <ZoneBaseCamp />
      </div>
    </div>
  )
}

function zoneOverlayStyle(opacity) {
  return {
    position: 'fixed',
    inset: 0,
    zIndex: 10,
    opacity,
    transition: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'none',
  }
}

// Altitude indicator as inline component to access fillRef
function AltitudeFill({ fillRef }) {
  return (
    <div style={{
      position: 'fixed',
      right: '22px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L11 10H1L6 1Z" stroke="#F0F2F7" strokeWidth="1.1" fill="none" opacity="0.4" />
      </svg>
      <div style={{
        width: '1.5px',
        height: '110px',
        background: 'rgba(240,242,247,0.1)',
        borderRadius: '1px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div ref={fillRef} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '0%',
          background: 'linear-gradient(to bottom, #2B5BFF, rgba(43,91,255,0.3))',
          boxShadow: '0 0 5px rgba(43,91,255,0.9)',
          borderRadius: '1px',
        }} />
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 10L6 2L11 10H1Z" stroke="#F0F2F7" strokeWidth="1.1" fill="none" opacity="0.4" />
        <path d="M4 10V8H8V10" stroke="#F0F2F7" strokeWidth="1.1" opacity="0.4" />
      </svg>
    </div>
  )
}
