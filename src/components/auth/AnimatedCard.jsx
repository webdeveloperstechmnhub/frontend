import { useMemo } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const AnimatedCard = ({ children }) => {
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const smoothX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.7 })
  const smoothY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.7 })
  const glowX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.75 })
  const glowY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.75 })

  const spotlightX = useMotionTemplate`${glowX}%`
  const spotlightY = useMotionTemplate`${glowY}%`

  const grainStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.05) 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(212,175,55,0.03) 1px, transparent 1px)',
      backgroundSize: '3px 3px, 4px 4px',
    }),
    [],
  )

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    mouseX.set(px * 100)
    mouseY.set(py * 100)

    if (!reduceMotion) {
      rotateY.set((px - 0.5) * 12)
      rotateX.set((0.5 - py) * 11)
    }
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, mass: 0.8 }}
      className="relative"
    >
      <motion.div aria-hidden="true" className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(212,175,55,0.18),rgba(212,175,55,0.05),rgba(212,175,55,0.5),rgba(212,175,55,0.18))]" animate={{ opacity: 0.84, scale: 1.02 }} transition={{ type: 'spring', stiffness: 32, damping: 14, mass: 1.05, repeat: Infinity, repeatType: 'mirror' }} />

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: reduceMotion ? 0 : smoothX,
          rotateY: reduceMotion ? 0 : smoothY,
          transformStyle: 'preserve-3d',
          '--mx': spotlightX,
          '--my': spotlightY,
        }}
        animate={reduceMotion ? undefined : { y: -6 }}
        transition={reduceMotion ? undefined : { type: 'spring', stiffness: 42, damping: 14, mass: 0.9, repeat: Infinity, repeatType: 'mirror' }}
        whileHover={{
          scale: 1.015,
          y: -4,
        }}
        className="tmh-tilt-card relative overflow-hidden rounded-3xl border border-yellow-500/35 bg-[#0D0D0D]/75 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.2),0_18px_55px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(212,175,55,0.03)] backdrop-blur-xl"
      >
        <span className="tmh-card-spotlight" aria-hidden="true" />

        <motion.div
          aria-hidden="true"
          className="tmh-card-shine"
          animate={reduceMotion ? undefined : { x: ['-170%', '390%'] }}
          transition={reduceMotion ? undefined : { duration: 3.1, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={grainStyle}
          animate={{ opacity: [0.18, 0.24, 0.18] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 [transform:translateZ(34px)]">{children}</div>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedCard
