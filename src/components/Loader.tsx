import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C, F } from '../tokens'

const SEEN_KEY = 'bpotu_loader_v5'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [show]    = useState(() => !sessionStorage.getItem(SEEN_KEY))
  const [pct, setPct] = useState(0)
  const [exit, setExit] = useState(false)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!show) { onDone(); return }
    const start = performance.now()
    const total = 1800
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setPct(eased * 100)
      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setExit(true)
        setTimeout(() => { sessionStorage.setItem(SEEN_KEY, '1'); onDone() }, 550)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [show, onDone])

  if (!show) return null

  const W = 340
  const H = 48
  const SW = 16

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: C.dark,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(90deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px),
              repeating-linear-gradient(0deg,rgba(26,86,240,0.04) 0,rgba(26,86,240,0.04) 1px,transparent 1px,transparent 80px)`,
          }} />

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
              <div style={{
                position: 'absolute', inset: 0,
                clipPath: `inset(0 ${(1 - pct / 100) * 100}% 0 0 round ${H / 2}px)`,
                transition: 'clip-path 0.06s linear',
                overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ backgroundPositionX: ['0px', `${SW * 2}px`] }}
                  transition={{ duration: 0.55, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      ${C.blue}  0px,
                      ${C.blue}  ${SW}px,
                      rgba(255,255,255,0.22) ${SW}px,
                      rgba(255,255,255,0.22) ${SW * 2}px
                    )`,
                    backgroundSize: `${SW * 2}px ${SW * 2}px`,
                  }}
                />
              </div>

              <div style={{
                position: 'absolute', inset: 0,
                clipPath: `inset(0 0 0 ${pct}% round ${H / 2}px)`,
                transition: 'clip-path 0.06s linear',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    rgba(255,255,255,0.05) 0px,
                    rgba(255,255,255,0.05) ${SW}px,
                    transparent ${SW}px,
                    transparent ${SW * 2}px
                  )`,
                  backgroundSize: `${SW * 2}px ${SW * 2}px`,
                }} />
              </div>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: 12, width: W,
            }}>
              <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: 'rgba(245,245,245,0.38)', letterSpacing: '0.06em' }}>
                loading...
              </span>
              <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.blue, letterSpacing: '0.08em' }}>
                {Math.round(pct)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}