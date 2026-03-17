import React, { useMemo, useState } from 'react'

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
      <div className="tmh-container tmh-page-card">
        <div className="tmh-badge">Join TechMNHub</div>
        <h1 className="tmh-title tmh-font-display">Start your student skill journey.</h1>
        <p className="tmh-subtitle">
          Share your details and we will reach out with the right chapter, cohort, or opportunity.
        </p>

        <form className="tmh-form" onSubmit={handleSubmit}>
          <div className="tmh-form-grid">
            <label className="tmh-field">
              <span>Name</span>
              <input
                className="tmh-input"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="tmh-field">
              <span>Phone No.</span>
              <input
                className="tmh-input"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="tmh-field">
            <span>Email</span>
            <input
              className="tmh-input"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

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
            <button className="tmh-btn tmh-btn-primary" type="submit">Send message</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Join
