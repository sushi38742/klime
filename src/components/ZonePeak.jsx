import { useRef } from 'react'
import { motion } from 'framer-motion'

const words = ['Free', 'live', 'sessions', 'with', 'professionals', 'who', 'have', 'already', 'made', 'it.']

const easing = [0.16, 1, 0.3, 1]

export default function ZonePeak() {
  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 60px',
      position: 'relative',
    }}>
      {/* Trail marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Sora, sans-serif',
          fontSize: '11px',
          color: 'rgba(240, 242, 247, 0.4)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Summit
      </motion.div>

      {/* Klime wordmark in sky */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easing }}
        style={{
          textAlign: 'center',
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(48px, 8vw, 96px)',
          color: '#F0F2F7',
          letterSpacing: '-1px',
          marginBottom: '80px',
          textShadow: '0 0 60px rgba(180, 200, 255, 0.3)',
        }}
      >
        Klime
      </motion.div>

      <div style={{ maxWidth: '900px' }}>
        {/* Hero headline */}
        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(48px, 6vw, 80px)',
          color: '#F0F2F7',
          lineHeight: 1.05,
          margin: '0 0 28px',
          letterSpacing: '-1.5px',
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.05,
                duration: 0.6,
                ease: easing,
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: easing }}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(240, 242, 247, 0.55)',
            maxWidth: '560px',
            lineHeight: 1.6,
            margin: '0 0 40px',
          }}
        >
          Join a Summit with 10 other Klimers and a verified Guide. Then Ascend for 15 minutes of direct, one on one access.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: easing }}
          onClick={scrollToForm}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            color: '#F0F2F7',
            background: '#2B5BFF',
            border: 'none',
            borderRadius: '4px',
            padding: '14px 32px',
            cursor: 'pointer',
            letterSpacing: '0.01em',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(43, 91, 255, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Start Your Summit
        </motion.button>
      </div>

      {/* Trail sign */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: easing }}
        style={{
          position: 'absolute',
          right: '60px',
          top: '50%',
          transform: 'translateY(-50%)',
          border: '1px solid rgba(240, 242, 247, 0.15)',
          padding: '20px 24px',
          maxWidth: '220px',
        }}
      >
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '13px',
          color: 'rgba(240, 242, 247, 0.65)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          10 Klimers per Summit.<br />
          Real Guides.<br />
          Live sessions.<br />
          Ascend for direct access.
        </p>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: 0,
          right: 0,
          overflow: 'hidden',
          borderTop: '1px solid rgba(240, 242, 247, 0.1)',
          borderBottom: '1px solid rgba(240, 242, 247, 0.1)',
          padding: '12px 0',
        }}
      >
        <div className="marquee-track" style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}>
          {[1, 2].map(n => (
            <span key={n} style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'rgba(240, 242, 247, 0.35)',
              textTransform: 'uppercase',
            }}>
              FREE WEEKLY SUMMITS&nbsp;&nbsp;·&nbsp;&nbsp;LIVE WITH REAL GUIDES&nbsp;&nbsp;·&nbsp;&nbsp;10 CLIMBERS PER SESSION&nbsp;&nbsp;·&nbsp;&nbsp;ASCEND FOR DIRECT ACCESS&nbsp;&nbsp;·&nbsp;&nbsp;FREE WEEKLY SUMMITS&nbsp;&nbsp;·&nbsp;&nbsp;LIVE WITH REAL GUIDES&nbsp;&nbsp;·&nbsp;&nbsp;10 CLIMBERS PER SESSION&nbsp;&nbsp;·&nbsp;&nbsp;ASCEND FOR DIRECT ACCESS&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
