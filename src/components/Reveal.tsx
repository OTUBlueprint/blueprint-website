import { motion } from 'framer-motion'
import { useInView } from '../hooks'
import type { ReactNode, CSSProperties } from 'react'

export default function Reveal({ children, delay=0, y=22, style={}, className='' }: { children: ReactNode; delay?: number; y?: number; style?: CSSProperties; className?: string }) {
  const { ref, vis } = useInView(0.08)
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
