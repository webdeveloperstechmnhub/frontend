import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import AnimatedCard from '../components/auth/AnimatedCard'
import GlowButton from '../components/auth/GlowButton'
import InputField from '../components/auth/InputField'
import SessionBadge from '../components/ui/SessionBadge'
import StateNotice from '../components/ui/StateNotice'

const isEmail = (value) => /\S+@\S+\.\S+/.test(value)

const validate = (form) => {
  const errors = {}

  if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  const ageNumber = Number(form.age)
  if (!Number.isFinite(ageNumber) || ageNumber < 13 || ageNumber > 60) {
    errors.age = 'Enter a valid age between 13 and 60.'
  }

  if (form.classYear.trim().length < 2) errors.classYear = 'Enter your class or year.'
  if (form.institute.trim().length < 2) errors.institute = 'Institute name is required.'
  if (form.city.trim().length < 2) errors.city = 'City is required.'
  if (!isEmail(form.email)) errors.email = 'Enter a valid email address.'
  if (form.password.trim().length < 6) errors.password = 'Password must be at least 6 characters.'

  return errors
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    age: '',
    classYear: '',
    institute: '',
    city: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const setField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const currentErrors = validate(form)
  const canSubmit = Object.keys(currentErrors).length === 0 && !submitting

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(form)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({ type: 'error', text: 'Please correct the highlighted fields before continuing.' })
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))

    setStatus({ type: 'success', text: 'Student signup form is ready. Connect this action to your registration API endpoint.' })
    setSubmitting(false)

    setForm({
      name: '',
      age: '',
      classYear: '',
      institute: '',
      city: '',
      email: '',
      password: '',
    })
    setErrors({})
  }

  const fieldError = (name) => {
    if (!errors[name]) return null
    return <p className="text-xs text-rose-300">{errors[name]}</p>
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <div className="relative z-20 mx-auto flex w-[min(1200px,94vw)] items-center justify-between py-5">
        <Link to="/login" className="text-sm font-semibold text-[#A0A0A0] transition hover:text-yellow-300">
          Back to login
        </Link>
        <SessionBadge label="Student sign-up" tone="demo" />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 right-2 h-80 w-80 rounded-full bg-yellow-700/10 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section className="relative mx-auto grid min-h-screen w-[min(1200px,94vw)] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 130, damping: 18 }}
          className="hidden lg:block"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-yellow-300">Create your student account</p>
          <h1 className="text-6xl font-black leading-[0.95] text-yellow-300 [text-shadow:0_0_22px_rgba(212,175,55,0.48)]">
            TechMNHub
          </h1>
          <p className="mt-5 max-w-lg text-[#A0A0A0]">
            Build your verified student profile for events, activities, and growth tracks.
          </p>
          <p className="mt-4 max-w-lg rounded-xl border border-yellow-500/30 bg-yellow-500/8 px-4 py-3 text-sm text-yellow-200">
            Institutes are onboarded by TechMNHub. Contact admin to register your institute.
          </p>
        </motion.div>

        <AnimatedCard>
          <div className="mb-5 flex items-center gap-3">
            <motion.div
              className="grid h-11 w-11 place-items-center rounded-full border border-yellow-400/50 bg-yellow-400/15 text-yellow-300"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(212,175,55,0.22)',
                  '0 0 24px 2px rgba(212,175,55,0.42)',
                  '0 0 0 0 rgba(212,175,55,0.22)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <UserPlus size={18} />
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold text-white">Student signup</h2>
              <p className="text-xs text-[#A0A0A0]">Only student registration is available here</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4" noValidate>
            <InputField id="name" label="Name" value={form.name} onChange={setField} required />
            {fieldError('name')}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <InputField id="age" label="Age" type="number" min="13" max="60" value={form.age} onChange={setField} required />
                {fieldError('age')}
              </div>
              <div>
                <InputField id="classYear" label="Class / Year" value={form.classYear} onChange={setField} required />
                {fieldError('classYear')}
              </div>
            </div>

            <InputField id="institute" label="Institute" value={form.institute} onChange={setField} required />
            {fieldError('institute')}
            <InputField id="city" label="City" value={form.city} onChange={setField} required />
            {fieldError('city')}
            <InputField id="email" label="Email" type="email" value={form.email} onChange={setField} autoComplete="email" required />
            {fieldError('email')}
            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={setField}
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="rounded-md p-1 text-[#A0A0A0] transition hover:text-yellow-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            {fieldError('password')}

            <p className="rounded-lg border border-yellow-500/25 bg-yellow-500/8 px-3 py-2 text-xs text-yellow-200">
              Institutes are onboarded by TechMNHub. Contact admin to register your institute.
            </p>

            <GlowButton type="submit" className="w-full" disabled={!canSubmit}>
              {submitting ? 'Creating account...' : 'Create Student Account'}
            </GlowButton>

            {!canSubmit && !submitting ? <StateNotice type="loading" message="Complete all fields with valid details to continue." /> : null}

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
      </section>
    </main>
  )
}

export default Signup