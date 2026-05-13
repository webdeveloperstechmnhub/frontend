import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StudentShell from '../../components/dashboards/StudentShell'
import AnimatedNumber from '../../components/dashboards/AnimatedNumber'
import SectionLayout from '../../components/ui/SectionLayout'
import StateNotice from '../../components/ui/StateNotice'
import { apiRequest, buildAuthHeaders } from '../../utils/api'

const suggestion = 'Based on your AI and communication scores, join the Prompt Engineering Challenge for +120 points.'

const getStoredProfile = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('studentProfile') || '{}')
    return {
      fullName: parsed.fullName || 'Student',
      studentId: parsed.studentId || 'TMH-ST-NEW',
      institute: parsed.institute || 'Institute not available',
      email: parsed.email || '',
    }
  } catch {
    return {
      fullName: 'Student',
      studentId: 'TMH-ST-NEW',
      institute: 'Institute not available',
      email: '',
    }
  }
}

const StudentDashboard = () => {
  const [typed, setTyped] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    { label: 'Activities', value: 0 },
    { label: 'Certificates', value: 0 },
    { label: 'Rank', value: 0 },
  ])
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')
  const [studentPoints, setStudentPoints] = useState(0)
  const [studentProfile, setStudentProfile] = useState(getStoredProfile)

  const initials = studentProfile.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'ST'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTyped(suggestion.slice(0, index))
      if (index >= suggestion.length) clearInterval(timer)
    }, 22)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let active = true

    const hydrateDashboard = async () => {
      setLoading(true)

      try {
        const studentToken = localStorage.getItem('studentToken')
        const [leaderboard, activities, publicEvents, profile] = await Promise.all([
          apiRequest('/account/leaderboard', { method: 'GET' }),
          apiRequest('/account/activities', { method: 'GET' }),
          apiRequest('/events/public', { method: 'GET' }),
          apiRequest('/student/profile', {
            method: 'GET',
            headers: studentToken ? buildAuthHeaders(studentToken) : undefined,
          }),
        ])

        if (!active) return

        if (profile.ok && profile.data?.student) {
          const liveProfile = {
            fullName: profile.data.student.fullName,
            studentId: profile.data.student.studentId,
            institute: profile.data.student.college,
            email: profile.data.student.email,
          }
          setStudentProfile(liveProfile)
          localStorage.setItem('studentProfile', JSON.stringify({
            ...JSON.parse(localStorage.getItem('studentProfile') || '{}'),
            ...liveProfile,
          }))
        }

        const leaderboardEntries = Array.isArray(leaderboard.data?.entries) ? leaderboard.data.entries : []
        const activitiesList = Array.isArray(activities.data?.activities) ? activities.data.activities : []
        const eventsSource = Array.isArray(publicEvents.data)
          ? publicEvents.data
          : Array.isArray(publicEvents.data?.events)
            ? publicEvents.data.events
            : []
        const eventsList = eventsSource.slice(0, 5)

        if (!leaderboard.ok && !activities.ok && !publicEvents.ok) {
          setError('Unable to load live dashboard data.')
          setLoading(false)
          return
        }

        const myRank = leaderboardEntries.find((item) =>
          String(item.name || '').trim().toLowerCase() === studentProfile.fullName.trim().toLowerCase(),
        )?.rank || 0
        const boardPoints = leaderboardEntries.find((item) =>
          String(item.name || '').trim().toLowerCase() === studentProfile.fullName.trim().toLowerCase(),
        )?.points
        const computedPoints = Number.isFinite(Number(boardPoints))
          ? Number(boardPoints)
          : Math.max(0, Math.round(activitiesList.reduce((sum, item) => sum + Number(item.points || 0), 0) / 4))

        setStudentPoints(computedPoints)
        setStats([
          { label: 'Activities', value: activitiesList.length },
          { label: 'Certificates', value: Math.floor(activitiesList.length / 2) },
          { label: 'Rank', value: myRank },
        ])

        setEvents(
          eventsList.map((event) => ({
            title: event.name,
            date: event.date || 'Upcoming',
            mode: event.location || event.city || 'Hybrid',
          })),
        )

        setError('')
      } catch (loadError) {
        console.error('Dashboard hydration failed:', loadError)
        if (!active) return
        setError('Unable to load live dashboard data.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    hydrateDashboard()

    return () => {
      active = false
    }
  }, [studentProfile.fullName])

  return (
    <StudentShell title="Student Dashboard" points={studentPoints}>
      {error ? <StateNotice type="error" message={error} /> : null}
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <motion.article
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-yellow-400/25 bg-[#111111]/80 p-5 shadow-[0_0_28px_rgba(212,175,55,0.16)]"
        >
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border border-yellow-300/65 bg-gradient-to-br from-yellow-300/30 to-yellow-500/10 p-1">
              <div className="grid h-full w-full place-items-center rounded-full bg-[#0D0D0D] text-xl font-bold text-yellow-300">{initials}</div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{studentProfile.fullName}</h3>
              <p className="text-sm text-[#A0A0A0]">ID: {studentProfile.studentId}</p>
              <p className="text-sm text-[#A0A0A0]">{studentProfile.institute}</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-200">Total Points</p>
            <p className="mt-1 text-4xl font-black text-yellow-300">
              <AnimatedNumber value={studentPoints} />
            </p>
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-yellow-400/20 bg-[#111111]/70 p-4"
            >
              <p className="text-sm text-[#A0A0A0]">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-yellow-200">
                <AnimatedNumber value={item.value} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionLayout title="AI Suggestion" subtitle="Auto guidance from current activity momentum">
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">AI Suggestion</p>
        <p className="mt-3 min-h-10 text-white">{typed}</p>
      </SectionLayout>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Events</h2>
          <span className="text-sm text-[#A0A0A0]">{loading ? 'Fetching events...' : 'Swipe to explore'}</span>
        </div>
        {loading ? <StateNotice type="loading" message="Loading latest events and activities..." /> : null}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {!loading && events.length === 0 ? <StateNotice type="empty" message="No events available yet." /> : null}
          {events.map((event) => (
            <motion.article
              key={event.title}
              whileHover={{ y: -4, scale: 1.01 }}
              className="min-w-[260px] rounded-2xl border border-yellow-500/20 bg-[#111111]/75 p-4"
            >
              <p className="text-sm text-[#A0A0A0]">{event.date} • {event.mode}</p>
              <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="mt-4 rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200"
              >
                Join
              </motion.button>
            </motion.article>
          ))}
        </div>
      </section>
    </StudentShell>
  )
}

export default StudentDashboard
