import { useRef, type ReactNode, type CSSProperties } from 'react'

export default function TiltCard({ children, style={} }: { children: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `perspective(800px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg) translateY(-4px)`
  }

  function onMouseLeave() {
    const el = ref.current; if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', ...style }}
    >
      {children}
    </div>
  )
}
