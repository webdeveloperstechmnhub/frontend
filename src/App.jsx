import { Link, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Home from './pages/Home'
import Join from './pages/Join'
import Contact from './pages/Contact'
import About from './pages/about'
import TechStars from './pages/TechStars'
import TechFront from './pages/TechFront'
import BookSession from './pages/BookSession'
import RegistrationForm from './pages/RegistrationForm'
import SummerCampRegistrationForm from './pages/SummerCampRegistrationForm'
import EventRegistrationRoute from './pages/EventRegistrationRoute'
import SummerCampSuccess from './pages/SummerCampSuccess'
import ZonexRegistration from './pages/RegistrationForm'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import CodeofConduct from './pages/CodeofConduct'
import Legal from './pages/Legal'
import EmployeeCard from './pages/EmployeeCard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentSignup from './pages/StudentSignup'
import DashboardPage from './pages/premium/DashboardPage'
import ProfileCardPage from './pages/premium/ProfileCardPage'
import AdminPanelPage from './pages/premium/AdminPanelPage'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentActivities from './pages/student/StudentActivities'
import StudentLeaderboard from './pages/student/StudentLeaderboard'
import StudentCertificates from './pages/student/StudentCertificates'
import StudentProfile from './pages/student/StudentProfile'
import InstituteDashboard from './pages/institute/InstituteDashboard'
import InstituteStudents from './pages/institute/InstituteStudents'
import InstituteActivities from './pages/institute/InstituteActivities'
import InstituteAnalytics from './pages/institute/InstituteAnalytics'
import InstituteReports from './pages/institute/InstituteReports'
import ProtectedRoute from './components/auth/ProtectedRoute'

const App = () => {
  const location = useLocation()

  const isExternalPage = (pathname) => {
    if (pathname === '/') return false
    if (pathname === '/login' || pathname === '/signup') return false
    if (pathname.startsWith('/student')) return false
    if (pathname.startsWith('/institute')) return false
    if (pathname === '/admin' || pathname === '/dashboard' || pathname === '/profile-card') return false
    return true
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.7 }}>
    <div className="relative min-h-screen overflow-x-hidden">
      {isExternalPage(location.pathname) && (
        <Link
          to="/"
          className="fixed left-4 top-4 z-50 inline-flex items-center rounded-full border border-yellow-300/30 bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/30 backdrop-blur-sm transition hover:bg-yellow-400 hover:text-black"
        >
          Back to home
        </Link>
      )}
      <motion.div
        aria-hidden="true"
        className="tmh-animated-bg"
        animate={{ opacity: [0.94, 1, 0.95], scale: [1, 1.012, 1] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="tmh-depth-layer tmh-depth-layer-a"
        animate={{ x: [0, 14, 0], y: [0, -10, 0], scale: [1, 1.035, 1], opacity: [0.24, 0.34, 0.24] }}
        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="tmh-depth-layer tmh-depth-layer-b"
        animate={{ x: [0, -16, 0], y: [0, 12, 0], scale: [1, 1.04, 1], opacity: [0.22, 0.32, 0.22] }}
        transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.975, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -14 }}
            transition={{ type: 'spring', stiffness: 170, damping: 22, mass: 0.72 }}
            className="tmh-page-transition"
          >
            <Routes location={location}>
              <Route path='/' element={<Home />} />
              <Route path='/join' element={<Join />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/techstars' element={<TechStars />} />
              <Route path='/techfront' element={<TechFront />} />
              <Route path='/book-session' element={<BookSession />} />
              <Route path='/registration-form' element={<RegistrationForm />} />
              <Route path='/summer-camp-registration' element={<SummerCampRegistrationForm />} />
              <Route path='/summer-camp-success' element={<SummerCampSuccess />} />
              <Route path='/registration-form/:eventId' element={<EventRegistrationRoute />} />
              <Route path='/zonex-registration' element={<ZonexRegistration />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-of-use' element={<TermsOfUse />} />
              <Route path='/code-of-conduct' element={<CodeofConduct />} />
              <Route path='/accessibility' element={<Legal />} />
              <Route path='/employee-card' element={<EmployeeCard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/student-signup' element={<StudentSignup />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/profile-card' element={<ProfileCardPage />} />
              <Route path='/admin' element={<AdminPanelPage />} />
              <Route path='/student/dashboard' element={<ProtectedRoute role='student'><StudentDashboard /></ProtectedRoute>} />
              <Route path='/student/activities' element={<ProtectedRoute role='student'><StudentActivities /></ProtectedRoute>} />
              <Route path='/student/leaderboard' element={<ProtectedRoute role='student'><StudentLeaderboard /></ProtectedRoute>} />
              <Route path='/student/certificates' element={<ProtectedRoute role='student'><StudentCertificates /></ProtectedRoute>} />
              <Route path='/student/profile' element={<ProtectedRoute role='student'><StudentProfile /></ProtectedRoute>} />
              <Route path='/institute/dashboard' element={<ProtectedRoute role='institute'><InstituteDashboard /></ProtectedRoute>} />
              <Route path='/institute/students' element={<ProtectedRoute role='institute'><InstituteStudents /></ProtectedRoute>} />
              <Route path='/institute/activities' element={<ProtectedRoute role='institute'><InstituteActivities /></ProtectedRoute>} />
              <Route path='/institute/analytics' element={<ProtectedRoute role='institute'><InstituteAnalytics /></ProtectedRoute>} />
              <Route path='/institute/reports' element={<ProtectedRoute role='institute'><InstituteReports /></ProtectedRoute>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </MotionConfig>
  )
}

export default App
