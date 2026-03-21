import { useRef, useEffect } from 'react'

function SummitVsAscend() {
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
        fontSize: 'clamp(26px,3.2vw,44px)',
        color: '#F0F2F7',
        margin: '0 0 10px',
        letterSpacing: '-0.5px',
      }}>
        Choose how you climb.
      </h2>

      <p style={{
        fontFamily: 'Sora,sans-serif',
        fontSize: '14px',
        color: 'rgba(240,242,247,0.4)',
        margin: '0 0 40px',
        maxWidth: '480px',
        lineHeight: 1.65,
      }}>
        Every Summit is free. Ascending is optional — but it's where real connection happens.
      </p>

      {/* Two-column cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        width: '100%',
        maxWidth: '780px',
        background: 'rgba(240,242,247,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        {[
          {
            badge: 'Free',
            title: 'Summit',
            price: null,
            desc: 'Ten Klimers. One Guide. Live every week. Interactive, intimate, and built around real conversation.',
            dot: { count: 10, size: 11, color: 'rgba(240,242,247,0.55)' },
          },
          {
            badge: 'Optional',
            title: 'Ascending',
            price: '$40 per session',
            desc: 'Fifteen minutes directly with your Guide after the Summit. They know who you are. This is where doors open.',
            dot: { count: 1, size: 30, color: '#2B5BFF', glow: true },
          },
        ].map((card, i) => (
          <div key={i} style={{
            background: i === 1 ? 'rgba(43,91,255,0.06)' : 'rgba(10,16,28,0.6)',
            padding: '36px 40px',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                fontFamily: 'Sora,sans-serif',
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: i === 1 ? '#2B5BFF' : 'rgba(240,242,247,0.35)',
                border: `1px solid ${i === 1 ? 'rgba(43,91,255,0.4)' : 'rgba(240,242,247,0.15)'}`,
                padding: '2px 8px',
                borderRadius: '2px',
              }}>
                {card.badge}
              </span>
              {card.price && (
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(43,91,255,0.8)' }}>{card.price}</span>
              )}
            </div>
            <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '28px', color: '#F0F2F7', margin: '0 0 10px' }}>{card.title}</h3>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(240,242,247,0.45)', lineHeight: 1.7, margin: '0 0 24px' }}>{card.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {Array.from({ length: card.dot.count }).map((_, j) => (
                <div key={j} style={{
                  width: card.dot.size + 'px',
                  height: card.dot.size + 'px',
                  borderRadius: '50%',
                  background: card.dot.color,
                  boxShadow: card.dot.glow ? '0 0 20px rgba(43,91,255,0.5)' : 'none',
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AILoopNode({ x, y, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={32} fill="rgba(15,25,45,0.6)" stroke="rgba(43,91,255,0.35)" strokeWidth="1.2" />
      <text x={x} y={y + 4} textAnchor="middle" fill="rgba(240,242,247,0.7)" fontSize="10" fontFamily="Sora,sans-serif">{label}</text>
    </g>
  )
}

function AISection() {
  const dotRef = useRef()
  const raf = useRef()

  useEffect(() => {
    let t = 0
    const waypoints = [{ x: 480, y: 50 }, { x: 480, y: 165 }, { x: 480, y: 280 }, { x: 480, y: 50 }]
    const animate = () => {
      t += 0.004
      const p = t % 1
      const seg = Math.floor(p * 3)
      const segP = (p * 3) % 1
      const a = waypoints[seg], b = waypoints[seg + 1]
      const cx = a.x + (b.x - a.x) * segP
      const cy = a.y + (b.y - a.y) * segP
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', cx)
        dotRef.current.setAttribute('cy', cy)
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [])

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
        fontSize: 'clamp(26px,3.2vw,44px)',
        color: '#F0F2F7',
        margin: '0 0 10px',
        letterSpacing: '-0.5px',
      }}>
        Sessions that adapt to you.
      </h2>
      <p style={{
        fontFamily: 'Sora,sans-serif',
        fontSize: '14px',
        color: 'rgba(240,242,247,0.42)',
        lineHeight: 1.7,
        margin: '0 0 40px',
        maxWidth: '480px',
      }}>
        Before every Summit, Klimers complete a short survey. Klime's AI identifies what the cohort needs and briefs the Guide before they walk in.
      </p>

      <svg viewBox="0 0 960 340" style={{ width: '100%', maxWidth: '820px', height: 'auto' }}>
        {/* Loop path */}
        <line x1="480" y1="82" x2="480" y2="133" stroke="rgba(43,91,255,0.2)" strokeWidth="1.4" />
        <line x1="480" y1="197" x2="480" y2="248" stroke="rgba(43,91,255,0.2)" strokeWidth="1.4" />
        {/* Return arc */}
        <path d="M 480 312 C 620 312 620 50 514 50" stroke="rgba(43,91,255,0.16)" strokeWidth="1.4" fill="none" strokeDasharray="4 5" />
        <polygon points="514,46 508,58 520,58" fill="rgba(43,91,255,0.38)" />

        <circle ref={dotRef} r="5.5" fill="#2B5BFF" cx="480" cy="50" />

        {[{ y: 50, lbl: 'Klimers survey' }, { y: 165, lbl: 'AI analyzes' }, { y: 280, lbl: 'Guide is briefed' }].map((n, i) => (
          <AILoopNode key={i} x={480} y={n.y} label={n.lbl} />
        ))}

        {/* Labels on the side */}
        {[
          { y: 50,  x: 540, text: 'Climbers answer 3 questions before Summit', anchor: 'start' },
          { y: 165, x: 540, text: 'Patterns identified across the cohort', anchor: 'start' },
          { y: 280, x: 540, text: 'Guide tailors their session in real time', anchor: 'start' },
        ].map((l, i) => (
          <text key={i} x={l.x} y={l.y + 4} textAnchor={l.anchor} fill="rgba(240,242,247,0.38)" fontSize="12" fontFamily="Sora,sans-serif">{l.text}</text>
        ))}

        <text x="480" y="332" textAnchor="middle" fill="rgba(240,242,247,0.22)" fontSize="9" fontFamily="Sora,sans-serif" letterSpacing="2">REPEATS EVERY WEEK</text>
      </svg>
    </div>
  )
}

export default function ZoneMidMountain({ onlyFirst, onlyAI }) {
  if (onlyFirst) return <SummitVsAscend />
  if (onlyAI) return <AISection />
  return null
}
