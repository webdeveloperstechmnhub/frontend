import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ProfileScreen = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="tmh-screen-shell">
      <header className="tmh-screen-header">
        <p className="tmh-screen-overline">Profile</p>
        <h1 className="tmh-screen-title">Digital ID Card</h1>
      </header>

      <motion.section className="tmh-profile-card-mobile" layout whileTap={{ y: 1 }}>
        <div className="tmh-profile-head">
          <div className="tmh-profile-avatar">TM</div>
          <div>
            <h2>TechMNHub Member</h2>
            <p>ID: MN-2026-011</p>
          </div>
        </div>

        <button
          type="button"
          className="tmh-expand-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          Expand Details
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} />
          </motion.span>
        </button>

        {expanded && (
          <motion.div
            className="tmh-profile-expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div><span>Department</span><p>Events & Operations</p></div>
            <div><span>Role</span><p>Coordinator</p></div>
            <div><span>Status</span><p>Active</p></div>
          </motion.div>
        )}
      </motion.section>
    </div>
  )
}

export default ProfileScreen
