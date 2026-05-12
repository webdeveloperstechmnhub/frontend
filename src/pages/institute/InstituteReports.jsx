import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import InstituteShell from '../../components/dashboards/InstituteShell'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const InstituteReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('instituteToken')
    if (!token) {
      setLoading(false)
      return
    }

    const loadReports = async () => {
      const result = await apiRequest('/account/institute/summary', {
        method: 'GET',
        headers: buildAuthHeaders(token),
      })

      if (!result.ok) {
        setReports([])
        setLoading(false)
        return
      }

      const stats = result.data?.stats || {}
      setReports([
        `Monthly Participation Report (${stats.participationRate || 0}% rate)`,
        `Active Students Snapshot (${stats.activeStudents || 0})`,
        `Total Student Registry (${stats.totalStudents || 0})`,
      ])
      setLoading(false)
    }

    loadReports()
  }, [])

  return (
    <InstituteShell title="Reports">
      <section className="rounded-2xl border border-yellow-400/10 bg-[#111111]/75 p-4">
        <h3 className="text-lg font-semibold">Download Reports</h3>
        {status ? <p className="mt-2 text-xs text-[#A0A0A0]">{status}</p> : null}
        <div className="mt-3 grid gap-3">
          {loading ? <p className="text-sm text-[#A0A0A0]">Preparing reports...</p> : null}
          {!loading && reports.length === 0 ? <p className="text-sm text-[#A0A0A0]">No reports available yet.</p> : null}
          {reports.map((report) => (
            <motion.div key={report} whileHover={{ y: -2 }} className="flex items-center justify-between rounded-xl border border-[#D4AF37]/10 bg-[#0D0D0D]/70 px-4 py-3">
              <p className="text-sm">{report}</p>
              <button onClick={() => setStatus(`Download queued for: ${report}`)} className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">Download</button>
            </motion.div>
          ))}
        </div>
      </section>
    </InstituteShell>
  )
}

export default InstituteReports
