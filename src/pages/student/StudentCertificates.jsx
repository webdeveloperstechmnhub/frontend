import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StudentShell from '../../components/dashboards/StudentShell'
import { apiRequest } from '../../utils/api'

const StudentCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true)
      const result = await apiRequest('/account/activities', { method: 'GET' })
      if (!result.ok) {
        setCertificates([])
        setLoading(false)
        return
      }

      const items = (result.data?.activities || []).slice(0, 8).map((item, index) => ({
        id: item._id || index,
        title: `${item.title} Certificate`,
        date: new Date(item.createdAt || Date.now()).toLocaleDateString(),
      }))
      setCertificates(items)
      setLoading(false)
    }

    loadCertificates()
  }, [])

  const downloadCertificate = (item) => {
    const content = `TechMNHub Certificate\n\nTitle: ${item.title}\nDate: ${item.date}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <StudentShell title="Certificates" points={2840}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-sm text-[#A0A0A0]">Loading certificates...</p> : null}
        {!loading && certificates.length === 0 ? <p className="text-sm text-[#A0A0A0]">No certificates earned yet. Complete activities to unlock them.</p> : null}
        {certificates.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-2xl border border-yellow-400/20 bg-[#111111]/75 p-4"
          >
            <p className="text-sm text-[#A0A0A0]">{item.date}</p>
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <div className="mt-4 grid h-28 place-items-center rounded-xl border border-dashed border-yellow-400/30 bg-[#0D0D0D] text-xs text-[#A0A0A0]">
              QR Placeholder
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => downloadCertificate(item)}
              className="mt-4 rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200"
            >
              Download
            </motion.button>
          </motion.article>
        ))}
      </div>
    </StudentShell>
  )
}

export default StudentCertificates
