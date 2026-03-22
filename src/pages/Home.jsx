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
      <section style={{ padding: '100px 40px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
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

      {/* ── TWO WAYS TO CLIMB — mountain-floating, blurred ── */}
      <section style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 80px 0' }}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(26px,3.2vw,42px)', margin: '0 0 8px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
              Two ways to climb.
            </h2>
            <p style={{ ...MUTED, margin: '0 0 56px', fontSize: '14px', lineHeight: 1.6 }}>
              Every Summit is free. Ascending is where you sit across from one of them — just you.
            </p>
          </FadeUp>
        </div>

        {/* T-chart */}
        <FadeUp delay={0.08}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: HAIR }}>

            {/* ── SUMMIT ── */}
            <div style={{ padding: '52px 64px 52px 0', borderRight: '2px solid rgba(255,255,255,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                <span style={{ ...HL, fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1, letterSpacing: '-1px', textShadow: '0 2px 16px rgba(0,0,0,0.22)' }}>Summit</span>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '3px', padding: '5px 12px', marginTop: '8px', letterSpacing: '0.04em' }}>Free</span>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <p style={{ ...MUTED, fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 8px' }}>Who it's for</p>
                <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>Any student who wants to learn from someone who actually did it — live, in real time, this week.</p>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '28px' }} />

              <p style={{ ...BODY, fontSize: '14px', margin: '0 0 32px' }}>
                Think TED talk meets live course — except the speaker takes questions and knows your name. Each Summit is built around what is actually relevant in that field right now, led by a Guide who lived it. Ten students. One hour. Something different every week, from breaking into a room most people never get near to building the thing everyone is talking about.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                {['Up to 10 students per session', 'Live — never recorded', '45 minutes with your Guide', 'Always free'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.65)', flexShrink: 0 }} />
                    <span style={{ ...BODY, fontSize: '13px' }}>{f}</span>
                  </div>
                ))}
              </div>

              <p style={{ ...MUTED, fontSize: '11px', letterSpacing: '0.06em', margin: 0 }}>Limited spots per session</p>
            </div>

            {/* ── ASCENDING ── */}
            <div style={{ padding: '52px 0 52px 64px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                <span style={{ ...HL, fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1, letterSpacing: '-1px', textShadow: '0 2px 16px rgba(0,0,0,0.22)' }}>Ascending</span>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 600, color: '#2B5BFF', border: '1.5px solid rgba(43,91,255,0.5)', borderRadius: '3px', padding: '5px 12px', marginTop: '8px', letterSpacing: '0.04em', background: 'rgba(43,91,255,0.12)' }}>$40 / session</span>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <p style={{ ...MUTED, fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 8px' }}>Who it's for</p>
                <p style={{ ...BODY, fontSize: '14px', margin: 0 }}>Any student who wants an hour with a specific Guide — whether you attended their Summit or not.</p>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '28px' }} />

              <p style={{ ...BODY, fontSize: '14px', margin: '0 0 32px' }}>
                Browse the Guide roster. Pick the person you want in the room with you. They build entirely new curriculum around your goals before you ever meet. You did not need to be in their Summit. You just need to want it. Forty minutes, completely personalized, built to make a real connection — not a pleasant conversation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                {['Private — just you and your Guide', 'New curriculum built for you', '40 minutes, one on one', 'Direct professional introduction'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2B5BFF', flexShrink: 0 }} />
                    <span style={{ ...BODY, fontSize: '13px' }}>{f}</span>
                  </div>
                ))}
              </div>

              <p style={{ ...MUTED, fontSize: '11px', letterSpacing: '0.06em', margin: 0 }}>After every Summit</p>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── GUIDES ── */}
      <section style={{ padding: '100px 40px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Two-col intro */}
          <FadeUp>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '64px', alignItems: 'start' }}>
              <h2 style={{ ...HL, fontSize: 'clamp(30px,4vw,52px)', margin: 0, letterSpacing: '-1px', lineHeight: 1.08, textShadow: '0 2px 20px rgba(0,0,0,0.28)' }}>
                Professionals who have already been there.
              </h2>
              <p style={{ ...BODY, margin: 0, paddingTop: '6px' }}>
                Guides on Klime are not tutors or coaches. Some are 20-year-old founders who built something real. Others are senior executives, physicians, or government advisors with decades of experience. What they share is a commitment to opening real doors for students who are ready to walk through them.
              </p>
            </div>
          </FadeUp>

          {/* Categories — editorial grid */}
          <FadeUp delay={0.06}>
            <div style={{ borderTop: HAIR, marginBottom: '72px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {[
                  { label: 'Tech Founders',      size: 'clamp(22px,2.8vw,36px)' },
                  { label: 'Business Leaders',   size: 'clamp(22px,2.8vw,36px)' },
                  { label: 'Healthcare',         size: 'clamp(18px,2vw,26px)'   },
                  { label: 'Finance',            size: 'clamp(18px,2vw,26px)'   },
                  { label: 'National Security',  size: 'clamp(22px,2.8vw,36px)' },
                  { label: 'Creative Directors', size: 'clamp(18px,2vw,26px)'   },
                  { label: 'Engineers',          size: 'clamp(18px,2vw,26px)'   },
                  { label: 'Investors',          size: 'clamp(22px,2.8vw,36px)' },
                ].map((cat, i) => (
                  <div key={i} style={{ borderRight: HAIR, borderBottom: HAIR, padding: '24px 36px' }}>
                    <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: cat.size, color: 'rgba(255,255,255,0.82)', fontWeight: 400, lineHeight: 1.1, display: 'block' }}>
                      {cat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── THREE STEPS ── mountain-floating, blurred ── */}
      <section style={{ padding: '0 40px 100px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 56px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Three steps to the top.</h2>
          </FadeUp>
          {[
            { n: '01', body: 'Sign up and tell us what field you want to climb in. We match you to an upcoming Summit with a Guide in your area.' },
            { n: '02', body: 'Join a live session with up to 10 other students and a verified Guide. Interactive, intimate, and never recorded.' },
            { n: '03', body: 'Book a private Ascending session. Your Guide builds new curriculum specifically for you before you meet. You leave with a direct professional introduction.' },
          ].map((step, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '40px 0', borderTop: i === 0 ? HAIR : 'none', borderBottom: HAIR }}>
                <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '100px', color: 'rgba(255,255,255,0.10)', lineHeight: 0.85, flexShrink: 0, width: '100px', userSelect: 'none' }}>{step.n}</span>
                <p style={{ ...BODY, margin: '12px 0 0', maxWidth: '600px', fontSize: '16px', color: 'rgba(255,255,255,0.82)' }}>{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 100px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 40px', letterSpacing: '-0.5px', textShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>Good questions.</h2>
            <div style={{ borderTop: HAIR }}>
              {[
                { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required.' },
                { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders. Others are senior executives, physicians, or investors with decades of experience. The range is the point.' },
                { q: 'What happens in a Summit?', a: 'An interactive live session built around what is actually happening in that field this week. Think TED talk meets live course — except the speaker takes questions and knows your name. Ten students, one verified Guide, one hour. Different topic every week, from breaking into finance to building something everyone is talking about.' },
                { q: 'What is Ascending?', a: 'A private one on one session with any Guide on Klime — whether you attended their Summit or not. You pick the person. They build new curriculum entirely around your goals before you meet. Forty minutes that exist only for you. You leave with a real connection to a real professional.' },
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
