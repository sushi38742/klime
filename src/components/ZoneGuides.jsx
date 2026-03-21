const categories = [
  { name: 'National Security Advisors', desc: 'Former government professionals who navigated the highest levels of defense and intelligence strategy.' },
  { name: 'Business Leaders', desc: 'Executives and founders with 30+ years building companies, managing teams, and closing deals.' },
  { name: 'Engineers and Technologists', desc: 'Senior engineers from top firms who have shipped products used by millions.' },
  { name: 'Healthcare Professionals', desc: 'Physicians, researchers, and administrators shaping the future of medicine and public health.' },
  { name: 'Finance and Investment', desc: 'Portfolio managers, analysts, and advisors who have operated on Wall Street and beyond.' },
  { name: 'Creative Directors', desc: 'Award-winning creatives from agencies, studios, and brands who turned ideas into culture.' },
]

const screening = [
  { title: 'AI credential scan', desc: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.' },
  { title: 'Founder review', desc: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.' },
  { title: 'Ongoing monitoring', desc: 'After every Summit, AI analyzes Climber feedback. Guides who fall below the bar are flagged and reviewed again before their next session.' },
]

export default function ZoneGuides() {
  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '80px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '10px',
        color: 'rgba(240,242,247,0.35)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>Base Camp</div>

      <h2 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(26px, 3.2vw, 42px)',
        color: '#F0F2F7',
        margin: '0 0 12px',
        letterSpacing: '-0.5px',
      }}>
        Professionals who have already been there.
      </h2>

      <p style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '13px',
        color: 'rgba(240,242,247,0.42)',
        maxWidth: '520px',
        lineHeight: 1.7,
        margin: '0 0 28px',
      }}>
        Guides on Klime are not tutors or career coaches. They are senior professionals across industries who show up to share what they know and open real doors.
      </p>

      {/* Categories 2x3 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, maxWidth: '920px', marginBottom: '32px' }}>
        {categories.map((cat, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <div key={i} style={{
              padding: '18px 24px 18px 0',
              paddingLeft: col > 0 ? '24px' : 0,
              borderRight: col < 2 ? '1px solid rgba(240,242,247,0.08)' : 'none',
              borderBottom: row === 0 ? '1px solid rgba(240,242,247,0.08)' : 'none',
            }}>
              <h4 style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', color: '#F0F2F7', margin: '0 0 6px', lineHeight: 1.2 }}>{cat.name}</h4>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.38)', lineHeight: 1.65, margin: 0 }}>{cat.desc}</p>
            </div>
          )
        })}
      </div>

      <h3 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(20px, 2.4vw, 32px)',
        color: '#F0F2F7',
        margin: '0 0 20px',
        letterSpacing: '-0.3px',
      }}>
        Every Guide is screened before they ever lead a session.
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, maxWidth: '860px' }}>
        {screening.map((s, i) => (
          <div key={i} style={{
            paddingRight: i < 2 ? '28px' : 0,
            paddingLeft: i > 0 ? '28px' : 0,
            borderRight: i < 2 ? '1px solid rgba(240,242,247,0.08)' : 'none',
          }}>
            <h4 style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', color: '#F0F2F7', margin: '0 0 8px' }}>{s.title}</h4>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.38)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
