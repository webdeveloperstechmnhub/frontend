import { useEffect, useState } from 'react'
import InstituteShell from '../../components/dashboards/InstituteShell'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const InstituteStudents = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('instituteToken')
    if (!token) {
      setError('Please login as institute first.')
      setLoading(false)
      return
    }

    const loadStudents = async () => {
      setLoading(true)
      const result = await apiRequest('/account/institute/students', {
        method: 'GET',
        headers: buildAuthHeaders(token),
      })

      if (!result.ok) {
        setError(result.msg || 'Unable to load students.')
        setLoading(false)
        return
      }

      setRows(result.data?.students || [])
      setError('')
      setLoading(false)
    }

    loadStudents()
  }, [])

  return (
    <InstituteShell title="Students">
      {error ? <p className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#A0A0A0]">{error}</p> : null}
      <section className="overflow-hidden rounded-2xl border border-yellow-400/10 bg-[#111111]/75">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0D0D0D]/70 text-[#A0A0A0]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-t border-[#D4AF37]/10/80">
                <td className="px-4 py-3 text-[#A0A0A0]" colSpan={4}>Loading students...</td>
              </tr>
            ) : null}
            {!loading && rows.length === 0 ? (
              <tr className="border-t border-[#D4AF37]/10/80">
                <td className="px-4 py-3 text-[#A0A0A0]" colSpan={4}>No students found.</td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.id || row.name} className="border-t border-[#D4AF37]/10/80">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 text-[#A0A0A0]">{row.className}</td>
                <td className="px-4 py-3 text-yellow-200">{row.points}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${row.status === 'Active' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#111111] text-[#A0A0A0]'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </InstituteShell>
  )
}

export default InstituteStudents
