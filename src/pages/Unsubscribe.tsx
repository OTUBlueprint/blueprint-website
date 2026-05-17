import { useState } from 'react'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import emailjs from '@emailjs/browser'

interface Props { theme: 'dark' | 'light' }

export default function Unsubscribe({ theme }: Props) {
  const t = th(theme)
  const dark = theme === 'dark'

  const [email, setEmail]   = useState('')
  const [done,  setDone]    = useState(false)
  const [error, setError]   = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_UNSUBSCRIBE_TEMPLATE,
        { email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setDone(true)
    } catch {
      setError(true)
    }
  }

  const fb = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 52px', background: t.bg }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>

        {done ? (
          <>
            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', color: t.fg, letterSpacing: '-0.04em', marginBottom: 16 }}>
              You're unsubscribed.
            </div>
            <p style={{ fontFamily: F.mono, fontSize: '0.84rem', color: t.fg2, lineHeight: 1.78 }}>
              We have received your request and will remove {email} from our mailing list within 48 hours.
            </p>
          </>
        ) : (
          <>
            <Reveal>
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, marginBottom: 20 }}>Mailing List</div>
              <WordStagger text="Unsubscribe." style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, marginBottom: 20 }} />
              <p style={{ fontFamily: F.mono, fontSize: '0.84rem', color: t.fg2, lineHeight: 1.78, marginBottom: 40 }}>
                Enter your email below and we will remove you from all Blueprint OTU mailing lists.
              </p>
            </Reveal>

            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fb}`, color: t.fg, fontFamily: F.mono, fontSize: '0.9rem', padding: '12px 0', outline: 'none', marginBottom: 24, boxSizing: 'border-box', textAlign: 'center' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                onBlur={e  => (e.currentTarget.style.borderBottomColor = fb)}
              />
              {error && (
                <p style={{ fontFamily: F.mono, fontSize: '0.72rem', color: '#f87171', marginBottom: 16 }}>
                  Something went wrong. Email us directly at otublueprint@hotmail.com to unsubscribe.
                </p>
              )}
              <button type="submit"
                style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: t.fg, color: t.bg, padding: '14px', borderRadius: 10, border: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                Unsubscribe
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}