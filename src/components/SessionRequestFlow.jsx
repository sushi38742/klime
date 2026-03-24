import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitSessionRequest } from '../lib/supabase'
import { sendEmail } from '../lib/emailjs'

const ease = [0.16, 1, 0.3, 1]

const TOPICS = [
  'Pre-calculus',
  'Calculus',
  'Linear Algebra',
  'Differential Equations',
  'Statistics',
  'SAT Math',
  'ACT Math',
  'Study Methods',
  'Starting a Tutoring Business',
  'Other',
]

const BUCKETS = [
  { label: 'Morning',   sub: '8 am – 12 pm' },
  { label: 'Afternoon', sub: '12 – 5 pm'    },
  { label: 'Evening',   sub: '5 – 9 pm'     },
]

function nextDays(n) {
  const out = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  for (let i = 0; i < n; i++) { out.push(new Date(d)); d.setDate(d.getDate() + 1) }
  return out
}
const fmtWkd  = d => d.toLocaleDateString('en-US', { weekday: 'short' })
const fmtDate = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const wKey    = (d, b) => `${d.toISOString().slice(0, 10)}|${b}`

// ── shared styles ──────────────────────────────────────────────────────────────
const S = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    background: '#0c0c0e', border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '12px', width: '100%', maxWidth: '540px',
    maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
    fontFamily: 'Sora,sans-serif',
  },
  head: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px 0',
  },
  closeBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '50%', width: '28px', height: '28px',
    cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  body: { padding: '24px' },
  label: { fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 14px' },
  hint:  { fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: '6px 0 0', lineHeight: 1.5 },
  input: {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px', padding: '11px 14px',
    color: '#fff', fontSize: '14px', fontFamily: 'Sora,sans-serif',
    outline: 'none',
  },
  btn: {
    width: '100%', padding: '13px', borderRadius: '6px',
    background: '#2B5BFF', border: 'none', cursor: 'pointer',
    color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'Sora,sans-serif',
    boxShadow: '0 4px 20px rgba(43,91,255,0.35)', transition: 'all 0.16s ease',
  },
  btnDisabled: {
    background: 'rgba(255,255,255,0.07)', boxShadow: 'none', cursor: 'not-allowed', color: 'rgba(255,255,255,0.3)',
  },
  back: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'Sora,sans-serif',
    padding: 0, textDecoration: 'underline', textUnderlineOffset: '3px',
  },
  errBox: {
    background: 'rgba(255,60,60,0.09)', border: '1px solid rgba(255,60,60,0.22)',
    borderRadius: '6px', padding: '11px 14px',
    color: '#ff6b6b', fontSize: '13px', margin: '0 0 16px',
  },
}

// ── dots progress ──────────────────────────────────────────────────────────────
function Dots({ step }) {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          width: n === step ? '20px' : '6px', height: '6px', borderRadius: '99px',
          background: n === step ? '#2B5BFF' : n < step ? 'rgba(43,91,255,0.4)' : 'rgba(255,255,255,0.12)',
          transition: 'all 0.22s ease',
        }} />
      ))}
    </div>
  )
}

// ── step label ─────────────────────────────────────────────────────────────────
const STEP_LABELS = ['What do you need?', 'When are you free?', 'Your info']

// ── main component ─────────────────────────────────────────────────────────────
export default function SessionRequestFlow({ guide, onClose }) {
  const [step,    setStep]    = useState(1)
  const [topics,  setTopics]  = useState([])
  const [notes,   setNotes]   = useState('')
  const [windows, setWindows] = useState(new Set())
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  const days = nextDays(8)

  // close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  function toggleTopic(t) {
    setTopics(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  }

  function toggleWindow(key) {
    setWindows(prev => {
      const n = new Set(prev)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })
  }

  async function submit() {
    if (!name.trim() || !email.trim()) return setErr('Name and email are required.')
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) return setErr('Enter a valid email address.')
    setLoading(true); setErr('')
    try {
      const windowList = [...windows].map(k => {
        const [iso, bucket] = k.split('|')
        const d = new Date(iso + 'T12:00:00')
        return `${fmtWkd(d)} ${fmtDate(d)} – ${bucket}`
      }).sort()
      await submitSessionRequest({
        guide:   guide.name,
        topics:  topics.join(', ') || 'Not specified',
        notes:   notes.trim() || '',
        windows: windowList.join('\n'),
        name:    name.trim(),
        email:   email.trim(),
      })
      await sendEmail({
        subject:       `New Session Request — ${name.trim()} wants to work with ${guide.name}`,
        reply_to:      email.trim(),
        guide_name:    guide.name,
        student_name:  name.trim(),
        student_email: email.trim(),
        topics:        topics.join(', ') || 'Not specified',
        notes:         notes.trim() || 'None',
        windows:       windowList.join('\n'),
      }).catch(() => {})
      setStep(4)
    } catch (e) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  const s1Valid = topics.length > 0
  const s2Valid = windows.size >= 3

  return (
    <div style={S.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div
        style={S.modal}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.26, ease }}
      >

        {/* header */}
        <div style={S.head}>
          {step < 4 ? <Dots step={step} /> : <div />}
          <button style={S.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: topics ── */}
          {step === 1 && (
            <motion.div key="s1" style={S.body}
              initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.22, ease }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                Step 1 of 3 — {STEP_LABELS[0]}
              </p>
              <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '22px', fontWeight: 400, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                What do you want to work on?
              </h2>
              <p style={{ ...S.hint, margin: '0 0 20px' }}>
                Select everything that applies. Sessions are built specifically around your goals and gaps — this helps {guide.name} prepare.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {TOPICS.map(t => {
                  const on = topics.includes(t)
                  return (
                    <button key={t} onClick={() => toggleTopic(t)} style={{
                      fontFamily: 'Sora,sans-serif', fontSize: '12px', fontWeight: on ? 600 : 500,
                      padding: '7px 14px', borderRadius: '100px', cursor: 'pointer',
                      border: on ? '1px solid #2B5BFF' : '1px solid rgba(255,255,255,0.13)',
                      background: on ? 'rgba(43,91,255,0.18)' : 'rgba(255,255,255,0.04)',
                      color: on ? '#6b90ff' : 'rgba(255,255,255,0.55)',
                      transition: 'all 0.14s ease',
                    }}>
                      {t}
                    </button>
                  )
                })}
              </div>

              <p style={S.label}>Anything specific? (optional)</p>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={'e.g. "I have a calc 2 final in two weeks and I\'m stuck on series convergence"'}
                rows={3}
                style={{ ...S.input, resize: 'vertical', lineHeight: 1.6 }}
              />
              <p style={{ ...S.hint, marginBottom: '20px' }}>The more context, the better prepared {guide.name} will be.</p>

              <button
                onClick={() => setStep(2)}
                disabled={!s1Valid}
                style={{ ...S.btn, ...(s1Valid ? {} : S.btnDisabled) }}
              >
                Next — when are you free?
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: availability grid ── */}
          {step === 2 && (
            <motion.div key="s2" style={S.body}
              initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.22, ease }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                Step 2 of 3 — {STEP_LABELS[1]}
              </p>
              <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '22px', fontWeight: 400, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                Mark your open windows.
              </h2>
              <p style={{ ...S.hint, margin: '0 0 20px' }}>
                Tap at least 3. {guide.name} picks the best overlap and emails you a confirmed time — usually within 24 hours.
              </p>

              {/* grid: rows = buckets, cols = days */}
              <div style={{ overflowX: 'auto', marginBottom: '6px' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '420px' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '90px' }} />
                      {days.map((d, i) => (
                        <th key={i} style={{ padding: '0 2px 10px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{fmtWkd(d)}</div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{fmtDate(d)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BUCKETS.map(b => (
                      <tr key={b.label}>
                        <td style={{ paddingRight: '10px', paddingBottom: '6px', verticalAlign: 'middle' }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{b.label}</div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{b.sub}</div>
                        </td>
                        {days.map((d, i) => {
                          const key = wKey(d, b.label)
                          const on  = windows.has(key)
                          return (
                            <td key={i} style={{ padding: '0 2px 6px', textAlign: 'center' }}>
                              <button
                                onClick={() => toggleWindow(key)}
                                aria-label={`${fmtWkd(d)} ${b.label}`}
                                style={{
                                  width: '36px', height: '36px', borderRadius: '6px',
                                  border: on ? '1px solid #2B5BFF' : '1px solid rgba(255,255,255,0.1)',
                                  background: on ? 'rgba(43,91,255,0.22)' : 'rgba(255,255,255,0.03)',
                                  cursor: 'pointer', transition: 'all 0.12s ease',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                              >
                                {on && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4l3 3 5-6" stroke="#6b90ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </button>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', margin: '0 0 20px' }}>
                {windows.size === 0 && 'Select at least 3 windows to continue.'}
                {windows.size > 0 && windows.size < 3 && `${3 - windows.size} more needed.`}
                {windows.size >= 3 && `${windows.size} window${windows.size > 1 ? 's' : ''} selected — looks good.`}
              </p>

              <button
                onClick={() => setStep(3)}
                disabled={!s2Valid}
                style={{ ...S.btn, ...(s2Valid ? {} : S.btnDisabled), marginBottom: '10px' }}
              >
                Next — your info
              </button>
              <div style={{ textAlign: 'center' }}>
                <button style={S.back} onClick={() => setStep(1)}>Back</button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: contact info ── */}
          {step === 3 && (
            <motion.div key="s3" style={S.body}
              initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.22, ease }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                Step 3 of 3 — {STEP_LABELS[2]}
              </p>
              <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '22px', fontWeight: 400, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                Almost there.
              </h2>
              <p style={{ ...S.hint, margin: '0 0 22px' }}>
                {guide.name} will email you at the address below with a confirmed time, a Zoom link, and anything to bring to the session.
              </p>

              {err && <div style={S.errBox}>{err}</div>}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <p style={S.label}>Your name</p>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="First and last name"
                    style={S.input}
                  />
                </div>
                <div>
                  <p style={S.label}>Email address</p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={S.input}
                  />
                  <p style={S.hint}>This is where your confirmation lands. Double-check it.</p>
                </div>
              </div>

              {/* compact request summary */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
                <p style={{ ...S.label, margin: '0 0 8px' }}>Your request</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>Topics: </span>{topics.join(', ') || '—'}
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>Windows: </span>{windows.size} selected
                  </p>
                </div>
              </div>

              <button
                onClick={submit}
                disabled={loading}
                style={{ ...S.btn, ...(loading ? S.btnDisabled : {}), marginBottom: '10px' }}
              >
                {loading ? 'Sending request…' : 'Send session request'}
              </button>
              <div style={{ textAlign: 'center' }}>
                <button style={S.back} onClick={() => { setErr(''); setStep(2) }}>Back</button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: confirmation ── */}
          {step === 4 && (
            <motion.div key="s4" style={S.body}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.26, ease }}
            >
              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(43,91,255,0.12)', border: '1px solid rgba(43,91,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="#6b90ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '24px', fontWeight: 400, color: '#fff', margin: '0 0 10px' }}>
                  Request sent.
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 8px', maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {guide.name} reviews requests daily. You'll receive a confirmation at <strong style={{ color: 'rgba(255,255,255,0.75)' }}>{email}</strong> with a confirmed time, Zoom link, and anything to bring.
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', margin: '0 0 28px' }}>
                  Usually within 24 hours. Check your spam folder if you don't hear back.
                </p>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '14px 16px', marginBottom: '24px', textAlign: 'left' }}>
                  <p style={{ ...S.label, margin: '0 0 8px' }}>What you submitted</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.22)' }}>Topics: </span>{topics.join(', ')}
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    <span style={{ color: 'rgba(255,255,255,0.22)' }}>Availability: </span>{windows.size} window{windows.size !== 1 ? 's' : ''} proposed
                  </p>
                </div>

                <button onClick={onClose} style={{ ...S.btn, maxWidth: '260px' }}>
                  Done
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  )
}
