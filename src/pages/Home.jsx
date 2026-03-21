import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

// ─── Text on mountain — all light ───
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY  = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.48)', fontSize: '13px', lineHeight: 1.65 }
const HAIR  = '1px solid rgba(255,255,255,0.18)'
const wrap  = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

// ─── Marquee ───
function Marquee() {
  const text = 'FREE WEEKLY SUMMITS\u00a0\u00a0·\u00a0\u00a0LIVE WITH REAL GUIDES\u00a0\u00a0·\u00a0\u00a0UP TO 10 STUDENTS PER SESSION\u00a0\u00a0·\u00a0\u00a0ASCEND FOR A PRIVATE SESSION\u00a0\u00a0·\u00a0\u00a0'
  return (
    <div style={{ borderTop: HAIR, borderBottom: HAIR, overflow: 'hidden', padding: '12px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[1, 2].map(n => (
          <span key={n} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.48)' }}>
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
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          style={{ ...BODY, fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,255,255,0.72)', margin: '0 0 40px', maxWidth: '560px', textShadow: '0 1px 8px rgba(0,0,0,0.18)', position: 'relative' }}
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
      <section style={{ padding: '100px 40px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px', letterSpacing: '-0.5px', maxWidth: '640px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              TED inspires you. MasterClass teaches you. Klime connects you.
            </h2>
            <p style={{ ...BODY, maxWidth: '560px', margin: '0 0 52px' }}>
              We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers. A live room where you talk back, get heard, and leave with a real connection.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
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
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <div style={{ display: 'flex', borderTop: HAIR, borderBottom: HAIR, padding: '48px 0' }}>
              {[
                { value: 10,    label: 'Students per Summit' },
                { value: 1,     label: 'Verified Guide' },
                { value: 'Live', label: 'Never recorded' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: '0 40px', borderLeft: i > 0 ? HAIR : 'none' }}>
                  <Stat value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TWO WAYS TO CLIMB ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(26px,3.2vw,42px)', margin: '0 0 8px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Two ways to climb.</h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p style={{ ...MUTED, margin: '0 0 48px' }}>Every Summit is free. Ascending is optional but that is where real connection happens.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            {/* Two open columns, single center hairline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {[
                {
                  label: 'Summit',
                  sublabel: 'Free',
                  desc: 'Ten students. One verified Guide. Live every week. Interactive, intimate, and built around real conversation. New Guides rotate in with the best ones returning.',
                  tag: 'Limited spots per session',
                  accent: false,
                },
                {
                  label: 'Ascending',
                  sublabel: '$40 per session',
                  desc: 'A private one on one session separate from the Summit. Your Guide builds new curriculum specifically for you before the session. You spend 40 minutes working through your specific goals, field, and next steps. You leave with a direct professional introduction.',
                  tag: 'After every Summit',
                  accent: true,
                },
              ].map((col, i) => (
                <div key={i} style={{ padding: i === 0 ? '0 48px 0 0' : '0 0 0 48px', borderLeft: i === 1 ? HAIR : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ ...HL, fontSize: '26px', textShadow: 'none' }}>{col.label}</span>
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: col.accent ? '#2B5BFF' : 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{col.sublabel}</span>
                  </div>
                  <p style={{ ...BODY, margin: '0 0 20px' }}>{col.desc}</p>
                  <span style={MUTED}>{col.tag}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              Professionals who have already been there.
            </h2>
            <p style={{ ...BODY, maxWidth: '580px', margin: '0 0 40px' }}>
              Guides on Klime are not tutors or coaches. Some are 20-year-old founders who built something real. Others are senior executives, physicians, or government advisors with decades of experience. What they share is a commitment to opening real doors for students who are ready to walk through them.
            </p>

            {/* Category plain text with hairline separators */}
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '52px' }}>
              {['Tech Founders', 'Business Leaders', 'Healthcare', 'Finance', 'National Security', 'Creative Directors', 'Engineers', 'Investors'].map((cat, i) => (
                <span key={i} style={{
                  fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.58)',
                  padding: '6px 20px', borderLeft: i > 0 ? HAIR : 'none',
                  lineHeight: 1,
                }}>
                  {cat}
                </span>
              ))}
            </div>

            <div style={{ borderTop: HAIR, paddingTop: '44px' }}>
              <h3 style={{ ...HL, fontSize: 'clamp(18px,2.2vw,28px)', margin: '0 0 32px', textShadow: 'none' }}>
                Every Guide is screened before they ever lead a session.
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { title: 'AI credential scan', desc: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.' },
                  { title: 'Founder review', desc: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.' },
                  { title: 'Ongoing monitoring', desc: 'After every Summit, AI analyzes student feedback. Guides who fall below the bar are flagged and reviewed before their next session.' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: i === 0 ? '0 32px 0 0' : '0 0 0 32px', borderLeft: i > 0 ? HAIR : 'none' }}>
                    <h4 style={{ ...HL, fontSize: '17px', margin: '0 0 8px', textShadow: 'none' }}>{s.title}</h4>
                    <p style={{ ...MUTED, margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THREE STEPS ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 60px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Three steps to the top.</h2>
          </FadeUp>
          {[
            { n: '01', body: 'Sign up and tell us what field you want to climb in. We match you to an upcoming Summit with a Guide in your area.' },
            { n: '02', body: 'Join a live session with up to 10 other students and a verified Guide. Interactive, intimate, and never recorded.' },
            { n: '03', body: 'Book a private Ascending session. Your Guide builds new curriculum specifically for you before you meet. You leave with a direct professional introduction.' },
          ].map((step, i, arr) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '40px 0', borderTop: i === 0 ? HAIR : 'none', borderBottom: HAIR }}>
                {/* Large muted number — 100px, barely visible */}
                <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '100px', color: 'rgba(255,255,255,0.10)', lineHeight: 0.85, flexShrink: 0, width: '100px', userSelect: 'none' }}>{step.n}</span>
                <p style={{ ...BODY, margin: '12px 0 0', maxWidth: '600px', fontSize: '16px', color: 'rgba(255,255,255,0.82)' }}>{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 40px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Good questions.</h2>
            <div style={{ borderTop: HAIR }}>
              {[
                { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required.' },
                { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders. Others are senior executives, physicians, or investors with decades of experience. The range is the point.' },
                { q: 'What happens in a Summit?', a: 'A live session with up to 10 students and one Guide. Interactive, intimate, and built around real conversation. Never recorded.' },
                { q: 'What is Ascending?', a: 'Ascending is a private session separate from the Summit. Your Guide builds new curriculum specifically for you before the session. You spend 40 minutes working through your specific goals, field, and next steps. You leave with a direct professional introduction.' },
                { q: 'When do Summits start?', a: 'Soon. Sign up below and you will be the first to know when your field opens.' },
              ].map((item, i) => <FAQRow key={i} {...item} />)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: '0 40px 120px', textAlign: 'center' }}>
        <div style={wrap}>
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
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>&copy; 2025 Klime</span>
      </footer>
    </main>
  )
}
