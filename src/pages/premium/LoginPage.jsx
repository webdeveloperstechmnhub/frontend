import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { isNativeApp } from '../../utils/appEnvironment'

const isEmail = (value) => /\S+@\S+\.\S+/.test(value)

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

const FieldIcon = ({ type }) => {
  if (type === 'password') {
    return (
      <motion.svg
        className="tmh-login-field-icon"
        whileHover={{ rotate: -8, scale: 1.08 }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="5" y="11" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
      </motion.svg>
    )
  }

  return (
    <motion.svg
      className="tmh-login-field-icon"
      whileHover={{ rotate: 8, scale: 1.08 }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M4 7.5h16v9H4z" stroke="currentColor" strokeWidth="1.8" rx="2" />
      <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </motion.svg>
  )
}

const LoginPage = () => {
  const particles = useMemo(
    () => {
      const isLowPower = typeof window !== 'undefined' && (window.innerWidth < 768 || isNativeApp())
      const count = isLowPower ? 6 : 34
      return Array.from({ length: count }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 7 + Math.random() * 9,
        delay: Math.random() * 5,
        floatX: -10 + Math.random() * 20,
        floatY: 12 + Math.random() * 28,
      }))
    },
    [],
  )

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [ripples, setRipples] = useState([])
  const [shake, setShake] = useState(false)
  const nativeMode = isNativeApp()

  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)
  const glowX = useSpring(cursorX, { stiffness: 110, damping: 20, mass: 0.4 })
  const glowY = useSpring(cursorY, { stiffness: 110, damping: 20, mass: 0.4 })

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const tiltXSpring = useSpring(tiltX, { stiffness: 180, damping: 22, mass: 0.5 })
  const tiltYSpring = useSpring(tiltY, { stiffness: 180, damping: 22, mass: 0.5 })

  const setField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleMouseMove = (event) => {
    cursorX.set(event.clientX - 160)
    cursorY.set(event.clientY - 160)
  }

  const handleCardMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    tiltY.set((x - 0.5) * 10)
    tiltX.set((0.5 - y) * 9)
  }

  const handleCardLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    setRipples((prev) => [...prev, ripple])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== ripple.id))
    }, 650)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!isEmail(form.email)) {
      nextErrors.email = 'Please enter a valid email.'
    }
    if (!form.password || form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShake(true)
      window.setTimeout(() => setShake(false), 360)
      return
    }

    setShake(false)
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
        initial={{ opacity: 0, y: 36, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.24, 1] }}
      >
        <motion.div
          className="tmh-login-card"
          style={{ rotateX: tiltXSpring, rotateY: tiltYSpring }}
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          animate={nativeMode ? { y: 0 } : { y: [0, -7, 0] }}
          transition={nativeMode ? { duration: 0.2 } : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
          whileHover={nativeMode ? undefined : { boxShadow: '0 24px 55px rgba(0,0,0,.52), 0 0 0 1px rgba(212,175,55,.42), 0 0 34px rgba(212,175,55,.24)' }}
        >
          <p className="tmh-kicker">Secure Access Portal</p>
          <h1 className="tmh-auth-title">Login to TechMNHub</h1>
          <p className="tmh-login-sub">Authenticate to enter your AI-first skill ecosystem console.</p>

          <motion.form
            className={`tmh-auth-form ${shake ? 'tmh-login-error-shake' : ''}`}
            onSubmit={onSubmit}
            animate={shake ? { x: [0, -8, 8, -6, 6, -2, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.32 }}
          >
            <label className="tmh-login-field-wrap" htmlFor="login-email">
              <span className="tmh-field-label">Email</span>
              <div className="tmh-login-input-shell">
                <FieldIcon type="email" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`tmh-input-dark tmh-login-input ${errors.email ? 'has-error' : ''}`}
                  value={form.email}
                  onChange={setField}
                  required
                />
              </div>
              {errors.email && <span className="tmh-login-error-msg">{errors.email}</span>}
            </label>

            <label className="tmh-login-field-wrap" htmlFor="login-password">
              <span className="tmh-field-label">Password</span>
              <div className="tmh-login-input-shell">
                <FieldIcon type="password" />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`tmh-input-dark tmh-login-input ${errors.password ? 'has-error' : ''}`}
                  value={form.password}
                  onChange={setField}
                  required
                />
              </div>
              {errors.password && <span className="tmh-login-error-msg">{errors.password}</span>}
            </label>

            <motion.button
              type="submit"
              className="tmh-login-submit"
              onMouseDown={createRipple}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="tmh-login-submit-label">Access Console</span>
              <AnimatePresence>
                {ripples.map((ripple) => (
                  <motion.span
                    key={ripple.id}
                    className="tmh-login-ripple"
                    style={{ left: ripple.x, top: ripple.y }}
                    initial={{ opacity: 0.55, scale: 0 }}
                    animate={{ opacity: 0, scale: 6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ))}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <p className="tmh-auth-meta tmh-login-meta">
            New to TechMNHub? <Link to="/signup">Create account</Link>
          </p>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default LoginPage
