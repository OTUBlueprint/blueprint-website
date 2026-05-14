import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import type { Page } from '../types'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light'; go: (p: Page) => void }

export default function Projects({ theme, go }: Props) {
  const t = th(theme)
  const dark = theme === 'dark'

  const steps = [
    { n: '01', title: 'Nonprofit applies', desc: 'A Durham Region nonprofit submits an application describing their challenge and what they need built.' },
    { n: '02', title: 'Scoping session', desc: 'Blueprint meets with the nonprofit to understand the problem deeply before any code is written.' },
    { n: '03', title: 'Team assigned', desc: 'A Blueprint team of developers and designers is matched to the project based on skills and fit.' },
    { n: '04', title: 'Build and ship', desc: 'The team builds over one semester with weekly client check-ins. Final delivery at our Showcase Night.' },
  ]

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>our work</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger text="Our first cohort starts Fall 2026." style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.8rem,6vw,6rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.fg, marginBottom: 28, overflow: 'visible' }} />
      </Reveal>
      <Reveal delay={140}>
        <p style={{ fontFamily: F.mono, fontSize: '0.9rem', color: t.fg2, lineHeight: 1.84, maxWidth: 540, marginBottom: 52, fontWeight: 400 }}>
          Blueprint OTU is assembling its founding team right now. No projects to show yet because we have not started yet. That is the point. You would be here from day one.
        </p>
      </Reveal>

      {/* Big statement */}
      <Reveal>
        <div style={{ background: C.blue, borderRadius: 12, padding: '56px 52px', position: 'relative', overflow: 'hidden', marginBottom: 64 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-55deg,transparent,transparent 28px,rgba(255,255,255,0.03) 28px,rgba(255,255,255,0.03) 29px)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>Coming Fall 2026</div>
            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.8rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: '#fff', marginBottom: 18 }}>
              Real software. Real clients. Real impact.
            </div>
            <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, maxWidth: 540, fontWeight: 400, marginBottom: 32 }}>
              Our first projects will be built for Durham Region nonprofits starting in Fall 2026. If you want to be part of the team that builds them, applications open Fall 2026.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => go('apply')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#fff', color: C.blue, padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
                Apply for Fall 2026
              </button>
              <button onClick={() => go('nonprofits')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(255,255,255,0.8)', padding: '11px 26px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'}>
                Nonprofit? Work with us
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* How a project works */}
      <Reveal><div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, marginBottom: 36 }}>How a Blueprint project works</div></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <motion.div whileHover={{ y: -4, borderColor: C.blue }} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 10, padding: '26px 22px', transition: 'border-color 0.25s' }}>
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2.2rem', color: C.blue, lineHeight: 1, marginBottom: 16, letterSpacing: '-0.03em' }}>{s.n}</div>
              <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.9rem', color: t.fg, marginBottom: 8 }}>{s.title}</div>
              <p style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400 }}>{s.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
