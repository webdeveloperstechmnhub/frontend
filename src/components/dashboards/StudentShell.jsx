import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, ChartSpline, FileBadge2, LayoutDashboard, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TmhButton from '../ui/TmhButton'
import { clearAllSessions } from '../../utils/session'
import SessionBadge from '../ui/SessionBadge'

const items = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/activities', label: 'Activities', icon: ChartSpline },
  { to: '/student/leaderboard', label: 'Leaderboard', icon: Award },
  { to: '/student/certificates', label: 'Certificates', icon: FileBadge2 },
  { to: '/student/profile', label: 'Profile', icon: UserRound },
]

const StudentShell = ({ title, points = 0, children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    clearAllSessions()
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="mx-auto grid w-[min(1480px,95vw)] grid-cols-1 gap-6 py-6 lg:grid-cols-[300px_1fr]">
        <aside className="hidden rounded-2xl border border-yellow-400/20 bg-[#111111]/70 p-4 backdrop-blur-lg lg:block">
          <h2 className="mb-4 text-xl font-extrabold text-yellow-300">Student Space</h2>
          <nav className="grid gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-yellow-400/20 text-yellow-200' : 'text-[#A0A0A0] hover:bg-[#111111] hover:text-white'}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <section className="space-y-5">
          <div className="rounded-2xl border border-yellow-400/15 bg-[#111111]/60 p-4 backdrop-blur-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link to="/" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A0A0A0] transition hover:text-yellow-300">
                    Back to home
                  </Link>
                  <SessionBadge label="Student live" tone="live" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
                  <p className="text-sm text-[#A0A0A0]">Build, submit and level up your skills.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.03 }} className="rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200">
                  {points} Points
                </motion.div>
                <TmhButton variant="secondary" className="px-4 py-2 text-sm" onClick={logout}>Logout</TmhButton>
              </div>
            </div>
          </div>
          {children}
        </section>
      </div>
    </main>
  )
}

export default StudentShell
