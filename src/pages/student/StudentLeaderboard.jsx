import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import StudentShell from '../../components/dashboards/StudentShell'
import { apiRequest } from '../../utils/api'

const StudentLeaderboard = () => {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      const result = await apiRequest('/account/leaderboard', { method: 'GET' })
      if (!result.ok) {
        setError(result.msg || 'Unable to load leaderboard.')
        return
      }

      setEntries(result.data?.entries || [])
      setError('')
    }

    loadLeaderboard()
  }, [])

  const topThree = useMemo(() => entries.slice(0, 3), [entries])
  const rest = useMemo(() => entries.slice(3, 20), [entries])

  return (
    <StudentShell title="Leaderboard" points={2840}>
      {error ? <p className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#A0A0A0]">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-3">
        {topThree.map((entry) => (
          <motion.article
            key={entry.rank}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.55 }}
            className={`rounded-2xl border bg-[#111111]/80 p-4 text-center ${entry.rank === 1 ? 'border-yellow-300/60 shadow-[0_0_30px_rgba(212,175,55,0.28)]' : 'border-yellow-400/30'}`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">Rank #{entry.rank}</p>
            <h3 className="mt-2 text-xl font-bold">{entry.name}</h3>
            <p className="mt-1 text-yellow-200">{entry.points} pts</p>
          </motion.article>
        ))}
      </div>

      <section className="rounded-2xl border border-yellow-400/20 bg-[#111111]/75 p-4">
        <h2 className="text-lg font-semibold">All Rankings</h2>
        <div className="mt-3 grid gap-2">
          {entries.length === 0 ? <p className="text-sm text-[#A0A0A0]">No ranking data yet.</p> : null}
          {rest.map((entry) => (
            <div key={entry.id || entry.rank} className="flex items-center justify-between rounded-xl border border-[#D4AF37]/10 bg-[#0D0D0D]/70 px-4 py-3">
              <p className="text-sm">#{entry.rank} • {entry.name}</p>
              <p className="text-sm font-semibold text-yellow-200">{entry.points}</p>
            </div>
          ))}
        </div>
      </section>
    </StudentShell>
  )
}

export default StudentLeaderboard
