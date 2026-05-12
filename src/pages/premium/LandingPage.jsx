import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TmhButton from '../../components/ui/TmhButton'
import TmhCard from '../../components/ui/TmhCard'
import { isNativeApp } from '../../utils/appEnvironment'

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
          opacity: [0.15, 0.6, 0.15],
        }}
        transition={{
          y: {
            type: 'spring',
            stiffness: 28,
            damping: 14,
            mass: 1,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: particle.delay,
          },
          x: {
            type: 'spring',
            stiffness: 24,
            damping: 14,
            mass: 1.05,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: particle.delay,
          },
          opacity: {
            type: 'spring',
            stiffness: 30,
            damping: 14,
            mass: 1,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: particle.delay,
          },
        }}
      />
    ))}
  </div>
)

const LandingPage = () => {
  const particles = useMemo(
    () => {
      const isLowPower = typeof window !== 'undefined' && (window.innerWidth < 768 || isNativeApp())
      const count = isLowPower ? 4 : 28
      return Array.from({ length: count }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        floatX: -15 + Math.random() * 30,
        floatY: 10 + Math.random() * 35,
      }))
    },
    [],
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.7 } },
  }

  return (
    <main className="tmh-page-shell tmh-fade-in relative">
      {!isNativeApp() && <ParticleField particles={particles} />}

      <motion.header
        className="tmh-topbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22, mass: 0.7 }}
      >
        <motion.p className="tmh-logo" whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 260, damping: 16, mass: 0.5 }}>
          TechMNHub
        </motion.p>
        <div className="tmh-topbar-actions">
          <Link to="/login">
            <TmhButton variant="secondary">Login</TmhButton>
          </Link>
          <Link to="/signup">
            <TmhButton>Sign up</TmhButton>
          </Link>
        </div>
      </motion.header>

      <motion.section
        className="tmh-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="tmh-kicker" variants={itemVariants}>
          High-end student skill platform
        </motion.p>
        <motion.h1 className="tmh-hero-title" variants={itemVariants}>
          Where Talent Meets Precision.
        </motion.h1>
        <motion.p className="tmh-hero-sub" variants={itemVariants}>
          TechMNHub helps students build verified profiles, discover opportunities, and manage growth through a
          premium, unified ecosystem.
        </motion.p>
        <motion.div className="tmh-hero-actions" variants={itemVariants}>
          <Link to="/signup">
            <TmhButton>Get Started</TmhButton>
          </Link>
          <Link to="/dashboard">
            <TmhButton variant="secondary">View Dashboard</TmhButton>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className="tmh-grid-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <TmhCard>
            <p className="tmh-card-label">Profiles</p>
            <h2 className="tmh-card-title">Verified identity layer</h2>
            <p className="tmh-card-sub">Create a credible academic + skill identity with clean hierarchy and trust.</p>
          </TmhCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <TmhCard>
            <p className="tmh-card-label">Events</p>
            <h2 className="tmh-card-title">Premium event journeys</h2>
            <p className="tmh-card-sub">From registration to check-in, every touchpoint feels minimal and refined.</p>
          </TmhCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <TmhCard>
            <p className="tmh-card-label">Admin</p>
            <h2 className="tmh-card-title">High-control operations</h2>
            <p className="tmh-card-sub">Manage users, panels, and reporting through focused dashboards.</p>
          </TmhCard>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default LandingPage
