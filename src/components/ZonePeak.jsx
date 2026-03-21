import { motion } from 'framer-motion'

const words = ['Free', 'live', 'sessions', 'with', 'professionals', 'who', 'have', 'already', 'made', 'it.']
const easing = [0.16, 1, 0.3, 1]

export default function ZonePeak() {
  const scrollToForm = () => {
    // Jump to last zone
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', padding: '0 60px' }}>

      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Sora, sans-serif',
        fontSize: '10px',
        color: 'rgba(240,242,247,0.35)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>Summit</div>

      {/* Klime wordmark — in the sky above the peak */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easing }}
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(40px, 6vw, 80px)',
          color: '#F0F2F7',
          textAlign: 'center',
          letterSpacing: '-0.5px',
          textShadow: '0 0 80px rgba(160,190,255,0.25)',
          whiteSpace: 'nowrap',
        }}
      >
        Klime
      </motion.div>

      {/* Hero content — sits on the mountain face left side */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '60px',
        maxWidth: '580px',
      }}>
        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(36px, 4.5vw, 68px)',
          color: '#F0F2F7',
          lineHeight: 1.06,
          margin: '0 0 22px',
          letterSpacing: '-1px',
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: easing }}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            color: 'rgba(240,242,247,0.5)',
            margin: '0 0 28px',
            lineHeight: 1.65,
            maxWidth: '420px',
          }}
        >
          Join a Summit with 10 other Klimers and a verified Guide. Then Ascend for 15 minutes of direct, one on one access.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, ease: easing }}
          onClick={scrollToForm}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#F0F2F7',
            background: '#2B5BFF',
            border: 'none',
            borderRadius: '4px',
            padding: '13px 28px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(43,91,255,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          Start Your Summit
        </motion.button>
      </div>

      {/* Trail sign — embedded in the mountain face, right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          right: '80px',
          bottom: '28%',
          border: '1px solid rgba(240,242,247,0.12)',
          padding: '18px 22px',
          maxWidth: '200px',
        }}
      >
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '12px',
          color: 'rgba(240,242,247,0.5)',
          lineHeight: 1.8,
          margin: 0,
        }}>
          10 Klimers per Summit.<br />
          Real Guides.<br />
          Live sessions.<br />
          Ascend for direct access.
        </p>
      </motion.div>

      {/* Marquee strip at the very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          borderTop: '1px solid rgba(240,242,247,0.08)',
          borderBottom: '1px solid rgba(240,242,247,0.08)',
          padding: '11px 0',
        }}
      >
        <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[1, 2].map(n => (
            <span key={n} style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'rgba(240,242,247,0.28)',
              textTransform: 'uppercase',
            }}>
              FREE WEEKLY SUMMITS&nbsp;&nbsp;·&nbsp;&nbsp;LIVE WITH REAL GUIDES&nbsp;&nbsp;·&nbsp;&nbsp;10 CLIMBERS PER SESSION&nbsp;&nbsp;·&nbsp;&nbsp;ASCEND FOR DIRECT ACCESS&nbsp;&nbsp;·&nbsp;&nbsp;FREE WEEKLY SUMMITS&nbsp;&nbsp;·&nbsp;&nbsp;LIVE WITH REAL GUIDES&nbsp;&nbsp;·&nbsp;&nbsp;10 CLIMBERS PER SESSION&nbsp;&nbsp;·&nbsp;&nbsp;ASCEND FOR DIRECT ACCESS&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
