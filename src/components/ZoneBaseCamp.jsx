import { useRef, useState } from 'react'
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

export default function ZoneBaseCamp() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef()
  const inView = useInView(formRef, { once: true, margin: '-80px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (firstName && email) {
      setSubmitted(true)
    }
  }

  const fieldStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(240, 242, 247, 0.2)',
    padding: '14px 0',
    fontFamily: 'Sora, sans-serif',
    fontSize: '15px',
    color: '#F0F2F7',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section
      id="waitlist-form"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 60px 100px',
        position: 'relative',
      }}
    >
      {/* Warm ambient overlay for base camp feel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(to top, rgba(255, 120, 30, 0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <FadeIn>
        <h2 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(36px, 5vw, 64px)',
          color: '#F0F2F7',
          margin: '0 0 16px',
          letterSpacing: '-1px',
          lineHeight: 1.05,
          maxWidth: '600px',
        }}>
          Your Summit is waiting.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '16px',
          color: 'rgba(240, 242, 247, 0.45)',
          margin: '0 0 56px',
        }}>
          Early Climbers get matched first.
        </p>
      </FadeIn>

      <div ref={formRef} style={{ maxWidth: '440px' }}>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* First name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              style={{ marginBottom: '8px' }}
            >
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                style={fieldStyle}
                onFocus={e => e.target.style.borderBottomColor = 'rgba(43, 91, 255, 0.7)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(240, 242, 247, 0.2)'}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5, ease: easing }}
              style={{ marginBottom: '32px' }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={fieldStyle}
                onFocus={e => e.target.style.borderBottomColor = 'rgba(43, 91, 255, 0.7)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(240, 242, 247, 0.2)'}
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: easing }}
              type="submit"
              className="pulse-btn"
              style={{
                width: '100%',
                background: '#2B5BFF',
                border: 'none',
                borderRadius: '4px',
                padding: '16px',
                fontFamily: 'Sora, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: '#F0F2F7',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(43, 91, 255, 0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Your Ascent
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '12px',
                color: 'rgba(240, 242, 247, 0.3)',
                margin: '16px 0 0',
                textAlign: 'center',
              }}
            >
              Spots are limited. Early Klimers are matched first.
            </motion.p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <h3 style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: '28px',
              color: '#F0F2F7',
              margin: '0 0 12px',
            }}>
              You're on the list.
            </h3>
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '15px',
              color: 'rgba(240, 242, 247, 0.5)',
              margin: 0,
              lineHeight: 1.6,
            }}>
              We'll be in touch when your Summit opens up. The ascent begins soon.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: 'auto',
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: '18px',
          color: 'rgba(240, 242, 247, 0.3)',
        }}>
          Klime
        </span>
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '12px',
          color: 'rgba(240, 242, 247, 0.2)',
        }}>
          &copy; 2025 Klime
        </span>
      </motion.div>
    </section>
  )
}
