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

function StatNumber({ value, label }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const countRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    if (typeof value !== 'number') return
    let start = 0
    const end = value
    const duration = 1200
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      if (countRef.current) {
        countRef.current.textContent = Math.round(eased * end)
      }
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <div ref={ref} style={{ textAlign: 'left', flex: 1 }}>
      <div style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(36px, 4vw, 56px)',
        color: '#F0F2F7',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {typeof value === 'number' ? (
          <span ref={countRef}>0</span>
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: '13px',
        color: 'rgba(240, 242, 247, 0.5)',
        letterSpacing: '0.06em',
      }}>{label}</div>
    </div>
  )
}

export default function ZoneComparison() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 60px',
      position: 'relative',
    }}>
      {/* Mist layer visual cue */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, rgba(180, 200, 255, 0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <FadeIn>
        <h2 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: '#F0F2F7',
          margin: '0 0 24px',
          maxWidth: '700px',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
        }}>
          TED inspires you. MasterClass teaches you. Klime connects you.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '16px',
          color: 'rgba(240, 242, 247, 0.5)',
          maxWidth: '600px',
          lineHeight: 1.7,
          margin: '0 0 70px',
        }}>
          We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers. A live room where you talk back, get heard, and leave with a real connection.
        </p>
      </FadeIn>

      {/* Comparison table */}
      <FadeIn delay={0.2}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0,
          marginBottom: '70px',
          maxWidth: '860px',
        }}>
          {[
            {
              name: 'MasterClass',
              color: 'rgba(240, 242, 247, 0.5)',
              items: ['Pre-recorded videos', 'Watch celebrities talk', 'No interaction', 'No personal access'],
            },
            {
              name: 'TED',
              color: 'rgba(240, 242, 247, 0.5)',
              items: ['Inspiring talks', 'One-way broadcast', 'No follow-up', 'No direct connection'],
            },
            {
              name: 'Klime',
              color: '#2B5BFF',
              items: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'],
            },
          ].map((col, i) => (
            <div
              key={i}
              style={{
                padding: '0 32px 0 0',
                borderRight: i < 2 ? '1px solid rgba(240, 242, 247, 0.1)' : 'none',
                paddingLeft: i > 0 ? '32px' : 0,
              }}
            >
              <div style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: '22px',
                color: col.color,
                marginBottom: '20px',
              }}>
                {col.name}
              </div>
              {col.items.map((item, j) => (
                <p key={j} style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '14px',
                  color: i === 2 ? 'rgba(240, 242, 247, 0.8)' : 'rgba(240, 242, 247, 0.4)',
                  margin: '0 0 10px',
                  lineHeight: 1.5,
                }}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <h3 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(26px, 3.5vw, 42px)',
          color: '#F0F2F7',
          margin: '0 0 18px',
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          Most platforms sell you content.<br />Klime puts you in the room.
        </h3>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '16px',
          color: 'rgba(240, 242, 247, 0.5)',
          maxWidth: '600px',
          lineHeight: 1.7,
          margin: '0 0 70px',
        }}>
          Every Summit is live, intimate, and led by a verified Guide who has been where you want to go. Ten Klimers per session means the Guide knows your name, hears your question, and responds directly to you.
        </p>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.5}>
        <div style={{
          display: 'flex',
          gap: 0,
          maxWidth: '640px',
        }}>
          {[
            { value: 10, label: 'Climbers per Summit' },
            { value: 1, label: 'Verified Guide' },
            { value: 'Live', label: 'Never recorded' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1,
              paddingRight: i < 2 ? '40px' : 0,
              borderRight: i < 2 ? '1px solid rgba(240, 242, 247, 0.1)' : 'none',
              paddingLeft: i > 0 ? '40px' : 0,
            }}>
              <StatNumber value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
