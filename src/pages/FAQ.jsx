import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '800px', margin: '0 auto', padding: '0 40px' }

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
            <p style={{ ...BODY, margin: '0 0 24px', maxWidth: '640px' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SECTIONS = [
  {
    title: 'Getting Started',
    faqs: [
      { q: 'Who can join a Summit?', a: 'Any serious student who wants real career access. Summits are open and free. No application required — just sign up and show up.' },
      { q: 'Is there a cost to create an account?', a: 'No. Signing up and attending Summits is completely free. You only pay for Ascending sessions, which are $40 each.' },
      { q: 'When do Summits start?', a: 'Soon. Sign up on the Upcoming Summits page and you will be the first to know when your field opens.' },
      { q: 'What if I am not sure which field I want to explore?', a: 'Start with a Summit. They are free, cover a wide range of fields, and give you a direct look at what it is actually like to work in a given industry. Most students find clarity within a session or two.' },
    ],
  },
  {
    title: 'Summits',
    faqs: [
      { q: 'What happens in a Summit?', a: 'An interactive live session built around what is actually happening in that field this week. Think TED talk meets live course — except the speaker takes questions and knows your name. Ten students, one verified Guide, one hour. Different topic every week, from breaking into finance to building something everyone is talking about.' },
      { q: 'How many students are in a Summit?', a: 'Up to ten. The limit is intentional. Small enough that your Guide knows your name and you can actually ask questions. Large enough to keep the energy of a room.' },
      { q: 'Are Summits recorded?', a: 'No. Every Summit is live and never recorded. What happens in the room stays in the room. This keeps both students and Guides fully present.' },
      { q: 'How long is a Summit?', a: '45 minutes of live session with your Guide. Short enough that every minute counts, long enough to actually go somewhere.' },
    ],
  },
  {
    title: 'Ascending',
    faqs: [
      { q: 'What is Ascending?', a: 'A private one on one session with any Guide on Klime — whether you attended their Summit or not. You pick the person. They build new curriculum entirely around your goals before you meet. Forty minutes that exist only for you. You leave with a real connection to a real professional.' },
      { q: 'Do I need to attend a Summit before Ascending?', a: 'No. You can book an Ascending session with any Guide on Klime regardless of whether you have attended their Summit. You simply browse the roster, pick the professional you want in the room with you, and book.' },
      { q: 'How do Guides prepare for Ascending sessions?', a: 'Before every Ascending session, your Guide reviews your stated goals and builds an entirely new curriculum around them. It has never been used before and will never be used again. It exists only for that session.' },
      { q: 'Why does Ascending cost $40?', a: 'Your Guide spends real time preparing for your session before you ever meet. The $40 reflects that preparation and ensures the session is taken seriously by both sides. It is the price of a professional giving you their undivided focus.' },
      { q: 'What does "direct professional introduction" mean?', a: 'At the end of every Ascending session, your Guide makes a personal introduction on your behalf — to someone in their network who is relevant to your goals. Not a referral. A real introduction from someone who now knows you.' },
    ],
  },
  {
    title: 'Guides',
    faqs: [
      { q: 'Who are the Guides?', a: 'Verified professionals who have real experience in their field. Some are 20-year-old founders who built something real. Others are senior executives, physicians, government advisors, or investors with decades of experience. The range is the point.' },
      { q: 'How are Guides verified?', a: 'Every Guide goes through a three-stage screening process: AI-assisted credential verification, personal review by the Klime founders, and ongoing performance monitoring after each session. If something is off, the Guide does not move forward.' },
      { q: 'Can I request a specific Guide for Ascending?', a: 'Yes. That is exactly how it works. You browse the Guide roster and choose who you want to sit across from. The entire Ascending model is built around your choice.' },
      { q: 'Can anyone become a Guide?', a: 'No. Guides are screened before they ever lead a session. We review professional background, credentials, and field relevance. Ryan and Max personally approve every Guide. The bar is high on purpose.' },
    ],
  },
]

export default function FAQ() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 40px 80px', textAlign: 'center' }}>
        <div style={wrap}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 20px' }}
          >
            FAQ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ ...HL, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 16px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            Good questions.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Everything you want to know about Summits, Ascending, and the Guides who make it real.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ SECTIONS ── */}
      {SECTIONS.map((section, si) => (
        <section key={si} style={{ padding: '0 40px 80px' }}>
          <div className="wrap-pad" style={wrap}>
            <FadeUp>
              <h2 style={{ ...HL, fontSize: 'clamp(18px,2vw,24px)', margin: '0 0 4px', letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.55)' }}>
                {section.title}
              </h2>
              <div style={{ borderTop: HAIR, marginTop: '16px' }}>
                {section.faqs.map((item, i) => <FAQRow key={i} {...item} />)}
              </div>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ padding: '20px 40px 120px', textAlign: 'center' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <p style={{ ...MUTED, marginBottom: '20px' }}>Still have a question?</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/upcoming-summits" style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px', transition: 'all 0.18s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.48)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Join a Summit
              </Link>
              <Link to="/become-a-guide" style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px', border: '1.5px solid rgba(255,255,255,0.35)', transition: 'all 0.18s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '' }}
              >
                Become a Guide
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-row" style={{ borderTop: HAIR, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.75)' }}>Klime</span>
        <Link to="/legal" style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Legal</Link>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>&copy; 2026 Klime</span>
      </footer>

    </main>
  )
}
