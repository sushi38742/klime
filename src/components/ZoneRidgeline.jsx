import { useRef, useEffect } from 'react'

const nodes = [
  { x: 130, y: 180, label: '01', title: 'Join the waitlist', sub: ['Tell us what field', 'you want to climb in.'] },
  { x: 480, y: 80,  label: '02', title: 'Attend a Summit',  sub: ['Ten Klimers. One Guide.', 'Live and interactive.'] },
  { x: 830, y: 180, label: '03', title: 'Ascend',           sub: ['15 min one on one', 'with your Guide.'] },
]

export default function ZoneRidgeline() {
  const path1 = useRef(), path2 = useRef()
  const dot1 = useRef(), dot2 = useRef()
  const raf = useRef()

  useEffect(() => {
    const ps = [path1.current, path2.current]
    ps.forEach((p, i) => {
      if (!p) return
      const len = p.getTotalLength()
      p.style.strokeDasharray = len
      p.style.strokeDashoffset = len
      p.style.transition = `stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.4}s`
      requestAnimationFrame(() => { p.style.strokeDashoffset = 0 })
    })

    let t = 0
    const animate = () => {
      t += 0.0025
      if (path1.current && dot1.current) {
        const pt = path1.current.getPointAtLength((t % 1) * path1.current.getTotalLength())
        dot1.current.setAttribute('cx', pt.x); dot1.current.setAttribute('cy', pt.y)
      }
      if (path2.current && dot2.current) {
        const pt = path2.current.getPointAtLength(((t + 0.5) % 1) * path2.current.getTotalLength())
        dot2.current.setAttribute('cx', pt.x); dot2.current.setAttribute('cy', pt.y)
      }
      raf.current = requestAnimationFrame(animate)
    }
    setTimeout(() => { raf.current = requestAnimationFrame(animate) }, 1200)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const p1d = `M ${nodes[0].x + 55} ${nodes[0].y} C 290 ${nodes[0].y} 320 ${nodes[1].y} ${nodes[1].x - 55} ${nodes[1].y}`
  const p2d = `M ${nodes[1].x + 55} ${nodes[1].y} C 640 ${nodes[1].y} 670 ${nodes[2].y} ${nodes[2].x - 55} ${nodes[2].y}`

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
        margin: '0 0 48px',
        letterSpacing: '-0.5px',
      }}>
        Three steps to the top.
      </h2>

      <svg viewBox="0 0 960 290" style={{ width: '100%', maxWidth: '880px', height: 'auto', overflow: 'visible' }}>
        <path ref={path1} d={p1d} stroke="rgba(43,91,255,0.3)" strokeWidth="1.4" fill="none" />
        <path ref={path2} d={p2d} stroke="rgba(43,91,255,0.3)" strokeWidth="1.4" fill="none" />
        <circle ref={dot1} r="5" fill="#2B5BFF" cx={nodes[0].x} cy={nodes[0].y} opacity="0.9" />
        <circle ref={dot2} r="5" fill="#2B5BFF" cx={nodes[1].x} cy={nodes[1].y} opacity="0.9" />

        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={58}
              fill={i === 2 ? 'rgba(43,91,255,0.10)' : 'rgba(20,32,60,0.55)'}
              stroke={i === 2 ? '#2B5BFF' : 'rgba(43,91,255,0.38)'}
              strokeWidth="1.2"
            />
            <text x={n.x} y={n.y - 22} textAnchor="middle"
              fill="rgba(43,91,255,0.75)" fontSize="10" fontFamily="Sora,sans-serif" letterSpacing="2">
              {n.label}
            </text>
            <text x={n.x} y={n.y - 4} textAnchor="middle"
              fill="#F0F2F7" fontSize="15" fontFamily="DM Serif Display,serif">
              {n.title}
            </text>
            {n.sub.map((line, j) => (
              <text key={j} x={n.x} y={n.y + 13 + j * 13} textAnchor="middle"
                fill="rgba(240,242,247,0.38)" fontSize="10" fontFamily="Sora,sans-serif">
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}
