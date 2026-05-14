import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F, th } from '../tokens'
import { EVENTS } from '../data'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'
import StatusDot from '../components/StatusDot'

interface Props { theme: 'dark'|'light' }

const TYPE_C: Record<string,string> = { flagship: '#1A56F0', workshop: '#4ade80', panel: '#c084fc', social: '#fb923c' }
const TYPE_L: Record<string,string> = { flagship: 'Flagship', workshop: 'Workshop', panel: 'Speaker Panel', social: 'Social' }

export default function Events({ theme }: Props) {
  const [tab, setTab]             = useState<'upcoming'|'past'|'all'>('upcoming')
  const [signupId, setSignupId]   = useState<number|null>(null)
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState<number[]>([])
  const t = th(theme)
  const dark = theme === 'dark'

  const shown = tab === 'all' ? EVENTS : EVENTS.filter(e =>
    tab === 'upcoming' ? e.status !== 'past' : e.status === 'past'
  )

  function handleSignup(id: number) {
    if (!email.endsWith('@ontariotechu.net')) {
      alert('Please use your OntarioTechU email address ending in @ontariotechu.net')
      return
    }
    setSubmitted(prev => [...prev, id])
    setSignupId(null)
    setEmail('')
  }

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>events</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger
          text="What we are running."
          style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }}
        />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 44, fontWeight: 400 }}>
          Hackathons. Workshops. Speaker panels. Coffee chats. Mentorship.
        </p>
      </Reveal>

      <Reveal delay={180}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 44 }}>
          {(['upcoming','past','all'] as const).map(tk => (
            <button key={tk} onClick={() => setTab(tk)}
              style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, border: `1px solid ${tab === tk ? 'rgba(26,86,240,0.3)' : t.bord}`, background: tab === tk ? 'rgba(26,86,240,0.1)' : 'transparent', color: tab === tk ? '#1A56F0' : t.fg3, transition: 'all 0.2s' }}>
              {tk === 'upcoming' ? 'Upcoming' : tk === 'past' ? 'Past' : 'All'}
            </button>
          ))}
        </div>
      </Reveal>

      <LineReveal color={t.bord} />

      <AnimatePresence mode="popLayout">
        {shown.map((ev, i) => (
          <motion.div key={ev.id} layout
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1], delay: i * 0.04 }}>
            <motion.div whileHover={{ x: 4 }}
              style={{ borderTop: `1px solid ${t.bord}`, padding: '24px 0', opacity: ev.status === 'placeholder' ? 0.62 : 1, position: 'relative', overflow: 'visible' }}>
              <motion.div
                style={{ position: 'absolute', top: -1, left: 0, height: 2, background: TYPE_C[ev.type], width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: TYPE_C[ev.type] }}>{TYPE_L[ev.type]}</span>
                    <span style={{ width: 1, height: 10, background: t.bord, display: 'inline-block' }} />
                    <span style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, letterSpacing: '0.06em' }}>
                      {ev.date}{ev.time !== 'TBD' ? ` at ${ev.time}` : ''}
                    </span>
                  </div>
                  <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: t.fg, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {ev.title}
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: '0.8rem', color: t.fg2, lineHeight: 1.65, maxWidth: 560, fontWeight: 400, marginBottom: 16 }}>
                    {ev.desc}
                  </p>
                  {ev.status !== 'past' && (
                    submitted.includes(ev.id) ? (
                      <div style={{ fontFamily: F.mono, fontSize: '0.7rem', color: '#4ade80', letterSpacing: '0.06em' }}>
                        You are on the list. We will send updates to your OTU email.
                      </div>
                    ) : signupId === ev.id ? (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                          type="email"
                          placeholder="your@ontariotechu.net"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSignup(ev.id)}
                          style={{ fontFamily: F.mono, fontSize: '0.78rem', fontWeight: 400, padding: '8px 0', background: 'transparent', border: 'none', borderBottom: '1px solid #1A56F0', color: t.fg, outline: 'none', minWidth: 240 }}
                        />
                        <button onClick={() => handleSignup(ev.id)}
                          style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#1A56F0', color: '#fff', padding: '8px 18px', borderRadius: 8, border: 'none', transition: 'background 0.2s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2D6BFF'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A56F0'}>
                          Sign me up
                        </button>
                        <button onClick={() => { setSignupId(null); setEmail('') }}
                          style={{ fontFamily: F.mono, fontSize: '0.66rem', color: t.fg3, background: 'none', border: 'none', letterSpacing: '0.06em' }}>
                          Cancel
                        </button>
                      </motion.div>
                    ) : (
                      <button onClick={() => setSignupId(ev.id)}
                        style={{ fontFamily: F.mono, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: '#1A56F0', padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(26,86,240,0.3)', transition: 'background 0.2s', fontWeight: 400 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,240,0.08)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                        Get notified
                      </button>
                    )
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <StatusDot status={ev.status} />
                  <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, marginTop: 8 }}>📍 {ev.loc}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, marginTop: 4 }}>Cap. {ev.cap}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}