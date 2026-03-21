import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

function FlowDiagram() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const path1Ref = useRef()
  const path2Ref = useRef()

  useEffect(() => {
    if (!inView) return
    const paths = [path1Ref.current, path2Ref.current]
    paths.forEach((path, i) => {
      if (!path) return
      const len = path.getTotalLength()
      path.style.strokeDasharray = len
      path.style.strokeDashoffset = len
      path.style.transition = `stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.3}s`
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = 0
      })
    })
  }, [inView])

  // Dot animation along paths
  const dot1Ref = useRef()
  const dot2Ref = useRef()
  const animRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    let t = 0
    const paths = [path1Ref.current, path2Ref.current]
    const dots = [dot1Ref.current, dot2Ref.current]
    const animate = () => {
      t += 0.003
      paths.forEach((path, i) => {
        if (!path || !dots[i]) return
        const len = path.getTotalLength()
        const offset = ((t + i * 0.5) % 1) * len
        const pt = path.getPointAtLength(offset)
        dots[i].setAttribute('cx', pt.x)
        dots[i].setAttribute('cy', pt.y)
      })
      animRef.current = requestAnimationFrame(animate)
    }
    // Start after paths draw
    const timer = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate)
    }, 1500)
    return () => {
      clearTimeout(timer)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [inView])

  const nodeStyle = {
    fill: 'none',
    stroke: 'rgba(43, 91, 255, 0.5)',
    strokeWidth: 1.5,
  }

  const nodes = [
    { x: 120, y: 200, label: '01', title: 'Join the waitlist', sub: 'Tell us what field\nyou want to climb in.' },
    { x: 500, y: 100, label: '02', title: 'Attend a Summit', sub: 'Ten Klimers. One Guide.\nLive and interactive every week.' },
    { x: 880, y: 200, label: '03', title: 'Ascend', sub: 'Fifteen minutes one on one\nwith your Guide right after.' },
  ]

  return (
    <div ref={ref} style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox="0 0 1000 340"
        style={{ width: '100%', minWidth: '600px', height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paths */}
        <path
          ref={path1Ref}
          d={`M ${nodes[0].x + 60} ${nodes[0].y} C ${280} ${nodes[0].y} ${320} ${nodes[1].y} ${nodes[1].x - 60} ${nodes[1].y}`}
          stroke="rgba(43, 91, 255, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          ref={path2Ref}
          d={`M ${nodes[1].x + 60} ${nodes[1].y} C ${680} ${nodes[1].y} ${720} ${nodes[2].y} ${nodes[2].x - 60} ${nodes[2].y}`}
          stroke="rgba(43, 91, 255, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Traveling dots */}
        {inView && (
          <>
            <circle ref={dot1Ref} r="5" fill="#2B5BFF" />
            <circle ref={dot2Ref} r="5" fill="#2B5BFF" />
          </>
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={i === 2 ? 58 : 58}
              {...nodeStyle}
              fill={i === 2 ? 'rgba(43, 91, 255, 0.15)' : 'none'}
              stroke={i === 2 ? '#2B5BFF' : 'rgba(43, 91, 255, 0.5)'}
            />
            <text
              x={node.x}
              y={node.y - 22}
              textAnchor="middle"
              fill="rgba(43, 91, 255, 0.8)"
              fontSize="12"
              fontFamily="Sora, sans-serif"
              fontWeight="500"
              letterSpacing="0.08em"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y - 4}
              textAnchor="middle"
              fill="#F0F2F7"
              fontSize="15"
              fontFamily="DM Serif Display, serif"
            >
              {node.title}
            </text>
            {node.sub.split('\n').map((line, j) => (
              <text
                key={j}
                x={node.x}
                y={node.y + 16 + j * 15}
                textAnchor="middle"
                fill="rgba(240, 242, 247, 0.45)"
                fontSize="11"
                fontFamily="Sora, sans-serif"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function ZoneRidgeline() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 60px',
      position: 'relative',
    }}>
      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: '60px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '11px',
        color: 'rgba(240, 242, 247, 0.4)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Ascending
      </div>

      <FadeIn>
        <h2 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(30px, 4vw, 48px)',
          color: '#F0F2F7',
          margin: '0 0 60px',
          letterSpacing: '-0.5px',
        }}>
          Three steps to the top.
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <FlowDiagram />
      </FadeIn>
    </section>
  )
}
