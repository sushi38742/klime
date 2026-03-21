import { useState } from 'react'
import { motion } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(240,242,247,0.18)',
  padding: '13px 0',
  fontFamily: 'Sora, sans-serif',
  fontSize: '14px',
  color: '#F0F2F7',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

export default function ZoneBaseCamp() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div id="waitlist-form" style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Warm glow hint at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, rgba(255,100,20,0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(32px, 4.5vw, 60px)',
          color: '#F0F2F7',
          margin: '0 0 12px',
          letterSpacing: '-0.8px',
          lineHeight: 1.05,
          maxWidth: '540px',
        }}
      >
        Your Summit is waiting.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '14px',
          color: 'rgba(240,242,247,0.4)',
          margin: '0 0 44px',
        }}
      >
        Early Climbers get matched first.
      </motion.p>

      <div style={{ maxWidth: '400px' }}>
        {!submitted ? (
          <form
            onSubmit={(e) => { e.preventDefault(); if (firstName && email) setSubmitted(true) }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <motion.input
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              style={{ ...fieldStyle, marginBottom: '8px' }}
              onFocus={e => e.target.style.borderBottomColor = 'rgba(43,91,255,0.6)'}
              onBlur={e => e.target.style.borderBottomColor = 'rgba(240,242,247,0.18)'}
            />
            <motion.input
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5, ease: easing }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ ...fieldStyle, marginBottom: '28px' }}
              onFocus={e => e.target.style.borderBottomColor = 'rgba(43,91,255,0.6)'}
              onBlur={e => e.target.style.borderBottomColor = 'rgba(240,242,247,0.18)'}
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46, duration: 0.5 }}
              type="submit"
              className="pulse-btn"
              style={{
                width: '100%',
                background: '#2B5BFF',
                border: 'none',
                borderRadius: '4px',
                padding: '15px',
                fontFamily: 'Sora, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#F0F2F7',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(43,91,255,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              Start Your Ascent
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.25)', margin: '14px 0 0', textAlign: 'center' }}
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
            <h3 style={{ fontFamily: '"DM Serif Display", serif', fontSize: '26px', color: '#F0F2F7', margin: '0 0 10px' }}>You're on the list.</h3>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', color: 'rgba(240,242,247,0.45)', lineHeight: 1.6, margin: 0 }}>
              We'll be in touch when your Summit opens up. The ascent begins soon.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '60px',
        right: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '16px', color: 'rgba(240,242,247,0.25)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.18)' }}>&copy; 2025 Klime</span>
      </div>
    </div>
  )
}
