import { useRef, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Mountain from './components/Mountain'
import Navbar from './components/Navbar'
import AltitudeIndicator from './components/AltitudeIndicator'
import ZonePeak from './components/ZonePeak'
import ZoneComparison from './components/ZoneComparison'
import ZoneRidgeline from './components/ZoneRidgeline'
import ZoneMidMountain from './components/ZoneMidMountain'
import ZoneGuides from './components/ZoneGuides'
import ZoneFAQ from './components/ZoneFAQ'
import ZoneBaseCamp from './components/ZoneBaseCamp'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const scrollProgress = useRef(0)

  useEffect(() => {
    // Smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ({ progress }) => {
      scrollProgress.current = progress
      ScrollTrigger.update()
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed 3D mountain background */}
      <Mountain scrollProgress={scrollProgress} />

      {/* Fixed UI elements */}
      <Navbar />
      <AltitudeIndicator scrollProgress={scrollProgress} />

      {/* Scrollable content layer */}
      <div className="content-layer">
        <ZonePeak />
        <ZoneComparison />
        <ZoneRidgeline />
        <ZoneMidMountain />
        <ZoneGuides />
        <ZoneFAQ />
        <ZoneBaseCamp />
      </div>
    </div>
  )
}
