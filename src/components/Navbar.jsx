import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navRef = useRef()

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 40) {
          navRef.current.style.background = 'rgba(10, 15, 30, 0.95)'
        } else {
          navRef.current.style.background = 'transparent'
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.3s ease',
        padding: '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{
        fontFamily: '"DM Serif Display", serif',
        fontSize: '24px',
        color: '#F0F2F7',
        letterSpacing: '-0.5px',
      }}>
        Klime
      </span>

      <button
        onClick={scrollToForm}
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#F0F2F7',
          background: 'transparent',
          border: '1px solid rgba(240, 242, 247, 0.35)',
          borderRadius: '4px',
          padding: '8px 18px',
          cursor: 'pointer',
          letterSpacing: '0.02em',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(43, 91, 255, 0.3)'
          e.currentTarget.style.borderColor = 'rgba(43, 91, 255, 0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'rgba(240, 242, 247, 0.35)'
        }}
      >
        Join the Waitlist
      </button>
    </motion.nav>
  )
}
