import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InstituteShell from '../../components/dashboards/InstituteShell'
import TmhInput from '../../components/ui/TmhInput'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const emptyForm = { title: '', description: '', skill: '', points: '' }

const InstituteActivities = () => {
  const [activities, setActivities] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  const canCreate =
    form.title.trim().length >= 3
    && form.description.trim().length >= 8
    && form.skill.trim().length >= 2
    && Number(form.points) > 0
    && !submitting

  const loadActivities = async () => {
    setLoading(true)
    const result = await apiRequest('/account/activities', { method: 'GET' })
    if (!result.ok) {
      setError(result.msg || 'Unable to load activities.')
      setLoading(false)
      return
    }
    setActivities(result.data?.activities || [])
    setError('')
    setLoading(false)
  }

  useEffect(() => {
    loadActivities()
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus('')
  }

  const createActivity = async () => {
    const token = localStorage.getItem('instituteToken')
    if (!token) {
      setError('Please login as institute first.')
      return
    }

    if (!canCreate) {
      setError('Please fill valid activity details before creating.')
      return
    }

    setSubmitting(true)
    setError('')

    const result = await apiRequest('/account/institute/activities', {
      method: 'POST',
      headers: buildAuthHeaders(token),
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        skill: form.skill,
        points: Number(form.points),
      }),
    })

    if (!result.ok) {
      setError(result.msg || 'Unable to create activity.')
      setSubmitting(false)
      return
    }

    setStatus('Activity created successfully.')
    setForm(emptyForm)
    setOpen(false)
    await loadActivities()
    setSubmitting(false)
  }

  return (
    <InstituteShell title="Activities">
      {error ? <p className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#A0A0A0]">{error}</p> : null}
      {status ? <p className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-3 text-sm text-[#D4AF37]">{status}</p> : null}
      <div className="flex justify-end">
        <button onClick={() => setOpen(true)} className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200">Create Activity</button>
      </div>

      <div className="grid gap-3">
        {loading ? <p className="text-sm text-[#A0A0A0]">Loading activities...</p> : null}
        {!loading && activities.length === 0 ? <p className="text-sm text-[#A0A0A0]">No activities created yet.</p> : null}
        {activities.map((item) => (
          <article key={item._id || item.id} className="rounded-2xl border border-yellow-400/10 bg-[#111111]/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-sm text-yellow-200">+{item.points} pts</span>
            </div>
            <p className="mt-1 text-sm text-[#A0A0A0]">{item.description}</p>
            <span className="mt-2 inline-block rounded-full bg-[#111111] px-3 py-1 text-xs text-white">{item.skill}</span>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-[#0D0D0D]/70 p-4">
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} className="w-full max-w-xl rounded-2xl border border-yellow-400/20 bg-[#111111] p-5">
              <h3 className="text-xl font-semibold">Create Activity</h3>
              <div className="mt-4 grid gap-3">
                <TmhInput label="Title" id="title" name="title" value={form.title} onChange={onChange} />
                <textarea name="description" value={form.description} onChange={onChange} rows={4} placeholder="Description" className="rounded-xl border border-yellow-400/20 bg-[#0D0D0D] px-3 py-2" />
                <TmhInput label="Skill" id="skill" name="skill" value={form.skill} onChange={onChange} />
                <TmhInput label="Points" id="points" name="points" value={form.points} onChange={onChange} type="number" />
              </div>
              {!canCreate ? <p className="mt-3 text-xs text-[#A0A0A0]">Title/skill/description required and points must be greater than 0.</p> : null}
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setOpen(false)} className="rounded-lg border border-[#D4AF37]/20 px-4 py-2 text-sm text-[#A0A0A0]">Cancel</button>
                <button disabled={!canCreate} onClick={createActivity} className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Creating...' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </InstituteShell>
  )
}

export default InstituteActivities
