import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StudentShell from '../../components/dashboards/StudentShell'
import TmhInput from '../../components/ui/TmhInput'
import GlowButton from '../../components/auth/GlowButton'

const StudentProfile = () => {
  const [form, setForm] = useState({
    fullName: 'Sana Verma',
    studentId: 'TMH-ST-2841',
    institute: 'TechMN Institute of Learning',
    city: 'Muzaffarnagar',
  })
  const [skill, setSkill] = useState('')
  const [skills, setSkills] = useState(['AI Prompting', 'Communication', 'Design Thinking'])
  const [status, setStatus] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('studentProfile')
      if (!raw) return

      const parsed = JSON.parse(raw)
      if (parsed?.fullName || parsed?.studentId || parsed?.institute || parsed?.city) {
        setForm((prev) => ({
          ...prev,
          fullName: parsed.fullName || prev.fullName,
          studentId: parsed.studentId || prev.studentId,
          institute: parsed.institute || prev.institute,
          city: parsed.city || prev.city,
        }))
      }

      if (Array.isArray(parsed?.skills) && parsed.skills.length) {
        setSkills(parsed.skills.filter((item) => String(item || '').trim()))
      }
    } catch {
      // Ignore malformed localStorage payloads and keep defaults.
    }
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    const value = skill.trim()
    if (!value) return
    const exists = skills.some((item) => item.toLowerCase() === value.toLowerCase())
    if (exists) {
      setStatus('Skill already exists.')
      return
    }
    setSkills((prev) => [...prev, value])
    setSkill('')
    setStatus('')
  }

  const removeSkill = (name) => {
    setSkills((prev) => prev.filter((item) => item !== name))
    setStatus('')
  }

  const canSave =
    form.fullName.trim().length >= 2
    && form.studentId.trim().length >= 4
    && form.institute.trim().length >= 2
    && form.city.trim().length >= 2

  const saveProfile = () => {
    if (!canSave) {
      setStatus('Please fill all profile fields correctly before saving.')
      return
    }

    localStorage.setItem('studentProfile', JSON.stringify({ ...form, skills }))
    setStatus('Profile saved locally. Backend profile sync can be connected next.')
  }

  return (
    <StudentShell title="Profile" points={2840}>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-yellow-400/20 bg-[#111111]/75 p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TmhInput label="Full Name" id="fullName" name="fullName" value={form.fullName} onChange={onChange} />
          <TmhInput label="Student ID" id="studentId" name="studentId" value={form.studentId} onChange={onChange} />
          <TmhInput label="Institute" id="institute" name="institute" value={form.institute} onChange={onChange} />
          <TmhInput label="City" id="city" name="city" value={form.city} onChange={onChange} />
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-yellow-400/35 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                <span>{item}</span>
                <button type="button" onClick={() => removeSkill(item)} className="rounded-full px-1 text-yellow-100/80 hover:text-yellow-100">x</button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
              placeholder="Add skill"
              className="flex-1 rounded-xl border border-yellow-400/20 bg-[#0D0D0D] px-3 py-2"
            />
            <button
              type="button"
              onClick={addSkill}
              disabled={!skill.trim()}
              className="rounded-xl border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <GlowButton type="button" className="px-5 py-2 text-sm" onClick={saveProfile} disabled={!canSave}>
            Save Profile
          </GlowButton>
          {status ? <p className="text-xs text-[#A0A0A0]">{status}</p> : null}
        </div>
      </motion.form>
    </StudentShell>
  )
}

export default StudentProfile
