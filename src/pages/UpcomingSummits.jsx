import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.22)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

export default function UpcomingSummits() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 40px 56px' }}>
        <div className="wrap-pad" style={wrap}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', margin: '0 0 20px' }}
          >
            Summits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ ...HL, fontSize: 'clamp(36px,5vw,68px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 16px', maxWidth: '720px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            This week's summits.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: '520px' }}
          >
            Free intro meetings with the Klime founders. Pick a time that works, show up, and ask anything.
          </motion.p>
        </div>
      </section>

      {/* ── TIME ZONE NOTE ── */}
      <section style={{ padding: '0 40px 16px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '6px', padding: '12px 18px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
                Currently US-based time slots. International sessions coming soon. Multiple sessions run throughout the week — find one that fits your schedule.
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRIMARY: RYAN ── */}
      <section style={{ padding: '0 40px 0' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{
              borderTop: HAIR,
              marginTop: '40px',
              padding: '56px 0 64px',
            }}>
              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                  Intro Meeting
                </span>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '3px 9px', letterSpacing: '0.04em' }}>
                  Free
                </span>
              </div>

              {/* Two-col layout */}
              <div className="summit-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>

                {/* Left */}
                <div>
                  <h2 style={{ ...HL, fontSize: 'clamp(34px,4.5vw,60px)', lineHeight: 1.05, letterSpacing: '-1.2px', margin: '0 0 24px', textShadow: '0 2px 20px rgba(0,0,0,0.32)' }}>
                    Intro Meeting with Ryan
                  </h2>

                  <div style={{ marginBottom: '28px' }}>
                    <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 6px', color: 'rgba(255,255,255,0.5)' }}>Your Host</p>
                    <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.88)', margin: 0 }}>Ryan — Co-Founder, Klime</p>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div>
                      <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', color: 'rgba(255,255,255,0.5)' }}>When</p>
                      <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>Multiple times this week</p>
                    </div>
                    <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.18)' }} />
                    <div>
                      <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', color: 'rgba(255,255,255,0.5)' }}>Capacity</p>
                      <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>10 spots per session</p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div>
                  <p style={{ ...BODY, fontSize: '16px', margin: '0 0 32px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.75 }}>
                    A casual, no-pressure session where Ryan walks you through exactly what Klime is, how Summits and Ascending work, and answers any questions you have before your first session. Come curious. No prep needed.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                    {[
                      'What Klime is and why we built it',
                      'How Summits work — what to expect in the room',
                      'What makes Ascending different',
                      'Open Q&A — nothing is off limits',
                    ].map((d, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0, marginTop: '8px' }} />
                        <span style={{ ...BODY, fontSize: '15px' }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#notify"
                    style={{
                      fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 600,
                      color: '#fff', background: '#2B5BFF', textDecoration: 'none',
                      borderRadius: '4px', padding: '15px 36px', display: 'inline-block',
                      transition: 'all 0.18s ease',
                      boxShadow: '0 4px 24px rgba(43,91,255,0.42)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(43,91,255,0.6)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(43,91,255,0.42)' }}
                  >
                    Reserve my spot
                  </a>
                </div>

              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECONDARY: MAX ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp delay={0.08}>
            <div style={{ borderTop: HAIR, padding: '28px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', color: 'rgba(255,255,255,0.4)' }}>Also this week</p>
                    <p style={{ ...HL, fontSize: 'clamp(17px,2vw,22px)', margin: 0, color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.3px' }}>Intro Meeting with Max</p>
                  </div>
                  <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.14)' }} />
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.48)', margin: 0, maxWidth: '360px', lineHeight: 1.6 }}>
                    Same session, different time slots — if Ryan's times don't work for you.
                  </p>
                </div>
                <a
                  href="#notify"
                  style={{
                    fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500,
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px',
                    padding: '10px 22px', display: 'inline-block', transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                >
                  Reserve a spot
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── EMAIL NOTIFY ── */}
      <section id="notify" style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={{ ...wrap, maxWidth: '560px' }}>
          <FadeUp>
            <div style={{ borderTop: HAIR, paddingTop: '64px', textAlign: 'center' }}>
              <h2 style={{ ...HL, fontSize: 'clamp(26px,3.5vw,44px)', margin: '0 0 12px', letterSpacing: '-0.8px' }}>
                Reserve your spot.
              </h2>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.80)', margin: '0 0 36px' }}>
                Drop your email and we will send you the time options before spots open to the public.
              </p>

              {!done ? (
                <form
                  onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto' }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.4)',
                      borderRadius: '4px', padding: '15px 18px', fontFamily: 'Sora,sans-serif', fontSize: '14px',
                      color: '#0D0F14', outline: 'none', textAlign: 'center', transition: 'border-color 0.18s, box-shadow 0.18s', boxSizing: 'border-box',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#2B5BFF'; e.target.style.boxShadow = '0 0 0 3px rgba(43,91,255,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = '' }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%', fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500,
                      color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px',
                      padding: '15px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(43,91,255,0.38)', transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.52)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
                  >
                    Send me the times
                  </button>
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                    No spam. Just your session.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                  style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '36px 40px', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <h3 style={{ ...HL, fontSize: '26px', margin: '0 0 10px' }}>You are on the list.</h3>
                  <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.78)', margin: 0 }}>
                    We will send you the available times shortly. The ascent begins soon.
                  </p>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-row" style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.75)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>&copy; 2026 Klime</span>
      </footer>

    </main>
  )
}
