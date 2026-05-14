import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { C } from '../tokens'

export default function PageWipe({ pageKey, children }: { pageKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
        >
          {children}
        </motion.div>

        {/* Blue curtain — enters from bottom, exits upward */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 700,
            background: C.blue, pointerEvents: 'none',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
