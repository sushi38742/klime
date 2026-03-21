import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const headline = ['Free', 'live', 'sessions', 'with', 'professionals', 'who', 'have', 'already', 'made', 'it.']

export default function ZonePeak() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0',
    }}>

      {/* ── TOP STRIP ── trail marker */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '18px',
      }}>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,242,247,0.3)' }}>
          Summit
        </span>
      </div>

      {/* ── MIDDLE BLOCK ── wordmark + headline + CTA, centered on mountain peak */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, justifyContent: 'center', padding: '0 48px', maxWidth: '800px' }}>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            fontFamily: '"DM Serif Display",serif',
            fontSize: 'clamp(44px,7vw,96px)',
            color: '#F0F2F7',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            marginBottom: '28px',
            textShadow: '0 0 120px rgba(160,190,255,0.3)',
          }}
        >
          Klime
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"DM Serif Display",serif',
          fontSize: 'clamp(28px,3.8vw,54px)',
          color: '#F0F2F7',
          lineHeight: 1.1,
          letterSpacing: '-0.5px',
          margin: '0 0 20px',
          maxWidth: '680px',
        }}>
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.045, duration: 0.5, ease }}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{
            fontFamily: 'Sora,sans-serif',
            fontSize: 'clamp(13px,1.4vw,16px)',
            color: 'rgba(240,242,247,0.48)',
            lineHeight: 1.65,
            margin: '0 0 32px',
            maxWidth: '460px',
          }}
        >
          Join a Summit with 10 other Klimers and a verified Guide. Then Ascend for 15 minutes of direct, one on one access.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.4, ease }}
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          style={{
            fontFamily: 'Sora,sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#F0F2F7',
            background: '#2B5BFF',
            border: 'none',
            borderRadius: '4px',
            padding: '14px 36px',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(43,91,255,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
        >
          Start Your Summit
        </motion.button>
      </div>

      {/* ── BOTTOM STRIP ── stat pill row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        style={{
          width: '100%',
          borderTop: '1px solid rgba(240,242,247,0.08)',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          padding: '14px 0',
        }}
      >
        {[
          ['10 Klimers', 'per Summit'],
          ['1 Guide', 'verified'],
          ['Live', 'never recorded'],
          ['15 min', 'Ascending 1:1'],
        ].map(([val, lbl], i, arr) => (
          <div key={i} style={{
            padding: '0 36px',
            borderRight: i < arr.length - 1 ? '1px solid rgba(240,242,247,0.1)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: '20px', color: '#F0F2F7', lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.35)', marginTop: '4px' }}>{lbl}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
