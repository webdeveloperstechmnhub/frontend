import React, { useState } from 'react'

const flakeConfig = [
  { left: '6%', size: '7px', duration: '8.2s', delay: '-1.3s', drift: '-14px' },
  { left: '12%', size: '10px', duration: '10.4s', delay: '-3.7s', drift: '18px' },
  { left: '18%', size: '6px', duration: '7.4s', delay: '-0.8s', drift: '-9px' },
  { left: '24%', size: '12px', duration: '11.6s', delay: '-2.2s', drift: '20px' },
  { left: '31%', size: '8px', duration: '9.3s', delay: '-4.4s', drift: '-12px' },
  { left: '38%', size: '11px', duration: '12.8s', delay: '-1.1s', drift: '16px' },
  { left: '45%', size: '7px', duration: '8.8s', delay: '-5.2s', drift: '-10px' },
  { left: '52%', size: '13px', duration: '13.1s', delay: '-2.9s', drift: '22px' },
  { left: '59%', size: '9px', duration: '9.7s', delay: '-0.5s', drift: '-15px' },
  { left: '66%', size: '6px', duration: '7.9s', delay: '-3.1s', drift: '12px' },
  { left: '73%', size: '12px', duration: '11.2s', delay: '-4.6s', drift: '-18px' },
  { left: '80%', size: '8px', duration: '8.5s', delay: '-1.9s', drift: '14px' },
  { left: '87%', size: '10px', duration: '10.1s', delay: '-5.7s', drift: '-11px' },
  { left: '93%', size: '7px', duration: '9.2s', delay: '-2.6s', drift: '17px' },
]

const StudentSignup = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    city: '',
    interests: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitError('')
    setSubmitSuccess('')

    if (form.password.length < 6) {
      setSubmitError('Password must be at least 6 characters long.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setSubmitError('Password and confirm password do not match.')
      return
    }

    const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api').trim()
    const candidateEndpoints = [`${backendUrl}/student-signup`, `${backendUrl}/signup`]

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      college: form.college,
      year: form.year,
      city: form.city,
      interests: form.interests,
      password: form.password,
    }

    setIsSubmitting(true)

    try {
      let response = null
      let responseData = null

      for (const endpoint of candidateEndpoints) {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        responseData = await response.json().catch(() => ({}))

        if (response.status !== 404) {
          break
        }
      }

      if (!response || !response.ok) {
        const fallbackMessage =
          'Signup API is not available yet. Please ask backend team to add POST /student-signup.'
        setSubmitError(responseData?.msg || responseData?.message || fallbackMessage)
        return
      }

      setSubmitSuccess('Signup successful. Your student account request has been created.')
      setForm({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        city: '',
        interests: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      setSubmitError('Unable to submit signup right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="tmh-section tmh-font-body tmh-page tmh-signup-hero">
      <div className="tmh-signup-glow tmh-signup-glow-left" aria-hidden="true" />
      <div className="tmh-signup-glow tmh-signup-glow-right" aria-hidden="true" />

      <div className="tmh-gold-flakes" aria-hidden="true">
        {flakeConfig.map((flake, index) => (
          <span
            key={`flake-${index}`}
            className="tmh-gold-flake"
            style={{
              '--left': flake.left,
              '--size': flake.size,
              '--duration': flake.duration,
              '--delay': flake.delay,
              '--drift': flake.drift,
            }}
          />
        ))}
      </div>

      <div className="tmh-container tmh-page-card tmh-signup-card">
        <div className="tmh-badge">Student Signup</div>
        <h1 className="tmh-title tmh-font-display">Join as a TechMNHub Student.</h1>
        <p className="tmh-subtitle">
          Create your student profile and get access to events, skill communities, and growth opportunities.
        </p>

        <form className="tmh-form" onSubmit={handleSubmit}>
          <div className="tmh-form-grid">
            <label className="tmh-field">
              <span>Full Name</span>
              <input
                className="tmh-input"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label>
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
            <label className="tmh-field">
              <span>College / School</span>
              <input
                className="tmh-input"
                name="college"
                type="text"
                placeholder="Institution name"
                value={form.college}
                onChange={handleChange}
                required
              />
            </label>
            <label className="tmh-field">
              <span>Year / Course</span>
              <input
                className="tmh-input"
                name="year"
                type="text"
                placeholder="e.g. B.Tech 2nd Year"
                value={form.year}
                onChange={handleChange}
                required
              />
            </label>
            <label className="tmh-field">
              <span>City</span>
              <input
                className="tmh-input"
                name="city"
                type="text"
                placeholder="Your city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </label>
            <label className="tmh-field">
              <span>Password</span>
              <input
                className="tmh-input"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </label>
            <label className="tmh-field">
              <span>Confirm Password</span>
              <input
                className="tmh-input"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </label>
          </div>

          <label className="tmh-field">
            <span>Interests & Goals</span>
            <textarea
              className="tmh-textarea"
              name="interests"
              placeholder="Tell us what you want to learn, build, or contribute to."
              value={form.interests}
              onChange={handleChange}
              required
              rows={5}
            />
          </label>

          <div className="tmh-form-actions">
            <button className="tmh-btn tmh-btn-primary" type="submit">
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          {submitError && <p style={{ color: '#A0A0A0', fontWeight: 600 }}>{submitError}</p>}
          {submitSuccess && <p style={{ color: '#D4AF37', fontWeight: 600 }}>{submitSuccess}</p>}
        </form>
      </div>
    </section>
  )
}

export default StudentSignup
