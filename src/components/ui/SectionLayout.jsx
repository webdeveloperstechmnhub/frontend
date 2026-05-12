import { motion } from 'framer-motion'
import { tmhHover, tmhItem } from './MotionSystem'

const SectionLayout = ({
  title,
  subtitle = '',
  right = null,
  children,
  className = '',
}) => {
  return (
    <motion.section
      variants={tmhItem}
      initial="hidden"
      whileInView="visible"
      whileHover={tmhHover}
      viewport={{ once: true, amount: 0.18 }}
      className={`rounded-2xl border border-yellow-400/20 bg-[#111111]/70 p-5 shadow-[0_0_26px_rgba(212,175,55,0.08)] ${className}`.trim()}
    >
      {(title || right) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-[#A0A0A0]">{subtitle}</p> : null}
          </div>
          {right}
        </div>
      )}
      {children}
    </motion.section>
  )
}

export default SectionLayout
