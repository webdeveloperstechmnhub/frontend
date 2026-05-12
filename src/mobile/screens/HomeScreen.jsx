import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, CalendarClock, CircleCheck } from 'lucide-react'
import RippleButton from '../components/RippleButton'

const HomeScreen = () => {
  return (
    <div className="tmh-screen-shell">
      <header className="tmh-screen-header">
        <p className="tmh-screen-overline">Good Evening</p>
        <h1 className="tmh-screen-title">Hey Priyansh</h1>
        <p className="tmh-screen-sub">Your AI skill journey is looking sharp today.</p>
      </header>

      <motion.section className="tmh-highlight-card" whileTap={{ y: 1 }}>
        <div>
          <p className="tmh-card-eyebrow">Weekly Momentum</p>
          <h2>82% Profile Strength</h2>
          <p>2 pending tasks and 1 upcoming event in the next 24h.</p>
        </div>
        <Sparkles size={30} />
      </motion.section>

      <section className="tmh-quick-grid">
        <motion.article className="tmh-mini-card" whileTap={{ y: 1 }}>
          <TrendingUp size={20} />
          <h3>Growth</h3>
          <p>+12% this week</p>
        </motion.article>
        <motion.article className="tmh-mini-card" whileTap={{ y: 1 }}>
          <CalendarClock size={20} />
          <h3>Events</h3>
          <p>3 scheduled</p>
        </motion.article>
        <motion.article className="tmh-mini-card" whileTap={{ y: 1 }}>
          <CircleCheck size={20} />
          <h3>Tasks</h3>
          <p>5 completed</p>
        </motion.article>
      </section>

      <section className="tmh-actions-stack">
        <RippleButton className="tmh-btn-primary">Create New Checkpoint</RippleButton>
        <RippleButton className="tmh-btn-secondary">View Smart Insights</RippleButton>
      </section>
    </div>
  )
}

export default HomeScreen
