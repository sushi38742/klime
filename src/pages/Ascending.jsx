import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { POLICY_CARDS } from '../data/policyPages'
import PolicyCard from '../components/PolicyCard'

const ease = [0.16, 1, 0.3, 1]
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const JEFF = {
  tags: ['Mathematics', 'Tutoring', 'Education Business'],
  title: 'Math, Test Prep and Building in Education',
  name: 'Jeff Stern',
  role: 'Founder & Executive Director, E2 Services',
  quals: [
    { label: 'Education', body: 'M.S. Mathematics\nM.S. Specialized Engineering\nM.S. Education' },
    { label: 'Results', body: 'Has brought students to 800 on SAT Math and 36 on ACT. Works one-on-one as a tutor and has built curriculum used across every level from middle school through graduate programs.' },
    { label: 'Background', body: 'Founded E2 Services in Brooklyn in 2015 with no outside funding. No investors, no safety net. Built it into one of the tri-state area\'s most respected academic support organizations.' },
    { label: 'Known for', body: 'Proprietary teaching methodologies and an award-winning mentorship program built entirely in-house.' },
  ],
  skills: [
    'How to actually understand math, not just memorize steps and hope they show up on the test',
    'A method for working through problems when you\'re stuck, so you\'re not dependent on someone else to unblock you',
    'What it looks like to build something real, from someone who started with nothing and made it work',
    'How to think about your future without it feeling abstract or out of reach',
    'The difference between studying hard and studying right, and how to make that switch',
    'How to walk into a high-stakes exam, an interview, or a conversation with someone important and actually feel ready',
  ],
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
            {/* Jeff Stern card */}
            <div style={{ border: '1px solid rgba(255,255,255,0.13)', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>

              {/* Card top bar: tags + price */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {JEFF.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: '100px', padding: '4px 12px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#2B5BFF', letterSpacing: '0.02em' }}>
                  $40 per session
                </span>
              </div>

              {/* Card identity: title + guide name */}
              <div style={{ padding: '32px 28px 28px' }}>
                <h2 style={{ ...HL, fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.12, letterSpacing: '-0.5px', margin: '0 0 14px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
                  {JEFF.title}
                </h2>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', margin: '0 0 3px' }}>
                  {JEFF.name}
                </p>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                  {JEFF.role}
                </p>
              </div>

              {/* Card body: quals left, skills right */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1.5fr' }}>

                {/* Qualifications */}
                <div style={{ padding: '28px', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {JEFF.quals.map(q => (
                    <div key={q.label}>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px' }}>
                        {q.label}
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.58)', margin: 0, lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                        {q.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills + connection callout */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 16px' }}>
                    What you leave with
                  </p>
                  <ul style={{ margin: '0 0 28px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    {JEFF.skills.map((s, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(43,91,255,0.65)', flexShrink: 0, marginTop: '9px' }} />
                        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{s}</span>
                      </li>
                    ))}
                  </ul>

                  {/* LinkedIn callout */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '6px', padding: '14px 16px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.6 }}>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="9" width="4" height="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: '0 0 4px' }}>
                        Included: a direct LinkedIn connection to Jeff
                      </p>
                      <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.42)', margin: 0, lineHeight: 1.6 }}>
                        A real one, not a form email. Most students your age don't have a line to someone who has built what he has built. Now you do.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card footer: CTA */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <Link
                  to="/contact"
                  style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px', boxShadow: '0 4px 20px rgba(43,91,255,0.38)', transition: 'all 0.18s ease', display: 'inline-block' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.54)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
                >
                  Book a session
                </Link>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                  Curriculum built fresh. Connection included.
                </span>
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
