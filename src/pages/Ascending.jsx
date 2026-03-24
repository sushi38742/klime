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
  'How to approach and break down complex math problems at any level',
  'What it actually takes to start an education business with no external funding',
  'How to price, structure, and sell tutoring services',
  'Building and managing a team of instructors from scratch',
  'Growing a client base from your very first student',
  'Developing your own curriculum and teaching methodology',
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
                    What you will learn
                  </p>
                  <ul style={{ margin: '0 0 36px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {SKILLS.map((s, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)', flexShrink: 0, marginTop: '8px' }} />
                        <span style={{ ...MUTED, fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{s}</span>
                      </li>
                    ))}
                  </ul>

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
                      Curriculum is built fresh for you.
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
