const cols = [
  {
    name: 'MasterClass',
    dim: true,
    rows: ['Pre-recorded videos', 'Watch celebrities talk', 'No interaction', 'No personal access'],
  },
  {
    name: 'TED',
    dim: true,
    rows: ['Inspiring talks', 'One-way broadcast', 'No follow-up', 'No direct connection'],
  },
  {
    name: 'Klime',
    dim: false,
    rows: ['Live every session', 'You ask the questions', 'Your Guide knows your name', 'You walk away connected'],
  },
]

export default function ZoneComparison() {
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
        fontSize: 'clamp(24px,3vw,42px)',
        color: '#F0F2F7',
        margin: '0 0 10px',
        letterSpacing: '-0.5px',
        lineHeight: 1.1,
        maxWidth: '640px',
      }}>
        TED inspires you. MasterClass teaches you. Klime connects you.
      </h2>

      <p style={{
        fontFamily: 'Sora,sans-serif',
        fontSize: '14px',
        color: 'rgba(240,242,247,0.42)',
        lineHeight: 1.7,
        margin: '0 0 36px',
        maxWidth: '500px',
      }}>
        We took the energy of a TED stage, the caliber of a MasterClass professional, and built something neither offers — a live room where you talk back, get heard, and leave with a real connection.
      </p>

      {/* Comparison table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        width: '100%',
        maxWidth: '860px',
        marginBottom: '44px',
      }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{
            padding: '0 32px',
            borderLeft: ci > 0 ? '1px solid rgba(240,242,247,0.08)' : 'none',
            textAlign: 'left',
          }}>
            <div style={{
              fontFamily: '"DM Serif Display",serif',
              fontSize: '20px',
              color: col.dim ? 'rgba(240,242,247,0.38)' : '#2B5BFF',
              marginBottom: '14px',
            }}>
              {col.name}
            </div>
            {col.rows.map((row, ri) => (
              <p key={ri} style={{
                fontFamily: 'Sora,sans-serif',
                fontSize: '12px',
                color: col.dim ? 'rgba(240,242,247,0.32)' : 'rgba(240,242,247,0.75)',
                margin: '0 0 8px',
                lineHeight: 1.55,
              }}>
                {row}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: '100%', maxWidth: '860px', height: '1px', background: 'rgba(240,242,247,0.07)', marginBottom: '32px' }} />

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '0', maxWidth: '600px', width: '100%', justifyContent: 'center' }}>
        {[
          { val: '10', lbl: 'Climbers per Summit' },
          { val: '1', lbl: 'Verified Guide' },
          { val: 'Live', lbl: 'Never recorded' },
        ].map((s, i, arr) => (
          <div key={i} style={{
            flex: 1,
            textAlign: 'center',
            paddingLeft: i > 0 ? '32px' : 0,
            paddingRight: i < arr.length - 1 ? '32px' : 0,
            borderRight: i < arr.length - 1 ? '1px solid rgba(240,242,247,0.08)' : 'none',
          }}>
            <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(28px,3.5vw,48px)', color: '#F0F2F7', lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', color: 'rgba(240,242,247,0.38)', marginTop: '6px' }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
