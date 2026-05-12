import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion } from 'framer-motion'
import TmhCard from '../../components/ui/TmhCard'
import TmhSidebar from '../../components/ui/TmhSidebar'
import { isNativeApp } from '../../utils/appEnvironment'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile Card', to: '/profile-card' },
  { label: 'Admin Panel', to: '/admin' },
  { label: 'Landing', to: '/' },
]

const CountUp = ({ to, suffix = '' }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.2, 0.9, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [to])

  return <>{value.toLocaleString()}{suffix}</>
}

const DashboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const nativeMode = isNativeApp()

  return (
    <main className="tmh-dashboard-shell tmh-fade-in">
      <TmhSidebar items={sidebarItems} />
      <section className="tmh-dashboard-main">
        <motion.header
          className="tmh-panel-head"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Dashboard</h1>
          <p>Overview of your ecosystem performance in one minimal workspace.</p>
        </motion.header>

        <motion.section
          className="tmh-grid-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={metricVariants}>
            <TmhCard pulse>
              <motion.p className="tmh-card-label" initial={nativeMode ? false : { color: 'rgba(212, 175, 55, 0.6)' }} whileHover={nativeMode ? undefined : { color: 'rgba(212, 175, 55, 1)' }}>
                Total Students
              </motion.p>
              <motion.h2
                className="tmh-metric-strong"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CountUp to={2480} />
              </motion.h2>
              <p className="tmh-card-sub">+12.4% this month</p>
            </TmhCard>
          </motion.div>
          <motion.div variants={metricVariants}>
            <TmhCard>
              <motion.p className="tmh-card-label" initial={nativeMode ? false : { color: 'rgba(212, 175, 55, 0.6)' }} whileHover={nativeMode ? undefined : { color: 'rgba(212, 175, 55, 1)' }}>
                Active Events
              </motion.p>
              <motion.h2
                className="tmh-metric-strong"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CountUp to={18} />
              </motion.h2>
              <p className="tmh-card-sub">4 ending this week</p>
            </TmhCard>
          </motion.div>
          <motion.div variants={metricVariants}>
            <TmhCard>
              <motion.p className="tmh-card-label" initial={nativeMode ? false : { color: 'rgba(212, 175, 55, 0.6)' }} whileHover={nativeMode ? undefined : { color: 'rgba(212, 175, 55, 1)' }}>
                Pending Reviews
              </motion.p>
              <motion.h2
                className="tmh-metric-strong"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CountUp to={64} />
              </motion.h2>
              <p className="tmh-card-sub">Prioritize quality checks</p>
            </TmhCard>
          </motion.div>
        </motion.section>

        <motion.section
          className="tmh-grid-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div variants={itemVariants}>
            <TmhCard>
              <p className="tmh-card-label">Quick Actions</p>
              <motion.div className="tmh-quick-links" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <Link to="/profile-card">
                    <motion.span whileHover={{ x: 4 }}>Open Profile Card UI</motion.span>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/admin">
                    <motion.span whileHover={{ x: 4 }}>Open Admin Panel</motion.span>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/signup">
                    <motion.span whileHover={{ x: 4 }}>Create New Student</motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </TmhCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <TmhCard>
              <p className="tmh-card-label">System Health</p>
              <motion.ul
                className="tmh-list-clean"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 4, color: 'rgba(212, 175, 55, 0.9)' }}
                >
                  API status: Stable
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 4, color: 'rgba(212, 175, 55, 0.9)' }}
                >
                  Sync queue: Low load
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  whileHover={{ x: 4, color: 'rgba(212, 175, 55, 0.9)' }}
                >
                  Payment webhooks: Healthy
                </motion.li>
              </motion.ul>
            </TmhCard>
          </motion.div>
        </motion.section>
      </section>
    </main>
  )
}

export default DashboardPage
