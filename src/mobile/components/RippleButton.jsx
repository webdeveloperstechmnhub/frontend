import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RippleButton = ({ children, className = '', onClick, type = 'button' }) => {
  const [ripples, setRipples] = useState([])

  const spawnRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const next = {
      id: Date.now() + Math.random(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    setRipples((prev) => [...prev, next])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== next.id))
    }, 520)
  }

  return (
    <motion.button
      type={type}
      className={`tmh-ripple-btn ${className}`.trim()}
      onMouseDown={spawnRipple}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <span className="tmh-ripple-btn-label">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="tmh-ripple"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ opacity: 0.45, scale: 0 }}
            animate={{ opacity: 0, scale: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}

export default RippleButton
