import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TmhCard from '../../components/ui/TmhCard'
import TmhSidebar from '../../components/ui/TmhSidebar'
import TmhButton from '../../components/ui/TmhButton'
import TmhInput from '../../components/ui/TmhInput'
import StateNotice from '../../components/ui/StateNotice'
import { apiRequest, buildAuthHeaders } from '../../utils/api'
import { isNativeApp } from '../../utils/appEnvironment'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Profile Card', to: '/profile-card' },
  { label: 'Admin Panel', to: '/admin' },
  { label: 'Session Bookings', to: '/admin#bookings' },
  { label: 'Landing', to: '/' },
]

const statusOptions = ['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled']

const AdminPanelPage = () => {
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [savingId, setSavingId] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [notice, setNotice] = useState({ type: '', text: '' })
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken') || '')
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' })
  const [authLoading, setAuthLoading] = useState(false)

  const nativeMode = isNativeApp()

  const loadBookings = async () => {
    setLoadingBookings(true)
    const endpoint = statusFilter === 'all' ? '/sessions' : `/sessions?status=${encodeURIComponent(statusFilter)}`
    const response = await apiRequest(endpoint, {
      method: 'GET',
      headers: buildAuthHeaders(adminToken),
    })

    if (!response.ok) {
      setBookings([])
      setNotice({ type: 'error', text: response.msg || 'Unable to load session bookings.' })
      setLoadingBookings(false)
      return
    }

    setBookings(Array.isArray(response.data?.bookings) ? response.data.bookings : [])
    setNotice({ type: '', text: '' })
    setLoadingBookings(false)
  }

  useEffect(() => {
    if (!adminToken) {
      setNotice({ type: '', text: '' })
      setLoadingBookings(false)
      return
    }

    loadBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, adminToken])

  const handleAdminLoginChange = (event) => {
    const { name, value } = event.target
    setAdminLogin((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdminLogin = async (event) => {
    event.preventDefault()
    setAuthLoading(true)
    const response = await apiRequest('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminLogin),
    })

    if (!response.ok) {
      setNotice({ type: 'error', text: response.msg || 'Admin login failed.' })
      setAuthLoading(false)
      return
    }

    const token = response.data?.token || ''
    localStorage.setItem('adminToken', token)
    setAdminToken(token)
    setNotice({ type: 'success', text: 'Admin login successful. Loading session bookings...' })
    setAuthLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setAdminToken('')
    setBookings([])
    setNotice({ type: '', text: '' })
  }

  const updateBooking = async (id, payload) => {
    setSavingId(id)
    const response = await apiRequest(`/sessions/${id}`, {
      method: 'PUT',
      headers: buildAuthHeaders(adminToken),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setNotice({ type: 'error', text: response.msg || 'Failed to update booking.' })
      setSavingId('')
      return
    }

    setBookings((current) => current.map((item) => (item._id === id ? response.data.booking : item)))
    setNotice({ type: 'success', text: 'Booking updated successfully.' })
    setSavingId('')
  }

  const deleteBooking = async (id) => {
    setSavingId(id)
    const response = await apiRequest(`/sessions/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(adminToken),
    })

    if (!response.ok) {
      setNotice({ type: 'error', text: response.msg || 'Failed to delete booking.' })
      setSavingId('')
      return
    }

    setBookings((current) => current.filter((item) => item._id !== id))
    setNotice({ type: 'success', text: 'Booking deleted successfully.' })
    setSavingId('')
  }

  return (
    <main className="tmh-dashboard-shell tmh-fade-in">
      <TmhSidebar items={sidebarItems} />
      <section className="tmh-dashboard-main space-y-6">
        <motion.header
          className="tmh-panel-head"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Admin Panel</h1>
          <p>Manage users and book-a-session appointments in one unified control center.</p>
        </motion.header>

        {notice.text ? <StateNotice type={notice.type === 'success' ? 'success' : 'error'} message={notice.text} /> : null}

        {!adminToken ? (
          <TmhCard className="space-y-4 p-5">
            <div>
              <h2 className="text-xl font-semibold text-white">Admin Login Required</h2>
              <p className="text-sm text-zinc-400">Log in with admin credentials to manage booking appointments.</p>
            </div>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleAdminLogin}>
              <TmhInput
                id="admin-email"
                label="Admin Email"
                name="email"
                type="email"
                value={adminLogin.email}
                onChange={handleAdminLoginChange}
                required
              />
              <TmhInput
                id="admin-password"
                label="Admin Password"
                name="password"
                type="password"
                value={adminLogin.password}
                onChange={handleAdminLoginChange}
                required
              />
              <div className="md:col-span-2 flex gap-3">
                <TmhButton type="submit" disabled={authLoading}>
                  {authLoading ? 'Signing in...' : 'Login to Admin'}
                </TmhButton>
              </div>
            </form>
          </TmhCard>
        ) : (
          <div className="flex justify-end">
            <TmhButton variant="secondary" onClick={handleLogout}>Logout Admin</TmhButton>
          </div>
        )}

        <TmhCard className="space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="bookings" className="text-xl font-semibold text-white">Booking Management</h2>
              <p className="text-sm text-zinc-400">Review, confirm, reschedule, complete, or cancel incoming booking requests.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-100 outline-none"
              >
                <option value="all">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <TmhButton variant="secondary" onClick={loadBookings}>Refresh</TmhButton>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Total</p>
              <p className="mt-2 text-2xl font-bold text-white">{bookings.length}</p>
            </div>
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Pending</p>
              <p className="mt-2 text-2xl font-bold text-yellow-200">{bookings.filter((booking) => booking.status === 'pending').length}</p>
            </div>
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Confirmed</p>
              <p className="mt-2 text-2xl font-bold text-yellow-200">{bookings.filter((booking) => booking.status === 'confirmed').length}</p>
            </div>
            <div className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Completed</p>
              <p className="mt-2 text-2xl font-bold text-yellow-200">{bookings.filter((booking) => booking.status === 'completed').length}</p>
            </div>
          </div>

          {loadingBookings ? (
            <StateNotice type="loading" message="Loading session bookings..." />
          ) : bookings.length === 0 ? (
            <StateNotice type="empty" message="No session bookings found yet." />
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <motion.article
                  key={booking._id}
                  whileHover={nativeMode ? undefined : { y: -3 }}
                  className="rounded-2xl border border-yellow-400/15 bg-zinc-950/70 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{booking.topic}</h3>
                        <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-200">
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        {booking.instituteName} • {booking.department} • {booking.city}
                      </p>
                      <p className="text-sm text-zinc-300">
                        Contact: {booking.contactName} | {booking.email} | {booking.phone}
                      </p>
                      <p className="text-sm text-zinc-300">
                        {booking.date} at {booking.time} • {booking.duration} • {booking.mode} • {booking.audience}
                      </p>
                      <p className="text-sm text-zinc-400">Expected students: {booking.students}</p>
                      {booking.requirements ? <p className="text-sm text-zinc-400">Requirements: {booking.requirements}</p> : null}
                      {booking.adminNotes ? <p className="text-sm text-yellow-200">Admin notes: {booking.adminNotes}</p> : null}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[320px]">
                      <select
                        value={booking.status}
                        onChange={(event) => updateBooking(booking._id, { status: event.target.value })}
                        disabled={savingId === booking._id}
                        className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-100 outline-none disabled:opacity-50"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Admin notes"
                        defaultValue={booking.adminNotes || ''}
                        onBlur={(event) => {
                          const value = event.target.value.trim()
                          if (value !== (booking.adminNotes || '')) {
                            updateBooking(booking._id, { adminNotes: value })
                          }
                        }}
                        className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-100 outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <TmhButton
                          variant="secondary"
                          disabled={savingId === booking._id}
                          onClick={() => updateBooking(booking._id, { status: 'confirmed' })}
                        >
                          Confirm
                        </TmhButton>
                        <TmhButton
                          variant="secondary"
                          disabled={savingId === booking._id}
                          onClick={() => updateBooking(booking._id, { status: 'rescheduled' })}
                        >
                          Reschedule
                        </TmhButton>
                        <TmhButton
                          variant="secondary"
                          disabled={savingId === booking._id}
                          onClick={() => updateBooking(booking._id, { status: 'completed' })}
                        >
                          Complete
                        </TmhButton>
                        <TmhButton
                          variant="secondary"
                          disabled={savingId === booking._id}
                          onClick={() => updateBooking(booking._id, { status: 'cancelled' })}
                        >
                          Cancel
                        </TmhButton>
                      </div>

                      <TmhButton
                        disabled={savingId === booking._id}
                        onClick={() => deleteBooking(booking._id)}
                        className="w-full"
                      >
                        Delete
                      </TmhButton>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </TmhCard>
      </section>
    </main>
  )
}

export default AdminPanelPage
