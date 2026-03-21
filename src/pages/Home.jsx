import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

// ─── Shared style constants ───
const panel = {
  background: 'rgba(255,255,255,0.88)',
  borderRadius: '8px',
  padding: '60px 64px',
}
const HL = { fontFamily: '"DM Serif Display",serif', color: '#0D0F14', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: '#3a4a5e', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: '#758090', fontSize: '13px', lineHeight: 1.65 }
const HAIRLINE = { borderTop: '1px solid rgba(13,15,20,0.1)' }
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

// ─── Marquee ───
function Marquee() {
  const text = 'FREE WEEKLY SUMMITS\u00a0\u00a0·\u00a0\u00a0LIVE WITH REAL GUIDES\u00a0\u00a0·\u00a0\u00a0UP TO 10 STUDENTS PER SESSION\u00a0\u00a0·\u00a0\u00a0ASCEND FOR A PRIVATE SESSION\u00a0\u00a0·\u00a0\u00a0'
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.25)', overflow: 'hidden', padding: '12px 0', background: 'rgba(0,0,0,0.12)' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[1,2].map(n => (
          <span key={n} style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.75)' }}>
            {text}{text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Stat counter ───
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
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ ...HL, fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1, marginBottom: '8px' }}>
        {typeof value === 'number' ? <span ref={ref}>0</span> : value}
      </div>
      <div style={MUTED}>{label}</div>
    </div>
  )
}

// ─── FAQ row ───
function FAQRow({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={HAIRLINE}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'none', border: 'none', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '20px' }}>
        <span style={{ ...HL, fontSize: 'clamp(16px,1.8vw,20px)' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22, ease }} style={{ fontSize: '22px', color: '#758090', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} style={{ overflow: 'hidden' }}>
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
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ ...HL, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 24px', maxWidth: '820px', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}
        >
          Free live sessions with professionals who have already made it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(15px,1.6vw,18px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, margin: '0 0 40px', maxWidth: '560px', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
        >
          Join a Summit with up to 10 other students and a verified Guide. Then Ascend for a private one on one session with new curriculum built around you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/upcoming-summits" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500, color: '#fff',
            background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '14px 32px',
            transition: 'all 0.18s ease', boxShadow: '0 4px 20px rgba(43,91,255,0.35)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.48)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.35)' }}
          >
            Join a Summit
          </Link>
          <Link to="/become-a-guide" style={{
            fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500, color: '#fff',
            background: 'rgba(255,255,255,0.18)', textDecoration: 'none', borderRadius: '4px', padding: '14px 32px',
            border: '1.5px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(6px)',
            transition: 'all 0.18s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = '' }}
          >
            Become a Guide
          </Link>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '1.5px', height: '24px', background: 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* ── WHAT KLIME IS ── comparison */}
      <section style={{ padding: '100px 40px' }}>
        <div style={wrap}>
          <FadeUp>
            <div style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px', letterSpacing: '-0.5px', maxWidth: '640px' }}>
                TED inspires you. MasterClass teaches you. Klime connects you.
              </h2>
              <p style={{ ...BODY, maxWidth: '560px', margin: '0 0 44px' }}>
                We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers. A live room where you talk back, get heard, and leave with a real connection.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { name: 'MasterClass', accent: false, rows: ['Pre-recorded videos', 'Watch celebrities talk', 'No interaction', 'No personal access'] },
                  { name: 'TED',         accent: false, rows: ['Inspiring talks', 'One-way broadcast', 'No follow-up', 'No direct connection'] },
                  { name: 'Klime',       accent: true,  rows: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'] },
                ].map((col, i) => (
                  <div key={i} style={{ padding: '0 28px', borderLeft: i > 0 ? '1px solid rgba(13,15,20,0.1)' : 'none' }}>
                    <div style={{ ...HL, fontSize: '20px', color: col.accent ? '#2B5BFF' : '#758090', marginBottom: '14px' }}>{col.name}</div>
                    {col.rows.map((r, j) => (
                      <p key={j} style={{ ...MUTED, color: col.accent ? '#3a4a5e' : '#9aabb8', margin: '0 0 9px' }}>{r}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <div style={{ ...panel, padding: '48px 64px' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {[
                  { value: 10,    label: 'Students per Summit' },
                  { value: 1,     label: 'Verified Guide' },
                  { value: 'Live', label: 'Never recorded' },
                ].map((s, i, arr) => (
                  <div key={i} style={{ flex: 1, padding: '0 40px', borderLeft: i > 0 ? '1px solid rgba(13,15,20,0.1)' : 'none' }}>
                    <Stat value={s.value} label={s.label} />
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TWO WAYS TO CLIMB ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(26px,3.2vw,42px)', margin: '0 0 8px', letterSpacing: '-0.5px', color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>Two ways to climb.</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p style={{ ...MUTED, color: 'rgba(255,255,255,0.7)', margin: '0 0 28px' }}>Every Summit is free. Ascending is optional but that is where real connection happens.</p>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              {
                badge: 'Free', color: 'rgba(13,15,20,0.08)', accent: false,
                title: 'Summit',
                desc: 'Ten students. One verified Guide. Live every week. Interactive, intimate, and built around real conversation. New Guides rotate in with the best ones returning.',
                tag: 'Limited spots per session',
              },
              {
                badge: '$40 per session', color: 'rgba(43,91,255,0.06)', accent: true,
                title: 'Ascending',
                desc: 'A private one on one session separate from the Summit. Your Guide builds new curriculum specifically for you before the session. You spend 40 minutes working through your specific goals, field, and next steps. You leave with a direct professional introduction.',
                tag: 'After every Summit',
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ ...panel, background: 'rgba(255,255,255,0.88)', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 500, color: card.accent ? '#2B5BFF' : '#758090', letterSpacing: '0.14em', textTransform: 'uppercase', border: `1.5px solid ${card.accent ? 'rgba(43,91,255,0.35)' : 'rgba(13,15,20,0.15)'}`, borderRadius: '3px', padding: '3px 10px', display: 'inline-block', marginBottom: '18px' }}>{card.badge}</span>
                  <h3 style={{ ...HL, fontSize: '28px', margin: '0 0 12px' }}>{card.title}</h3>
                  <p style={{ ...BODY, margin: '0 0 20px' }}>{card.desc}</p>
                  <span style={{ ...MUTED, fontSize: '12px' }}>{card.tag}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <div style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                Professionals who have already been there.
              </h2>
              <p style={{ ...BODY, maxWidth: '580px', margin: '0 0 36px' }}>
                Guides on Klime are not tutors or coaches. Some are 20-year-old founders who built something real. Others are senior executives, physicians, or government advisors with decades of experience. What they share is a commitment to opening real doors for students who are ready to walk through them.
              </p>

              {/* Category grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '44px' }}>
                {['Tech Founders', 'Business Leaders', 'Healthcare', 'Finance', 'National Security', 'Creative Directors', 'Engineers', 'Investors'].map((cat, i) => (
                  <span key={i} style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: '#3a4a5e', border: '1px solid rgba(13,15,20,0.12)', borderRadius: '4px', padding: '8px 16px' }}>{cat}</span>
                ))}
              </div>

              <div style={HAIRLINE} />
              <h3 style={{ ...HL, fontSize: 'clamp(20px,2.4vw,30px)', margin: '36px 0 24px' }}>
                Every Guide is screened before they ever lead a session.
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { title: 'AI credential scan', desc: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.' },
                  { title: 'Founder review', desc: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.' },
                  { title: 'Ongoing monitoring', desc: 'After every Summit, AI analyzes student feedback. Guides who fall below the bar are flagged and reviewed before their next session.' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '0 28px', borderLeft: i > 0 ? '1px solid rgba(13,15,20,0.1)' : 'none' }}>
                    <h4 style={{ ...HL, fontSize: '18px', margin: '0 0 8px' }}>{s.title}</h4>
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
            <div style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 52px', letterSpacing: '-0.5px' }}>Three steps to the top.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { n: '01', title: 'Sign up', body: 'Tell us what field you want to climb in. We match you to an upcoming Summit with a Guide in your area.' },
                  { n: '02', title: 'Attend a Summit', body: 'Join a live session with up to 10 other students and a verified Guide. Interactive, intimate, and never recorded.' },
                  { n: '03', title: 'Ascend', body: 'Book a private Ascending session with your Guide. They build new curriculum specifically for you before you meet. You leave with a direct professional introduction.' },
                ].map((step, i, arr) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', padding: '36px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(13,15,20,0.08)' : 'none' }}>
                      <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '56px', color: 'rgba(13,15,20,0.1)', lineHeight: 1, flexShrink: 0, width: '72px' }}>{step.n}</span>
                      <div>
                        <h3 style={{ ...HL, fontSize: '22px', margin: '0 0 8px' }}>{step.title}</h3>
                        <p style={{ ...BODY, margin: 0, maxWidth: '560px' }}>{step.body}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 40px 100px' }}>
        <div style={wrap}>
          <FadeUp>
            <div style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 40px', letterSpacing: '-0.5px' }}>Good questions.</h2>
              <div style={{ borderTop: '1px solid rgba(13,15,20,0.1)' }}>
                {[
                  { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required.' },
                  { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders. Others are senior executives, physicians, or investors with decades of experience. The range is the point.' },
                  { q: 'What happens in a Summit?', a: 'A live session with up to 10 students and one Guide. Interactive, intimate, and built around real conversation. Never recorded.' },
                  { q: 'What is Ascending?', a: 'Ascending is a private session separate from the Summit. Your Guide builds new curriculum specifically for you before the session. You spend 40 minutes working through your specific goals, field, and next steps. You leave with a direct professional introduction.' },
                  { q: 'When do Summits start?', a: 'Soon. Sign up below and you will be the first to know when your field opens.' },
                ].map((item, i) => <FAQRow key={i} {...item} />)}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <FadeUp>
            <h2 style={{ ...HL, fontSize: 'clamp(30px,4vw,56px)', margin: '0 0 16px', letterSpacing: '-1px', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Your Summit is waiting.
            </h2>
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.65)', margin: '0 0 36px' }}>
              Early students get matched first.
            </p>
            <Link to="/upcoming-summits" style={{
              fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500,
              color: '#fff', textDecoration: 'none', background: '#2B5BFF',
              borderRadius: '4px', padding: '16px 40px',
              boxShadow: '0 6px 24px rgba(43,91,255,0.4)', transition: 'all 0.18s ease', display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(43,91,255,0.52)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(43,91,255,0.4)' }}
            >
              Join a Summit
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.15)', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>&copy; 2025 Klime</span>
      </footer>
    </main>
  )
}
