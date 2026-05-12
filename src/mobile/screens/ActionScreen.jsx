import { Rocket, QrCode, WandSparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import RippleButton from '../components/RippleButton'

const ActionScreen = () => {
  return (
    <div className="tmh-screen-shell">
      <header className="tmh-screen-header">
        <p className="tmh-screen-overline">Action</p>
        <h1 className="tmh-screen-title">Central Command</h1>
        <p className="tmh-screen-sub">Run high-impact actions with one tap.</p>
      </header>

      <motion.section className="tmh-action-hero" whileTap={{ scale: 0.995 }}>
        <Rocket size={34} />
        <h2>Launch Event Workflow</h2>
        <p>Create registrations, issue tickets, and push updates instantly.</p>
      </motion.section>

      <div className="tmh-action-grid">
        <RippleButton className="tmh-btn-primary tmh-action-btn">
          <QrCode size={18} />
          Generate Check-in QR
        </RippleButton>
        <RippleButton className="tmh-btn-secondary tmh-action-btn">
          <WandSparkles size={18} />
          Build AI Recommendation
        </RippleButton>
      </div>
    </div>
  )
}

export default ActionScreen
