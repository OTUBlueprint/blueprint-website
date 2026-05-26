import { useState } from 'react'
import { C, F, th } from '../tokens'

interface Props { theme: 'dark' | 'light' }

export default function Interview({ theme }: Props) {
  const t = th(theme)
  const dark = theme === 'dark'

  const [password,     setPassword]     = useState('')
  const [authed,       setAuthed]        = useState(false)
  const [authError,    setAuthError]     = useState('')

  const [toName,       setToName]        = useState('')
  const [toEmail,      setToEmail]       = useState('')
  const [role,         setRole]          = useState('')
  const [format,       setFormat]        = useState('')
  const [length,       setLength]        = useState('20 minutes')
  const [meetingLink,  setMeetingLink]   = useState('')
  const [deadline,     setDeadline]      = useState('')

  const [sending,      setSending]       = useState(false)
  const [sent,         setSent]          = useState(false)
  const [error,        setError]         = useState('')

  const fb = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'

  const IS: React.CSSProperties = {
    display: 'block', width: '100%', background: 'transparent',
    border: 'none', borderBottom: `1px solid ${fb}`,
    color: t.fg, fontFamily: F.mono, fontSize: '0.84rem',
    fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 20,
    boxSizing: 'border-box',
  }

  function checkPassword() {
    if (password === 'Acvvdd04-') {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password.')
    }
  }

  async function sendInterview() {
    if (!toName || !toEmail || !role || !format || !meetingLink || !deadline) {
      setError('Please fill in all fields.')
      return
    }
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/send-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: 'Acvvdd04-',
          to_name: toName,
          to_email: toEmail,
          role,
          format,
          length,
          meeting_link: meetingLink,
          deadline,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSent(true)
      setToName(''); setToEmail(''); setRole('')
      setFormat(''); setLength('20 minutes')
      setMeetingLink(''); setDeadline('')
    } catch (e: any) {
      setError(e.message || 'Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 16, padding: 40, width: '100%', maxWidth: 400 }}>
          <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '1.8rem', color: t.fg, marginBottom: 8, letterSpacing: '-0.03em' }}>Admin Access</div>
          <p style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, marginBottom: 24 }}>Enter the password to send interview invitations.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPassword()}
            style={{ ...IS, marginBottom: 12 }}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
            onBlur={e => (e.currentTarget.style.borderBottomColor = fb)}
          />
          {authError && <p style={{ fontFamily: F.mono, fontSize: '0.7rem', color: '#f87171', marginBottom: 12 }}>{authError}</p>}
          <button onClick={checkPassword}
            style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none' }}>
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '80px 52px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.5rem)', color: t.fg, marginBottom: 8, letterSpacing: '-0.03em' }}>Send Interview Invite</div>
        <p style={{ fontFamily: F.mono, fontSize: '0.8rem', color: t.fg2, marginBottom: 40 }}>Fill in the details below to send an interview invitation.</p>

        {sent && (
          <div style={{ padding: '16px 20px', borderRadius: 10, background: 'rgba(74,222,128,0.1)', border: '1px solid #4ade80', marginBottom: 28 }}>
            <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: '#4ade80', margin: 0 }}>Interview invitation sent successfully.</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '16px 20px', borderRadius: 10, background: 'rgba(248,113,113,0.1)', border: '1px solid #f87171', marginBottom: 28 }}>
            <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: '#f87171', margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 0 }}>
          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Applicant Name</label>
          <input placeholder="Full name" value={toName} onChange={e => setToName(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Applicant OTU Email</label>
          <input type="email" placeholder="their@ontariotechu.net" value={toEmail} onChange={e => setToEmail(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Role</label>
          <input placeholder="e.g. Frontend Developer" value={role} onChange={e => setRole(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Format</label>
          <input placeholder="e.g. Video Call via Google Meet" value={format} onChange={e => setFormat(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Meeting Length</label>
          <select value={length} onChange={e => setLength(e.target.value)}
            style={{ ...IS, appearance: 'none', WebkitAppearance: 'none', background: t.bg,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center' }}>
            <option value="20 minutes">20 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="40 minutes">40 minutes</option>
          </select>

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Meeting Link</label>
          <input placeholder="https://calendly.com/..." value={meetingLink} onChange={e => setMeetingLink(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <label style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3, marginBottom: 4, display: 'block' }}>Book By Deadline</label>
          <input placeholder="e.g. May 25, 2026" value={deadline} onChange={e => setDeadline(e.target.value)} style={IS}
            onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)} onBlur={e => (e.currentTarget.style.borderBottomColor = fb)} />

          <button onClick={sendInterview} disabled={sending}
            style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: sending ? t.bord : C.blue, color: sending ? t.fg3 : '#fff', padding: '14px', borderRadius: 10, border: 'none', marginTop: 8 }}>
            {sending ? 'Sending...' : 'Send Interview Invitation'}
          </button>
        </div>
      </div>
    </div>
  )
}
