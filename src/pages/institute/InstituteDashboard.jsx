import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import InstituteShell from '../../components/dashboards/InstituteShell'
import AnimatedNumber from '../../components/dashboards/AnimatedNumber'
import SectionLayout from '../../components/ui/SectionLayout'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const InstituteDashboard = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const feed = useMemo(() => summary?.recentFeed || [], [summary])

  useEffect(() => {
    const token = localStorage.getItem('instituteToken')
    if (!token) {
      setError('Please login as institute first.')
      setLoading(false)
      return
    }

    let active = true

    const loadSummary = async () => {
      setLoading(true)
      const result = await apiRequest('/account/institute/summary', {
        method: 'GET',
        headers: buildAuthHeaders(token),
      })

      if (!active) return

      if (!result.ok) {
        setError(result.msg || 'Unable to load institute summary.')
        setLoading(false)
        return
      }

      setSummary(result.data || null)
      setError('')
      setLoading(false)
    }

    loadSummary()

    return () => {
      active = false
    }
  }, [])

  const formatDate = (value) => {
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'Recent'
    return parsed.toLocaleDateString()
  }

  const stats = summary?.stats || {
    totalStudents: 0,
    activeStudents: 0,
    participationRate: 0,
  }

  return (
    <InstituteShell title="Institute Dashboard">
      {error ? <p className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#A0A0A0]">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <SectionLayout title="Total Students" className="p-4">
          <p className="text-sm text-[#A0A0A0]">Registered in your ecosystem</p>
          <p className="mt-1 text-3xl font-bold text-white"><AnimatedNumber value={stats.totalStudents} /></p>
        </SectionLayout>
        <SectionLayout title="Active Students" className="p-4">
          <p className="text-sm text-[#A0A0A0]">Students with paid status</p>
          <p className="mt-1 text-3xl font-bold text-white"><AnimatedNumber value={stats.activeStudents} /></p>
        </SectionLayout>
        <SectionLayout title="Participation Rate" className="p-4">
          <p className="text-sm text-[#A0A0A0]">Weekly engagement ratio</p>
          <p className="mt-1 text-3xl font-bold text-yellow-200"><AnimatedNumber value={stats.participationRate} suffix="%" /></p>
        </SectionLayout>
      </div>

      <SectionLayout title="Recent Activity Feed" subtitle="Live backend-driven student actions">
        <div className="grid gap-2">
          {loading ? <p className="text-sm text-[#A0A0A0]">Loading activity feed...</p> : null}
          {!loading && feed.length === 0 ? <p className="text-sm text-[#A0A0A0]">No recent feed yet.</p> : null}
          {feed.map((item) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#D4AF37]/10 bg-[#0D0D0D]/70 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{item.student}</p>
                <p className="text-xs text-[#A0A0A0]">{item.action}</p>
              </div>
              <span className="text-xs text-[#A0A0A0]">{formatDate(item.createdAt)}</span>
            </motion.article>
          ))}
        </div>
      </SectionLayout>
    </InstituteShell>
  )
}

export default InstituteDashboard
