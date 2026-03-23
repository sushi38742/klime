import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { submitAscendingInterest } from '../lib/supabase'

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

export default function Ascending() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | loading | done | error

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
      <section style={{ minHeight: 'calc(60vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 40px 80px' }}>
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
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600, color: '#2B5BFF', border: '1.5px solid rgba(43,91,255,0.5)', borderRadius: '3px', padding: '6px 14px', background: 'rgba(43,91,255,0.12)', letterSpacing: '0.04em', alignSelf: 'flex-end', marginBottom: '12px' }}>
                $40 / session
              </span>
            </div>
            <p style={{ ...BODY, fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '580px', margin: '0 0 12px', color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
              This is what Klime is actually built for.
            </p>
            <p style={{ ...BODY, maxWidth: '560px', margin: 0, color: 'rgba(255,255,255,0.78)' }}>
              You pick a Guide. They build a curriculum from scratch — specifically around your goals — before you ever meet. One room. Two people. Forty minutes that exist for no one else.
            </p>
          </motion.div>
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

      {/* ── FEATURES ── */}
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

      {/* ── WAITLIST ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ maxWidth: '560px' }}>
              <h2 style={{ ...HL, fontSize: 'clamp(26px,3.5vw,46px)', margin: '0 0 16px', letterSpacing: '-0.8px', lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
                Guides are coming.
              </h2>
              <p style={{ ...MUTED, margin: '0 0 32px', fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>
                Ascending sessions open as Guides are verified. Leave your email and you will be the first to know when a Guide in your field is live.
              </p>

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
                    style={{ flex: 1, minWidth: '220px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '4px', padding: '13px 16px', fontFamily: 'Sora,sans-serif', fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.16s' }}
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

              <p style={{ ...MUTED, fontSize: '12px', margin: '20px 0 0', color: 'rgba(255,255,255,0.35)' }}>
                In the meantime, start with a free Summit.{' '}
                <Link to="/upcoming-summits" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Book an intro meeting →
                </Link>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.75)' }}>Klime</span>
        <Link to="/legal" style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Legal</Link>
        <Link to="/contact" style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Contact</Link>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>&copy; 2026 Klime</span>
      </footer>

    </main>
  )
}
