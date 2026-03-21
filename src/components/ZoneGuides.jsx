const categories = [
  'National Security Advisors',
  'Business Leaders',
  'Engineers & Technologists',
  'Healthcare Professionals',
  'Finance & Investment',
  'Creative Directors',
]

const screening = [
  { title: 'AI credential scan', desc: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.' },
  { title: 'Founder review', desc: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.' },
  { title: 'Ongoing monitoring', desc: 'After every Summit, AI analyzes Climber feedback. Guides who fall below the bar are flagged and reviewed before their next session.' },
]

export default function ZoneGuides() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 80px',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: '"DM Serif Display",serif',
        fontSize: 'clamp(24px,3vw,42px)',
        color: '#F0F2F7',
        margin: '0 0 10px',
        letterSpacing: '-0.5px',
        lineHeight: 1.15,
        maxWidth: '600px',
      }}>
        Professionals who have already been there.
      </h2>

      <p style={{
        fontFamily: 'Sora,sans-serif',
        fontSize: '14px',
        color: 'rgba(240,242,247,0.42)',
        maxWidth: '480px',
        lineHeight: 1.7,
        margin: '0 0 32px',
      }}>
        Guides on Klime are not tutors or coaches. They are senior professionals who show up to share what they know and open real doors.
      </p>

      {/* Category pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        maxWidth: '760px',
        marginBottom: '40px',
      }}>
        {categories.map((cat, i) => (
          <div key={i} style={{
            fontFamily: 'Sora,sans-serif',
            fontSize: '12px',
            color: 'rgba(240,242,247,0.6)',
            border: '1px solid rgba(240,242,247,0.12)',
            borderRadius: '2px',
            padding: '8px 16px',
            background: 'rgba(10,16,28,0.4)',
          }}>
            {cat}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: '100%', maxWidth: '780px', height: '1px', background: 'rgba(240,242,247,0.07)', marginBottom: '32px' }} />

      <h3 style={{
        fontFamily: '"DM Serif Display",serif',
        fontSize: 'clamp(20px,2.4vw,30px)',
        color: '#F0F2F7',
        margin: '0 0 28px',
        letterSpacing: '-0.3px',
        maxWidth: '600px',
        lineHeight: 1.2,
      }}>
        Every Guide is screened before they ever lead a session.
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0',
        maxWidth: '860px',
        width: '100%',
      }}>
        {screening.map((s, i) => (
          <div key={i} style={{
            padding: '0 28px',
            borderLeft: i > 0 ? '1px solid rgba(240,242,247,0.08)' : 'none',
            textAlign: 'left',
          }}>
            <h4 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: '#F0F2F7', margin: '0 0 8px' }}>{s.title}</h4>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(240,242,247,0.38)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
