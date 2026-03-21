import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const faqs = [
  {
    q: 'Who is a Climber?',
    a: 'Any serious high school senior or college student between 17 and 22 who wants real career access.',
  },
  {
    q: 'Who are the Guides?',
    a: 'Verified senior professionals matched to Klimers based on field and goals. New Guides rotate in every week with the most popular ones returning.',
  },
  {
    q: 'What happens in a Summit?',
    a: 'A live session with ten Klimers and one Guide. Interactive, intimate, and built around real conversation not a lecture. Never recorded.',
  },
  {
    q: 'What is Ascending?',
    a: 'A fifteen minute one on one with your Guide directly after the Summit. Limited spots per session. $40 per Ascending.',
  },
  {
    q: 'When does it launch?',
    a: 'Soon. Waitlist opens now and early Klimers are matched first.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const lineRef = useRef()
  const inView = useInView(lineRef, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || !lineRef.current) return
    lineRef.current.style.transition = `width 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`
    lineRef.current.style.width = '100%'
  }, [inView, index])

  return (
    <div>
      <div
        ref={lineRef}
        style={{
          height: '1px',
          background: 'rgba(240, 242, 247, 0.12)',
          width: '0%',
          marginBottom: 0,
        }}
      />
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '22px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(18px, 2vw, 24px)',
          color: '#F0F2F7',
          letterSpacing: '-0.2px',
        }}>
          {item.q}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: easing }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ flexShrink: 0, marginLeft: '20px' }}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(240, 242, 247, 0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easing }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '15px',
              color: 'rgba(240, 242, 247, 0.55)',
              lineHeight: 1.7,
              margin: '0 0 24px',
              paddingRight: '40px',
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ZoneFAQ() {
  return (
    <section style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '140px 60px',
      position: 'relative',
    }}>
      <FadeIn>
        <h2 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 'clamp(30px, 4vw, 48px)',
          color: '#F0F2F7',
          margin: '0 0 60px',
          letterSpacing: '-0.5px',
        }}>
          Good questions.
        </h2>
      </FadeIn>

      <div style={{ maxWidth: '800px' }}>
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
        {/* Final hairline */}
        <div style={{
          height: '1px',
          background: 'rgba(240, 242, 247, 0.12)',
        }} />
      </div>
    </section>
  )
}
