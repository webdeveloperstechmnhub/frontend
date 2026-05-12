import { motion } from 'framer-motion'

const ROLE_OPTIONS = ['Student', 'Institute']

const RoleToggle = ({ value, onChange }) => {
  return (
    <div className="relative grid grid-cols-2 rounded-xl border border-yellow-500/35 bg-[#111111]/70 p-1">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.5 }}
        className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-lg bg-gradient-to-r from-yellow-500/85 to-yellow-300/80 shadow-[0_0_18px_rgba(212,175,55,0.42)]"
        style={{ left: value === 'Student' ? '0.25rem' : 'calc(50% + 0.05rem)' }}
      />
      {ROLE_OPTIONS.map((role) => {
        const active = value === role
        return (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`relative z-10 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${active ? 'text-[#0D0D0D]' : 'text-[#A0A0A0] hover:text-white'}`}
          >
            {role}
          </button>
        )
      })}
    </div>
  )
}

export default RoleToggle
