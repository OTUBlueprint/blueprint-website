import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'
import WordStagger from '../components/WordStagger'
import Reveal from '../components/Reveal'
import LineReveal from '../components/LineReveal'
import Eyebrow from '../components/Eyebrow'

import type { NavigateFunction } from 'react-router-dom'
interface Props { theme: 'dark'|'light' }

let globalCtx: AudioContext | null = null
function getCtx(): AudioContext | null {
  try {
    if (!globalCtx) globalCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    if (globalCtx.state === 'suspended') globalCtx.resume()
    return globalCtx
  } catch (_) { return null }
}
if (typeof window !== 'undefined') {
  const init = () => { getCtx(); document.removeEventListener('click', init); document.removeEventListener('keydown', init) }
  document.addEventListener('click', init)
  document.addEventListener('keydown', init)
}

function playTick() {
  const ctx = getCtx(); if (!ctx) return
  try {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(40, ctx.currentTime)
    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.02)
  } catch (_) {}
}

function playBounceSound() {
  const ctx = getCtx(); if (!ctx) return
  try {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  } catch (_) {}
}

function BgLogo({ style }: { style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [light, setLight] = useState({ x: 50, y: 50, active: false })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top)  / rect.height) * 100
        setLight({ x, y, active: true })
      } else {
        setLight(l => l.active ? { ...l, active: false } : l)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src="/logo.webp"
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            opacity: light.active ? 0.32 : 0.12,
            filter: light.active
              ? 'grayscale(1) brightness(2.6) contrast(1.2) saturate(0)'
              : 'none',
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: light.active
            ? `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 30%, transparent 60%)`
            : 'none',
          mixBlendMode: 'overlay',
          opacity: light.active ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: light.active
            ? `radial-gradient(circle at ${100 - light.x}% ${100 - light.y}%, rgba(180,200,255,0.2) 0%, transparent 50%)`
            : 'none',
          mixBlendMode: 'screen',
          opacity: light.active ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

function ZeroSection({ theme }: { theme: 'dark'|'light' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount]     = useState(1000000)
  const [started, setStarted] = useState(false)
  const [finished, setDone]   = useState(false)
  const t = th(theme)

  useEffect(() => {
    const el = containerRef.current; if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          runCount()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  function runCount() {
    const duration = 2000
    const startTime = performance.now()
    let tickTimer = 0

    const frame = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = Math.round(1000000 * (1 - eased))
      setCount(current)
      tickTimer += 16
      if (tickTimer >= 80) { playTick(); tickTimer = 0 }
      if (progress < 1) {
        requestAnimationFrame(frame)
      } else {
        setCount(0)
        setDone(true)
        playBounceSound()
      }
    }
    requestAnimationFrame(frame)
  }

  return (
    <div
      ref={containerRef}
      style={{ height: '100vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: t.fg3,
          marginBottom: 48, textAlign: 'center',
          opacity: started ? 1 : 0, transition: 'opacity 0.5s',
        }}>
          our commitment
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={started ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={finished ? {
              scale: [1, 1.12, 0.94, 1.06, 0.97, 1.02, 1],
              rotate: [0, -3, 3, -2, 2, -1, 0],
            } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              width: 300, height: 300, borderRadius: '50%',
              border: `2px solid ${finished ? C.blue : 'rgba(26,86,240,0.4)'}`,
              background: finished ? 'rgba(26,86,240,0.08)' : 'transparent',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.4s, background 0.4s',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -2, borderRadius: '50%',
                border: '1px solid transparent',
                borderTopColor: 'rgba(26,86,240,0.4)',
                borderRightColor: 'rgba(26,86,240,0.15)',
                pointerEvents: 'none',
              }}
            />

            <div style={{
              fontFamily: F.mono, fontSize: '0.65rem', letterSpacing: '0.14em',
              color: finished ? C.blue : t.fg3, marginBottom: 8,
              transition: 'color 0.4s', textAlign: 'center',
            }}>
              charged to nonprofits
            </div>

            <div style={{
              fontFamily: F.clash, fontWeight: 700,
              fontSize: count === 0 ? '4.5rem' : count >= 100000 ? '2.2rem' : count >= 10000 ? '2.8rem' : count >= 1000 ? '3.4rem' : '4rem',
              color: finished ? C.blue : t.fg,
              letterSpacing: '-0.04em', lineHeight: 1,
              transition: 'font-size 0.08s, color 0.4s',
            }}>
              ${count === 0 ? '0' : count.toLocaleString()}
            </div>

            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: F.mono, fontSize: '0.65rem',
                  color: C.blue, marginTop: 10, letterSpacing: '0.1em',
                }}
              >
                always.
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function About({ theme }: Props) {
  const t     = th(theme)
  const dark  = theme === 'dark'
  const altBg = dark ? '#111111' : '#F0EDE6'

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

     <BgLogo style={{ top: -80, left: -100, width: 600, height: 600 }} />

      {/* HERO */}
      <section style={{ padding: '100px 52px 80px', position: 'relative', zIndex: 2 }}>
        <Reveal><Eyebrow dark={dark}>About Blueprint OTU</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger
            text="Why we exist."
            style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: t.fg, marginBottom: 52 }}
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <Reveal>
            <div>
              {[
                'Blueprint was founded at UC Berkeley in 2012 with a simple belief: student developers have real skills that nonprofits desperately need. The gap between tech and the social sector is not a talent problem. It is a connection problem.',
                'Blueprint OTU brings that mission to Ontario Tech University and Durham Region. We build production software for nonprofits pro bono, while giving our members the real client experience that coursework rarely provides.',
                "Durham Region is one of Canada's fastest-growing communities, home to over 900 registered nonprofits fighting food insecurity, housing instability, newcomer isolation, and digital exclusion. We are the technical partner they could not otherwise afford.",
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
                <div style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.fg3 }}>
                  Cal Blueprint, UC Berkeley
                </div>
              </blockquote>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {[
                  ['Founded',     '2012 at UC Berkeley'],
                  ['OTU Chapter', 'Founding 2024'      ],
                  ['Location',    'Oshawa, Ontario'    ],
                  ['Model',       '100% Pro Bono'      ],
                ].map(([k, v]) => (
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

      {/* $0 STICKY SCROLL SECTION */}
      <ZeroSection theme={theme} />

      <LineReveal color={t.bord} />

      {/* VALUES */}
      <section style={{ background: altBg, padding: '96px 52px', position: 'relative', overflow: 'hidden' }}>
        <Reveal><Eyebrow dark={dark}>Our values</Eyebrow></Reveal>
        <Reveal delay={60}>
          <WordStagger
            text="What we actually believe."
            style={{ fontFamily: F.syne, fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: t.fg, marginBottom: 52 }}
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.9fr', gap: 2 }}>
          {[
            ['Mission first',      'Every decision starts here: does this serve the community?'                           ],
            ['Ship real things',   'We build software real organizations use. Standards matter.'                          ],
            ['No gatekeeping',     'Blueprint is for students who want to grow, not just those who already have.'         ],
            ['Long-term thinking', 'We build structures that outlast any one exec team.'                                  ],
          ].map(([title, body], i) => (
            <Reveal key={String(title)} delay={i * 50}>
              <motion.div
                whileHover={{ y: -3 }}
                style={{ background: t.card, border: `1px solid ${t.bord}`, borderRadius: 10, padding: '24px 20px' }}
              >
                <div style={{ fontFamily: F.syne, fontWeight: 800, fontSize: '0.95rem', color: t.fg, marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: F.mono, fontSize: '0.76rem', color: t.fg2, lineHeight: 1.7, fontWeight: 400 }}>{body}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}