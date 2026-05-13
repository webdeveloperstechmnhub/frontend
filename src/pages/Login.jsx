import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react'
import AnimatedCard from '../components/auth/AnimatedCard'
import GlowButton from '../components/auth/GlowButton'
import InputField from '../components/auth/InputField'
import RoleToggle from '../components/auth/RoleToggle'
import { apiRequest } from '../utils/api'
import SessionBadge from '../components/ui/SessionBadge'
import StateNotice from '../components/ui/StateNotice'

const isEmail = (value) => /\S+@\S+\.\S+/.test(value)

const Login = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('Institute')
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)
  const canSubmit = isEmail(form.email) && form.password.length >= 6 && !submitting
  const helperText = role === 'Student'
    ? 'Student login is enabled only for admin-approved student accounts.'
    : 'Institute login uses verified admin-created accounts.'

  const taglines = useMemo(
    () => ['Verified identity.', 'Admin-created institute access.', 'Future-ready opportunities.'],
    [],
  )

  const goHome = (event) => {
    event.preventDefault()
    event.stopPropagation()
    navigate('/', { replace: true })
    window.scrollTo({ top: 0, left: 0 })
  }

  const setField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (!isEmail(form.email) || form.password.length < 6) {
      setStatus({ type: 'error', text: 'Use a valid email and minimum 6 character password.' })
      return
    }

    const doLogin = async () => {
      setSubmitting(true)
      try {
        if (role === 'Institute') {
          const result = await apiRequest('/account/institute/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email, password: form.password }),
          })

          if (!result.ok) {
            setStatus({ type: 'error', text: result.msg || 'Institute login failed.' })
            return
          }

          const data = result.data || {}
          localStorage.setItem('instituteToken', data.token)
          localStorage.setItem('instituteAccount', JSON.stringify(data.user || {}))
          localStorage.setItem('instituteProfile', JSON.stringify(data.institute || {}))
          setStatus({ type: 'success', text: 'Institute login successful. Redirecting to dashboard...' })
          window.setTimeout(() => navigate('/institute/dashboard'), 450)
          return
        }

        const result = await apiRequest('/student-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        })

        if (!result.ok) {
          setStatus({ type: 'error', text: result.msg || 'Student login failed.' })
          return
        }

        const student = result.data?.student || {}
        localStorage.setItem('studentToken', result.data?.token || '')
        localStorage.setItem('studentProfile', JSON.stringify({
          id: student.id,
          fullName: student.fullName,
          email: student.email,
          phone: student.phone,
          studentId: student.studentId,
          institute: student.college,
          year: student.year,
          city: student.city,
          interests: student.interests,
          status: student.status,
        }))
        setStatus({ type: 'success', text: 'Student login successful. Redirecting to dashboard...' })
        window.setTimeout(() => navigate('/student/dashboard'), 450)
      } catch (err) {
        console.error(err)
        setStatus({ type: 'error', text: 'Unable to connect with backend right now.' })
      } finally {
        setSubmitting(false)
      }
    }

    doLogin()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <div className="relative z-40 mx-auto flex w-[min(1200px,94vw)] items-center justify-between py-5">
        <button
          type="button"
          onClick={goHome}
          className="rounded-full border border-[#D4AF37]/20 bg-[#111111]/80 px-4 py-2 text-sm font-semibold text-[#A0A0A0] transition hover:border-[#D4AF37]/45 hover:text-yellow-300"
        >
          Back to home
        </button>
        <SessionBadge label={role === 'Student' ? 'Student live' : 'Institute live'} tone="live" />
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
              <ShieldCheck size={18} />
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold text-white">Welcome back</h2>
              <p className="text-xs text-[#A0A0A0]">Sign in to your premium workspace</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <RoleToggle value={role} onChange={setRole} />

            <InputField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={setField}
              autoComplete="email"
              required
            />

            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={setField}
              autoComplete="current-password"
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

            <GlowButton type="submit" className="mt-1 w-full" disabled={!canSubmit}>
              {submitting ? 'Signing in...' : 'Login'}
            </GlowButton>

            {!canSubmit ? (
              <p className="text-xs text-[#A0A0A0]">Enter a valid email and a password with at least 6 characters.</p>
            ) : null}

            <p className="text-xs text-[#A0A0A0]">{helperText}</p>

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
              Need an account?{' '}
              <Link to="/signup" className="font-semibold text-yellow-300 transition hover:text-yellow-200">
                Sign up
              </Link>
            </p>
          </form>
        </AnimatedCard>
      </motion.section>
    </main>
  )
}

export default Login
