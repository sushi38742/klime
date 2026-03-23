import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home',           to: '/' },
  { label: 'Summits',        to: '/upcoming-summits' },
  { label: 'Ascending',      to: '/ascending' },
  { label: 'Become a Guide', to: '/become-a-guide' },
  { label: 'Our Story',      to: '/about' },
  { label: 'FAQ',            to: '/faq' },
  { label: 'Legal',          to: '/legal' },
  { label: 'Contact',        to: '/contact' },
]

const lnk = {
  fontFamily: 'Sora,sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0D0F14',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
}

export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid rgba(13,15,20,0.1)',
      padding: '48px 40px 36px',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Brand */}
        <div style={{ marginBottom: '36px' }}>
          <Link to="/" style={{ fontFamily: '"DM Serif Display",serif', fontSize: '22px', color: '#0D0F14', textDecoration: 'none', letterSpacing: '-0.3px' }}>
            Klime
          </Link>
        </div>

        {/* Link grid — 4 per row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, max-content)',
          gap: '16px 64px',
          marginBottom: '40px',
        }} className="footer-link-grid">
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={lnk}
              onMouseEnter={e => { e.currentTarget.style.color = '#2B5BFF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#0D0F14' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(13,15,20,0.08)', paddingTop: '20px' }}>
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(13,15,20,0.4)' }}>
            &copy; 2026 Klime &nbsp;&middot;&nbsp; Gainesville, Florida
          </span>
        </div>

      </div>
    </footer>
  )
}
