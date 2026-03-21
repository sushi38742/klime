import { useRef, useEffect } from 'react'

function StatCounter({ value, label }) {
  const ref = useRef()
  const ran = useRef(false)
  useEffect(() => {
    if (ran.current) return
    ran.current = true
    if (typeof value !== 'number') return
    let start
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1200, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (ref.current) ref.current.textContent = Math.round(eased * value)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])

  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(32px, 3.5vw, 50px)', color: '#F0F2F7', lineHeight: 1, marginBottom: '6px' }}>
        {typeof value === 'number' ? <span ref={ref}>0</span> : <span>{value}</span>}
      </div>
      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', color: 'rgba(240,242,247,0.4)', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

export default function ZoneComparison() {
  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Mist hint */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(140,180,220,0.04), transparent)', pointerEvents: 'none' }} />

      <h2 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(26px, 3.2vw, 46px)',
        color: '#F0F2F7',
        margin: '0 0 16px',
        maxWidth: '640px',
        letterSpacing: '-0.5px',
        lineHeight: 1.1,
      }}>
        TED inspires you. MasterClass teaches you. Klime connects you.
      </h2>

      <p style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '14px',
        color: 'rgba(240,242,247,0.45)',
        maxWidth: '520px',
        lineHeight: 1.7,
        margin: '0 0 36px',
      }}>
        We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers. A live room where you talk back, get heard, and leave with a real connection.
      </p>

      {/* Comparison columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, maxWidth: '760px', marginBottom: '36px' }}>
        {[
          { name: 'MasterClass', color: 'rgba(240,242,247,0.4)', items: ['Pre-recorded videos', 'Watch celebrities talk', 'No interaction', 'No personal access'] },
          { name: 'TED', color: 'rgba(240,242,247,0.4)', items: ['Inspiring talks', 'One-way broadcast', 'No follow-up', 'No direct connection'] },
          { name: 'Klime', color: '#2B5BFF', items: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'] },
        ].map((col, i) => (
          <div key={i} style={{
            paddingRight: i < 2 ? '28px' : 0,
            paddingLeft: i > 0 ? '28px' : 0,
            borderRight: i < 2 ? '1px solid rgba(240,242,247,0.08)' : 'none',
          }}>
            <div style={{ fontFamily: '"DM Serif Display", serif', fontSize: '18px', color: col.color, marginBottom: '12px' }}>{col.name}</div>
            {col.items.map((item, j) => (
              <p key={j} style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', color: i === 2 ? 'rgba(240,242,247,0.72)' : 'rgba(240,242,247,0.35)', margin: '0 0 7px', lineHeight: 1.5 }}>{item}</p>
            ))}
          </div>
        ))}
      </div>

      <h3 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(22px, 2.8vw, 36px)',
        color: '#F0F2F7',
        margin: '0 0 12px',
        letterSpacing: '-0.3px',
        lineHeight: 1.15,
      }}>
        Most platforms sell you content.<br />Klime puts you in the room.
      </h3>

      <p style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '13px',
        color: 'rgba(240,242,247,0.42)',
        maxWidth: '520px',
        lineHeight: 1.7,
        margin: '0 0 28px',
      }}>
        Every Summit is live, intimate, and led by a verified Guide who has been where you want to go. Ten Klimers per session means the Guide knows your name, hears your question, and responds directly to you.
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', maxWidth: '520px' }}>
        {[{ value: 10, label: 'Climbers per Summit' }, { value: 1, label: 'Verified Guide' }, { value: 'Live', label: 'Never recorded' }].map((s, i) => (
          <div key={i} style={{
            flex: 1,
            paddingRight: i < 2 ? '32px' : 0,
            paddingLeft: i > 0 ? '32px' : 0,
            borderRight: i < 2 ? '1px solid rgba(240,242,247,0.08)' : 'none',
          }}>
            <StatCounter value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </div>
  )
}
