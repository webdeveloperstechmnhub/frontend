import { motion } from 'framer-motion'

const variants = {
  live: 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]',
  demo: 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]',
  neutral: 'border-[#D4AF37]/20 bg-[#111111] text-[#A0A0A0]',
}

const SessionBadge = ({ label, tone = 'neutral', className = '' }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${variants[tone] || variants.neutral} ${className}`.trim()}
    >
      {label}
    </motion.span>
  )
}

export default SessionBadge
