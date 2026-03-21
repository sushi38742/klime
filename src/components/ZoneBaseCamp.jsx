import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(240,242,247,0.15)',
  padding: '14px 0',
  fontFamily: 'Sora,sans-serif',
  fontSize: '14px',
  color: '#F0F2F7',
  outline: 'none',
  textAlign: 'center',
  transition: 'border-color 0.2s',
}

export default function ZoneBaseCamp() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

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
      position: 'relative',
    }}>
      {/* Subtle warmth from campfires below */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '240px',
        background: 'linear-gradient(to top, rgba(255,90,20,0.05), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '14%',
        fontFamily: 'Sora,sans-serif',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(240,242,247,0.28)',
      }}>
        Base Camp
      </div>

      {!done ? (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontFamily: '"DM Serif Display",serif',
              fontSize: 'clamp(32px,4.5vw,64px)',
              color: '#F0F2F7',
              margin: '0 0 10px',
              letterSpacing: '-1px',
              lineHeight: 1.05,
            }}
          >
            Your Summit is waiting.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              fontFamily: 'Sora,sans-serif',
              fontSize: '14px',
              color: 'rgba(240,242,247,0.4)',
              margin: '0 0 44px',
            }}
          >
            Early Climbers get matched first.
          </motion.p>

          <form
            onSubmit={e => { e.preventDefault(); if (firstName && email) setDone(true) }}
            style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            {[
              { placeholder: 'First name', value: firstName, set: setFirstName, type: 'text' },
              { placeholder: 'Email', value: email, set: setEmail, type: 'email' },
            ].map(({ placeholder, value, set, type }, i) => (
              <motion.input
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease }}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => set(e.target.value)}
                required
                style={{ ...inputStyle, marginBottom: '4px' }}
                onFocus={e => e.target.style.borderBottomColor = 'rgba(43,91,255,0.6)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(240,242,247,0.15)'}
              />
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46 }}
              type="submit"
              style={{
                marginTop: '24px',
                width: '100%',
                background: '#2B5BFF',
                border: 'none',
                borderRadius: '4px',
                padding: '15px',
                fontFamily: 'Sora,sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#F0F2F7',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 36px rgba(43,91,255,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              Start Your Ascent
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.22)', margin: '14px 0 0' }}
            >
              Spots are limited. Early Klimers are matched first.
            </motion.p>
          </form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(28px,3.5vw,46px)', color: '#F0F2F7', margin: '0 0 12px' }}>You're on the list.</h3>
          <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', color: 'rgba(240,242,247,0.45)', lineHeight: 1.7, margin: 0, maxWidth: '380px' }}>
            We'll be in touch when your Summit opens up. The ascent begins soon.
          </p>
        </motion.div>
      )}

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: '28px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '32px' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '15px', color: 'rgba(240,242,247,0.2)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.15)' }}>&copy; 2025 Klime</span>
      </div>
    </div>
  )
}
