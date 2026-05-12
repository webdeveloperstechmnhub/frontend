import React from 'react'
import { motion } from 'framer-motion'
import TmhCard from '../../components/ui/TmhCard'
import TmhSidebar from '../../components/ui/TmhSidebar'
import { isNativeApp } from '../../utils/appEnvironment'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile Card', to: '/profile-card' },
  { label: 'Admin Panel', to: '/admin' },
  { label: 'Landing', to: '/' },
]

const ProfileCardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const nativeMode = isNativeApp()

  return (
    <main className="tmh-dashboard-shell tmh-fade-in">
      <TmhSidebar items={sidebarItems} />
      <section className="tmh-dashboard-main tmh-center-wrap">
        <motion.div
          className="tmh-profile-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.24, 1] }}
          whileHover={nativeMode ? undefined : { y: -8 }}
        >
          <TmhCard>
            <motion.div
              className="tmh-avatar"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.9, 0.24, 1], delay: 0.2 }}
              whileHover={nativeMode ? undefined : { scale: 1.08, rotate: 6 }}
            >
              TV
            </motion.div>

            <motion.p
              className="tmh-card-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Employee Profile
            </motion.p>

            <motion.h1
              className="tmh-profile-name"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              TechMNHub Member
            </motion.h1>

            <motion.div
              className="tmh-profile-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} whileHover={{ x: 4, borderColor: 'rgba(212, 175, 55, 0.35)' }}>
                <span>ID</span>
                <p>MN-2026-011</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ x: 4, borderColor: 'rgba(212, 175, 55, 0.35)' }}>
                <span>Department</span>
                <p>Events & Operations</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ x: 4, borderColor: 'rgba(212, 175, 55, 0.35)' }}>
                <span>Designation</span>
                <p>Coordinator</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ x: 4, borderColor: 'rgba(212, 175, 55, 0.35)' }}>
                <span>Status</span>
                <motion.p
                  initial={{ color: 'rgba(212, 175, 55, 0.6)' }}
                  whileHover={{ color: 'rgba(212, 175, 55, 1)' }}
                >
                  Active
                </motion.p>
              </motion.div>
            </motion.div>
          </TmhCard>
        </motion.div>
      </section>
    </main>
  )
}

export default ProfileCardPage
