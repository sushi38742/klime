import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.22)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const SUMMITS = [
  {
    field: 'Cybersecurity',
    title: 'How to Think Like a Hacker',
    guide: 'A verified cybersecurity professional — red teamer, penetration tester, or national infrastructure defender. Guide announced before registration opens.',
    description: 'This is not a course on memorizing CVEs. This Summit covers how real attackers think — the mental model, the reconnaissance, the patience. Whether you want to break into security professionally or just understand what you are actually up against, this is the session to be in.',
    details: ['Attack surface thinking', 'How real breaches actually happen', 'Breaking in as a career — what it actually takes', 'Live Q&A with a working professional'],
    date: 'Coming soon',
    spots: '10 spots',
  },
  {
    field: 'National Security',
    title: 'Spy Skills — How Intelligence Actually Works',
    guide: 'A former intelligence officer or national security professional with direct operational experience. Guide identity revealed to registered students.',
    description: 'What the CIA, NSA, and DIA actually do — and what the movies get completely wrong. This Summit covers the real tradecraft: how intelligence is collected, analyzed, and acted on, and what a career in national security looks like from the inside.',
    details: ['How HUMINT, SIGINT, and OSINT actually work', 'The career paths nobody talks about', 'What clearances mean and how to get one', 'How decisions get made at the highest levels'],
    date: 'Coming soon',
    spots: '10 spots',
  },
]

function SummitCard({ summit, i }) {
  return (
    <FadeUp delay={i * 0.1}>
      <div style={{ borderTop: HAIR, padding: '52px 0' }}>
        <div className="summit-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>

          {/* Left — meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                {summit.field}
              </span>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '3px 9px', letterSpacing: '0.04em' }}>
                Free
              </span>
            </div>

            <h2 style={{ ...HL, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.1, letterSpacing: '-0.8px', margin: '0 0 20px', textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
              {summit.title}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 6px', color: 'rgba(255,255,255,0.5)' }}>Your Guide</p>
              <p style={{ ...BODY, fontSize: '13px', color: 'rgba(255,255,255,0.72)', margin: 0 }}>{summit.guide}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div>
                <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', color: 'rgba(255,255,255,0.5)' }}>Date</p>
                <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>{summit.date}</p>
              </div>
              <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.18)' }} />
              <div>
                <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', color: 'rgba(255,255,255,0.5)' }}>Capacity</p>
                <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>{summit.spots}</p>
              </div>
            </div>
          </div>

          {/* Right — description */}
          <div>
            <p style={{ ...BODY, fontSize: '15px', margin: '0 0 28px', color: 'rgba(255,255,255,0.92)' }}>
              {summit.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {summit.details.map((d, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0, marginTop: '8px' }} />
                  <span style={{ ...BODY, fontSize: '14px' }}>{d}</span>
                </div>
              ))}
            </div>

            <a
              href="#notify"
              style={{
                fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500,
                color: '#fff', background: '#2B5BFF', textDecoration: 'none',
                borderRadius: '4px', padding: '12px 28px', display: 'inline-block',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              Reserve my spot
            </a>
          </div>

        </div>
      </div>
    </FadeUp>
  )
}

export default function UpcomingSummits() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 40px 72px' }}>
        <div className="wrap-pad" style={wrap}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', margin: '0 0 20px' }}
          >
            Upcoming Summits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ ...HL, fontSize: 'clamp(36px,5vw,68px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 16px', maxWidth: '720px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            Two Summits. Free. Limited to ten.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: '520px' }}
          >
            Live sessions with verified professionals. Dates announced to registered students first. Reserve your spot below.
          </motion.p>
        </div>
      </section>

      {/* ── SUMMIT LISTINGS ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          {SUMMITS.map((s, i) => <SummitCard key={i} summit={s} i={i} />)}
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
                Dates go to registered students first. Enter your email and we will reach out before spots open to the public.
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
                  style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '36px 40px', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <h3 style={{ ...HL, fontSize: '26px', margin: '0 0 10px' }}>You are on the list.</h3>
                  <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.78)', margin: 0 }}>
                    We will reach out before spots open. The ascent begins soon.
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
