import { Link, useLocation } from 'react-router-dom'
import { BarChart3, ClipboardList, LayoutDashboard, ScrollText, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TmhButton from '../ui/TmhButton'
import { clearInstituteSession } from '../../utils/session'
import SessionBadge from '../ui/SessionBadge'

const items = [
  { to: '/institute/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/institute/students', label: 'Students', icon: Users },
  { to: '/institute/activities', label: 'Activities', icon: ClipboardList },
  { to: '/institute/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/institute/reports', label: 'Reports', icon: ScrollText },
]

const InstituteShell = ({ title, children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    clearInstituteSession()
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="mx-auto grid w-[min(1480px,95vw)] grid-cols-1 gap-6 py-6 lg:grid-cols-[300px_1fr]">
        <aside className="hidden rounded-2xl border border-yellow-400/15 bg-[#111111]/75 p-4 backdrop-blur lg:block">
          <h2 className="mb-4 text-xl font-bold text-yellow-300">Institute Panel</h2>
          <nav className="grid gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-[#111111] text-yellow-200' : 'text-[#A0A0A0] hover:bg-[#111111]/80 hover:text-white'}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <section className="space-y-5">
          <div className="rounded-2xl border border-yellow-400/10 bg-[#111111]/65 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link to="/" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A0A0A0] transition hover:text-yellow-300">
                    Back to home
                  </Link>
                  <SessionBadge label="Institute live" tone="live" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{title}</h1>
                  <p className="mt-1 text-sm text-[#A0A0A0]">Manage students and activities with clarity.</p>
                </div>
              </div>
              <TmhButton variant="secondary" className="px-4 py-2 text-sm" onClick={logout}>Logout</TmhButton>
            </div>
          </div>
          {children}
        </section>
      </div>
    </main>
  )
}

export default InstituteShell
