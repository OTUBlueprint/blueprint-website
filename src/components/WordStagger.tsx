import { motion } from 'framer-motion'
import { useInView } from '../hooks'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
  as?: 'h1'|'h2'|'h3'|'div'|'span'
}

export default function WordStagger({ text, className='', style={}, delay=0, stagger=0.06, as: Tag='div' }: Props) {
  const { ref, vis } = useInView(0.05)
  const words = text.split(' ')
  return (
    <Tag ref={ref as any} className={className} style={{ display: 'block', overflow: 'visible', ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={vis ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 + i * stagger }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
