import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const GlowCard = ({
  children,
  className = '',
  floating = true,
  pulse = false,
  hoverScale = 1.03,
  ...props
}) => {
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const tiltX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.6 })
  const tiltY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.6 })
  const spotlightX = useSpring(mouseX, { stiffness: 170, damping: 24, mass: 0.7 })
  const spotlightY = useSpring(mouseY, { stiffness: 170, damping: 24, mass: 0.7 })

  const glowX = useMotionTemplate`${spotlightX}%`
  const glowY = useMotionTemplate`${spotlightY}%`

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    mouseX.set(px * 100)
    mouseY.set(py * 100)

    if (!reduceMotion) {
      rotateY.set((px - 0.5) * 13)
      rotateX.set((0.5 - py) * 12)
    }
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduceMotion ? 0 : tiltX,
        rotateY: reduceMotion ? 0 : tiltY,
        transformStyle: 'preserve-3d',
        '--mx': glowX,
        '--my': glowY,
      }}
      whileHover={{
        scale: hoverScale,
        y: -4,
      }}
      animate={
        floating && !reduceMotion
          ? {
              y: -6,
            }
          : undefined
      }
      transition={{
        opacity: { type: 'spring', stiffness: 170, damping: 24, mass: 0.7 },
        y:
          floating && !reduceMotion
            ? { type: 'spring', stiffness: 45, damping: 14, mass: 0.8, repeat: Infinity, repeatType: 'mirror' }
            : { type: 'spring', stiffness: 180, damping: 24, mass: 0.7 },
        scale: { type: 'spring', stiffness: 220, damping: 16, mass: 0.65 },
      }}
      className={`tmh-tilt-card rounded-2xl border border-yellow-400/25 bg-[#111111]/75 backdrop-blur-md ${pulse ? 'tmh-tilt-card-pulse' : ''} ${className}`.trim()}
      {...props}
    >
      <span className="tmh-card-spotlight" aria-hidden="true" />
      <motion.span
        className="tmh-card-shine"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: ['-170%', '370%'] }}
        transition={reduceMotion ? undefined : { duration: 2.9, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10 [transform:translateZ(34px)]">{children}</div>
    </motion.section>
  )
}

export default GlowCard