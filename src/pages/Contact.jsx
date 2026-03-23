import Footer from '../components/Footer'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'
import { sendEmail, TEMPLATE } from '../lib/emailjs'

const ease = [0.16, 1, 0.3, 1]

const HL   = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED= { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.65 }
const HAIR = '1px solid rgba(255,255,255,0.18)'
const wrap = { maxWidth: '680px', margin: '0 auto', padding: '0 40px' }

const labelStyle = {
  fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)', marginBottom: '8px', display: 'block',
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '4px', padding: '13px 16px', fontFamily: 'Sora,sans-serif',
  fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.18s',
  boxSizing: 'border-box',
}

const TYPES = [
  'Cancellation',
  'Refund request',
  'Accessibility',
  'Financial access',
  'Conduct or report',
  'Data or privacy',
  'General question',
  'Feedback',
]

const TYPE_HINTS = {
  'Cancellation':      'Tell us the session date, your email, and whether the cancellation was yours or ours.',
  'Refund request':    'Include your booking email, the session date, and a brief reason. We respond within 2 business days.',
  'Accessibility':     'Describe what you need and when your session is. No documentation required.',
  'Financial access':  'Tell us a bit about where you are and why cost is a barrier. There is no formal criteria.',
  'Conduct or report': 'Include the session date and a description of what happened. Every report is reviewed.',
  'Data or privacy':   'Let us know if you are requesting access, a correction, or full deletion. We respond within 30 days.',
  'General question':  'Ask us anything.',
  'Feedback':          'Tell us what worked, what did not, or what you would change.',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.type || !form.message) return
    setSending(true)
    await sendEmail(TEMPLATE.CONTACT, {
      from_name:    form.name,
      from_email:   form.email,
      type:         form.type,
      message:      form.message,
    }).catch(() => {})
    setSending(false)
    setDone(true)
  }

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 40px 72px', textAlign: 'center' }}>
        <div style={wrap}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...MUTED, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 20px' }}
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ ...HL, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.08, letterSpacing: '-1.5px', margin: '0 0 16px', textShadow: '0 2px 24px rgba(0,0,0,0.28)' }}
          >
            We read every message.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ ...BODY, color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Whether something went wrong, you have feedback, or you just have a question — tell us and we will respond.
          </motion.p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: '0 40px 120px' }}>
        <div style={wrap}>
          <FadeUp>
            {done ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ ...HL, fontSize: 'clamp(22px,3vw,36px)', margin: '0 0 16px' }}>Got it.</p>
                <p style={{ ...BODY, color: 'rgba(255,255,255,0.65)', margin: '0 0 36px' }}>
                  We will get back to you within 2 business days.
                </p>
                <Link
                  to="/"
                  style={{ fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 500, color: '#fff', background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '12px 28px' }}
                >
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-grid">
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>What is this about?</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {TYPES.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: t }))}
                        style={{
                          fontFamily: 'Sora,sans-serif', fontSize: '13px', fontWeight: 500,
                          padding: '8px 18px', borderRadius: '100px', cursor: 'pointer',
                          transition: 'all 0.16s ease',
                          background: form.type === t ? '#2B5BFF' : 'rgba(255,255,255,0.07)',
                          border: form.type === t ? '1px solid #2B5BFF' : '1px solid rgba(255,255,255,0.2)',
                          color: form.type === t ? '#fff' : 'rgba(255,255,255,0.72)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {form.type && TYPE_HINTS[form.type] && (
                  <p style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '-12px 0 0', lineHeight: 1.6 }}>
                    {TYPE_HINTS[form.type]}
                  </p>
                )}

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us what happened or what you think."
                    value={form.message}
                    onChange={set('message')}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={e => { e.target.style.borderColor = '#2B5BFF' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)' }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={sending || !form.type}
                    style={{
                      fontFamily: 'Sora,sans-serif', fontSize: '14px', fontWeight: 600,
                      color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px',
                      padding: '13px 36px', cursor: sending || !form.type ? 'not-allowed' : 'pointer',
                      opacity: sending || !form.type ? 0.55 : 1,
                      transition: 'all 0.18s ease', boxShadow: '0 4px 20px rgba(43,91,255,0.35)',
                    }}
                    onMouseEnter={e => { if (!sending && form.type) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,255,0.52)' } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.35)' }}
                  >
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                </div>

              </form>
            )}
          </FadeUp>
        </div>
      </section>

      <Footer />

    </main>
  )
}
