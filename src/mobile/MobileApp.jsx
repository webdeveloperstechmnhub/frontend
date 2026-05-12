import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bolt, Compass, House, Bell, UserRound } from 'lucide-react'
import BottomTabBar from './components/BottomTabBar'
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import ActionScreen from './screens/ActionScreen'
import ActivityScreen from './screens/ActivityScreen'
import ProfileScreen from './screens/ProfileScreen'

const tabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'action', label: 'Action', icon: Bolt },
  { id: 'activity', label: 'Activity', icon: Bell },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

const screenVariants = {
  enter: { opacity: 0, x: 18 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -18 },
}

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home')

  const ActiveScreen = useMemo(() => {
    if (activeTab === 'home') return HomeScreen
    if (activeTab === 'explore') return ExploreScreen
    if (activeTab === 'action') return ActionScreen
    if (activeTab === 'activity') return ActivityScreen
    return ProfileScreen
  }, [activeTab])

  return (
    <div className="tmh-mobile-root">
      <div className="tmh-mobile-device-frame">
        <div className="tmh-mobile-status-glow" aria-hidden="true" />

        <main className="tmh-mobile-content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={activeTab}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="tmh-mobile-screen"
            >
              <ActiveScreen />
            </motion.section>
          </AnimatePresence>
        </main>

        <BottomTabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  )
}

export default MobileApp
