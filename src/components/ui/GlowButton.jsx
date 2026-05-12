import { motion } from 'framer-motion'

const GlowButton = ({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const variantClass = variant === 'secondary'
    ? 'border border-[#D4AF37]/20 bg-transparent text-white hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
    : 'border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-[#0D0D0D] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_34px_rgba(212,175,55,0.48)]'

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.965, y: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.45 }}
      className={`tmh-btn relative overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`.trim()}
      {...props}
    >
      <span className="tmh-btn-glow" aria-hidden="true" />
      <motion.span
        aria-hidden="true"
        className="tmh-btn-shine"
        animate={disabled ? undefined : { x: ['-170%', '350%'] }}
        transition={disabled ? undefined : { duration: 2.8, repeat: Infinity, ease: 'linear' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default GlowButton