import Footer from '../components/Footer'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { POLICIES } from '../data/policyPages'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.88)', fontSize: '15px', lineHeight: 1.75 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '720px', margin: '0 auto', padding: '0 40px' }

export default function PolicyDetail() {
  const { slug } = useParams()
  const policy = POLICIES[slug]

  if (!policy) return <Navigate to="/upcoming-summits" replace />

  return (
    <main>

      {/* ── BACK + HERO ── */}
      <section style={{ padding: '80px 40px 64px' }}>
        <div style={wrap}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/upcoming-summits"
              style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '48px' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Summits
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 16px' }}
          >
            {policy.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ ...HL, fontSize: 'clamp(28px,4.5vw,56px)', lineHeight: 1.1, letterSpacing: '-1.2px', margin: '0 0 20px', textShadow: '0 2px 20px rgba(0,0,0,0.28)' }}
          >
            {policy.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: '520px' }}
          >
            {policy.intro}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div style={wrap}>
          {policy.sections.map((section, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div style={{ borderTop: HAIR, padding: '40px 0' }}>
                <h2 style={{ ...HL, fontSize: 'clamp(17px,2vw,22px)', margin: '0 0 20px', letterSpacing: '-0.2px' }}>
                  {section.heading}
                </h2>

                {section.paragraphs && section.paragraphs.map((p, j) => (
                  <p key={j} style={{ ...BODY, margin: '0 0 14px', maxWidth: '600px' }}>{p}</p>
                ))}

                {section.list && (
                  <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.list.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '600px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)', flexShrink: 0, marginTop: '9px' }} />
                        <span style={{ ...BODY, fontSize: '14px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeUp>
          ))}

          {/* ── BOTTOM CTA ── */}
          <FadeUp delay={0.1}>
            <div style={{ borderTop: HAIR, paddingTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <Link
                to="/upcoming-summits"
                style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '11px 26px', transition: 'all 0.18s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,91,255,0.48)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Back to Summits
              </Link>
              <Link
                to="/contact"
                style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
              >
                Still have questions? Contact us →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />

    </main>
  )
}
