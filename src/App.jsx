import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Join from './pages/Join'
import Contact from './pages/Contact'
import About from './pages/about'
import TechStars from './pages/TechStars'
import TechFront from './pages/TechFront'
import RegistrationForm from './pages/RegistrationForm'
import ZonexRegistration from './pages/RegistrationForm'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import CodeofConduct from './pages/CodeofConduct'
import Legal from './pages/Legal'
const EmployeeCard = lazy(() => import('./pages/EmployeeCard'))

const App = () => {
  const location = useLocation()

  return (
    <div>
      <div className="tmh-page-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/join' element={<Join />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/techstars' element={<TechStars />} />
          <Route path='/techfront' element={<TechFront />} />
          <Route path='/registration-form' element={<RegistrationForm />} />
          <Route path='/registration-form/:eventId' element={<RegistrationForm />} />
          <Route path='/zonex-registration' element={<ZonexRegistration />} />
           <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-of-use' element={<TermsOfUse />} />
          <Route path='/code-of-conduct' element={<CodeofConduct />} />
          <Route path='/accessibility' element={<Legal />} />
          <Route
            path='/employee-card'
            element={(
              <Suspense fallback={<div className="employee-state">Loading employee card...</div>}>
                <EmployeeCard />
              </Suspense>
            )}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
