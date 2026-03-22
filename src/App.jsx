import { Routes, Route } from 'react-router-dom'
import MountainSVG from './components/MountainSVG'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BecomeGuide from './pages/BecomeGuide'
import UpcomingSummits from './pages/UpcomingSummits'
import About from './pages/About'
import FAQ from './pages/FAQ'

export default function App() {
  return (
    <>
      {/* Fixed mountain — behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <MountainSVG />
        {/* 15% dark overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)' }} />
      </div>

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
        </Routes>
      </div>
    </>
  )
}
