import { motion } from 'framer-motion'
import { useInView } from '../hooks'

export default function LineReveal({ color='rgba(255,255,255,0.07)', delay=0 }: { color?: string; delay?: number }) {
  const { ref, vis } = useInView(0.1)
  return (
    <div ref={ref} style={{ height: 1, overflow: 'hidden', margin: '0' }}>
      <motion.div
        style={{ height: '100%', background: color, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={vis ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}
