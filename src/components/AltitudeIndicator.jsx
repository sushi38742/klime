import { useEffect, useRef } from 'react'

export default function AltitudeIndicator({ scrollProgress }) {
  const fillRef = useRef()

  useEffect(() => {
    const update = () => {
      if (fillRef.current) {
        fillRef.current.style.height = `${scrollProgress.current * 100}%`
      }
    }
    const interval = setInterval(update, 16)
    return () => clearInterval(interval)
  }, [scrollProgress])

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
    }}>
      {/* Peak icon */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L13 12H1L7 1Z" stroke="#F0F2F7" strokeWidth="1.2" fill="none" opacity="0.5" />
      </svg>

      {/* Track */}
      <div style={{
        width: '2px',
        height: '120px',
        background: 'rgba(240, 242, 247, 0.1)',
        borderRadius: '1px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '0%',
            background: 'linear-gradient(to bottom, #2B5BFF, rgba(43, 91, 255, 0.4))',
            boxShadow: '0 0 6px rgba(43, 91, 255, 0.8)',
            borderRadius: '1px',
            transition: 'height 0.1s ease',
          }}
        />
      </div>

      {/* Tent icon */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 12L7 3L13 12H1Z" stroke="#F0F2F7" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M5 12V9H9V12" stroke="#F0F2F7" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  )
}
