import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const faqs = [
  { q: 'Who is a Climber?', a: 'Any serious high school senior or college student between 17 and 22 who wants real career access — not a lecture or a LinkedIn message, but a real conversation with someone who has been there.' },
  { q: 'Who are the Guides?', a: 'Verified senior professionals matched to Klimers based on field and goals. New Guides rotate in every week with the most popular ones returning.' },
  { q: 'What happens in a Summit?', a: 'A live session with ten Klimers and one Guide. Interactive, intimate, and built around real conversation — not a lecture. Never recorded.' },
  { q: 'What is Ascending?', a: 'A fifteen minute one on one with your Guide directly after the Summit. Limited spots per session. $40 per Ascending.' },
  { q: 'When does it launch?', a: 'Soon. Waitlist opens now and early Klimers are matched first.' },
]

function FAQRow({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(240,242,247,0.09)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(16px,1.9vw,22px)', color: '#F0F2F7' }}>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease }}
          style={{ display: 'block', flexShrink: 0, marginLeft: '20px', fontSize: '22px', color: 'rgba(240,242,247,0.4)', lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(240,242,247,0.48)', lineHeight: 1.75, margin: '0 0 20px', maxWidth: '660px' }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ZoneFAQ() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 80px',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: '"DM Serif Display",serif',
        fontSize: 'clamp(28px,3.5vw,50px)',
        color: '#F0F2F7',
        margin: '0 0 48px',
        letterSpacing: '-0.5px',
      }}>
        Good questions.
      </h2>

      <div style={{ width: '100%', maxWidth: '760px', textAlign: 'left' }}>
        <div style={{ borderTop: '1px solid rgba(240,242,247,0.09)' }} />
        {faqs.map((item, i) => <FAQRow key={i} item={item} index={i} />)}
      </div>
    </div>
  )
}
