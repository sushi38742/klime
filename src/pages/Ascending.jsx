import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { POLICY_CARDS } from '../data/policyPages'
import PolicyCard from '../components/PolicyCard'

const ease = [0.16, 1, 0.3, 1]
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const SKILLS = [
  'A structured method for breaking down math problems — one you can apply on your own after the session',
  'The exact steps Jeff used to go from zero clients to one of the tri-state area\'s most recognized tutoring operations',
  'How to price and package your services so students say yes without hesitation',
  'How to hire, train, and hold instructors accountable without micromanaging',
  'A client acquisition approach that works before you have a reputation to lean on',
  'How to build curriculum that makes students better — not just temporarily prepared',
]

export default function Ascending() {
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
              Forty minutes of real instruction — not advice, not a pep talk. Skills you can use the same day.
            </p>
            <p style={{ ...BODY, maxWidth: '520px', margin: 0, color: 'rgba(255,255,255,0.72)' }}>
              Your Guide builds the curriculum before you ever meet — specific to your level, your gaps, and what you are trying to do. Then they connect with you directly so the conversation doesn't have to end when the session does.
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

      {/* ── JEFF STERN GUIDE CARD ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div style={{ borderTop: HAIR, padding: '52px 0' }}>
              <div className="guide-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.55fr', gap: '80px', alignItems: 'start' }}>

                {/* Left col */}
                <div>
                  {/* Tags — max 2 */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['Mathematics', 'Education Business'].map(t => (
                      <span key={t} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px', padding: '5px 12px', letterSpacing: '0.02em' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Session title */}
                  <h3 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', lineHeight: 1.15, letterSpacing: '-0.6px', margin: '0 0 20px', textShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
                    Mathematics &amp; Building Your Education Business
                  </h3>

                  {/* Guide name + org */}
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.72)', margin: '0 0 4px' }}>
                    Jeff Stern
                  </p>
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    Founder &amp; Executive Director, E2 Services
                  </p>
                </div>

                {/* Right col */}
                <div>
                  {/* Skills */}
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>
                    What you leave with
                  </p>
                  <ul style={{ margin: '0 0 36px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {SKILLS.map((s, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(43,91,255,0.7)', flexShrink: 0, marginTop: '8px' }} />
                        <span style={{ ...MUTED, fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{s}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Included connection callout */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '16px 20px', marginBottom: '32px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }}>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="9" width="4" height="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '0 0 4px' }}>
                        Included: a real connection
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                        Every session ends with a direct LinkedIn connection to your Guide — not a follow request that goes nowhere, but an open line you can actually use.
                      </p>
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
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                      Curriculum built fresh. Connection included.
                    </span>
                  </div>
                </div>

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
