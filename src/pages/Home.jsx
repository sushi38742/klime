import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.48)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.14)'
const wrap = { maxWidth: '960px', margin: '0 auto', padding: '0 40px' }

// ─── Marquee ───
function Marquee() {
  const text = 'FREE WEEKLY SUMMITS\u00a0\u00a0·\u00a0\u00a0LIVE WITH REAL GUIDES\u00a0\u00a0·\u00a0\u00a0UP TO 10 STUDENTS PER SESSION\u00a0\u00a0·\u00a0\u00a0ASCEND FOR A PRIVATE SESSION\u00a0\u00a0·\u00a0\u00a0'
  return (
    <div style={{ borderTop: HAIR, borderBottom: HAIR, overflow: 'hidden', padding: '12px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[1, 2].map(n => (
          <span key={n} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
            {text}{text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Animated stat ───
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
      <div style={{ ...HL, fontSize: 'clamp(48px,6vw,80px)', lineHeight: 1, marginBottom: '8px' }}>
        {typeof value === 'number' ? <span ref={ref}>0</span> : value}
      </div>
      <div style={MUTED}>{label}</div>
    </div>
  )
}

// ─── Expand row — for main content sections ───
function ExpandRow({ title, badge, preview, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: HAIR }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', textAlign: 'left', gap: '24px' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: preview ? '6px' : 0 }}>
            <span style={{ ...HL, fontSize: 'clamp(18px,2.2vw,26px)' }}>{title}</span>
            {badge && (
              <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, color: badge === 'Free' ? 'rgba(255,255,255,0.8)' : '#2B5BFF', border: badge === 'Free' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(43,91,255,0.5)', borderRadius: '3px', padding: '3px 10px', background: badge === 'Free' ? 'transparent' : 'rgba(43,91,255,0.12)', letterSpacing: '0.04em' }}>
                {badge}
              </span>
            )}
          </div>
          {preview && <p style={{ ...MUTED, margin: 0, fontSize: '14px' }}>{preview}</p>}
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, marginTop: '6px' }}
        >
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '32px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── FAQ row ───
function FAQRow({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: HAIR }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '20px' }}
      >
        <span style={{ ...HL, fontSize: 'clamp(15px,1.8vw,19px)' }}>{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0 }}
        >
          <path d="M3 6l5 5 5-5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <p style={{ ...BODY, margin: '0 0 24px', maxWidth: '680px' }}>{a}</p>
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
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ ...HL, fontSize: 'clamp(38px,6vw,82px)', lineHeight: 1.06, letterSpacing: '-1.5px', margin: '0 0 24px', maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,0.28)', position: 'relative' }}
        >
          Free live sessions with professionals who have already made it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ ...BODY, fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,255,255,0.68)', margin: '0 0 44px', maxWidth: '520px', position: 'relative' }}
        >
          Join a Summit with up to 10 students and a verified Guide. Then Ascend for a private one-on-one built entirely around you.
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
            border: '1.5px solid rgba(255,255,255,0.35)',
            transition: 'all 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
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
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '1.5px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── WHAT KLIME IS ── */}
      <section style={{ padding: '120px 40px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>What Klime is</p>
            <h2 style={{ ...HL, fontSize: 'clamp(28px,4vw,52px)', margin: '0 0 16px', letterSpacing: '-1px', lineHeight: 1.08, maxWidth: '720px' }}>
              TED inspires you. MasterClass teaches you. Klime connects you.
            </h2>
            <p style={{ ...BODY, maxWidth: '540px', margin: '0 0 64px', color: 'rgba(255,255,255,0.62)' }}>
              We took the energy of a TED stage and the caliber of a MasterClass professional and built something neither offers.
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR }}>
              {[
                {
                  title: 'MasterClass',
                  preview: 'Pre-recorded. Celebrity-led. One-way.',
                  rows: ['Pre-recorded videos', 'Watch celebrities talk', 'No live interaction', 'No personal access'],
                },
                {
                  title: 'TED',
                  preview: 'Inspiring talks. No follow-up. No connection.',
                  rows: ['One-way broadcast', 'Inspiring but passive', 'No follow-up access', 'No direct relationship'],
                },
                {
                  title: 'Klime',
                  preview: 'Live every session. Your Guide knows your name.',
                  rows: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'],
                  highlight: true,
                },
              ].map((col, i) => (
                <ExpandRow key={i} title={col.title} preview={col.preview}>
                  <div className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px', maxWidth: '640px' }}>
                    {col.rows.map((r, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: col.highlight ? '#2B5BFF' : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                        <span style={{ ...BODY, fontSize: '14px', color: col.highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </ExpandRow>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="stats-row" style={{ display: 'flex', borderTop: HAIR, borderBottom: HAIR, padding: '64px 0' }}>
              {[
                { value: 10,     label: 'Students per Summit' },
                { value: 1,      label: 'Verified Guide' },
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
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>Two ways to climb</p>
            <h2 style={{ ...HL, fontSize: 'clamp(28px,4vw,52px)', margin: '0 0 64px', letterSpacing: '-1px', lineHeight: 1.08 }}>
              Every Summit is free.<br />Ascending is where you sit across from one of them — just you.
            </h2>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR }}>
              <ExpandRow title="Summit" badge="Free" preview="Live. Up to 10 students. A real professional in the room with you.">
                <p style={{ ...BODY, margin: '0 0 24px', maxWidth: '620px' }}>
                  Think TED talk meets live course — except the speaker takes questions and knows your name. Each Summit is built around what is actually relevant in that field right now, led by a Guide who lived it. Ten students. One hour. Something different every week.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {['Up to 10 students per session', 'Live — never recorded', '45 minutes with your Guide', 'Always free'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.55)', flexShrink: 0 }} />
                      <span style={{ ...BODY, fontSize: '14px' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/upcoming-summits" style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px', display: 'inline-block' }}>
                  Find a Summit
                </Link>
              </ExpandRow>

              <ExpandRow title="Ascending" badge="$40 / session" preview="Private. One on one. New curriculum built around you before you even meet.">
                <p style={{ ...BODY, margin: '0 0 24px', maxWidth: '620px' }}>
                  Browse the Guide roster. Pick the person you want in the room with you. They build entirely new curriculum around your goals before you ever meet. You did not need to be in their Summit. Forty minutes, completely personalized, built to make a real connection.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {['Private — just you and your Guide', 'New curriculum built for you', '40 minutes, one on one', 'Direct professional introduction'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0 }} />
                      <span style={{ ...BODY, fontSize: '14px' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </ExpandRow>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>Your Guides</p>
            <h2 style={{ ...HL, fontSize: 'clamp(28px,4vw,52px)', margin: '0 0 16px', letterSpacing: '-1px', lineHeight: 1.08, maxWidth: '680px' }}>
              Professionals who have already been there.
            </h2>
            <p style={{ ...BODY, maxWidth: '520px', margin: '0 0 64px', color: 'rgba(255,255,255,0.62)' }}>
              Not tutors. Not coaches. People who built something real and are ready to open doors for students who are serious enough to walk through them.
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR }}>
              {[
                { label: 'Tech Founders', desc: 'Founders who built products you use. Early employees at companies everyone knows. Engineers who shipped at scale.' },
                { label: 'Business Leaders', desc: 'CEOs, COOs, and executives who have run teams, raised capital, and navigated the decisions most people never get to see from the inside.' },
                { label: 'Healthcare', desc: 'Physicians, surgeons, researchers, and healthcare executives. People who know what it actually takes to make it in medicine — and what nobody tells you.' },
                { label: 'Finance', desc: 'Investment bankers, venture capitalists, private equity professionals, and hedge fund analysts who can explain how rooms are entered and deals are made.' },
                { label: 'National Security', desc: 'Former intelligence officers, defense advisors, and policy officials with clearances and careers that cannot be found on LinkedIn.' },
                { label: 'Creative Directors', desc: 'Brand leads, creative directors, and designers who built the visual identity of things you recognize — and who know exactly how to get that first real job.' },
                { label: 'Engineers', desc: 'Staff engineers, principal engineers, and architects who have built infrastructure used by millions. They know the difference between a good resume and a great one.' },
                { label: 'Investors', desc: 'Angel investors, VC partners, and family office principals who have written checks and know exactly what they look for on both sides of the table.' },
              ].map((cat, i) => (
                <ExpandRow key={i} title={cat.label} preview={cat.desc.slice(0, 72) + '…'}>
                  <p style={{ ...BODY, margin: 0, maxWidth: '580px' }}>{cat.desc}</p>
                </ExpandRow>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>How it works</p>
            <h2 style={{ ...HL, fontSize: 'clamp(28px,4vw,52px)', margin: '0 0 64px', letterSpacing: '-1px', lineHeight: 1.08 }}>
              Three steps to the top.
            </h2>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR }}>
              {[
                {
                  n: '01',
                  title: 'Sign up',
                  preview: 'Tell us your field. We match you to an upcoming Summit.',
                  body: 'Sign up and tell us what field you want to climb in. We match you to an upcoming Summit with a Guide in your area. No application required. No waitlist you will never hear from.',
                },
                {
                  n: '02',
                  title: 'Join a Summit',
                  preview: 'Live. Up to 10 students. A verified Guide.',
                  body: 'Join a live session with up to 10 other students and a verified Guide. Interactive, intimate, and never recorded. You ask questions. The Guide knows your name. Something different every week.',
                },
                {
                  n: '03',
                  title: 'Ascend',
                  preview: 'Private session. New curriculum. Real connection.',
                  body: 'Book a private Ascending session with any Guide on Klime — whether you attended their Summit or not. Your Guide builds new curriculum specifically for you before you meet. Forty minutes. You leave with a direct professional introduction.',
                },
              ].map((step, i) => (
                <ExpandRow key={i} title={`${step.n} — ${step.title}`} preview={step.preview}>
                  <p style={{ ...BODY, margin: 0, maxWidth: '580px' }}>{step.body}</p>
                </ExpandRow>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>Questions</p>
            <h2 style={{ ...HL, fontSize: 'clamp(28px,4vw,52px)', margin: '0 0 48px', letterSpacing: '-1px', lineHeight: 1.08 }}>
              Good questions.
            </h2>
            <div style={{ borderTop: HAIR }}>
              {[
                { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required.' },
                { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders. Others are senior executives, physicians, or investors with decades of experience. The range is the point.' },
                { q: 'What happens in a Summit?', a: 'An interactive live session built around what is actually happening in that field this week. Think TED talk meets live course — except the speaker takes questions and knows your name. Ten students, one verified Guide, one hour.' },
                { q: 'What is Ascending?', a: 'A private one on one session with any Guide on Klime — whether you attended their Summit or not. You pick the person. They build new curriculum entirely around your goals before you meet. Forty minutes that exist only for you.' },
                { q: 'When do Summits start?', a: 'Soon. Sign up below and you will be the first to know when your field opens.' },
              ].map((item, i) => <FAQRow key={i} {...item} />)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: '0 40px 140px', textAlign: 'center' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(32px,5vw,68px)', margin: '0 0 16px', letterSpacing: '-1.5px', lineHeight: 1.06 }}>
              Your Summit is waiting.
            </h2>
            <p style={{ ...MUTED, fontSize: '16px', margin: '0 0 40px' }}>
              Early students get matched first.
            </p>
            <Link to="/upcoming-summits" style={{
              fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500,
              color: '#fff', textDecoration: 'none', background: '#2B5BFF',
              borderRadius: '4px', padding: '16px 44px',
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

      {/* ── FOOTER ── */}
      <footer className="footer-row" style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.38)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>&copy; 2026 Klime</span>
      </footer>

    </main>
  )
}
