import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

// ─── Text on mountain — all light ───
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY  = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.92)', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.82)', fontSize: '13px', lineHeight: 1.65 }
const HAIR  = '1px solid rgba(255,255,255,0.18)'
const wrap  = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

// ─── Wave of professionals ───
const PROF_ROWS = [
  ['Tech Founder', 'Investment Banker', 'Neurosurgeon', 'Film Director', 'Venture Capitalist', 'Naval Intelligence Officer'],
  ['Aerospace Engineer', 'Cardiac Surgeon', 'Portfolio Manager', 'War Correspondent', 'Diplomat', 'Intelligence Analyst'],
  ['Private Equity Partner', 'Climate Scientist', 'Nuclear Engineer', 'Brand Strategist', 'Biotech CEO', 'Cryptographer'],
  ['Criminal Defense Attorney', 'Marine Biologist', 'Art Director', 'Epidemiologist', 'Formula 1 Engineer', 'Forensic Accountant'],
  ['Quantum Physicist', 'Defense Contractor', 'Sports Agent', 'Central Banker', 'UN Policy Advisor', 'Government Advisor'],
]
const SPEEDS = ['32s', '26s', '36s', '28s', '30s']

function WaveProfessionals() {
  return (
    <div style={{ overflow: 'hidden', padding: '8px 0 48px', position: 'relative' }}>
      {PROF_ROWS.map((row, i) => {
        const reverse = i % 2 === 1
        const waveDelay = `${-i * 1}s`
        return (
          <div
            key={i}
            style={{
              overflow: 'hidden',
              marginBottom: '4px',
              animation: `wave-bob 5s ease-in-out infinite`,
              animationDelay: waveDelay,
            }}
          >
            <div style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              width: 'max-content',
              animation: `${reverse ? 'marquee-rev' : 'marquee-fwd'} ${SPEEDS[i]} linear infinite`,
            }}>
              {[0, 1].map(n => (
                <span key={n} style={{ display: 'inline-flex' }}>
                  {row.map((prof, j) => (
                    <span key={j} style={{
                      fontFamily: '"DM Serif Display",serif',
                      fontSize: i % 2 === 0 ? 'clamp(20px,2.4vw,30px)' : 'clamp(16px,1.8vw,24px)',
                      color: j % 3 === 0 ? 'rgba(255,255,255,0.95)' : j % 3 === 1 ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.82)',
                      padding: '10px 36px',
                      display: 'inline-block',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}>
                      {prof}
                      <span style={{ color: 'rgba(255,255,255,0.18)', paddingLeft: '36px' }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Marquee ───
function Marquee() {
  const text = 'FREE WEEKLY SUMMITS\u00a0\u00a0·\u00a0\u00a0LIVE WITH REAL GUIDES\u00a0\u00a0·\u00a0\u00a0UP TO 10 STUDENTS PER SESSION\u00a0\u00a0·\u00a0\u00a0ASCEND FOR A PRIVATE SESSION\u00a0\u00a0·\u00a0\u00a0'
  return (
    <div style={{ borderTop: HAIR, borderBottom: HAIR, overflow: 'hidden', padding: '12px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[1, 2].map(n => (
          <span key={n} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.68)' }}>
            {text}{text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Stat ───
function Stat({ value, label }) {
  const ref = useRef(); const done = useRef(false)
  useEffect(() => {
    if (done.current || typeof value !== 'number') return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return
      done.current = true
      let start
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 1000, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        if (ref.current) ref.current.textContent = Math.round(eased * value)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [value])
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...HL, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1, marginBottom: '8px', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
        {typeof value === 'number' ? <span ref={ref}>0</span> : value}
      </div>
      <div style={MUTED}>{label}</div>
    </div>
  )
}

// ─── FAQ row — chevron ───
function FAQRow({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: HAIR }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '20px' }}
      >
        <span style={{ ...HL, fontSize: 'clamp(15px,1.8vw,19px)', textShadow: 'none' }}>{q}</span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0 }}
        >
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ ...BODY, margin: '0 0 22px', maxWidth: '680px' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Home() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px 0', position: 'relative' }}>
        {/* Subtle center glow for hero readability */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ ...HL, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 24px', maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,0.28)', position: 'relative' }}
        >
          Free live sessions with professionals who have already made it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ ...BODY, fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,255,255,0.88)', margin: '0 0 40px', maxWidth: '560px', textShadow: '0 1px 8px rgba(0,0,0,0.18)', position: 'relative' }}
        >
          Join a Summit with up to 10 other students and a verified Guide. Then Ascend for a private one on one session with new curriculum built around you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}
        >
          <Link to="/upcoming-summits" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500, color: '#fff',
            background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '14px 32px',
            transition: 'all 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.48)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            Join a Summit
          </Link>
          <Link to="/become-a-guide" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500, color: '#fff',
            textDecoration: 'none', borderRadius: '4px', padding: '14px 32px',
            border: '1.5px solid rgba(255,255,255,0.45)',
            transition: 'all 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = '' }}
          >
            Become a Guide
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '1.5px', height: '24px', background: 'rgba(255,255,255,0.25)' }} />
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* ── WHAT KLIME IS ── */}
      <section className="sec-v" style={{ padding: '100px 40px', }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px', letterSpacing: '-0.5px', maxWidth: '640px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              TED inspires you. MasterClass teaches you. Klime connects you.
            </h2>
            <p style={{ ...BODY, maxWidth: '560px', margin: '0 0 52px' }}>
              We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers. A live room where you talk back, get heard, and leave with a real connection.
            </p>

            <div className="g3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
              {[
                { name: 'MasterClass', accent: false, rows: ['Pre-recorded videos', 'Watch celebrities talk', 'No interaction', 'No personal access'] },
                { name: 'TED',         accent: false, rows: ['Inspiring talks', 'One-way broadcast', 'No follow-up', 'No direct connection'] },
                { name: 'Klime',       accent: true,  rows: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'] },
              ].map((col, i) => (
                <div key={i} style={{ padding: '0 0 0 32px', borderLeft: i > 0 ? HAIR : 'none', paddingLeft: i === 0 ? '0' : '32px' }}>
                  <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: '20px', color: col.accent ? '#2B5BFF' : 'rgba(255,255,255,0.38)', marginBottom: '16px', fontWeight: 400 }}>{col.name}</div>
                  {col.rows.map((r, j) => (
                    <p key={j} style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: col.accent ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.35)', margin: '0 0 9px', lineHeight: 1.6 }}>{r}</p>
                  ))}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="stats-row" style={{ display: 'flex', borderTop: HAIR, borderBottom: HAIR, padding: '48px 0' }}>
              {[
                { value: 10,    label: 'Students per Summit' },
                { value: 1,     label: 'Verified Guide' },
                { value: 'Live', label: 'Never recorded' },
              ].map((s, i) => (
                <div key={i} className="stats-item" style={{ flex: 1, padding: '0 40px', borderLeft: i > 0 ? HAIR : 'none' }}>
                  <Stat value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TWO WAYS TO CLIMB ── */}
      <section style={{ }}>
        <div className="tw-header-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 80px 0' }}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(26px,3.2vw,42px)', margin: '0 0 8px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              Two ways to climb.
            </h2>
            <p style={{ ...MUTED, margin: '0 0 56px', fontSize: '14px', lineHeight: 1.6 }}>
              One is where you start. The other is what Klime is actually built for.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.08}>
          <div className="tw-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px 80px', display: 'grid', gridTemplateColumns: '2fr 3fr', borderTop: HAIR }}>

            {/* ── SUMMIT — secondary ── */}
            <div className="tw-summit" style={{ padding: '52px 64px 52px 0', borderRight: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ ...HL, fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.7)' }}>Summit</span>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '3px', padding: '4px 10px', marginTop: '6px', letterSpacing: '0.04em' }}>Free</span>
              </div>

              <p style={{ ...BODY, fontSize: '14px', color: 'rgba(255,255,255,0.68)', margin: '0 0 24px', lineHeight: 1.7 }}>
                A free live session with up to nine other students and a verified professional. Real questions, real answers, never recorded. A good place to start — and a glimpse of what Ascending feels like.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Up to 10 students', 'Live — never recorded', '45 minutes', 'Always free'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ASCENDING — dominant ── */}
            <div className="tw-ascending" style={{ padding: '52px 0 52px 64px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ ...HL, fontSize: 'clamp(36px,4.5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px', textShadow: '0 2px 16px rgba(0,0,0,0.22)' }}>Ascending</span>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#2B5BFF', border: '1.5px solid rgba(43,91,255,0.5)', borderRadius: '3px', padding: '5px 12px', marginTop: '10px', letterSpacing: '0.04em', background: 'rgba(43,91,255,0.12)' }}>$40 / session</span>
              </div>

              <p style={{ ...BODY, fontSize: '15px', margin: '0 0 28px' }}>
                This is what Klime is actually built for. You choose a Guide from our roster. They build a curriculum from scratch — specifically around your goals — before you ever meet. One room. Two people. Forty minutes that exist for no one else.
              </p>

              {/* 99% callout */}
              <div style={{ borderTop: HAIR, borderBottom: HAIR, padding: '24px 0', margin: '0 0 28px' }}>
                <div style={{ ...HL, fontSize: 'clamp(52px,6vw,80px)', lineHeight: 1, marginBottom: '8px', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>99%</div>
                <p style={{ ...MUTED, margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.78)' }}>
                  of students in pre-testing scheduled a follow-up session with their Guide. The ones who didn't had already gotten what they came for.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {['Private — just you and your Guide', 'New curriculum built for you before you meet', '40 minutes, one on one', 'Direct professional introduction'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0 }} />
                    <span style={{ ...BODY, fontSize: '13px' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/upcoming-summits" style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px', display: 'inline-block', transition: 'all 0.18s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.48)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Start with a Summit
              </Link>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── GUIDES ── */}
      <section className="sec-v" style={{ padding: '100px 40px', }}>
        <div className="wrap-pad" style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Two-col intro */}
          <FadeUp>
            <div className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '64px', alignItems: 'start' }}>
              <h2 style={{ ...HL, fontSize: 'clamp(30px,4vw,52px)', margin: 0, letterSpacing: '-1px', lineHeight: 1.08, textShadow: '0 2px 20px rgba(0,0,0,0.28)' }}>
                Professionals who have already been there.
              </h2>
              <p style={{ ...BODY, margin: 0, paddingTop: '6px' }}>
                Guides on Klime are not tutors or coaches. Some are 20-year-old founders who built something real. Others are senior executives, physicians, or government advisors with decades of experience. What they share is a commitment to opening real doors for students who are ready to walk through them.
              </p>
            </div>
          </FadeUp>

          <WaveProfessionals />

        </div>
      </section>

      {/* ── THREE STEPS ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 56px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Three steps to the top.</h2>
            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'start' }}>
              {[
                { n: '01', body: 'Sign up and tell us what field you want to climb in. We match you to an upcoming Summit with a Guide in your area.' },
                { n: '02', body: 'Join a live session with up to 10 other students and a verified Guide. Interactive, intimate, and never recorded.' },
                { n: '03', body: 'Book a private Ascending session. Your Guide builds new curriculum specifically for you before you meet. You leave with a direct professional introduction.' },
              ].map((step, i) => (
                <div key={i} style={{ marginTop: `${i * 88}px`, paddingTop: '32px', paddingBottom: '48px', paddingLeft: i === 0 ? '0' : '40px', paddingRight: i === 2 ? '0' : '40px', borderTop: HAIR }}>
                  <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '64px', color: 'rgba(255,255,255,0.12)', lineHeight: 1, display: 'block', marginBottom: '20px', userSelect: 'none' }}>{step.n}</span>
                  <p style={{ ...BODY, margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.90)' }}>{step.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px', }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 40px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Good questions.</h2>
            <div style={{ borderTop: HAIR }}>
              {[
                { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required.' },
                { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders. Others are senior executives, physicians, or investors with decades of experience. The range is the point.' },
                { q: 'What happens in a Summit?', a: 'An interactive live session built around what is actually happening in that field this week. Think TED talk meets live course — except the speaker takes questions and knows your name. Ten students, one verified Guide, one hour. Different topic every week, from breaking into finance to building something everyone is talking about.' },
                { q: 'What is Ascending?', a: 'A private one on one session with any Guide on Klime — whether you attended their Summit or not. You pick the person. They build new curriculum entirely around your goals before you meet. Forty minutes that exist only for you. You leave with a real connection to a real professional.' },
                { q: 'When do Summits start?', a: 'Soon. Sign up below and you will be the first to know when your field opens.' },
                { q: 'Do I need to attend a Summit before Ascending?', a: 'No. You can book an Ascending session with any Guide on Klime regardless of whether you have attended their Summit. You simply browse the roster, pick the professional you want in the room with you, and book.' },
                { q: 'How do Guides prepare for Ascending sessions?', a: 'Before every Ascending session, your Guide reviews your stated goals and builds an entirely new curriculum around them. It has never been used before and will never be used again. It exists only for that session.' },
                { q: 'Is there a cost to create an account?', a: 'No. Signing up and attending Summits is completely free. You only pay for Ascending sessions, which are $40 each.' },
                { q: 'What if I am not sure which field I want to explore?', a: 'Start with a Summit. They are free, cover a wide range of fields, and give you a direct look at what it is actually like to work in a given industry. Most students find clarity within a session or two.' },
              ].map((item, i) => <FAQRow key={i} {...item} />)}
            </div>
            <div style={{ paddingTop: '28px' }}>
              <Link to="/faq" style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              >
                View all questions →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="sec-bot" style={{ padding: '0 40px 120px', textAlign: 'center' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(30px,4vw,56px)', margin: '0 0 16px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Your Summit is waiting.
            </h2>
            <p style={{ ...MUTED, fontSize: '16px', margin: '0 0 36px', color: 'rgba(255,255,255,0.55)' }}>
              Early students get matched first.
            </p>
            <Link to="/upcoming-summits" style={{
              fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500,
              color: '#fff', textDecoration: 'none', background: '#2B5BFF',
              borderRadius: '4px', padding: '16px 40px',
              display: 'inline-block', transition: 'all 0.18s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(43,91,255,0.52)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              Join a Summit
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.45)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>&copy; 2026 Klime</span>
      </footer>
    </main>
  )
}
