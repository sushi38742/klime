import Footer from '../components/Footer'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { submitAscendingInterest } from '../lib/supabase'
import { POLICY_CARDS } from '../data/policyPages'
import PolicyCard from '../components/PolicyCard'

const ease = [0.16, 1, 0.3, 1]
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const FEATURES = [
  { label: 'Private', body: 'One room. You and your Guide. Nobody else.' },
  { label: 'Built for you', body: 'Your Guide builds new curriculum from scratch around your goals before you ever meet. It has never been used before and will never be used again.' },
  { label: 'Direct connection', body: 'You leave with a real professional introduction — not a LinkedIn request, an actual relationship with someone who has been where you want to go.' },
  { label: '$40 per session', body: 'One flat rate. No subscription, no hidden fees. Pay per session, stop whenever you want.' },
]

const E2_TOPICS = [
  'SAT & ACT Preparation',
  'Mathematics (Elementary → Graduate)',
  'Sciences',
  'Teacher Certification Exams',
  'College Application Strategy',
  'Academic Mentorship',
]

export default function Ascending() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  async function submit(e) {
    e.preventDefault()
    setState('loading')
    try {
      await submitAscendingInterest(email.trim().toLowerCase())
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(55vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span style={{ ...HL, fontSize: 'clamp(42px,6vw,80px)', lineHeight: 1, letterSpacing: '-2px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}>
                Ascending
              </span>
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#2B5BFF', border: '1.5px solid rgba(43,91,255,0.5)', borderRadius: '3px', padding: '6px 14px', background: 'rgba(43,91,255,0.12)', letterSpacing: '0.04em', alignSelf: 'flex-end', marginBottom: '12px' }}>
                $40 / session
              </span>
            </div>
            <p style={{ ...BODY, fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '580px', margin: '0 0 12px', color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
              One Guide. One student. Forty minutes built for no one else.
            </p>
            <p style={{ ...BODY, maxWidth: '520px', margin: 0, color: 'rgba(255,255,255,0.72)' }}>
              Pick a Guide. They build your curriculum from scratch before you ever meet — around your goals, your gaps, your situation. Nothing recycled.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GUIDES HEADER ── */}
      <section style={{ padding: '0 40px 0' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ borderTop: HAIR, paddingTop: '52px', paddingBottom: '40px' }}>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 10px' }}>
                Available now
              </p>
              <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,38px)', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.22)' }}>
                Guides you can book today.
              </h2>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── E2 SERVICES GUIDE CARD ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ borderTop: HAIR, padding: '52px 0' }}>
              <div className="guide-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.55fr', gap: '80px', alignItems: 'start' }}>

                {/* Left col */}
                <div>
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px' }}>
                    Education · Tri-State Area
                  </p>
                  <h3 style={{ ...HL, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.1, letterSpacing: '-0.7px', margin: '0 0 20px', textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
                    E2 Services
                  </h3>
                  <div style={{ marginBottom: '28px' }}>
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 6px' }}>
                      Your Guide
                    </p>
                    <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.82)', margin: '0 0 4px' }}>
                      Mr. Stern, Executive Director
                    </p>
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
                      M.S. Mathematics &nbsp;&middot;&nbsp; M.S. Specialized Engineering &nbsp;&middot;&nbsp; M.S. Education
                    </p>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '4px', padding: '8px 16px' }}>
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>Founded 2015 &nbsp;&middot;&nbsp; Brooklyn, NY</span>
                  </div>
                </div>

                {/* Right col */}
                <div>
                  <p style={{ ...BODY, fontSize: '15px', margin: '0 0 28px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.75 }}>
                    E2 Services has spent a decade building one of the tri-state area's most respected academic support organizations. Under Mr. Stern — who holds three master's degrees across mathematics, engineering, and education — they have developed proprietary teaching methodologies that consistently move the needle for students from elementary school through graduate programs. Their award-winning mentorship model is built around peer-to-peer learning and individualized instruction.
                  </p>

                  {/* Topic pills */}
                  <div style={{ marginBottom: '36px' }}>
                    <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>
                      Book a session around
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {E2_TOPICS.map(t => (
                        <span
                          key={t}
                          style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.72)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px', padding: '6px 14px' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <Link
                      to="/contact"
                      style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '13px 32px', boxShadow: '0 4px 20px rgba(43,91,255,0.38)', transition: 'all 0.18s ease', display: 'inline-block' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.54)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
                    >
                      Book a session — $40
                    </Link>
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em' }}>
                      Spots are limited. Curriculum is built fresh for you.
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 99% STAT ── */}
      <section style={{ padding: '0 40px 80px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ borderTop: HAIR, borderBottom: HAIR, padding: '48px 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'center' }}>
              <div style={{ ...HL, fontSize: 'clamp(64px,8vw,100px)', lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>99%</div>
              <p style={{ ...BODY, margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.82)' }}>
                of students in pre-testing scheduled a follow-up session with their Guide. The ones who didn't had already gotten exactly what they came for.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 56px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              How it works.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ padding: '36px 48px 36px 0', borderTop: HAIR, paddingRight: i % 2 === 0 ? '48px' : '0', paddingLeft: i % 2 === 1 ? '48px' : '0', borderLeft: i % 2 === 1 ? HAIR : 'none' }}>
                  <p style={{ ...HL, fontSize: '20px', margin: '0 0 12px', letterSpacing: '-0.3px' }}>{f.label}</p>
                  <p style={{ ...MUTED, margin: 0, fontSize: '14px', lineHeight: 1.7 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MORE GUIDES COMING ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ borderTop: HAIR, paddingTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>
                  Coming soon
                </p>
                <h2 style={{ ...HL, fontSize: 'clamp(22px,2.5vw,34px)', margin: '0 0 14px', letterSpacing: '-0.4px', lineHeight: 1.15, textShadow: '0 2px 14px rgba(0,0,0,0.22)' }}>
                  More Guides are being verified.
                </h2>
                <p style={{ ...MUTED, margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>
                  Every Guide goes through a manual review before they can host. Leave your email and we'll notify you when someone in your field goes live.
                </p>
              </div>
              <div style={{ paddingTop: '4px' }}>
                {state === 'done' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(43,91,255,0.22)', border: '1px solid rgba(43,91,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3.5 3.5 5.5-6.5" stroke="#2B5BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p style={{ ...BODY, margin: 0, fontSize: '15px' }}>You're on the list. We'll be in touch.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      required
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
                      style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '4px', padding: '13px 16px', fontFamily: 'Sora,sans-serif', fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.16s' }}
                      onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.22)' }}
                    />
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600, color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px', padding: '13px 28px', cursor: state === 'loading' ? 'wait' : 'pointer', opacity: state === 'loading' ? 0.7 : 1, boxShadow: '0 4px 18px rgba(43,91,255,0.38)', transition: 'all 0.18s ease', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { if (state !== 'loading') { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,91,255,0.52)' } }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(43,91,255,0.38)' }}
                    >
                      {state === 'loading' ? 'Saving…' : 'Notify me'}
                    </button>
                    {state === 'error' && (
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: '#f87171', margin: '4px 0 0', width: '100%' }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', margin: '16px 0 0', color: 'rgba(255,255,255,0.32)' }}>
                  Or start with a free Summit while you wait.{' '}
                  <Link to="/upcoming-summits" style={{ color: 'rgba(255,255,255,0.52)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    Book an intro meeting →
                  </Link>
                </p>
              </div>
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
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: '0 0 0', maxWidth: '480px', lineHeight: 1.6 }}>
              Questions about cancellations, refunds, conduct, or accessibility — every policy has its own page.
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
