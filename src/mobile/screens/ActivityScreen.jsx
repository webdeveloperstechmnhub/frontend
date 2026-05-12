import { motion } from 'framer-motion'

const items = [
  { id: 1, title: 'Registration Confirmed', detail: 'You are confirmed for Neural UI Sprint.', status: 'success' },
  { id: 2, title: 'Payment Captured', detail: 'Ticket payment of Rs. 299 processed.', status: 'info' },
  { id: 3, title: 'Profile Review Pending', detail: 'Complete 2 fields to unlock verification.', status: 'warning' },
]

const ActivityScreen = () => {
  return (
    <div className="tmh-screen-shell">
      <header className="tmh-screen-header">
        <p className="tmh-screen-overline">Activity</p>
        <h1 className="tmh-screen-title">Live Updates</h1>
      </header>

      <section className="tmh-activity-list">
        {items.map((item) => (
          <motion.article key={item.id} className="tmh-activity-item" whileTap={{ y: 1 }}>
            <span className={`tmh-status-dot is-${item.status}`} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

export default ActivityScreen
