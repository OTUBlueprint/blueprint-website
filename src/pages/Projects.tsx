import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

export default function Projects({ theme }: Props) {
  const navigate = useNavigate()
  const t    = th(theme)
  const dark = theme === 'dark'

  return (
    <div style={{ padding: '100px 52px 80px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <img src="/logo.webp" alt="" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, objectFit: 'contain', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal><Eyebrow dark={dark}>Projects</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger
            text="Our first projects launch Fall 2026."
            style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 24 }}
          />
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontFamily: F.mono, fontSize: '0.9rem', color: t.fg2, lineHeight: 1.84, maxWidth: 520, marginBottom: 48, fontWeight: 400 }}>
            Blueprint OTU is currently recruiting its founding cohort. Our first nonprofit software projects will launch with the Fall 2026 semester. Check back then to see what we ship.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('/nonprofits')}
              style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
              Partner with Us
            </button>
            <button onClick={() => navigate('/apply')}
              style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '11px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}>
              Join the Team
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}