import { useRef, useEffect } from 'react'

export default function ZoneRidgeline() {
  const path1Ref = useRef()
  const path2Ref = useRef()
  const dot1Ref = useRef()
  const dot2Ref = useRef()
  const animRef = useRef()
  const drawn = useRef(false)

  useEffect(() => {
    if (drawn.current) return
    drawn.current = true
    // Draw paths
    const paths = [path1Ref.current, path2Ref.current]
    paths.forEach((p, i) => {
      if (!p) return
      const len = p.getTotalLength()
      p.style.strokeDasharray = len
      p.style.strokeDashoffset = len
      p.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.35}s`
      requestAnimationFrame(() => { p.style.strokeDashoffset = 0 })
    })

    // Travel dots
    let t = 0
    const animate = () => {
      t += 0.003
      if (path1Ref.current && dot1Ref.current) {
        const len = path1Ref.current.getTotalLength()
        const pt = path1Ref.current.getPointAtLength((t % 1) * len)
        dot1Ref.current.setAttribute('cx', pt.x)
        dot1Ref.current.setAttribute('cy', pt.y)
      }
      if (path2Ref.current && dot2Ref.current) {
        const len = path2Ref.current.getTotalLength()
        const pt = path2Ref.current.getPointAtLength(((t + 0.5) % 1) * len)
        dot2Ref.current.setAttribute('cx', pt.x)
        dot2Ref.current.setAttribute('cy', pt.y)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    setTimeout(() => { animRef.current = requestAnimationFrame(animate) }, 1200)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const nodes = [
    { x: 110, y: 180, label: '01', title: 'Join the waitlist', sub: 'Tell us what field\nyou want to climb in.' },
    { x: 480, y: 80,  label: '02', title: 'Attend a Summit',  sub: 'Ten Klimers. One Guide.\nLive and interactive.' },
    { x: 850, y: 180, label: '03', title: 'Ascend',           sub: 'Fifteen minutes one\non one with your Guide.' },
  ]

  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: '80px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '10px',
        color: 'rgba(240,242,247,0.35)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>Ascending</div>

      <h2 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(28px, 3.5vw, 46px)',
        color: '#F0F2F7',
        margin: '0 0 40px',
        letterSpacing: '-0.5px',
      }}>
        Three steps to the top.
      </h2>

      <svg viewBox="0 0 980 280" style={{ width: '100%', maxWidth: '900px', height: 'auto' }}>
        <path
          ref={path1Ref}
          d={`M ${nodes[0].x + 52} ${nodes[0].y} C 280 ${nodes[0].y} 300 ${nodes[1].y} ${nodes[1].x - 52} ${nodes[1].y}`}
          stroke="rgba(43,91,255,0.28)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          ref={path2Ref}
          d={`M ${nodes[1].x + 52} ${nodes[1].y} C 660 ${nodes[1].y} 680 ${nodes[2].y} ${nodes[2].x - 52} ${nodes[2].y}`}
          stroke="rgba(43,91,255,0.28)"
          strokeWidth="1.4"
          fill="none"
        />

        <circle ref={dot1Ref} r="4.5" fill="#2B5BFF" cx={nodes[0].x} cy={nodes[0].y} />
        <circle ref={dot2Ref} r="4.5" fill="#2B5BFF" cx={nodes[1].x} cy={nodes[1].y} />

        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x} cy={node.y} r={52}
              fill={i === 2 ? 'rgba(43,91,255,0.12)' : 'none'}
              stroke={i === 2 ? '#2B5BFF' : 'rgba(43,91,255,0.45)'}
              strokeWidth="1.2"
            />
            <text x={node.x} y={node.y - 20} textAnchor="middle" fill="rgba(43,91,255,0.75)" fontSize="11" fontFamily="Sora,sans-serif" letterSpacing="0.06em">{node.label}</text>
            <text x={node.x} y={node.y - 2} textAnchor="middle" fill="#F0F2F7" fontSize="14" fontFamily="DM Serif Display,serif">{node.title}</text>
            {node.sub.split('\n').map((line, j) => (
              <text key={j} x={node.x} y={node.y + 14 + j * 13} textAnchor="middle" fill="rgba(240,242,247,0.38)" fontSize="10" fontFamily="Sora,sans-serif">{line}</text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}
