import { Link } from 'react-router-dom'
import FadeUp from './FadeUp'

const HAIR = '1px solid rgba(255,255,255,0.18)'
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }

export default function PolicyCard({ slug, label, summary, i }) {
  return (
    <FadeUp delay={i * 0.06}>
      <div style={{ borderTop: HAIR, padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 10px' }}>
            {label}
          </p>
          <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.78)', margin: 0, maxWidth: '520px', lineHeight: 1.7 }}>
            {summary}
          </p>
        </div>
        <Link
          to={`/policy/${slug}`}
          style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: '2px', transition: 'color 0.15s ease' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
        >
          Read more →
        </Link>
      </div>
    </FadeUp>
  )
}
