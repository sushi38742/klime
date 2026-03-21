import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home',             to: '/' },
  { label: 'Upcoming Summits', to: '/upcoming-summits' },
  { label: 'Become a Guide',   to: '/become-a-guide' },
]

const lnkBase = {
  fontFamily: 'Sora, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  paddingBottom: '2px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  whiteSpace: 'nowrap',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const NavLink = ({ to, label, onClick }) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        onClick={() => { setOpen(false); onClick?.() }}
        style={{
          ...lnkBase,
          color: active ? '#2B5BFF' : '#0D0F14',
          borderBottom: active ? '2px solid #2B5BFF' : '2px solid transparent',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#2B5BFF' }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#0D0F14' }}
      >
        {label}
      </Link>
    )
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '64px',
        zIndex: 200,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '22px', color: '#0D0F14', letterSpacing: '-0.3px' }}>
            Klime
          </span>
        </Link>

        {/* Center links */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '36px', alignItems: 'center',
        }}>
          {links.map(l => <NavLink key={l.to} {...l} />)}
        </div>

        {/* CTAs */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/upcoming-summits" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500,
            color: '#2B5BFF', textDecoration: 'none',
            border: '1.5px solid #2B5BFF', borderRadius: '4px', padding: '8px 18px',
            transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,91,255,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = '' }}
          >
            Join a Summit
          </Link>
          <Link to="/become-a-guide" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500,
            color: '#fff', textDecoration: 'none',
            background: '#2B5BFF', borderRadius: '4px', padding: '8px 18px',
            transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(43,91,255,0.38)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            Become a Guide
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="hamburger-btn"
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', flexDirection: 'column', gap: '5px' }}
        >
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: '#0D0F14', borderRadius: '1px' }} />)}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 199,
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(14px)',
          padding: '20px 40px 28px', display: 'flex', flexDirection: 'column', gap: '18px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}>
          {links.map(l => <NavLink key={l.to} {...l} />)}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '6px' }}>
            <Link to="/upcoming-summits" onClick={() => setOpen(false)} style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: '#2B5BFF', textDecoration: 'none', border: '1.5px solid #2B5BFF', borderRadius: '4px', padding: '9px 18px' }}>Join a Summit</Link>
            <Link to="/become-a-guide" onClick={() => setOpen(false)} style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: '#fff', textDecoration: 'none', background: '#2B5BFF', borderRadius: '4px', padding: '9px 18px' }}>Become a Guide</Link>
          </div>
        </div>
      )}
    </>
  )
}
