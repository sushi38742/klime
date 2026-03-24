import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getSessionRequests,
  updateSessionStatus,
  getSummitBookings,
} from '../lib/supabase'

const ease = [0.16, 1, 0.3, 1]
const MONO = { fontFamily: '"DM Mono",ui-monospace,monospace' }
const SANS = { fontFamily: 'Sora,sans-serif' }
const SERIF = { fontFamily: '"DM Serif Display",serif' }

const CORRECT_PIN = import.meta.env.VITE_PORTAL_PIN || '0000'

const STATUS_COLORS = {
  pending:   { bg: 'rgba(255,180,0,0.1)',  border: 'rgba(255,180,0,0.3)',  text: '#ffb400' },
  confirmed: { bg: 'rgba(43,91,255,0.1)',  border: 'rgba(43,91,255,0.3)',  text: '#6b90ff' },
  completed: { bg: 'rgba(0,200,120,0.1)',  border: 'rgba(0,200,120,0.3)',  text: '#00c878' },
}

// ── helpers ────────────────────────────────────────────────────────────────────
function fmtTs(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function parseWindows(raw) {
  if (!raw) return []
  return raw.split('\n').map(s => s.trim()).filter(Boolean)
}

// ── StatusBadge ────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '100px', background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {status || 'pending'}
    </span>
  )
}

// ── SessionCard ────────────────────────────────────────────────────────────────
function SessionCard({ req, onStatusChange }) {
  const [open,   setOpen]   = useState(false)
  const [busy,   setBusy]   = useState(false)
  const [copied, setCopied] = useState(false)
  const windows = parseWindows(req.windows)

  async function setStatus(s) {
    setBusy(true)
    await updateSessionStatus(req.id, s)
    onStatusChange(req.id, s)
    setBusy(false)
  }

  function copyEmail() {
    navigator.clipboard.writeText(req.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>

      {/* top row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', flex: 1 }}>
          <div>
            <p style={{ ...SANS, fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{req.name}</p>
            <p style={{ ...MONO, fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{req.email}</p>
          </div>
          <StatusBadge status={req.status} />
          {req.guide && (
            <span style={{ ...SANS, fontSize: '11px', color: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '4px', padding: '2px 8px' }}>
              {req.guide}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <span style={{ ...SANS, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>{fmtTs(req.created_at)}</span>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.18s ease', transform: open ? 'rotate(45deg)' : 'none' }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4 1v6M1 4h6" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </button>

      {/* expanded */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

              {/* left: topics + notes */}
              <div style={{ padding: '18px 20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 10px' }}>Topics</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {(req.topics || 'Not specified').split(', ').map((t, i) => (
                    <span key={i} style={{ ...SANS, fontSize: '11px', color: 'rgba(255,255,255,0.55)', background: 'rgba(43,91,255,0.08)', border: '1px solid rgba(43,91,255,0.2)', borderRadius: '100px', padding: '3px 10px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                {req.notes && (
                  <>
                    <p style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 7px' }}>Student's notes</p>
                    <p style={{ ...SANS, fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"{req.notes}"</p>
                  </>
                )}
              </div>

              {/* right: availability windows */}
              <div style={{ padding: '18px 20px' }}>
                <p style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 10px' }}>
                  Proposed windows ({windows.length})
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {windows.map((w, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(43,91,255,0.5)', flexShrink: 0 }} />
                      <span style={{ ...MONO, fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>{w}</span>
                    </div>
                  ))}
                  {windows.length === 0 && (
                    <span style={{ ...SANS, fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>No windows recorded.</span>
                  )}
                </div>
              </div>
            </div>

            {/* actions */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={copyEmail} style={{ ...SANS, fontSize: '12px', fontWeight: 500, cursor: 'pointer', padding: '7px 14px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)', color: copied ? '#00c878' : 'rgba(255,255,255,0.55)', transition: 'all 0.14s ease' }}>
                {copied ? 'Copied!' : 'Copy email'}
              </button>
              <a href={`mailto:${req.email}?subject=Your session request with ${req.guide || 'your Guide'}`} style={{ ...SANS, fontSize: '12px', fontWeight: 500, textDecoration: 'none', padding: '7px 14px', borderRadius: '4px', background: 'rgba(43,91,255,0.1)', border: '1px solid rgba(43,91,255,0.25)', color: '#6b90ff' }}>
                Reply via email
              </a>
              <div style={{ flex: 1 }} />
              {req.status !== 'confirmed' && (
                <button disabled={busy} onClick={() => setStatus('confirmed')} style={{ ...SANS, fontSize: '12px', fontWeight: 600, cursor: busy ? 'not-allowed' : 'pointer', padding: '7px 16px', borderRadius: '4px', background: 'rgba(43,91,255,0.15)', border: '1px solid rgba(43,91,255,0.3)', color: '#6b90ff', transition: 'all 0.14s ease', opacity: busy ? 0.5 : 1 }}>
                  Mark confirmed
                </button>
              )}
              {req.status !== 'completed' && (
                <button disabled={busy} onClick={() => setStatus('completed')} style={{ ...SANS, fontSize: '12px', fontWeight: 600, cursor: busy ? 'not-allowed' : 'pointer', padding: '7px 16px', borderRadius: '4px', background: 'rgba(0,200,120,0.1)', border: '1px solid rgba(0,200,120,0.25)', color: '#00c878', transition: 'all 0.14s ease', opacity: busy ? 0.5 : 1 }}>
                  Mark completed
                </button>
              )}
              {req.status && req.status !== 'pending' && (
                <button disabled={busy} onClick={() => setStatus('pending')} style={{ ...SANS, fontSize: '12px', cursor: busy ? 'not-allowed' : 'pointer', padding: '7px 14px', borderRadius: '4px', background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', opacity: busy ? 0.5 : 1 }}>
                  Reset
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── SummitRow ──────────────────────────────────────────────────────────────────
function SummitRow({ b }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 110px 120px 1fr auto', gap: '12px', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ ...SANS, fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'capitalize' }}>{b.host}</span>
      <span style={{ ...MONO, fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>{b.date}</span>
      <span style={{ ...MONO, fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{b.slot}</span>
      <div>
        <p style={{ ...SANS, fontSize: '13px', color: '#fff', margin: '0 0 1px' }}>{b.name}</p>
        <p style={{ ...MONO, fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{b.email}</p>
      </div>
    </div>
  )
}

// ── PIN screen ─────────────────────────────────────────────────────────────────
function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState(false)

  function attempt(e) {
    e.preventDefault()
    if (pin === CORRECT_PIN) { onUnlock() } else { setErr(true); setPin(''); setTimeout(() => setErr(false), 1800) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="8" width="12" height="9" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4"/>
            <path d="M6 8V6a3 3 0 016 0v2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{ ...SERIF, fontSize: '24px', fontWeight: 400, color: '#fff', margin: '0 0 6px' }}>Guide portal</h1>
        <p style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '0 0 28px' }}>Enter your access PIN to continue.</p>
        <form onSubmit={attempt} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="PIN"
            autoFocus
            style={{ fontFamily: 'Sora,sans-serif', textAlign: 'center', letterSpacing: '0.3em', fontSize: '18px', padding: '14px', borderRadius: '8px', border: `1px solid ${err ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.12)'}`, background: 'rgba(255,255,255,0.04)', color: '#fff', outline: 'none', transition: 'border-color 0.16s ease' }}
          />
          {err && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ ...SANS, fontSize: '12px', color: '#ff6b6b', margin: 0 }}
            >
              Incorrect PIN. Try again.
            </motion.p>
          )}
          <button type="submit" style={{ ...SANS, fontSize: '14px', fontWeight: 600, padding: '13px', borderRadius: '8px', background: '#2B5BFF', border: 'none', color: '#fff', cursor: 'pointer' }}>
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ── main page ──────────────────────────────────────────────────────────────────
export default function GuidesPortal() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('portal_auth') === 'ok')
  const [tab,      setTab]      = useState('sessions')
  const [sessions, setSessions] = useState([])
  const [summits,  setSummits]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('all')   // all | pending | confirmed | completed

  function unlock() { sessionStorage.setItem('portal_auth', 'ok'); setUnlocked(true) }

  const load = useCallback(async () => {
    setLoading(true)
    const [s, b] = await Promise.all([getSessionRequests(), getSummitBookings()])
    setSessions(s)
    setSummits(b)
    setLoading(false)
  }, [])

  useEffect(() => { if (unlocked) load() }, [unlocked, load])

  function handleStatusChange(id, status) {
    setSessions(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  if (!unlocked) return <PinGate onUnlock={unlock} />

  // derived
  const guides = [...new Set(sessions.map(s => s.guide).filter(Boolean))]
  const filteredSessions = sessions.filter(s => {
    const statusMatch = filter === 'all' || (s.status || 'pending') === filter
    return statusMatch
  })

  const counts = {
    all:       sessions.length,
    pending:   sessions.filter(s => !s.status || s.status === 'pending').length,
    confirmed: sessions.filter(s => s.status === 'confirmed').length,
    completed: sessions.filter(s => s.status === 'completed').length,
  }

  const summitsByHost = summits.reduce((acc, b) => {
    const h = b.host || 'unknown'
    if (!acc[h]) acc[h] = []
    acc[h].push(b)
    return acc
  }, {})

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>
              Internal · Klime
            </p>
            <h1 style={{ ...SERIF, fontSize: '28px', fontWeight: 400, color: '#fff', margin: '0 0 4px' }}>Guide Portal</h1>
            <p style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              {sessions.length} session request{sessions.length !== 1 ? 's' : ''} · {summits.length} summit booking{summits.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            style={{ ...SANS, fontSize: '12px', fontWeight: 500, padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
          {[
            { id: 'sessions', label: `Sessions (${sessions.length})` },
            { id: 'summits',  label: `Summits (${summits.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ ...SANS, fontSize: '13px', fontWeight: tab === t.id ? 600 : 400, padding: '8px 18px', borderRadius: '5px', border: 'none', cursor: 'pointer', background: tab === t.id ? 'rgba(255,255,255,0.09)' : 'none', color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.14s ease' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── SESSIONS TAB ── */}
        {tab === 'sessions' && (
          <div>
            {/* filter chips */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '18px', flexWrap: 'wrap' }}>
              {Object.entries(counts).map(([k, n]) => (
                <button key={k} onClick={() => setFilter(k)} style={{ ...SANS, fontSize: '11px', fontWeight: filter === k ? 700 : 500, padding: '5px 12px', borderRadius: '100px', border: `1px solid ${filter === k ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.09)'}`, background: filter === k ? 'rgba(255,255,255,0.09)' : 'none', color: filter === k ? '#fff' : 'rgba(255,255,255,0.35)', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.14s ease' }}>
                  {k} {n}
                </button>
              ))}
            </div>

            {loading ? (
              <p style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>Loading…</p>
            ) : filteredSessions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ ...SANS, fontSize: '14px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                  {sessions.length === 0 ? 'No session requests yet.' : 'Nothing matches this filter.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredSessions.map(r => (
                  <SessionCard key={r.id} req={r} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SUMMITS TAB ── */}
        {tab === 'summits' && (
          <div>
            {loading ? (
              <p style={{ ...SANS, fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>Loading…</p>
            ) : summits.length === 0 ? (
              <p style={{ ...SANS, fontSize: '14px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', padding: '60px 0', margin: 0 }}>No summit bookings yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {Object.entries(summitsByHost).map(([host, bookings]) => (
                  <div key={host} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ ...SANS, fontSize: '14px', fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{host}</span>
                      <span style={{ ...SANS, fontSize: '11px', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '4px', padding: '2px 8px' }}>
                        {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {/* column headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: '90px 110px 120px 1fr auto', gap: '12px', padding: '8px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Host', 'Date', 'Slot', 'Student', ''].map((h, i) => (
                        <span key={i} style={{ ...SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>{h}</span>
                      ))}
                    </div>
                    {bookings.map((b, i) => <SummitRow key={i} b={b} />)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
