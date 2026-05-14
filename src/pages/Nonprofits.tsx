import { useState } from 'react'
import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'

interface Props { theme: 'dark'|'light' }

const HOW_IT_WORKS = [
  { n: '01', title: 'You apply',         desc: 'Fill out our application form describing your organization, the challenge you are facing, and what you need built. No technical knowledge required.' },
  { n: '02', title: 'We review',         desc: 'Blueprint OTU reviews all applications within two weeks of the deadline. We look for a clearly defined problem that software can realistically solve.' },
  { n: '03', title: 'Scoping session',   desc: 'If selected, we meet with you to understand the problem deeply before writing a line of code. This is the most important meeting of the project.' },
  { n: '04', title: 'We build',          desc: 'A dedicated team of Blueprint developers and designers works on your project over one full semester with weekly check-ins and progress updates.' },
  { n: '05', title: 'You receive',       desc: 'At the end of the semester, your team presents the final product at our Showcase Night and hands over a fully deployed, production-ready application.' },
]

const CRITERIA = [
  { title: 'Durham Region focus',       desc: 'We prioritize nonprofits operating in Durham Region, Oshawa, and the surrounding communities. This is where Ontario Tech lives.' },
  { title: 'Solvable with software',    desc: 'Your challenge needs to be something a web or mobile application can meaningfully help with. If you are not sure, apply anyway and we will figure it out together.' },
  { title: 'Active organization',       desc: 'We work with organizations that are operational and have real users or clients we can interview and test with during the build process.' },
  { title: 'Willingness to collaborate',desc: 'Our best projects happen when the nonprofit is genuinely invested. We need a point of contact who can meet weekly and give honest feedback.' },
]

export default function Nonprofits({ theme }: Props) {
  const [sent, setSent] = useState(false)
  const t = th(theme)
  const dark = theme === 'dark'
  const fBord = dark ? 'rgba(245,245,245,0.12)' : 'rgba(17,17,17,0.13)'
  const altBg = dark ? '#111111' : '#F0EDE6'

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '100px 52px 80px' }}>
        <Reveal><Eyebrow dark={dark}>work with us</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="Your mission deserves great software." style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.6rem,6vw,5.8rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.fg, marginBottom: 28, overflow: 'visible' }} />
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontFamily: F.mono, fontSize: '0.92rem', color: t.fg2, lineHeight: 1.84, maxWidth: 560, marginBottom: 36, fontWeight: 400 }}>
            Blueprint OTU builds free, production software for Durham Region nonprofits. No cost. No catch. Just a team of Ontario Tech students who want to use their skills for something that matters.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a href="#apply-form" style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '12px 28px', borderRadius: 10, border: 'none', display: 'inline-block', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}>
            Apply to Work with Blueprint
          </a>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: altBg, padding: '96px 52px' }}>
        <Reveal><Eyebrow dark={dark}>the process</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="How it works." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 52 }} />
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <motion.div whileHover={{ x: 5 }} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 28, padding: '24px 0', borderBottom: `1px solid ${t.bord}` }}>
                <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2rem', color: C.blue, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '1.05rem', color: t.fg, marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontFamily: F.mono, fontSize: '0.82rem', color: t.fg2, lineHeight: 1.72, fontWeight: 400 }}>{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section style={{ padding: '96px 52px' }}>
        <Reveal><Eyebrow dark={dark}>what we look for</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="The right nonprofit partner." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 52 }} />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.9fr', gap: 2 }}>
          {CRITERIA.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 50}>
              <motion.div whileHover={{ y: -4, borderColor: C.blue }} style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 10, padding: '24px 20px', transition: 'border-color 0.25s' }}>
                <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.92rem', color: t.fg, marginBottom: 9 }}>{title}</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.68, fontWeight: 400 }}>{desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <LineReveal color={t.bord} />

      {/* APPLICATION FORM */}
      <section id="apply-form" style={{ padding: '96px 52px' }}>
        <Reveal><Eyebrow dark={dark}>nonprofit application</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="Apply to work with Blueprint OTU." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 16 }} />
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 520, marginBottom: 52, fontWeight: 400 }}>
            Applications for our first cohort open Fall 2026. Projects begin Fall 2026. Fill this out now and we will be in touch when applications open.
          </p>
        </Reveal>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '72px 24px', background: t.surf, borderRadius: 12, border: `1px solid ${t.bord}`, maxWidth: 560 }}>
            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: '2.4rem', color: C.blue, marginBottom: 18, letterSpacing: '-0.04em' }}>Application received.</div>
            <p style={{ fontFamily: F.mono, fontSize: '0.84rem', color: t.fg2, lineHeight: 1.84, fontWeight: 400, marginBottom: 28 }}>We will be in touch before applications officially open. Thank you for what you do for the community.</p>
            <button onClick={() => setSent(false)} style={{ fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '9px 20px', borderRadius: 10, border: `1px solid ${t.bord}` }}>Submit another</button>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
            <Reveal>
              <div>
                <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '1.1rem', color: t.fg, marginBottom: 14 }}>Before you apply</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.78rem', color: t.fg2, lineHeight: 1.72, fontWeight: 400, marginBottom: 22 }}>
                  Read through how it works above. Think about one specific challenge in your organization that software could realistically help with. That is all you need.
                </p>
                <div style={{ fontFamily: F.mono, fontSize: '0.78rem', color: t.fg2, lineHeight: 1.72, fontWeight: 400, marginBottom: 22 }}>
                  Applications are reviewed by Blueprint leadership. We accept 2 to 3 nonprofit partners per semester. If you are not selected this round, you will be first in line for the next.
                </div>
                <div style={{ background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: 10, padding: '18px 20px' }}>
                  <div style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.84rem', color: C.blue, marginBottom: 6 }}>Questions?</div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.74rem', color: t.fg2, fontWeight: 400 }}>Email us at blueprintotech@gmail.com or reach out on LinkedIn.</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ background: t.surf, border: `1px solid ${t.bord}`, borderRadius: 12, padding: 36 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {['Organization name', 'Your name'].map(ph => (
                    <input key={ph} placeholder={ph} style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 16 }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />
                  ))}
                </div>
                {['Your email address', 'Organization website (optional)'].map(ph => (
                  <input key={ph} placeholder={ph} style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', marginBottom: 16 }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />
                ))}
                {[
                  'What is your organization\'s mission? (2 to 3 sentences)',
                  'What specific problem are you trying to solve with software?',
                  'What have you already tried? What has not worked?',
                  'What does your current tech setup look like?',
                  'Who would be your main point of contact during the project?',
                  'Is there anything else we should know?',
                ].map(ph => (
                  <textarea key={ph} rows={3} placeholder={ph} style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${fBord}`, color: t.fg, fontFamily: F.mono, fontSize: '0.8rem', fontWeight: 400, padding: '10px 0', outline: 'none', resize: 'none', marginBottom: 16 }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = C.blue)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = fBord)} />
                ))}
                <button onClick={() => setSent(true)} style={{ width: '100%', fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', marginTop: 8, transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}>
                  Submit Application
                </button>
                <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, textAlign: 'center', marginTop: 10 }}>we review all applications and respond within two weeks</div>
              </div>
            </Reveal>
          </div>
        )}
      </section>
    </div>
  )
}
