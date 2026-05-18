import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { C, F, th } from '../tokens'

interface Props { theme: 'dark' | 'light' }

const SECRET = 'blueprint2026'

function encode(name: string): string {
  return btoa(SECRET + ':' + name)
}

function decode(token: string): string | null {
  try {
    const decoded = atob(token)
    if (decoded.startsWith(SECRET + ':')) {
      return decoded.replace(SECRET + ':', '')
    }
    return null
  } catch {
    return null
  }
}

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const COLORS = ['#1A56F0', '#60a5fa', '#ffffff', '#c084fc', '#4ade80', '#fb923c', '#f87171']

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  shape: 'rect' | 'circle'
}

export default function Welcome({ theme }: Props) {
  const t = th(theme)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [authorized, setAuthorized] = useState(false)
  const [name, setName] = useState('there')
  const [checked, setChecked] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      const decoded = decode(token)
      if (decoded) {
        setAuthorized(true)
        setName(decoded)
      } else {
        navigate('/')
      }
    } else {
      navigate('/')
    }
    setChecked(true)
  }, [])

  useEffect(() => {
    if (!authorized) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    for (let i = 0; i < 180; i++) {
      particlesRef.current.push({
        id:            i,
        x:             randomRange(0, canvas.width),
        y:             randomRange(-canvas.height, 0),
        vx:            randomRange(-2, 2),
        vy:            randomRange(2, 6),
        color:         COLORS[Math.floor(Math.random() * COLORS.length)],
        size:          randomRange(6, 14),
        rotation:      randomRange(0, 360),
        rotationSpeed: randomRange(-4, 4),
        shape:         Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameRef.current++

      if (frameRef.current < 180 && frameRef.current % 20 === 0) {
        for (let i = 0; i < 30; i++) {
          particlesRef.current.push({
            id:            Date.now() + i,
            x:             randomRange(0, canvas.width),
            y:             -20,
            vx:            randomRange(-2.5, 2.5),
            vy:            randomRange(3, 7),
            color:         COLORS[Math.floor(Math.random() * COLORS.length)],
            size:          randomRange(6, 14),
            rotation:      randomRange(0, 360),
            rotationSpeed: randomRange(-5, 5),
            shape:         Math.random() > 0.5 ? 'rect' : 'circle',
          })
        }
      }

      particlesRef.current = particlesRef.current.filter(p => p.y < canvas.height + 20)

      for (const p of particlesRef.current) {
        p.x        += p.vx
        p.y        += p.vy
        p.vy       += 0.08
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.9

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [authorized])

  if (!checked) return null

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 32px', maxWidth: 560 }}>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '2px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}
        >
          <motion.svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <motion.path
              d="M8 18l7 7 13-13"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontFamily: F.mono, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blue, marginBottom: 16 }}>
            Welcome to Blueprint OTU
          </div>
          <div style={{ fontFamily: F.clash, fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: t.fg, marginBottom: 24 }}>
            You're on<br />the team.
          </div>
          <p style={{ fontFamily: F.mono, fontSize: '0.88rem', color: t.fg2, lineHeight: 1.84, maxWidth: 400, margin: '0 auto 40px', fontWeight: 400 }}>
            Hi {name}, welcome to the founding cohort of Blueprint OTU. We are so glad to have you with us. Check your email for onboarding details.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/apply')}
              style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: C.blue, color: '#fff', padding: '12px 26px', borderRadius: 10, border: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.blueMid}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.blue}
            >
              View Your Team
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ fontFamily: F.syne, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: t.fg2, padding: '12px 26px', borderRadius: 10, border: `1px solid ${t.bord}`, transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.blue; el.style.color = C.blue }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.bord; el.style.color = t.fg2 }}
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}