import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSlotCounts, createBooking } from '../lib/supabase'
import { CAPACITY, TIME_SLOTS, HOSTS } from '../data/summitSlots'

const ease = [0.16, 1, 0.3, 1]
const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.65 }
const LABEL = { fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', margin: '0 0 12px' }

function fmtDate(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function StepDots({ step }) {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3].map(s => (
        <div
          key={s}
          style={{
            width: '20px', height: '3px', borderRadius: '2px',
            background: s <= step ? '#2B5BFF' : 'rgba(255,255,255,0.18)',
            transition: 'background 0.2s ease',
          }}
        />
      ))}
    </div>
  )
}

function BackBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'Sora,sans-serif', fontSize: '12px', padding: '0 0 16px', display: 'flex', alignItems: 'center', gap: '4px' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
    >
      ← {label}
    </button>
  )
}

function SlotBtn({ children, disabled, selected, onClick, right }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: '100%', fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500,
        padding: '13px 16px', borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: selected ? 'rgba(43,91,255,0.18)' : 'transparent',
        border: disabled
          ? '1px solid rgba(255,255,255,0.1)'
          : selected
          ? '1px solid rgba(43,91,255,0.7)'
          : '1px solid rgba(255,255,255,0.25)',
        color: disabled ? 'rgba(255,255,255,0.28)' : '#fff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        textAlign: 'left', transition: 'border-color 0.16s ease',
      }}
      onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
      onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
    >
      <span>{children}</span>
      {right && <span style={{ fontSize: '12px', color: right.color }}>{right.label}</span>}
    </button>
  )
}

export default function BookingFlow({ hostKey, onClose }) {
  const host = HOSTS[hostKey]

  const [step, setStep] = useState(1)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    getSlotCounts(hostKey, host.days)
      .then(setCounts)
      .catch(() => {})
  }, [hostKey])

  function count(d, s) {
    return counts[`${d}|${s}`] || 0
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      await createBooking({ host: hostKey, date, slot, name, email })
      setStep(4)
    } catch (ex) {
      setErr(ex.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '8px', padding: '28px 28px 32px', marginTop: '20px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          {step < 4 ? <StepDots step={step} /> : <div />}
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.42)', fontFamily: 'Sora,sans-serif', fontSize: '12px', transition: 'color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.42)' }}
          >
            Close
          </button>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Pick a date ── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              <p style={LABEL}>Pick a date</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {host.days.map(d => {
                  const allFull = TIME_SLOTS.every(s => count(d, s) >= CAPACITY)
                  return (
                    <SlotBtn
                      key={d}
                      disabled={allFull}
                      onClick={() => { setDate(d); setStep(2) }}
                    >
                      {fmtDate(d)}{allFull ? ' — Full' : ''}
                    </SlotBtn>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Pick a time ── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              <BackBtn label={fmtDate(date)} onClick={() => setStep(1)} />
              <p style={LABEL}>Pick a time</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TIME_SLOTS.map(s => {
                  const taken = count(date, s)
                  const full = taken >= CAPACITY
                  const left = CAPACITY - taken
                  const rightLabel = full
                    ? { label: 'Full', color: 'rgba(255,255,255,0.28)' }
                    : left <= 3
                    ? { label: `${left} left`, color: '#f59e0b' }
                    : { label: `${left} spots left`, color: 'rgba(255,255,255,0.45)' }
                  return (
                    <SlotBtn
                      key={s}
                      disabled={full}
                      onClick={() => { setSlot(s); setStep(3) }}
                      right={rightLabel}
                    >
                      {s}
                    </SlotBtn>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Your info ── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              <BackBtn label={`${fmtDate(date)} · ${slot}`} onClick={() => setStep(2)} />
              <p style={LABEL}>Your info</p>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '4px', padding: '12px 14px', fontFamily: 'Sora,sans-serif', fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.16s' }}
                  onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '4px', padding: '12px 14px', fontFamily: 'Sora,sans-serif', fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.16s' }}
                  onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                />
                {err && (
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: '#f87171', margin: '2px 0 0' }}>{err}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600, color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px', padding: '13px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px', boxShadow: '0 4px 18px rgba(43,91,255,0.38)', transition: 'opacity 0.15s, transform 0.15s' }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,91,255,0.52)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(43,91,255,0.38)' }}
                >
                  {loading ? 'Booking…' : 'Confirm my spot'}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Step 4: Confirmed ── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(43,91,255,0.22)', border: '1px solid rgba(43,91,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3.5 3.5 5.5-6.5" stroke="#2B5BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ ...HL, fontSize: '22px', margin: '0 0 6px' }}>You're in.</h3>
              <p style={{ ...BODY, fontSize: '14px', margin: '0 0 24px', color: 'rgba(255,255,255,0.65)' }}>
                {fmtDate(date)} · {slot}
              </p>

              {host.zoomLink ? (
                <a
                  href={host.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600,
                    color: '#fff', background: '#2B5BFF', textDecoration: 'none',
                    borderRadius: '4px', padding: '12px 24px', marginBottom: '20px',
                    boxShadow: '0 4px 18px rgba(43,91,255,0.38)', transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,91,255,0.52)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(43,91,255,0.38)' }}
                >
                  Join on Zoom →
                </a>
              ) : (
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: '0 0 20px' }}>
                  Your join link will be sent to <span style={{ color: 'rgba(255,255,255,0.85)' }}>{email}</span> before the session.
                </p>
              )}

              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.6 }}>
                Save this link — it's the same every session. See you then.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
