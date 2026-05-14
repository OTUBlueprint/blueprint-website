import { useEffect, useRef, useState, useCallback } from 'react'

export function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, vis }
}

export function useCountUp(target: number, dur = 1000, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step = () => { v = Math.min(v + Math.ceil(target / (dur / 16)), target); setVal(v); if (v < target) requestAnimationFrame(step) }
    requestAnimationFrame(step)
  }, [active, target, dur])
  return val
}

export function useTheme() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  const toggle = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.body.classList.toggle('light', next === 'light')
      return next
    })
  }, [])
  return { theme, toggle }
}

export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}
