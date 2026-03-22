import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function UpcomingSummits() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <main style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 40px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '560px' }}
      >
        {/* Tag */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'Sora,sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.78)',
            marginBottom: '28px',
          }}
        >
          Coming soon
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease }}
          style={{
            fontFamily: '"DM Serif Display",serif',
            fontSize: 'clamp(36px,5vw,68px)',
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: '0 0 20px',
            fontWeight: 400,
            textShadow: '0 2px 20px rgba(0,0,0,0.28)',
          }}
        >
          Summits are coming.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.55 }}
          style={{
            fontFamily: 'Sora,sans-serif',
            fontSize: 'clamp(14px,1.5vw,17px)',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.68,
            margin: '0 0 44px',
            textShadow: '0 1px 8px rgba(0,0,0,0.18)',
          }}
        >
          We are building something worth showing up for. Sign up below and you will be the first to know when your field opens.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5, ease }}
          style={{ width: '100%', maxWidth: '380px' }}
        >
          {!done ? (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.88)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '4px',
                  padding: '15px 18px',
                  fontFamily: 'Sora,sans-serif',
                  fontSize: '14px',
                  color: '#0D0F14',
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'border-color 0.18s, box-shadow 0.18s',
                }}
                onFocus={e => { e.target.style.borderColor = '#2B5BFF'; e.target.style.boxShadow = '0 0 0 3px rgba(43,91,255,0.12)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = '' }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  fontFamily: 'Sora,sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#fff',
                  background: '#2B5BFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(43,91,255,0.38)',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.52)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
              >
                Notify Me
              </button>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                No spam. Just your Summit.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRadius: '8px',
                padding: '36px 40px',
              }}
            >
              <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '26px', color: '#0D0F14', margin: '0 0 10px' }}>
                You are on the list.
              </h3>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', color: '#758090', lineHeight: 1.65, margin: 0 }}>
                We will be in touch when your Summit opens. The ascent begins soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  )
}
