import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

const categories = [
  {
    name: 'National Security Advisors',
    desc: 'Former government professionals who navigated the highest levels of defense and intelligence strategy.',
  },
  {
    name: 'Business Leaders',
    desc: 'Executives and founders with 30+ years building companies, managing teams, and closing deals.',
  },
  {
    name: 'Engineers and Technologists',
    desc: 'Senior engineers from top firms who have shipped products used by millions.',
  },
  {
    name: 'Healthcare Professionals',
    desc: 'Physicians, researchers, and administrators shaping the future of medicine and public health.',
  },
  {
    name: 'Finance and Investment',
    desc: 'Portfolio managers, analysts, and advisors who have operated on Wall Street and beyond.',
  },
  {
    name: 'Creative Directors',
    desc: 'Award-winning creatives from agencies, studios, and brands who turned ideas into culture.',
  },
]

const screeningSteps = [
  {
    title: 'AI credential scan',
    desc: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.',
  },
  {
    title: 'Founder review',
    desc: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.',
  },
  {
    title: 'Ongoing monitoring',
    desc: 'After every Summit, AI analyzes Climber feedback. Guides who fall below the bar are flagged and reviewed again before their next session.',
  },
]

export default function ZoneGuides() {
  return (
    <section style={{
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 60px',
      position: 'relative',
    }}>
      {/* Trail marker */}
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '60px',
        fontFamily: 'Sora, sans-serif',
        fontSize: '11px',
        color: 'rgba(240, 242, 247, 0.4)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Base Camp
      </div>

      <FadeIn>
        <h2 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(30px, 4vw, 48px)',
          color: '#F0F2F7',
          margin: '0 0 20px',
          letterSpacing: '-0.5px',
        }}>
          Professionals who have already been there.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '16px',
          color: 'rgba(240, 242, 247, 0.5)',
          maxWidth: '600px',
          lineHeight: 1.7,
          margin: '0 0 60px',
        }}>
          Guides on Klime are not tutors or career coaches. They are senior professionals across industries who show up to share what they know and open real doors.
        </p>
      </FadeIn>

      {/* Categories grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 0,
        maxWidth: '960px',
        marginBottom: '90px',
      }}>
        {categories.map((cat, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: '32px 32px 32px 0',
                paddingLeft: col > 0 ? '32px' : 0,
                borderRight: col < 2 ? '1px solid rgba(240, 242, 247, 0.1)' : 'none',
                borderBottom: row === 0 ? '1px solid rgba(240, 242, 247, 0.1)' : 'none',
              }}>
                <h4 style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: '20px',
                  color: '#F0F2F7',
                  margin: '0 0 10px',
                  lineHeight: 1.2,
                }}>
                  {cat.name}
                </h4>
                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(240, 242, 247, 0.45)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {cat.desc}
                </p>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Screening */}
      <FadeIn>
        <h3 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          color: '#F0F2F7',
          margin: '0 0 48px',
          letterSpacing: '-0.4px',
        }}>
          Every Guide is screened before they ever lead a session.
        </h3>
      </FadeIn>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 0,
        maxWidth: '900px',
      }}>
        {screeningSteps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              padding: '0 32px 0 0',
              paddingLeft: i > 0 ? '32px' : 0,
              borderRight: i < 2 ? '1px solid rgba(240, 242, 247, 0.1)' : 'none',
            }}>
              <h4 style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: '20px',
                color: '#F0F2F7',
                margin: '0 0 12px',
              }}>
                {step.title}
              </h4>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px',
                color: 'rgba(240, 242, 247, 0.45)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {step.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
