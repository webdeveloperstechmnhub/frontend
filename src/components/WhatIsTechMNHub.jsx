import { motion } from 'framer-motion'
import TmhCard from './ui/TmhCard'

const defaultContent = {
  badge: 'What is TechMNHub',
  title: 'A connected skill ecosystem for students and institutions.',
  subtitle:
    'TechMNHub brings learning records, event participation, institute management, and career-ready proof into a single experience designed to feel sharp, trustworthy, and easy to scan.',
  pillars: [
    {
      title: 'Student Identity',
      copy: 'Verified profiles, certificates, and skill records that make growth visible.',
    },
    {
      title: 'Institute Operations',
      copy: 'Dashboards for students, activities, analytics, and reporting in one place.',
    },
    {
      title: 'Event Journeys',
      copy: 'A polished flow for discovery, registration, participation, and recognition.',
    },
  ],
}

const WhatIsTechMNHub = ({ content }) => {
  const section = content || defaultContent

  return (
    <section className="tmh-section">
      <div className="tmh-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 160, damping: 22, mass: 0.7 }}
          className="tmh-stack"
        >
          <span className="tmh-badge">{section.badge}</span>
          <h2 className="tmh-title tmh-font-display">{section.title}</h2>
          <p className="tmh-subtitle">{section.subtitle}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(section.pillars || defaultContent.pillars).map((pillar) => (
            <TmhCard key={pillar.title} className="min-h-[190px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">{pillar.title}</p>
              <p className="mt-5 text-2xl font-bold leading-tight text-white">{pillar.title.split(' ')[0]}</p>
              <p className="mt-4 text-sm leading-6 text-[#A0A0A0]">{pillar.copy}</p>
            </TmhCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatIsTechMNHub
