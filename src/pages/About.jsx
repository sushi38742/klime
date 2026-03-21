import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#0D0F14', fontWeight: 400 }
const BODY  = { fontFamily: 'Sora,sans-serif', color: '#3a4a5e', fontSize: '14px', lineHeight: 1.8 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: '#758090', fontSize: '13px', lineHeight: 1.65 }
const HAIR  = '1px solid rgba(13,15,20,0.1)'

export default function About() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 24px' }}
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(36px,5.5vw,72px)', color: '#fff', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 28px', maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            Klime was built by two students who were tired of being told to just network.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(14px,1.6vw,17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.72, margin: 0, maxWidth: '520px', textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}
          >
            We are both 18. We have both watched talented people get passed over because they did not know the right person. Klime exists because we decided to fix that instead of waiting for someone else to.
          </motion.p>
        </div>
      </section>

      {/* ── FOUNDERS ── white editorial panel ── */}
      <section style={{ background: 'rgba(255,255,255,0.96)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 40px 96px' }}>

          {/* Ryan */}
          <FadeUp>
            <div style={{ borderTop: HAIR, paddingTop: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '60px' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ ...HL, fontSize: '28px', margin: '0 0 8px', letterSpacing: '-0.3px' }}>Ryan Inozemcev</h2>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: '#2B5BFF', textTransform: 'uppercase', margin: '0 0 28px' }}>
                  Co-Founder · Product, Technology and Brand
                </p>
                <p style={{ ...BODY, margin: 0, maxWidth: '600px' }}>
                  Ryan built Klime from nothing — the product, the platform, the brand, and every line of design you see here. Before Klime he founded CollegeConnekt at 16, which grew to 16,000 students across 50 states and 9 countries without funding or a team. He is studying Computer Science at the University of Florida and has been building things since before he could drive.
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                {[
                  { value: '16,000+', label: 'CollegeConnekt users'        },
                  { value: '50',      label: 'states reached'               },
                  { value: '2',       label: 'companies founded before 18'  },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? '28px' : 0, textAlign: 'right' }}>
                    <div style={{ ...HL, fontSize: '30px', lineHeight: 1, letterSpacing: '-0.5px' }}>{s.value}</div>
                    <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', color: '#9aabb8', marginTop: '4px', lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Max */}
          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR, paddingTop: '56px', marginTop: '56px' }}>
              <h2 style={{ ...HL, fontSize: '28px', margin: '0 0 8px', letterSpacing: '-0.3px' }}>Max Korotkiy</h2>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: '#2B5BFF', textTransform: 'uppercase', margin: '0 0 28px' }}>
                Co-Founder · Curriculum and Guide Partnerships
              </p>
              <p style={{ ...BODY, margin: 0, maxWidth: '600px' }}>
                Max leads the human side of Klime — the curriculum that makes every Ascending session worth paying for, and the Guide relationships that make the platform real. He founded CyberSpace Society at West Boca and is studying Computer Science at the University of Florida.
              </p>
            </div>
          </FadeUp>

          {/* Closing */}
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(18px,2.2vw,26px)', color: 'rgba(13,15,20,0.3)', fontStyle: 'italic', textAlign: 'center', margin: '80px 0 0', fontWeight: 400 }}>
              Built in Florida. Built for everyone who was told to wait their turn.
            </p>
          </FadeUp>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.15)', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.45)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>&copy; 2025 Klime</span>
      </footer>

    </main>
  )
}
