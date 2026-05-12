import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import InstituteShell from '../../components/dashboards/InstituteShell'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const fallbackBars = [65, 72, 81, 76, 89]

const InstituteAnalytics = () => {
  const [bars, setBars] = useState(fallbackBars)

  useEffect(() => {
    const token = localStorage.getItem('instituteToken')
    if (!token) return

    const loadSummary = async () => {
      const result = await apiRequest('/account/institute/summary', {
        method: 'GET',
        headers: buildAuthHeaders(token),
      })

      if (!result.ok) return
      const raw = Array.isArray(result.data?.trend) ? result.data.trend : []
      if (!raw.length) return

      const cleaned = raw
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value) && value >= 0)

      if (!cleaned.length) return

      const max = Math.max(...cleaned, 1)
      const normalized = cleaned.map((value) => Math.round((value / max) * 100))
      setBars(normalized)
    }

    loadSummary()
  }, [])

  const linePoints = useMemo(() => {
    const points = bars.map((value, index) => {
      const x = 10 + Math.round((index * 280) / Math.max(bars.length - 1, 1))
      const y = 170 - Math.round((value / 100) * 120)
      return `${x},${y}`
    })

    return points.join(' ')
  }, [bars])

  return (
    <InstituteShell title="Analytics">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-yellow-400/10 bg-[#111111]/75 p-4">
          <h3 className="text-lg font-semibold">Participation Trend</h3>
          <div className="mt-4 flex h-48 items-end gap-3">
            {bars.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-yellow-500/45 to-yellow-300/70"
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-yellow-400/10 bg-[#111111]/75 p-4">
          <h3 className="text-lg font-semibold">Performance Line</h3>
          <svg viewBox="0 0 320 180" className="mt-4 w-full rounded-xl bg-[#0D0D0D]/70 p-3">
            <polyline
              fill="none"
              stroke="#D4AF37"
              strokeWidth="4"
              points={linePoints}
            />
            {bars.map((value, i) => {
              const x = 10 + Math.round((i * 280) / Math.max(bars.length - 1, 1))
              const y = 170 - Math.round((value / 100) * 120)
              return <circle key={i} cx={x} cy={y} r="5" fill="#D4AF37" />
            })}
          </svg>
        </section>
      </div>
    </InstituteShell>
  )
}

export default InstituteAnalytics
