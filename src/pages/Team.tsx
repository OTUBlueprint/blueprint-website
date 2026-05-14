import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import { TEAM } from '../data'
import type { Page } from '../types'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light'; go: (p: Page) => void }

const ROLE_COLORS: Record<string, string> = {
  'Founder':           '#F5A623',
  'President':         '#1A56F0',
  'VP of Engineering': '#4ade80',
  'VP of Design':      '#c084fc',
}

export default function Team({ theme, go }: Props) {
  const t    = th(theme)
  const dark = theme === 'dark'

  return (
    <div style={{ padding: '100px 52px 80px' }}>
      <Reveal><Eyebrow dark={dark}>the team</Eyebrow></Reveal>
      <Reveal delay={60}>
        <WordStagger
          text="The people behind Blueprint OTU."
          style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 16 }}
        />
      </Reveal>
      <Reveal delay={120}>
        <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 480, marginBottom: 64, fontWeight: 400 }}>
          Blueprint OTU is student-led and building its founding team right now. Join us from the very beginning.
        </p>
      </Reveal>

      {/* Leadership — editorial list */}
      <Reveal>
        <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, paddingBottom: 14, borderBottom: `1px solid ${t.bord}` }}>
          Leadership
        </div>
      </Reveal>

      {TEAM.map((m, i) => {
        const accent = ROLE_COLORS[m.role] || C.blue
        return (
          <Reveal key={m.id} delay={i * 55}>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
              style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', alignItems: 'center', gap: 24, padding: '22px 0', borderBottom: `1px solid ${t.bord}` }}
            >
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '1.4rem', color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>
                0{i + 1}
              </div>
              <div>
                <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '1.1rem', color: t.fg, marginBottom: 4, letterSpacing: '-0.01em' }}>
                  {m.name}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                  {m.role}
                </div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${accent}`, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.clash, fontWeight: 700, fontSize: '1rem', color: accent }}>
                {m.initials}
              </div>
            </motion.div>
          </Reveal>
        )
      })}

      {/* We are hiring */}
      <div style={{ marginTop: 72 }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, paddingBottom: 14, borderBottom: `1px solid ${t.bord}`, marginBottom: 0 }}>
            We are hiring
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start', paddingTop: 36 }}>
          <Reveal>
            <div>
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.fg, marginBottom: 18 }}>
                7 roles<br />
                <span style={{ color: C.blue }}>open now.</span>
              </div>
              <p style={{ fontFamily: F.mono, fontSize: '0.84rem', color: t.fg2, lineHeight: 1.8, fontWeight: 400, marginBottom: 28, maxWidth: 300 }}>
                Applications open May 20th and close July 1st.
              </p>
              <button
                onClick={() => go('apply')}
                style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s, transform 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}
              >
                View All Roles
              </button>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              {['Developer', 'Product Designer', 'Illustrator / Motion Designer', 'Social Media Manager', 'Finance Officer', 'Event Coordinator', 'Sponsorship Associate'].map(role => (
                <motion.div
                  key={role}
                  whileHover={{ x: 5 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${t.bord}` }}
                >
                  <span style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.86rem', color: t.fg }}>{role}</span>
                  <span style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.blue }}>Open →</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}