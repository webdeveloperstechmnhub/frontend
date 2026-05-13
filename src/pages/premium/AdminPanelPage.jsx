import { motion } from 'framer-motion'
import TmhCard from '../../components/ui/TmhCard'
import TmhSidebar from '../../components/ui/TmhSidebar'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile Card', to: '/profile-card' },
  { label: 'Landing', to: '/' },
]

const AdminPanelPage = () => {
  return (
    <main className="tmh-dashboard-shell tmh-fade-in">
      <TmhSidebar items={sidebarItems} />
      <section className="tmh-dashboard-main space-y-6">
        <motion.header
          className="tmh-panel-head"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Admin Panel Moved</h1>
          <p>Session booking management is now available in the dedicated admin dashboard.</p>
        </motion.header>

        <TmhCard className="space-y-4 p-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Booking management has moved</h2>
            <p className="text-sm text-zinc-400">
              The public frontend no longer contains the session booking approval interface.
              Please sign in to the admin dashboard and manage session bookings there.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-sm text-zinc-400">What was moved</p>
              <ul className="list-disc pl-5 text-sm text-zinc-300">
                <li>Session booking approvals</li>
                <li>Status updates</li>
                <li>Admin notes and cancellations</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-sm text-zinc-400">Next step</p>
              <p className="text-sm text-zinc-300">
                Open the dedicated admin application and navigate to Session Bookings from the navigation menu.
              </p>
            </div>
          </div>

          <div className="text-sm text-zinc-300">
            Access session booking management from the dedicated admin application or local admin workspace.
          </div>
        </TmhCard>
      </section>
    </main>
  )
}

export default AdminPanelPage
