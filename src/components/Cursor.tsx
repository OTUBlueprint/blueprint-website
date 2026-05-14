import { useEffect, useRef } from 'react'
import { C } from '../tokens'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const trail   = useRef({ x: -100, y: -100 })
  const prev    = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      prev.current = { ...mouse.current }
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', move)

    let raf: number
    const tick = () => {
      const dx = mouse.current.x - prev.current.x
      const dy = mouse.current.y - prev.current.y
      const vel = Math.sqrt(dx * dx + dy * dy)
      const w = Math.min(7 + vel * 1.4, 32)
      const h = Math.max(7 - vel * 0.3, 5)

      if (dotRef.current) {
        dotRef.current.style.left   = mouse.current.x + 'px'
        dotRef.current.style.top    = mouse.current.y + 'px'
        dotRef.current.style.width  = w + 'px'
        dotRef.current.style.height = h + 'px'
        const angle = vel > 2 ? Math.atan2(dy, dx) * 180 / Math.PI : 0
        dotRef.current.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`
      }

      trail.current.x += (mouse.current.x - trail.current.x) * 0.1
      trail.current.y += (mouse.current.y - trail.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = trail.current.x + 'px'
        ringRef.current.style.top  = trail.current.y + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
    transform: 'translate(-50%,-50%)',
  }

  return (
    <>
      <div ref={dotRef} style={{ ...base, width: 7, height: 7, background: C.blue, mixBlendMode: 'difference', transition: 'width 0.1s, height 0.1s' }} />
      <div ref={ringRef} style={{ ...base, width: 32, height: 32, border: `1px solid rgba(26,86,240,0.5)`, opacity: 0.6 }} />
    </>
  )
}
