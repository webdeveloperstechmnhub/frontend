import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'
import InputField from '../components/ui/InputField'
import GlowButton from '../components/ui/GlowButton'
import StateNotice from '../components/ui/StateNotice'
import { apiRequest } from '../utils/api'

const initialState = {
  instituteName: '',
  department: '',
  city: '',
  contactName: '',
  email: '',
  phone: '',
  topic: '',
  type: '',
  date: '',
  time: '',
  duration: '',
  students: '',
  audience: '',
  mode: '',
  requirements: '',
}

const BookSession = () => {
  const [formData, setFormData] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const selectOptions = useMemo(
    () => ({
      type: ['Workshop', 'Webinar', 'Training', 'Guest Lecture'],
      duration: ['1 Hour', '2 Hours', 'Half Day', 'Full Day'],
      audience: ['Students', 'Faculty', 'Both'],
      mode: ['Online', 'Offline', 'Hybrid'],
    }),
    [],
  )

  const isValid =
    formData.instituteName.trim().length >= 2
    && formData.department.trim().length >= 2
    && formData.city.trim().length >= 2
    && formData.contactName.trim().length >= 2
    && /\S+@\S+\.\S+/.test(formData.email)
    && formData.phone.trim().length >= 7
    && formData.topic.trim().length >= 3
    && formData.type
    && formData.date
    && formData.time
    && formData.duration
    && Number(formData.students) > 0
    && formData.audience
    && formData.mode

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isValid) {
      setStatus({ type: 'error', text: 'Please complete all required fields with valid details.' })
      return
    }

    setSubmitting(true)

    const payload = {
      ...formData,
      students: Number(formData.students),
      source: 'frontend-book-session',
    }

    const response = await apiRequest('/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setStatus({
        type: 'error',
        text: response.msg || 'Unable to save booking request right now. Please try again shortly.',
      })
      setSubmitting(false)
      return
    }

    setStatus({ type: 'success', text: 'Session booked successfully. Our team will contact you soon.' })
    setFormData(initialState)
    setSubmitting(false)
  }

  return (
    <PageScaffold>
      <SectionWrapper
        title="Book a Session"
        subtitle="Schedule a TechMNHub institute session with your preferred topic, mode, and audience details."
        maxWidth="max-w-5xl"
      >
        <GlowCard className="p-6 sm:p-8" floating={false} hoverScale={1.005}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-6 inline-flex rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFD700]"
          >
            Institute Session Booking
          </motion.p>

          <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
            <div className="grid gap-4 md:grid-cols-3">
              <InputField id="instituteName" label="Institute Name" value={formData.instituteName} onChange={handleChange} required />
              <InputField id="department" label="Department" value={formData.department} onChange={handleChange} required />
              <InputField id="city" label="City" value={formData.city} onChange={handleChange} required />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InputField id="contactName" label="Contact Person Name" value={formData.contactName} onChange={handleChange} required />
              <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
              <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField id="topic" label="Session Topic" value={formData.topic} onChange={handleChange} required />

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Session Type</span>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700/90 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 focus:border-[#FFD700]/80 focus:shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_0_26px_rgba(255,215,0,0.2)]"
                >
                  <option value="">Select session type</option>
                  {selectOptions.type.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InputField id="date" label="Date" type="date" value={formData.date} onChange={handleChange} required />
              <InputField id="time" label="Time" type="time" value={formData.time} onChange={handleChange} required />

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Duration</span>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700/90 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 focus:border-[#FFD700]/80 focus:shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_0_26px_rgba(255,215,0,0.2)]"
                >
                  <option value="">Select duration</option>
                  {selectOptions.duration.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InputField id="students" label="Number of Students" type="number" min="1" value={formData.students} onChange={handleChange} required />

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Target Audience</span>
                <select
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700/90 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 focus:border-[#FFD700]/80 focus:shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_0_26px_rgba(255,215,0,0.2)]"
                >
                  <option value="">Select audience</option>
                  {selectOptions.audience.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Mode</span>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700/90 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 focus:border-[#FFD700]/80 focus:shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_0_26px_rgba(255,215,0,0.2)]"
                >
                  <option value="">Select mode</option>
                  {selectOptions.mode.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Special Requirements</span>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us any special infrastructure or session expectations."
                className="w-full rounded-xl border border-zinc-700/90 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[#FFD700]/80 focus:shadow-[0_0_0_1px_rgba(255,215,0,0.3),0_0_26px_rgba(255,215,0,0.2)]"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-400">All required details are validated before submission.</p>
              <GlowButton type="submit" disabled={!isValid || submitting} className="sm:min-w-[220px]">
                {submitting ? 'Booking Session...' : 'Book Session'}
              </GlowButton>
            </div>

            {status.text ? <StateNotice type={status.type === 'success' ? 'success' : 'error'} message={status.text} /> : null}
          </form>
        </GlowCard>
      </SectionWrapper>
    </PageScaffold>
  )
}

export default BookSession
