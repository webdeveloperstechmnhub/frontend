import { motion } from 'framer-motion'

const BottomTabBar = ({ tabs, activeTab, onChange }) => {
  return (
    <nav className="tmh-bottom-tab" aria-label="Primary mobile navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            className={`tmh-tab-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && <motion.span layoutId="tmh-tab-pill" className="tmh-tab-pill" />}
            <Icon size={18} strokeWidth={2.2} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomTabBar
