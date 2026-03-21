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

function DotGrid({ count, large = false, label }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: large ? '0' : '10px',
        marginBottom: '14px',
        justifyContent: large ? 'center' : 'flex-start',
        alignItems: 'center',
        minHeight: '60px',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.02, duration: 0.3, ease: easing }}
            style={{
              width: large ? '28px' : '12px',
              height: large ? '28px' : '12px',
              borderRadius: '50%',
              background: large ? '#2B5BFF' : 'rgba(240, 242, 247, 0.7)',
              margin: large ? '0' : '0',
              boxShadow: large ? '0 0 20px rgba(43, 91, 255, 0.6)' : 'none',
            }}
          />
        ))}
      </div>
      <p style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(240, 242, 247, 0.4)',
        margin: 0,
      }}>
        {label}
      </p>
    </div>
  )
}

function AILoopDiagram() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const animRef = useRef(null)
  const dot1Ref = useRef()

  const nodes = [
    { x: 150, y: 60, label: 'Climbers survey' },
    { x: 150, y: 200, label: 'AI analyzes' },
    { x: 150, y: 340, label: 'Guide is briefed' },
  ]

  useEffect(() => {
    if (!inView) return
    let t = 0
    const animate = () => {
      t += 0.004
      const progress = t % 1
      // Simple linear path through 3 nodes
      const totalLen = 280 + 20 // approximation
      const pos = progress * totalLen
      if (dot1Ref.current) {
        let y, x
        if (pos < 140) {
          y = 60 + (pos / 140) * 140
          x = 150
        } else if (pos < 160) {
          y = 200
          x = 150
        } else if (pos < 280 + 20) {
          y = 200 + ((pos - 160) / 140) * 140
          x = 150
        } else {
          y = 340
          x = 150
        }
        dot1Ref.current.setAttribute('cy', y)
        dot1Ref.current.setAttribute('cx', x)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    const timer = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate)
    }, 400)
    return () => {
      clearTimeout(timer)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [inView])

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <svg viewBox="0 0 300 420" style={{ width: '220px', height: 'auto' }}>
        {/* Lines */}
        <line x1="150" y1="88" x2="150" y2="172" stroke="rgba(43, 91, 255, 0.25)" strokeWidth="1.5" />
        <line x1="150" y1="228" x2="150" y2="312" stroke="rgba(43, 91, 255, 0.25)" strokeWidth="1.5" />
        {/* Return arrow */}
        <path
          d="M 150 368 C 250 368 250 60 180 60"
          stroke="rgba(43, 91, 255, 0.2)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />
        <polygon points="180,56 174,66 186,66" fill="rgba(43, 91, 255, 0.4)" />

        {/* Traveling dot */}
        {inView && <circle ref={dot1Ref} r="5" fill="#2B5BFF" cx="150" cy="60" />}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={28}
              fill="none"
              stroke="rgba(43, 91, 255, 0.4)"
              strokeWidth="1.2"
            >
              {inView && (
                <animate
                  attributeName="r"
                  values="28;29.5;28"
                  dur={`2s`}
                  begin={`${i * 0.6}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill="rgba(240, 242, 247, 0.8)"
              fontSize="10"
              fontFamily="Sora, sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* "Repeats every week" label */}
        <text x="150" y="410" textAnchor="middle" fill="rgba(240, 242, 247, 0.3)" fontSize="9" fontFamily="Sora, sans-serif" letterSpacing="2">
          REPEATS EVERY WEEK
        </text>
      </svg>
    </div>
  )
}

export default function ZoneMidMountain() {
  return (
    <>
      {/* Zone 4 - Choose how you climb */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 60px',
        position: 'relative',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 'clamp(30px, 4vw, 48px)',
            color: '#F0F2F7',
            margin: '0 0 60px',
            letterSpacing: '-0.5px',
          }}>
            Choose how you climb.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            maxWidth: '800px',
            marginBottom: '70px',
          }}>
            {/* Summit */}
            <div style={{
              paddingRight: '50px',
              borderRight: '1px solid rgba(240, 242, 247, 0.1)',
            }}>
              <h3 style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: '28px',
                color: '#F0F2F7',
                margin: '0 0 14px',
              }}>
                Summit
              </h3>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '15px',
                color: 'rgba(240, 242, 247, 0.6)',
                lineHeight: 1.7,
                margin: '0 0 20px',
              }}>
                Ten Klimers. One Guide. Live every week. Interactive, intimate, and built around real conversation. New Guides rotate in with the best ones returning.
              </p>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(240, 242, 247, 0.3)',
              }}>
                Limited Spots
              </span>
            </div>

            {/* Ascending */}
            <div style={{ paddingLeft: '50px' }}>
              <h3 style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: '28px',
                color: '#F0F2F7',
                margin: '0 0 14px',
              }}>
                Ascending
              </h3>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px',
                color: 'rgba(43, 91, 255, 0.9)',
                margin: '0 0 8px',
              }}>
                $40 per session
              </p>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '15px',
                color: 'rgba(240, 242, 247, 0.6)',
                lineHeight: 1.7,
                margin: '0 0 20px',
              }}>
                Fifteen minutes directly with your Guide after the Summit. They know who you are. They just spent an hour with you. This is where real connection happens.
              </p>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(240, 242, 247, 0.3)',
              }}>
                Ascending
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Dot grids */}
        <FadeIn delay={0.2}>
          <div style={{
            display: 'flex',
            gap: '80px',
            alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxWidth: '140px',
                marginBottom: '12px',
              }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <DotInner key={i} index={i} />
                ))}
              </div>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(240, 242, 247, 0.35)',
                margin: 0,
              }}>
                Summit
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ marginBottom: '12px' }}>
                <DotInner large index={0} />
              </div>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(240, 242, 247, 0.35)',
                margin: 0,
              }}>
                Ascending
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Zone 4B - AI Section */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 60px',
        position: 'relative',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          maxWidth: '1000px',
        }}>
          <div>
            <FadeIn>
              <h2 style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: 'clamp(30px, 3.5vw, 44px)',
                color: '#F0F2F7',
                margin: '0 0 24px',
                letterSpacing: '-0.5px',
                lineHeight: 1.15,
              }}>
                Sessions that adapt to you.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '15px',
                color: 'rgba(240, 242, 247, 0.55)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                Before every Summit, Klimers complete a short survey. Klime's AI identifies what the cohort needs and briefs the Guide before they walk in. No two Summits are the same.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <AILoopDiagram />
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function DotInner({ index, large }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.02, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: large ? '28px' : '12px',
        height: large ? '28px' : '12px',
        borderRadius: '50%',
        background: large ? '#2B5BFF' : 'rgba(240, 242, 247, 0.7)',
        boxShadow: large ? '0 0 20px rgba(43, 91, 255, 0.6)' : 'none',
      }}
    />
  )
}
