import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import BookingFlow from '../components/BookingFlow'
import FAQS from '../data/summitsFaq'
import { getBookingByEmail } from '../lib/supabase'
import { HOSTS } from '../data/summitSlots'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.22)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const SUMMITS = [
  {
    key: 'ryan',
    title: 'Intro Meeting with Ryan',
    host: 'Ryan — Co-Founder, Klime',
    recommended: true,
    description: 'Ryan built Klime from the ground up. He knows every part of how it works — the Guides, the curriculum, how sessions are structured, and where the whole thing is going. If you want to understand exactly what you are getting into and why it works the way it does, this is the one to start with.',
    details: [
      'Straight from the person who built it',
      'How Summits and Ascending actually work',
      'What to expect from your first session',
      'Open Q&A — Ryan knows the answers',
    ],
  },
  {
    key: 'max',
    title: 'Intro Meeting with Max',
    host: 'Max — Co-Founder, Klime',
    recommended: false,
    description: "Max co-founded Klime and runs the same intro session with a different set of time slots throughout the week. Same content, different schedule — if none of Ryan's times work for you, this is your option.",
    details: [
      'Full walkthrough of how Klime works',
      'What to expect from your first Summit',
      'How Ascending is built around you',
      'Live Q&A with a founder',
    ],
  },
]

function fmtDate(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function AlreadyBooked() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // null | 'not_found' | { host, date, slot, zoomLink }
  const [open, setOpen] = useState(false)

  async function lookup(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const booking = await getBookingByEmail(email.trim().toLowerCase()).catch(() => null)
    if (!booking) {
      setResult('not_found')
    } else {
      const zoomLink = HOSTS[booking.host]?.zoomLink || null
      setResult({ ...booking, zoomLink })
    }
    setLoading(false)
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.82)', padding: '13px 22px', transition: 'all 0.18s ease', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M2.5 7l3.5 3.5 5.5-6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Already booked? Get your join link
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '8px', padding: '24px', maxWidth: '420px' }}>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 14px' }}>
                Retrieve your join link
              </p>
              <form onSubmit={lookup} style={{ display: 'flex', gap: '8px', marginBottom: result ? '16px' : 0 }}>
                <input
                  required
                  type="email"
                  placeholder="Email you booked with"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setResult(null) }}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '4px', padding: '10px 12px', fontFamily: 'Sora,sans-serif', fontSize: '13px', color: '#fff', outline: 'none', transition: 'border-color 0.16s' }}
                  onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px', padding: '10px 18px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, flexShrink: 0 }}
                >
                  {loading ? '…' : 'Find'}
                </button>
              </form>

              {result === 'not_found' && (
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  No booking found for that email.
                </p>
              )}

              {result && result !== 'not_found' && (
                <div>
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '0 0 14px' }}>
                    {fmtDate(result.date)} · {result.slot}
                  </p>
                  {result.zoomLink ? (
                    <a
                      href={result.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '10px 20px', boxShadow: '0 4px 16px rgba(43,91,255,0.38)', transition: 'all 0.18s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(43,91,255,0.52)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(43,91,255,0.38)' }}
                    >
                      Join on Zoom →
                    </a>
                  ) : (
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                      Your join link will be sent to you before the session.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

function FAQRow({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: HAIR }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '20px' }}
      >
        <span style={{ ...HL, fontSize: 'clamp(14px,1.6vw,17px)', textShadow: 'none' }}>{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          width="15" height="15" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0 }}
        >
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ ...BODY, fontSize: '14px', margin: '0 0 20px', maxWidth: '680px', color: 'rgba(255,255,255,0.82)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SummitCard({ summit, i }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeUp delay={i * 0.08}>
      <div style={{ borderTop: HAIR, padding: '52px 0' }}>
        <div className="summit-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
                Intro Meeting
              </span>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '3px 9px', letterSpacing: '0.04em' }}>
                Free
              </span>
            </div>

            <h2 style={{ ...HL, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.1, letterSpacing: '-0.8px', margin: '0 0 20px', textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
              {summit.title}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 6px', color: 'rgba(255,255,255,0.5)' }}>Your Host</p>
              <p style={{ ...BODY, fontSize: '13px', color: 'rgba(255,255,255,0.72)', margin: 0 }}>{summit.host}</p>
            </div>

          </div>

          {/* Right */}
          <div>
            <p style={{ ...BODY, fontSize: '15px', margin: '0 0 28px', color: 'rgba(255,255,255,0.92)' }}>
              {summit.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {summit.details.map((d, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: summit.recommended ? '#2B5BFF' : 'rgba(255,255,255,0.45)', flexShrink: 0, marginTop: '8px' }} />
                  <span style={{ ...BODY, fontSize: '14px', color: summit.recommended ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)' }}>{d}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(o => !o)}
              style={{
                fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500,
                color: '#fff',
                background: open ? 'rgba(255,255,255,0.1)' : summit.recommended ? '#2B5BFF' : 'transparent',
                border: summit.recommended ? (open ? '1.5px solid rgba(255,255,255,0.3)' : 'none') : '1.5px solid rgba(255,255,255,0.3)',
                borderRadius: '4px', padding: '12px 28px', cursor: 'pointer',
                transition: 'all 0.18s ease',
                boxShadow: !open && summit.recommended ? '0 4px 20px rgba(43,91,255,0.38)' : 'none',
              }}
              onMouseEnter={e => {
                if (!open) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  if (summit.recommended) e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.55)'
                  else e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                if (!open) {
                  e.currentTarget.style.boxShadow = summit.recommended ? '0 4px 20px rgba(43,91,255,0.38)' : 'none'
                  if (!summit.recommended) e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {open ? 'Close' : 'Reserve my spot'}
            </button>

            <AnimatePresence>
              {open && (
                <BookingFlow hostKey={summit.key} onClose={() => setOpen(false)} />
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </FadeUp>
  )
}

export default function UpcomingSummits() {
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
        </div>
      </section>


      {/* ── ALREADY BOOKED ── */}
      <section style={{ padding: '0 40px 40px' }}>
        <div className="wrap-pad" style={wrap}>
          <AlreadyBooked />
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          {SUMMITS.map((s, i) => <SummitCard key={s.key} summit={s} i={i} />)}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 36px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
            Questions about the sessions.
          </h2>
          <div style={{ borderTop: HAIR }}>
            {FAQS.map((item, i) => <FAQRow key={i} {...item} />)}
          </div>
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
