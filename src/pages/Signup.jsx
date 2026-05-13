import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import AnimatedCard from '../components/auth/AnimatedCard'
import GlowButton from '../components/auth/GlowButton'
import InputField from '../components/auth/InputField'
import { apiRequest } from '../utils/api'
import SessionBadge from '../components/ui/SessionBadge'
import StateNotice from '../components/ui/StateNotice'

const Signup = () => {
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
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const taglines = useMemo(
    () => ['Verified student access.', 'One profile for events.', 'A faster path into TechMNHub.'],
    [],
  )

  const setField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (form.password.length < 6) {
      setStatus({ type: 'error', text: 'Password must be at least 6 characters long.' })
      return
    }

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', text: 'Password and confirm password do not match.' })
      return
    }

    setSubmitting(true)

    try {
      const result = await apiRequest('/student-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          college: form.college,
          year: form.year,
          city: form.city,
          interests: form.interests,
          password: form.password,
        }),
      })

      if (!result.ok) {
        setStatus({ type: 'error', text: result.msg || 'Signup failed. Please try again.' })
        return
      }

      setStatus({ type: 'success', text: 'Signup successful. Your request has been submitted.' })
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
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', text: 'Unable to connect with backend right now.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <div className="relative z-40 mx-auto flex w-[min(1200px,94vw)] items-center justify-between py-5">
        <Link
          to="/"
          className="rounded-full border border-[#D4AF37]/20 bg-[#111111]/80 px-4 py-2 text-sm font-semibold text-[#A0A0A0] transition hover:border-[#D4AF37]/45 hover:text-yellow-300"
        >
          Back to home
        </Link>
        <SessionBadge label="Student signup" tone="live" />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-yellow-600/15 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 22%, rgba(212,175,55,0.18) 1px, transparent 1px), radial-gradient(circle at 75% 80%, rgba(212,175,55,0.14) 1px, transparent 1px)',
          backgroundSize: '3px 3px, 4px 4px',
        }}
      />

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 18, mass: 0.8 }}
        className="relative z-10 mx-auto grid min-h-screen w-[min(1200px,94vw)] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2"
      >
        <div className="hidden lg:block">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/35 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
            <Sparkles size={14} />
            Premium Access
          </p>
          <h1 className="text-6xl font-black leading-[0.95] text-yellow-300 [text-shadow:0_0_18px_rgba(212,175,55,0.45)]">
            TechMNHub
          </h1>
          <div className="mt-7 grid gap-3 text-[#A0A0A0]">
            {taglines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.15 * index }}
                className="text-lg"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <AnimatedCard>
          <div className="mb-5 flex items-center gap-3">
            <motion.div
              className="grid h-11 w-11 place-items-center rounded-full border border-yellow-400/50 bg-yellow-400/15 text-yellow-300"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(212,175,55,0.25)',
                  '0 0 24px 2px rgba(212,175,55,0.45)',
                  '0 0 0 0 rgba(212,175,55,0.25)',
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={18} />
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold text-white">Student signup</h2>
              <p className="text-xs text-[#A0A0A0]">Create your student profile and send it to the backend</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <InputField id="fullName" label="Full Name" value={form.fullName} onChange={setField} autoComplete="name" required />
            <InputField id="email" label="Email" type="email" value={form.email} onChange={setField} autoComplete="email" required />

            <div className="grid grid-cols-2 gap-3">
              <InputField id="phone" label="Phone No." type="tel" value={form.phone} onChange={setField} autoComplete="tel" required />
              <InputField id="city" label="City" value={form.city} onChange={setField} autoComplete="address-level2" required />
            </div>

            <InputField id="college" label="College / School" value={form.college} onChange={setField} required />
            <InputField id="year" label="Year / Course" value={form.year} onChange={setField} required />

            <label className="block">
              <span className="mb-2 block text-xs text-[#A0A0A0]">Interests & Goals</span>
              <textarea
                className="min-h-28 w-full rounded-xl border border-[#D4AF37]/20 bg-[#0D0D0D]/70 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#5E5E5E] focus:border-[#D4AF37]/80 focus:shadow-[0_0_0_1px_rgba(212,175,55,0.3),0_0_26px_rgba(212,175,55,0.2)]"
                name="interests"
                placeholder="Tell us what you want to learn, build, or contribute to."
                value={form.interests}
                onChange={setField}
                required
                rows={5}
              />
            </label>

            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={setField}
              autoComplete="new-password"
              required
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={setField}
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="rounded-md p-1 text-[#A0A0A0] transition hover:text-yellow-300"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            <GlowButton type="submit" className="mt-1 w-full" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create Account'}
            </GlowButton>

            <AnimatePresence mode="wait">
              {status.text ? (
                <motion.div
                  key={status.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StateNotice type={status.type === 'success' ? 'success' : 'error'} message={status.text} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <p className="text-sm text-[#A0A0A0]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-yellow-300 transition hover:text-yellow-200">
                Login
              </Link>
            </p>
          </form>
        </AnimatedCard>
      </motion.section>
    </main>
  )
}

export default Signup