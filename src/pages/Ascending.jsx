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
  'How to actually understand math — not just memorize steps and hope they show up on the test',
  'A method for working through problems when you\'re stuck, so you\'re not dependent on someone else to unblock you',
  'What it looks like to build something real — from someone who started with nothing in high school age territory and made it work',
  'How to think about your future without it feeling abstract or out of reach',
  'The difference between studying hard and studying right — and how to make that switch',
  'How to walk into a high-stakes exam, an interview, or a conversation with someone important and actually feel ready',
]

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
            <p style={{ ...BODY, maxWidth: '480px', margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '15px' }}>
              Pick a Guide. Every session is built fresh for you — and ends with a direct connection to the person who ran it.
            </p>
          </motion.div>
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
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>
                    Founder &amp; Executive Director, E2 Services
                  </p>

                  {/* Qualifications */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                        Education
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.75 }}>
                        M.S. Mathematics<br />
                        M.S. Specialized Engineering<br />
                        M.S. Education
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                        Background
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.75 }}>
                        Founded E2 Services in Brooklyn in 2015 with no outside funding — no investors, no safety net. Built it into one of the tri-state area's most respected academic support organizations, working with students at every level from middle school through grad programs. He knows what it's like to be the student and what it takes to build something real.
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                        Known for
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.75 }}>
                        Proprietary teaching methodologies and an award-winning mentorship program built entirely in-house.
                      </p>
                    </div>
                  </div>
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
                        Included: a direct connection to your Guide
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                        Every session ends with a LinkedIn connection to Jeff — a real one, not a form email. Most students your age don't have a line to someone who's built what he's built. Now you do.
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
