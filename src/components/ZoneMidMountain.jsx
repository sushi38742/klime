import { useRef, useEffect } from 'react'

function MidMain() {
  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(28px, 3.5vw, 46px)',
        color: '#F0F2F7',
        margin: '0 0 44px',
        letterSpacing: '-0.5px',
      }}>
        Choose how you climb.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, maxWidth: '760px', marginBottom: '48px' }}>
        <div style={{ paddingRight: '44px', borderRight: '1px solid rgba(240,242,247,0.08)' }}>
          <h3 style={{ fontFamily: '"DM Serif Display", serif', fontSize: '26px', color: '#F0F2F7', margin: '0 0 12px' }}>Summit</h3>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', color: 'rgba(240,242,247,0.5)', lineHeight: 1.7, margin: '0 0 14px' }}>
            Ten Klimers. One Guide. Live every week. Interactive, intimate, and built around real conversation. New Guides rotate in with the best ones returning.
          </p>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,242,247,0.28)' }}>Limited Spots</span>
        </div>
        <div style={{ paddingLeft: '44px' }}>
          <h3 style={{ fontFamily: '"DM Serif Display", serif', fontSize: '26px', color: '#F0F2F7', margin: '0 0 6px' }}>Ascending</h3>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', color: 'rgba(43,91,255,0.85)', margin: '0 0 8px' }}>$40 per session</p>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', color: 'rgba(240,242,247,0.5)', lineHeight: 1.7, margin: '0 0 14px' }}>
            Fifteen minutes directly with your Guide after the Summit. They know who you are. They just spent an hour with you. This is where real connection happens.
          </p>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,242,247,0.28)' }}>Ascending</span>
        </div>
      </div>

      {/* Dot grids */}
      <div style={{ display: 'flex', gap: '72px', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '132px', marginBottom: '10px' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'rgba(240,242,247,0.6)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,242,247,0.3)' }}>Summit</span>
        </div>
        <div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2B5BFF', boxShadow: '0 0 18px rgba(43,91,255,0.6)' }} />
          </div>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,242,247,0.3)' }}>Ascending</span>
        </div>
      </div>
    </div>
  )
}

function AILoopDiagram() {
  const svgRef = useRef()
  const dotRef = useRef()
  const animRef = useRef()

  useEffect(() => {
    let t = 0
    const nodes = [{ x: 150, y: 55 }, { x: 150, y: 195 }, { x: 150, y: 335 }]
    const animate = () => {
      t += 0.004
      const progress = t % 1
      const totalPath = 280 + 20
      const pos = progress * totalPath
      let x = 150, y

      if (pos < 140) { y = 55 + (pos / 140) * 140 }
      else if (pos < 280) { y = 195 + ((pos - 140) / 140) * 140 }
      else { y = 335 + ((pos - 280) / 40) * (-280) }

      if (dotRef.current) {
        dotRef.current.setAttribute('cx', x)
        dotRef.current.setAttribute('cy', y)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <svg viewBox="0 0 300 420" style={{ width: '180px', height: 'auto' }}>
      <line x1="150" y1="83" x2="150" y2="167" stroke="rgba(43,91,255,0.22)" strokeWidth="1.4" />
      <line x1="150" y1="223" x2="150" y2="307" stroke="rgba(43,91,255,0.22)" strokeWidth="1.4" />
      <path d="M 150 363 C 240 363 240 55 192 55" stroke="rgba(43,91,255,0.18)" strokeWidth="1.4" fill="none" strokeDasharray="4 4" />
      <polygon points="192,51 186,61 198,61" fill="rgba(43,91,255,0.4)" />

      <circle ref={dotRef} r="5" fill="#2B5BFF" cx="150" cy="55" />

      {[{ y: 55, label: 'Climbers survey' }, { y: 195, label: 'AI analyzes' }, { y: 335, label: 'Guide is briefed' }].map((n, i) => (
        <g key={i}>
          <circle cx="150" cy={n.y} r="28" fill="none" stroke="rgba(43,91,255,0.38)" strokeWidth="1.2" />
          <text x="150" y={n.y + 4} textAnchor="middle" fill="rgba(240,242,247,0.7)" fontSize="10" fontFamily="Sora,sans-serif">{n.label}</text>
        </g>
      ))}
      <text x="150" y="408" textAnchor="middle" fill="rgba(240,242,247,0.28)" fontSize="8" fontFamily="Sora,sans-serif" letterSpacing="2">REPEATS EVERY WEEK</text>
    </svg>
  )
}

function AISection() {
  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center', maxWidth: '860px' }}>
        <div>
          <h2 style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            color: '#F0F2F7',
            margin: '0 0 20px',
            letterSpacing: '-0.5px',
            lineHeight: 1.15,
          }}>
            Sessions that adapt to you.
          </h2>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
            color: 'rgba(240,242,247,0.48)',
            lineHeight: 1.75,
            margin: 0,
            maxWidth: '420px',
          }}>
            Before every Summit, Klimers complete a short survey. Klime's AI identifies what the cohort needs and briefs the Guide before they walk in. No two Summits are the same.
          </p>
        </div>
        <AILoopDiagram />
      </div>
    </div>
  )
}

export default function ZoneMidMountain({ onlyFirst, onlyAI }) {
  if (onlyFirst) return <MidMain />
  if (onlyAI) return <AISection />
  return (
    <>
      <MidMain />
      <AISection />
    </>
  )
}
