import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function FadeUp({ children, delay = 0, style, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
