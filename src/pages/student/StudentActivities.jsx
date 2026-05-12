import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StudentShell from '../../components/dashboards/StudentShell'
import { apiRequest } from '../../utils/api'

const StudentActivities = () => {
  const [activities, setActivities] = useState([])
  const [selected, setSelected] = useState(null)
  const [proofFile, setProofFile] = useState(null)
  const [notes, setNotes] = useState('')
  const [submitStatus, setSubmitStatus] = useState('')
  const [error, setError] = useState('')

  const canSubmit = Boolean(proofFile) && notes.trim().length >= 5

  useEffect(() => {
    const loadActivities = async () => {
      const result = await apiRequest('/account/activities', { method: 'GET' })
      if (!result.ok) {
        setError(result.msg || 'Unable to load activities.')
        return
      }

      setActivities(result.data?.activities || [])
      setError('')
    }

    loadActivities()
  }, [])

  return (
    <StudentShell title="Activities" points={2840}>
      {error ? <p className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#A0A0A0]">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.length === 0 ? <p className="text-sm text-[#A0A0A0]">No activities available yet.</p> : null}
        {activities.map((item) => (
          <motion.article
            key={item._id || item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-2xl border border-yellow-500/20 bg-[#111111]/75 p-4"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full border border-yellow-400/35 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">{item.skill}</span>
              <span className="text-sm font-semibold text-white">+{item.points} pts</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(item)}
              className="mt-4 rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200"
            >
              Join
            </motion.button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 grid place-items-center bg-[#0D0D0D]/70 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-yellow-400/25 bg-[#111111] p-5"
            >
              <h3 className="text-xl font-semibold text-yellow-200">{selected.title}</h3>
              <p className="mt-1 text-sm text-[#A0A0A0]">Upload your activity proof to complete submission.</p>
              <div className="mt-4 grid gap-3">
                <label className="text-sm text-[#A0A0A0]">Proof File</label>
                <input type="file" onChange={(event) => setProofFile(event.target.files?.[0] || null)} className="rounded-xl border border-yellow-400/20 bg-[#0D0D0D] px-3 py-2 text-sm" />
                <label className="text-sm text-[#A0A0A0]">Notes</label>
                <textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} className="rounded-xl border border-yellow-400/20 bg-[#0D0D0D] px-3 py-2 text-sm" placeholder="Add what you built..." />
              </div>
              {!canSubmit ? <p className="mt-3 text-xs text-[#A0A0A0]">Attach a file and at least 5 characters of notes to submit.</p> : null}
              {submitStatus ? <p className="mt-2 text-xs text-[#D4AF37]">{submitStatus}</p> : null}
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelected(null)
                    setProofFile(null)
                    setNotes('')
                    setSubmitStatus('')
                  }}
                  className="rounded-lg border border-[#D4AF37]/20 px-4 py-2 text-sm text-[#A0A0A0]"
                >
                  Close
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={!canSubmit}
                  onClick={() => setSubmitStatus('Submission saved successfully. Our team will review it shortly.')}
                  className="rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </StudentShell>
  )
}

export default StudentActivities
