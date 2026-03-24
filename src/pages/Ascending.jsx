import { useState } from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { POLICY_CARDS } from '../data/policyPages'
import PolicyCard from '../components/PolicyCard'

const ease = [0.16, 1, 0.3, 1]
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const JEFF = {
  tags: ['Mathematics', 'Tutoring', 'Education Business'],
  title: 'Math, Test Prep and Building in Education',
  name: 'Jeff Stern',
  role: 'Founder & Executive Director, E2 Services',
  quals: [
    { label: 'Education', body: 'M.S. Mathematics\nM.S. Specialized Engineering\nM.S. Education' },
    { label: 'Results', body: 'Has brought students to 800 on SAT Math and 36 on ACT. Works one-on-one across every level from middle school through graduate programs.' },
    { label: 'Background', body: 'Founded E2 Services in Brooklyn in 2015 with no outside funding. Built it into one of the tri-state area\'s most respected academic support organizations.' },
    { label: 'Known for', body: 'Proprietary teaching methodologies and an award-winning mentorship program built entirely in-house.' },
  ],
  skills: [
    'One-on-one math tutoring tailored to your exact level and gaps',
    'Higher-level math advising: pre-calc, calculus, linear algebra and beyond',
    'SAT and ACT Math prep with a proven track record of 800s and 36s',
    'Study method coaching so you stop grinding and start actually improving',
    'Guidance on starting and running an education or tutoring business',
    'Direct LinkedIn connection to Jeff included with every session',
  ],
}

function GuideCard({ guide }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.13)', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>

      {/* Top bar: tags + price */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {guide.tags.map(t => (
            <span key={t} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '100px', padding: '3px 11px' }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#2B5BFF' }}>
          $40 per session
        </span>
      </div>

      {/* Identity row: title + name + expand toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', textAlign: 'left' }}
      >
        <div>
          <h2 style={{ ...HL, fontSize: 'clamp(18px,2.2vw,26px)', lineHeight: 1.15, letterSpacing: '-0.4px', margin: '0 0 10px' }}>
            {guide.title}
          </h2>
          <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', margin: '0 0 2px' }}>
            {guide.name}
          </p>
          <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {guide.role}
          </p>
        </div>
        <div style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px', transition: 'transform 0.22s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Body: quals left, skills right */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1.5fr' }}>

              <div style={{ padding: '24px', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {guide.quals.map(q => (
                  <div key={q.label}>
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: '0 0 7px' }}>
                      {q.label}
                    </p>
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.72, whiteSpace: 'pre-line' }}>
                      {q.body}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ padding: '24px' }}>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: '0 0 14px' }}>
                  What this covers
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {guide.skills.map((s, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(43,91,255,0.6)', flexShrink: 0, marginTop: '8px' }} />
                      <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.68 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CTA footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '11px 26px', boxShadow: '0 4px 20px rgba(43,91,255,0.38)', transition: 'all 0.18s ease', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.54)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
              >
                Book a session
              </Link>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>
                Curriculum built fresh. Connection included.
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default function Ascending() {
  return (
    <main>

      {/* ── GUIDE DIRECTORY HEADER ── */}
      <section style={{ padding: '100px 40px 0' }}>
        <div className="wrap-pad" style={wrap}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 14px' }}>
              Guide directory
            </p>
            <h1 style={{ ...HL, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.05, letterSpacing: '-1.5px', margin: '0 0 20px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}>
              Book a session.
            </h1>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '480px', lineHeight: 1.7 }}>
              Pick a Guide. Every session is built fresh for you and ends with a direct connection to the person who ran it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GUIDE CARDS ── */}
      <section style={{ padding: '56px 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <GuideCard guide={JEFF} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POLICY CARDS ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 8px' }}>
              Policy
            </p>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
              Questions about cancellations, refunds, conduct, or accessibility. Every policy has its own page.
            </p>
          </FadeUp>
          <div style={{ marginTop: '8px' }}>
            {POLICY_CARDS.map((card, i) => (
              <PolicyCard key={card.slug} {...card} i={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </main>
  )
}
