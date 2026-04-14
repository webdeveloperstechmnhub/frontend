import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatIsTechMNHub from '../components/WhatIsTechMNHub'
import WhoIsItFor from '../components/WhoIsItFor'
import SkillEcosystem from '../components/SkillEcosystem'
import UpcomingEvents from '../components/UpcomingEvents'
import ImpactStats from '../components/ImpactStats'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import MediaAndRecognition from '../components/MediaAndRecognition'

const useIsMobileHome = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false

    return (
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    )
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const coarseQuery = window.matchMedia('(pointer: coarse)')

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches || coarseQuery.matches)
    }

    updateIsMobile()

    mediaQuery.addEventListener?.('change', updateIsMobile)
    coarseQuery.addEventListener?.('change', updateIsMobile)

    return () => {
      mediaQuery.removeEventListener?.('change', updateIsMobile)
      coarseQuery.removeEventListener?.('change', updateIsMobile)
    }
  }, [])

  return isMobile
}


const Home = () => {
  const isMobileHome = useIsMobileHome()

  if (isMobileHome) {
    return (
      <div className="min-h-screen bg-[#020202] text-white">
        <Navbar />

        <main className="px-5 pt-28 pb-12">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">TechMNHub</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white">
              We don&apos;t just plan events, we create experiences.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/72">
              A lightweight mobile view optimized for speed. Open the full website on a laptop or desktop for the complete experience.
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                to="/join"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-transform active:scale-[0.98]"
              >
                Join as Student
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-base font-bold text-white transition-transform active:scale-[0.98]"
              >
                Partner with Us
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div>
        <Navbar />
        
        {/* ID for Home */}
        <div id="home">
          <Hero />
        </div>

        <WhatIsTechMNHub />
        
        <WhoIsItFor />
        <SkillEcosystem />

        {/* ID for Events */}
        <div id="events">
          <UpcomingEvents />
        </div>

        <ImpactStats />

        {/* ID for Media */}
        <div id="media">
          <MediaAndRecognition />
        </div>

        <FinalCTA />
        <Footer />
    </div>
  )
}

export default Home;















