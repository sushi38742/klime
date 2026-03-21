import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const easing = [0.16, 1, 0.3, 1]

const faqs = [
  { q: 'Who is a Climber?', a: 'Any serious high school senior or college student between 17 and 22 who wants real career access.' },
  { q: 'Who are the Guides?', a: 'Verified senior professionals matched to Klimers based on field and goals. New Guides rotate in every week with the most popular ones returning.' },
  { q: 'What happens in a Summit?', a: 'A live session with ten Klimers and one Guide. Interactive, intimate, and built around real conversation not a lecture. Never recorded.' },
  { q: 'What is Ascending?', a: 'A fifteen minute one on one with your Guide directly after the Summit. Limited spots per session. $40 per Ascending.' },
  { q: 'When does it launch?', a: 'Soon. Waitlist opens now and early Klimers are matched first.' },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const lineRef = useRef()
  const drawn = useRef(false)

  useEffect(() => {
    if (drawn.current || !lineRef.current) return
    drawn.current = true
    lineRef.current.style.transition = `width 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`
    lineRef.current.style.width = '100%'
  }, [index])

  return (
    <div>
      <div ref={lineRef} style={{ height: '1px', background: 'rgba(240,242,247,0.1)', width: '0%' }} />
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '18px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(16px, 1.8vw, 22px)', color: '#F0F2F7', textAlign: 'left' }}>{item.q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: easing }}
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ flexShrink: 0, marginLeft: '20px' }}
        >
          <path d="M4 6.5L9 11.5L14 6.5" stroke="rgba(240,242,247,0.4)" strokeWidth="1.4" strokeLinecap="round" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easing }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', color: 'rgba(240,242,247,0.5)', lineHeight: 1.7, margin: '0 0 20px', paddingRight: '40px' }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ZoneFAQ() {
  return (
    <div style={{ padding: '0 60px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: 'clamp(28px, 3.5vw, 46px)',
        color: '#F0F2F7',
        margin: '0 0 40px',
        letterSpacing: '-0.5px',
      }}>
        Good questions.
      </h2>
      <div style={{ maxWidth: '740px' }}>
        {faqs.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
        <div style={{ height: '1px', background: 'rgba(240,242,247,0.1)' }} />
      </div>
    </div>
  )
}
