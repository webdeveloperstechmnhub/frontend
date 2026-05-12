import React, { useMemo, useState } from 'react'
import TmhInput from '../components/ui/TmhInput'
import TmhButton from '../components/ui/TmhButton'
import TmhCard from '../components/ui/TmhCard'

const Join = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    details: '',
  })

  const mailTo = useMemo(() => 'techmnhub.team@gmail.com', [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = 'TechMNHub Join Request'
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nDetails:\n${form.details}`
    const params = new URLSearchParams({ subject, body })
    window.location.href = `mailto:${mailTo}?${params.toString()}`
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
            <TmhButton type="submit">Send message</TmhButton>
          </div>
        </form>
        </TmhCard>
      </div>
    </section>
  )
}

export default Join
