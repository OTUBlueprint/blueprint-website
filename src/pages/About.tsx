import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

export default function About({ theme }: Props) {
  const t = th(theme)
  const dark = theme === 'dark'
  const altBg = dark ? '#111111' : '#F0EDE6'

  return (
    <div>
      <section style={{ padding: '100px 52px 80px' }}>
        <Reveal><Eyebrow dark={dark}>About Blueprint OTU</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="Why we exist." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 52 }} />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <Reveal>
            <div>
              {[
                'Blueprint was founded at UC Berkeley in 2012 with a simple belief: student developers have real skills that nonprofits desperately need. The gap between tech and the social sector is not a talent problem. It is a connection problem.',
                'The Blueprint OTU chapter brings that mission to Ontario Tech University and Durham Region. We build production software for nonprofits pro bono, while giving our members the real client experience that coursework rarely provides.',
                'Durham Region is one of Canada\'s fastest-growing communities, home to over 900 registered nonprofits fighting food insecurity, housing instability, newcomer isolation, and digital exclusion. We are the technical partner they could not otherwise afford.',
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: F.mono, fontSize: '0.9rem', lineHeight: 1.84, color: t.fg2, fontWeight: 400, marginBottom: 22 }}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <blockquote style={{ background: t.surf, borderLeft: `3px solid ${C.blue}`, borderRadius: '0 10px 10px 0', padding: '24px 24px 24px 28px', marginBottom: 22 }}>
                <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.97rem', lineHeight: 1.72, color: t.fg, marginBottom: 14 }}>
                  "Blueprint makes big strides in sparking conversations on campus to help bring students, academia, nonprofits, and companies together."
                </div>
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3 }}>Cal Blueprint, UC Berkeley</div>
              </blockquote>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {[['Founded', '2012 at UC Berkeley'], ['OTU Chapter', 'Founding 4'], ['Location', 'Oshawa, Ontario'], ['Model', '100% Pro Bono']].map(([k, v]) => (
                  <div key={k} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 10, padding: '13px 15px' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginBottom: 5 }}>{k}</div>
                    <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.86rem', color: t.fg }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: altBg, padding: '96px 52px' }}>
        <Reveal><Eyebrow dark={dark}>Our values</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="What we actually believe." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 52 }} />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.9fr', gap: 2 }}>
          {[
            ['Mission first', 'Every decision starts here: does this serve the community?'],
            ['Ship real things', 'We build software real organizations use. Standards matter.'],
            ['No gatekeeping', 'Blueprint is for students who want to grow, not just those who already have.'],
            ['Long-term thinking', 'We build structures that outlast any one exec team.'],
          ].map(([title, body], i) => (
            <Reveal key={String(title)} delay={i * 50}>
              <motion.div whileHover={{ y: -3 }} style={{ background: t.card, border: `1px solid ${t.bord}`, borderRadius: 10, padding: '24px 20px' }}>
                <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '0.95rem', color: t.fg, marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400 }}>{body}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: C.blue, padding: '72px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-55deg,transparent,transparent 28px,rgba(255,255,255,0.03) 28px,rgba(255,255,255,0.03) 29px)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, position: 'relative', zIndex: 1 }}>
          {[['75', 'active members'], ['1', 'nonprofit partner'], ['$0', 'charged ever']].map(([v, l]) => (
            <div key={l}>
              <div style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.22)', marginBottom: 13 }} />
              <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(3rem,5vw,5rem)', lineHeight: 0.92, color: '#fff', letterSpacing: '-0.04em', marginBottom: 8 }}>{v}</div>
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
