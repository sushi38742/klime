import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.22)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const SUMMITS = [
  {
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
    title: 'Intro Meeting with Max',
    host: 'Max — Co-Founder, Klime',
    recommended: false,
    description: 'Max co-founded Klime and runs the same intro session with a different set of time slots throughout the week. Same content, different schedule — if none of Ryan\'s times work for you, this is your option.',
    details: [
      'Full walkthrough of how Klime works',
      'What to expect from your first Summit',
      'How Ascending is built around you',
      'Live Q&A with a founder',
    ],
  },
]

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
              {summit.recommended && (
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: '#2B5BFF', background: 'rgba(43,91,255,0.14)', border: '1px solid rgba(43,91,255,0.4)', borderRadius: '3px', padding: '3px 9px', letterSpacing: '0.04em' }}>
                  Start here
                </span>
              )}
            </div>

            <h2 style={{ ...HL, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.1, letterSpacing: '-0.8px', margin: '0 0 20px', textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
              {summit.title}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 6px', color: 'rgba(255,255,255,0.5)' }}>Your Host</p>
              <p style={{ ...BODY, fontSize: '13px', color: 'rgba(255,255,255,0.72)', margin: 0 }}>{summit.host}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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

            <a
              href="#notify"
              style={{
                fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500,
                color: '#fff',
                background: summit.recommended ? '#2B5BFF' : 'transparent',
                border: summit.recommended ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
                textDecoration: 'none',
                borderRadius: '4px', padding: '12px 28px', display: 'inline-block',
                transition: 'all 0.18s ease',
                boxShadow: summit.recommended ? '0 4px 20px rgba(43,91,255,0.38)' : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = summit.recommended ? '0 8px 28px rgba(43,91,255,0.55)' : 'none'
                if (!summit.recommended) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = summit.recommended ? '0 4px 20px rgba(43,91,255,0.38)' : 'none'
                if (!summit.recommended) e.currentTarget.style.background = 'transparent'
              }}
            >
              Reserve my spot
            </a>
          </div>

        </div>
      </div>
    </FadeUp>
  )
}

const FAQS = [
  {
    q: 'What time zone are the sessions in?',
    a: 'Right now all sessions run on US time slots — Eastern, Central, Mountain, and Pacific times are all covered throughout the week. Just pick whichever slot works for your timezone.',
  },
  {
    q: 'I am outside the US. Can I still join?',
    a: 'Klime is starting domestically first and expanding internationally shortly. If you are outside the US, drop your email below and we will reach out as soon as sessions are scheduled in your region.',
  },
  {
    q: 'How many times does each session run per week?',
    a: 'Both Ryan and Max host their intro meetings multiple times throughout the week — mornings, afternoons, and evenings across US time zones. The goal is that at least one slot works for you no matter where you are or what your schedule looks like.',
  },
  {
    q: 'How long is the intro meeting?',
    a: 'About 30 minutes. Ryan or Max walks through what Klime is, how Summits and Ascending work, and takes questions. It moves fast.',
  },
  {
    q: 'Do I need to prepare anything?',
    a: 'Nothing. Show up, listen, and ask whatever you want. The whole point is to answer your questions before you commit to a Summit or an Ascending session.',
  },
  {
    q: 'What is the difference between Ryan\'s session and Max\'s session?',
    a: 'The content is the same. Ryan built Klime and has the deepest context on how everything works — if you can make one of his times, start there. Max runs the same session at different time slots throughout the week for anyone whose schedule does not line up with Ryan\'s.',
  },
  {
    q: 'Can I attend both?',
    a: 'You can, but there is no need to. One session covers everything. Once you have been through an intro meeting you will know exactly what you want to do next.',
  },
  {
    q: 'What happens after the intro meeting?',
    a: 'You can reserve a spot in an upcoming Summit — free, up to 10 students, live with a verified professional in the field you want to explore. From there, Ascending is available if you want a private one-on-one session built specifically around your goals.',
  },
  {
    q: 'Will the intro meeting be recorded?',
    a: 'No. Nothing on Klime is recorded. Every session — intro meetings, Summits, Ascending — is live only. That is the whole point.',
  },
]

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

      {/* ── LISTINGS ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          {SUMMITS.map((s, i) => <SummitCard key={i} summit={s} i={i} />)}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 36px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
            Questions about the sessions.
          </h2>
          <div style={{ borderTop: HAIR }}>
            {FAQS.map((item, i) => <FAQRow key={i} {...item} />)}
          </div>
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
