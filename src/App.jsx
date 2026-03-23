import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import MountainSVG from './components/MountainSVG'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BecomeGuide from './pages/BecomeGuide'
import UpcomingSummits from './pages/UpcomingSummits'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Ascending from './pages/Ascending'
import Legal from './pages/Legal'
import Contact from './pages/Contact'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      {/* Fixed mountain — behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <MountainSVG />
        {/* 15% dark overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)' }} />
      </div>

      <ScrollToTop />

      {/* Fixed navbar */}
      <Navbar />

      {/* Page content — scrolls over the fixed mountain */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/become-a-guide"    element={<BecomeGuide />} />
          <Route path="/upcoming-summits"  element={<UpcomingSummits />} />
          <Route path="/about"             element={<About />} />
          <Route path="/faq"               element={<FAQ />} />
          <Route path="/ascending"         element={<Ascending />} />
          <Route path="/legal"             element={<Legal />} />
          <Route path="/contact"           element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}
