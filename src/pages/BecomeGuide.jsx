import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeUp from '../components/FadeUp'

const ease = [0.16, 1, 0.3, 1]

const panel = {}
const HL = { fontFamily: '"DM Serif Display",serif', color: '#fff', fontWeight: 400 }
const BODY = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.90)', fontSize: '15px', lineHeight: 1.72 }
const MUTED = { fontFamily: 'Sora,sans-serif', color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.65 }
const HAIRLINE = { borderLeft: '1px solid rgba(255,255,255,0.18)' }
const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }

const inputStyle = {
  width: '100%',
  background: '#fff',
  border: '1px solid rgba(13,15,20,0.14)',
  borderRadius: '4px',
  padding: '13px 16px',
  fontFamily: 'Sora,sans-serif',
  fontSize: '14px',
  color: '#0D0F14',
  outline: 'none',
  transition: 'border-color 0.18s',
}

export default function BecomeGuide() {
  const [form, setForm] = useState({ name: '', email: '', linkedin: '', field: '', session: '', bio: '' })
  const [done, setDone] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = e => { e.preventDefault(); if (form.name && form.email) setDone(true) }

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px' }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ ...HL, fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 24px', maxWidth: '740px', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.25)' }}
        >
          You have already made it. Now help someone else get there.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(255,255,255,0.90)', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '580px', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
        >
          Guides on Klime lead live Summit sessions and private Ascending sessions for serious students who are ready to work. Some Guides are 20-year-old founders. Others have decades of experience. What they share is a commitment to opening real doors.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.42, duration: 0.45, ease }}
          href="#apply"
          style={{
            fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500, color: '#fff',
            background: '#2B5BFF', textDecoration: 'none', borderRadius: '4px', padding: '14px 36px',
            boxShadow: '0 4px 20px rgba(43,91,255,0.38)', transition: 'all 0.18s ease', display: 'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.52)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,91,255,0.38)' }}
        >
          Apply to Become a Guide
        </motion.a>
      </section>

      {/* ── WHY BECOME A GUIDE ── */}
      <section className="sec-v" style={{ padding: '100px 40px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="panel-pad" style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 40px', letterSpacing: '-0.4px' }}>Why become a Guide.</h2>
              <div className="g3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { title: 'Give back', body: 'Share what you know with students who are serious enough to earn it.' },
                  { title: 'Build your profile', body: 'Every session adds to your verified Guide profile on Klime.' },
                  { title: 'Open doors', body: 'The connections you make as a Guide go both ways.' },
                ].map((col, i) => (
                  <div key={i} style={{ padding: '0 32px', ...(i > 0 ? HAIRLINE : {}) }}>
                    <h3 style={{ ...HL, fontSize: '22px', margin: '0 0 10px' }}>{col.title}</h3>
                    <p style={{ ...BODY, margin: 0 }}>{col.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHAT GUIDES DO ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="panel-pad" style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 40px', letterSpacing: '-0.4px' }}>What Guides do.</h2>
              <div className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {[
                  {
                    title: 'Summit Sessions',
                    body: 'Lead a live session for up to 10 students in your field. Sessions are 45 minutes. Klime provides a pre-session brief based on cohort surveys so you walk in knowing exactly what the group needs.',
                  },
                  {
                    title: 'Ascending Sessions',
                    body: 'Lead a private one on one session with a single student. You build new curriculum specifically for them before the session. 40 minutes. Direct, personal, and built entirely around their goals.',
                  },
                ].map((col, i) => (
                  <div key={i} style={{ padding: '0 40px', ...(i > 0 ? HAIRLINE : {}) }}>
                    <h3 style={{ ...HL, fontSize: '24px', margin: '0 0 12px' }}>{col.title}</h3>
                    <p style={{ ...BODY, margin: 0 }}>{col.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHO CAN BE A GUIDE ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="panel-pad" style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 16px', letterSpacing: '-0.4px' }}>Who can be a Guide.</h2>
              <p style={{ ...BODY, maxWidth: '620px', margin: '0 0 32px' }}>
                Guides on Klime range from 20-year-old tech founders to senior executives, physicians, government advisors, and investors. If you have real experience in your field and are committed to opening doors, you belong here.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Tech Founders', 'Business Leaders', 'Healthcare', 'Finance', 'National Security', 'Creative'].map((cat, i) => (
                  <span key={i} style={{ fontFamily: 'Sora,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '4px', padding: '8px 16px' }}>{cat}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SCREENING ── */}
      <section className="sec-bot" style={{ padding: '0 40px 100px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="panel-pad" style={panel}>
              <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 36px', letterSpacing: '-0.4px' }}>
                Every Guide is screened before they ever lead a session.
              </h2>
              <div className="g3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                {[
                  { title: 'AI credential scan', body: 'Our AI cross-references professional history, public credentials, and field relevance before a Guide is even considered.' },
                  { title: 'Founder review', body: 'Ryan and Max personally review every Guide application. If something feels off, the Guide does not move forward. No exceptions.' },
                  { title: 'Ongoing monitoring', body: 'After every Summit, AI analyzes student feedback. Guides who fall below the bar are flagged and reviewed before their next session.' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '0 28px', ...(i > 0 ? HAIRLINE : {}) }}>
                    <h4 style={{ ...HL, fontSize: '18px', margin: '0 0 8px' }}>{s.title}</h4>
                    <p style={{ ...MUTED, margin: 0 }}>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="sec-bot" style={{ padding: '0 40px 120px' }}>
        <div className="wrap-pad" style={wrap}>
          <FadeUp>
            <div className="panel-pad" style={panel}>
              {!done ? (
                <>
                  <h2 style={{ ...HL, fontSize: 'clamp(22px,2.8vw,36px)', margin: '0 0 8px', letterSpacing: '-0.4px' }}>Apply to become a Guide.</h2>
                  <p style={{ ...MUTED, margin: '0 0 40px' }}>We review every application personally. Expect to hear back within a week.</p>
                  <form onSubmit={submit} className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '6px' }}>Full name *</label>
                      <input required type="text" value={form.name} onChange={set('name')} style={inputStyle} onFocus={e => e.target.style.borderColor = '#2B5BFF'} onBlur={e => e.target.style.borderColor = 'rgba(13,15,20,0.14)'} />
                    </div>
                    <div>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '6px' }}>Email *</label>
                      <input required type="email" value={form.email} onChange={set('email')} style={inputStyle} onFocus={e => e.target.style.borderColor = '#2B5BFF'} onBlur={e => e.target.style.borderColor = 'rgba(13,15,20,0.14)'} />
                    </div>
                    <div>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '6px' }}>LinkedIn URL</label>
                      <input type="url" value={form.linkedin} onChange={set('linkedin')} style={inputStyle} onFocus={e => e.target.style.borderColor = '#2B5BFF'} onBlur={e => e.target.style.borderColor = 'rgba(13,15,20,0.14)'} />
                    </div>
                    <div>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '6px' }}>Field of expertise *</label>
                      <select required value={form.field} onChange={set('field')} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={e => e.target.style.borderColor = '#2B5BFF'} onBlur={e => e.target.style.borderColor = 'rgba(13,15,20,0.14)'}>
                        <option value="">Select a field</option>
                        {['Tech and Engineering', 'Business and Finance', 'Healthcare', 'National Security', 'Creative and Media', 'Law and Policy', 'Other'].map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '10px' }}>Which sessions are you interested in?</label>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {['Summit sessions', 'Ascending sessions', 'Both'].map(opt => (
                          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Sora,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.88)' }}>
                            <input type="radio" name="session" value={opt} onChange={set('session')} checked={form.session === opt} style={{ accentColor: '#2B5BFF' }} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ ...MUTED, display: 'block', marginBottom: '6px' }}>Brief bio — tell us who you are and why you want to be a Guide *</label>
                      <textarea required value={form.bio} onChange={set('bio')} rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} onFocus={e => e.target.style.borderColor = '#2B5BFF'} onBlur={e => e.target.style.borderColor = 'rgba(13,15,20,0.14)'} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <button type="submit" style={{
                        fontFamily: 'Sora,sans-serif', fontSize: '15px', fontWeight: 500,
                        color: '#fff', background: '#2B5BFF', border: 'none', borderRadius: '4px',
                        padding: '15px 40px', cursor: 'pointer', transition: 'all 0.18s ease',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(43,91,255,0.42)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                      >
                        Apply to Become a Guide
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                  <h2 style={{ ...HL, fontSize: 'clamp(24px,3vw,40px)', margin: '0 0 12px' }}>Application received.</h2>
                  <p style={{ ...BODY, maxWidth: '480px', margin: 0 }}>We review every application personally. Expect to hear back within a week.</p>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-row" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Klime</span>
        <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>&copy; 2026 Klime</span>
      </footer>
    </main>
  )
}
