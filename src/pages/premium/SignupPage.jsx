import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import TmhCard from '../../components/ui/TmhCard'
import TmhInput from '../../components/ui/TmhInput'
import TmhButton from '../../components/ui/TmhButton'
import { isLowPowerNativeApp, isNativeApp } from '../../utils/appEnvironment'

const ParticleField = ({ particles }) => (
  <div className="tmh-login-particles" aria-hidden="true">
    {particles.map((particle) => (
      <motion.span
        key={particle.id}
        className="tmh-login-particle"
        style={{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        }}
        animate={{
          y: [0, -particle.floatY, 0],
          x: [0, particle.floatX, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: particle.delay,
        }}
      />
    ))}
  </div>
)

const SignupPage = () => {
  const particles = useMemo(
    () => {
      const isLowPower = typeof window !== 'undefined' && (window.innerWidth < 768 || isLowPowerNativeApp())
      const count = isLowPower ? 6 : 30
      return Array.from({ length: count }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 7 + Math.random() * 10,
        delay: Math.random() * 5,
        floatX: -12 + Math.random() * 24,
        floatY: 15 + Math.random() * 25,
      }))
    },
    [],
  )

  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)
  const glowX = useSpring(cursorX, { stiffness: 100, damping: 25, mass: 0.5 })
  const glowY = useSpring(cursorY, { stiffness: 100, damping: 25, mass: 0.5 })

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const tiltXSpring = useSpring(tiltX, { stiffness: 160, damping: 20, mass: 0.6 })
  const tiltYSpring = useSpring(tiltY, { stiffness: 160, damping: 20, mass: 0.6 })
  const nativeMode = typeof window !== 'undefined' && isNativeApp()

  const handleMouseMove = (event) => {
    cursorX.set(event.clientX - 160)
    cursorY.set(event.clientY - 160)
  }

  const handleCardMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    tiltY.set((x - 0.5) * 8)
    tiltX.set((0.5 - y) * 7)
  }

  const handleCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="tmh-login-root tmh-fade-in" onMouseMove={handleMouseMove}>
      {!nativeMode && <div className="tmh-login-bg-wave tmh-login-bg-wave-1" aria-hidden="true" />}
      {!nativeMode && <div className="tmh-login-bg-wave tmh-login-bg-wave-2" aria-hidden="true" />}
      {!nativeMode && <div className="tmh-login-bg-beam tmh-login-bg-beam-1" aria-hidden="true" />}
      {!nativeMode && <div className="tmh-login-bg-beam tmh-login-bg-beam-2" aria-hidden="true" />}
      {!nativeMode && <div className="tmh-login-grid" aria-hidden="true" />}
      {!nativeMode && <div className="tmh-login-noise" aria-hidden="true" />}

      {!nativeMode && <ParticleField particles={particles} />}

      {!nativeMode && <motion.div className="tmh-login-cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />}

      <motion.section
        className="tmh-login-card-wrap"
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.9, 0.24, 1] }}
      >
        <motion.div
          className="tmh-login-card"
          style={{ rotateX: tiltXSpring, rotateY: tiltYSpring }}
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          animate={nativeMode ? { y: 0 } : { y: [0, -6, 0] }}
          transition={nativeMode ? { duration: 0.2 } : { duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
          whileHover={nativeMode ? undefined : { boxShadow: '0 24px 55px rgba(0,0,0,.52), 0 0 0 1px rgba(212,175,55,.42), 0 0 34px rgba(212,175,55,.24)' }}
        >
          <p className="tmh-kicker">Join the network</p>
          <h1 className="tmh-auth-title">Create Student Account</h1>
          <p className="tmh-login-sub">Build your verified profile and join the ecosystem in seconds.</p>

          <motion.form
            className="tmh-auth-form"
            onSubmit={handleSubmit}
            initial={nativeMode ? false : 'hidden'}
            animate="visible"
            variants={nativeMode ? undefined : {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            <motion.div
              variants={nativeMode ? undefined : {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <TmhInput id="signup-name" label="Full Name" type="text" placeholder="Your name" required />
            </motion.div>
            <motion.div
              variants={nativeMode ? undefined : {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <TmhInput id="signup-email" label="Email" type="email" placeholder="you@example.com" required />
            </motion.div>
            <motion.div
              variants={nativeMode ? undefined : {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <TmhInput id="signup-phone" label="Phone" type="tel" placeholder="10 digit mobile" required />
            </motion.div>
            <motion.div
              variants={nativeMode ? undefined : {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <TmhInput id="signup-password" label="Password" type="password" placeholder="Minimum 6 characters" required />
            </motion.div>
            <motion.div
              variants={nativeMode ? undefined : {
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <TmhButton type="submit" className="tmh-full">Create Account</TmhButton>
            </motion.div>
          </motion.form>

          <p className="tmh-auth-meta tmh-login-meta">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default SignupPage
