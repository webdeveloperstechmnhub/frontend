import React, { useMemo, useState } from 'react'
import TmhInput from '../components/ui/TmhInput'
import TmhButton from '../components/ui/TmhButton'
import TmhCard from '../components/ui/TmhCard'
import StateNotice from '../components/ui/StateNotice'
import { apiRequest } from '../utils/api'

const Join = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    details: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.details.trim()) {
      setStatus({ type: 'error', text: 'Please complete all fields before sending your request.' })
      return
    }

    setSubmitting(true)
    try {
      const result = await apiRequest('/site/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          details: form.details,
          source: 'join',
        }),
      })

      if (!result.ok) {
        setStatus({ type: 'error', text: result.msg || 'Unable to send request right now.' })
        return
      }

      setStatus({ type: 'success', text: 'Request sent successfully. Our team will get in touch soon.' })
      setForm({ name: '', phone: '', email: '', details: '' })
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', text: 'Unable to connect right now. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="tmh-section tmh-font-body tmh-page">
      <div className="tmh-container">
        <TmhCard className="tmh-page-card" floating={false}>
        <div className="tmh-badge">Join TechMNHub</div>
        <h1 className="tmh-title tmh-font-display">Start your student skill journey.</h1>
        <p className="tmh-subtitle">
          Share your details and we will reach out with the right chapter, cohort, or opportunity.
        </p>

        <form className="tmh-form" onSubmit={handleSubmit}>
          <div className="tmh-form-grid">
            <TmhInput id="name" label="Name" name="name" type="text" value={form.name} onChange={handleChange} required />
            <TmhInput id="phone" label="Phone No." name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          </div>

          <TmhInput id="email" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label className="tmh-field">
            <span>Detailed explanation</span>
            <textarea
              className="tmh-textarea"
              name="details"
              placeholder="Tell us about your campus, skills, and what you want to build."
              value={form.details}
              onChange={handleChange}
              required
              rows={6}
            />
          </label>

          <div className="tmh-form-actions">
            <TmhButton type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</TmhButton>
          </div>

          {status.text ? <StateNotice type={status.type === 'success' ? 'success' : 'error'} message={status.text} /> : null}
        </form>
        </TmhCard>
      </div>
    </section>
  )
}

export default Join
