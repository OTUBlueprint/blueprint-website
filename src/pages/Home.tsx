import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { C, F, th } from '../tokens'
import type { Page } from '../types'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Ticker from '../components/Ticker'
import Eyebrow from '../components/Eyebrow'

interface Props { go: (p: Page) => void; theme: 'dark'|'light' }

export default function Home({ go, theme }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const t = th(theme)
  const dark = theme === 'dark'

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '100px 52px 80px' }}>
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', y: gridY,
          backgroundImage: `repeating-linear-gradient(90deg,rgba(26,86,240,0.045) 0,rgba(26,86,240,0.045) 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,rgba(26,86,240,0.045) 0,rgba(26,86,240,0.045) 1px,transparent 1px,transparent 80px)`,
        }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle,rgba(26,86,240,0.08) 0%,transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.blue, display: 'inline-block', animation: 'pulse 2.2s ease infinite' }} />
              <span style={{ fontFamily: F.mono, fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blue }}>
                Blueprint — Ontario Tech University Chapter
              </span>
            </div>
          </motion.div>

          <div style={{ overflow: 'visible' }}>
            <WordStagger text="We build software" style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(4rem,11vw,12rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, whiteSpace: 'nowrap', overflow: 'visible' }} delay={200} stagger={0.07} />
            <WordStagger text="for the people" style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(4rem,11vw,12rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: C.blue, whiteSpace: 'nowrap', overflow: 'visible' }} delay={380} stagger={0.07} />
            <WordStagger text="who need it most." style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(4rem,11vw,12rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, whiteSpace: 'nowrap', overflow: 'visible' }} delay={560} stagger={0.07} />
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: [0.16,1,0.3,1] }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 52, flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 440 }}>
              <p style={{ fontFamily: F.mono, fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.84, color: t.fg2, marginBottom: 28 }}>
                Blueprint OTU builds free software for Durham Region nonprofits. Real products. Real clients. Real community impact, every semester.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => go('apply')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}>
                  Apply Now
                </button>
                <button onClick={() => go('nonprofits')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '11px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}>
                  Partner with Us
                </button>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '0.6rem', color: t.fg3, marginTop: 10, letterSpacing: '0.06em' }}>
                applications open fall 2026 · first cohort fall 2026
              </div>
            </div>

            <div style={{ display: 'flex', gap: 40 }}>
              {[['75', 'active members'], ['1', 'nonprofit partner'], ['$0', 'charged ever']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.4rem,4vw,3.8rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.fg }}>{n}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.fg3, marginTop: 7 }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
          style={{ position: 'absolute', bottom: 36, left: 52, display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} style={{ fontSize: '0.7rem', color: t.fg3 }}>↓</motion.span>
          <span style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: t.fg3 }}>scroll</span>
        </motion.div>

        <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      </section>

      <Ticker dark={dark} />

      {/* WHAT WE DO */}
      <section style={{ padding: '96px 52px' }}>
        <Reveal><Eyebrow dark={dark}>What we do</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger text="Three things we do really well." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 48 }} />
        </Reveal>
        <LineReveal color={t.bord} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.9fr', gap: '1px', background: t.bord, borderRadius: 10, overflow: 'hidden', marginTop: 1 }}>
          {[
            { n: '01', h: 'Build software', b: 'We partner with Durham Region nonprofits every semester to scope, design, and ship real production software. Fully free, no strings attached.', big: true },
            { n: '02', h: 'Develop students', b: 'Members graduate with portfolios, client references, and the kind of experience most students do not get until their second job.' },
            { n: '03', h: 'Grow community', b: 'Hackathons, workshops, panels, and mentorship. We build a culture of tech for good across OTU and Durham.' },
          ].map(({ n, h, b, big }) => (
            <Reveal key={n}>
              <motion.div whileHover={{ background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(17,17,17,0.04)' }}
                style={{ background: t.surf, padding: `${big ? 44 : 30}px ${big ? 40 : 26}px`, height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: big ? 36 : 22, right: big ? 32 : 20, fontFamily: F.mono, fontSize: '0.56rem', color: t.fg3, letterSpacing: '0.1em', transform: 'rotate(90deg)', transformOrigin: 'center' }}>{n}</div>
                <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: big ? '1.8rem' : '1.3rem', lineHeight: 1.05, color: t.fg, marginBottom: 14, letterSpacing: '-0.025em' }}>{h}</div>
                <p style={{ fontFamily: F.mono, fontSize: '0.82rem', lineHeight: 1.78, color: t.fg2, fontWeight: 400 }}>{b}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMING SOON BAND */}
      <section style={{ background: C.blue, padding: '80px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-55deg,transparent,transparent 28px,rgba(255,255,255,0.03) 28px,rgba(255,255,255,0.03) 29px)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>First cohort</div>
            <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.8rem,6vw,5.5rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: '#fff' }}>Fall 2026.</div>
            <div style={{ fontFamily: F.mono, fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 480, marginTop: 18, fontWeight: 400 }}>
              Blueprint OTU is building its founding team right now. Applications open fall 2026. Be part of something from the very beginning.
            </div>
          </div>
          <button onClick={() => go('apply')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#fff', color: C.blue, padding: '13px 30px', borderRadius: 10, border: 'none', transition: 'transform 0.2s, box-shadow 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '' }}>
            Apply for Fall 2026
          </button>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 52px', textAlign: 'center' }}>
        <Reveal><div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.fg3, marginBottom: 22 }}>open applications</div></Reveal>
        <Reveal delay={80}>
          <WordStagger text="Build something that actually matters." style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.8rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 20, display: 'block', textAlign: 'center' }} />
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 420, margin: '0 auto 36px', fontWeight: 400 }}>
            No experience required. Just the drive to use your skills for something real.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => go('apply')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '11px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s, transform 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blueMid; el.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = '' }}>
              Apply Now
            </button>
            <button onClick={() => go('nonprofits')} style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '11px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}>
              Nonprofits
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
