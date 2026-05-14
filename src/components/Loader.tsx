import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F } from '../tokens'

const SEEN_KEY = 'bpotu_loader_v6'

function WalkFigure({ frame }: { frame: number }) {
  const isStep = frame % 2 === 0
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
      <circle cx="16" cy="6" r="5" fill={C.blue} />
      <rect x="13" y="12" width="6" height="14" rx="2" fill={C.blue} />
      <motion.line
        x1="13" y1="14"
        x2={isStep ? 4 : 6}
        y2={isStep ? 22 : 26}
        stroke={C.blue} strokeWidth="3" strokeLinecap="round"
        animate={{ x2: isStep ? 4 : 6, y2: isStep ? 22 : 26 }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />
      <motion.line
        x1="19" y1="14"
        x2={isStep ? 28 : 26}
        y2={isStep ? 26 : 22}
        stroke={C.blue} strokeWidth="3" strokeLinecap="round"
        animate={{ x2: isStep ? 28 : 26, y2: isStep ? 26 : 22 }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />
      <motion.line
        x1="15" y1="26"
        x2={isStep ? 8 : 14}
        y2={isStep ? 42 : 44}
        stroke={C.blue} strokeWidth="3.5" strokeLinecap="round"
        animate={{ x2: isStep ? 8 : 14, y2: isStep ? 42 : 44 }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />
      <motion.line
        x1="17" y1="26"
        x2={isStep ? 22 : 18}
        y2={isStep ? 44 : 42}
        stroke={C.blue} strokeWidth="3.5" strokeLinecap="round"
        animate={{ x2: isStep ? 22 : 18, y2: isStep ? 44 : 42 }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function playRevealSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3)
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.9)
  } catch (_) {}
}

function playStepSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (_) {}
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const [show]    = useState(() => !sessionStorage.getItem(SEEN_KEY))
  const [pct, setPct]     = useState(0)
  const [frame, setFrame] = useState(0)
  const [posX, setPosX]   = useState(-5)
  const [exit, setExit]   = useState(false)
  const raf  = useRef<number>(0)
  const step = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (!show) { onDone(); return }

    const start = performance.now()
    const total = 3200

    step.current = setInterval(() => {
      setFrame(f => f + 1)
      setPosX(x => Math.min(x + 1.1, 102))
      playStepSound()
    }, 160)

    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setPct(eased * 100)
      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        clearInterval(step.current)
        playRevealSound()
        setTimeout(() => {
          setExit(true)
          setTimeout(() => {
            sessionStorage.setItem(SEEN_KEY, '1')
            onDone()
          }, 650)
        }, 300)
      }
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf.current)
      clearInterval(step.current)
    }
  }, [show, onDone])

  if (!show) return null

  const W  = 320
  const H  = 48
  const SW = 16

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: C.dark,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(90deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px),
              repeating-linear-gradient(0deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px)`,
          }} />

          {/* Walking figure */}
          <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, height: 52, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', bottom: 0, left: `${posX}%`, transform: 'translateX(-50%)' }}>
              <WalkFigure frame={frame} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(26,86,240,0.15)' }} />
          </div>

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <motion.img
              src="/logo.webp"
              alt="Blueprint OTU"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
              style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 24 }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                fontFamily: F.syne, fontWeight: 800, fontSize: '0.8rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(245,245,245,0.65)', marginBottom: 40,
              }}
            >
              Blueprint OTU
            </motion.div>

            {/* Striped pill bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              <div style={{
                width: W, height: H, borderRadius: H / 2,
                border: '2px solid rgba(26,86,240,0.45)',
                background: 'rgba(26,86,240,0.05)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Filled — animated blue stripes */}
                <div style={{
                  position: 'absolute', inset: 0,
                  clipPath: `inset(0 ${(1 - pct / 100) * 100}% 0 0 round ${H / 2}px)`,
                  transition: 'clip-path 0.06s linear', overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ backgroundPositionX: ['0px', `${SW * 2}px`] }}
                    transition={{ duration: 0.55, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `repeating-linear-gradient(-45deg,${C.blue} 0px,${C.blue} ${SW}px,rgba(255,255,255,0.22) ${SW}px,rgba(255,255,255,0.22) ${SW * 2}px)`,
                      backgroundSize: `${SW * 2}px ${SW * 2}px`,
                    }}
                  />
                </div>

                {/* Unfilled — grey stripes */}
                <div style={{
                  position: 'absolute', inset: 0,
                  clipPath: `inset(0 0 0 ${pct}% round ${H / 2}px)`,
                  transition: 'clip-path 0.06s linear', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(-45deg,rgba(255,255,255,0.05) 0px,rgba(255,255,255,0.05) ${SW}px,transparent ${SW}px,transparent ${SW * 2}px)`,
                    backgroundSize: `${SW * 2}px ${SW * 2}px`,
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, width: W }}>
                <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: 'rgba(245,245,245,0.38)', letterSpacing: '0.06em' }}>
                  loading...
                </span>
                <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.blue, letterSpacing: '0.08em' }}>
                  {Math.round(pct)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}