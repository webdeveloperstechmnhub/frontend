import { useEffect, useState } from 'react'
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
import { apiRequest } from '../utils/api'


const Home = () => {
  const [homepageContent, setHomepageContent] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadHomepageContent = async () => {
      const response = await apiRequest('/site/homepage')
      if (mounted && response.ok) {
        setHomepageContent(response.data)
      }
    }

    loadHomepageContent()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="tmh-page-shell">
        <Navbar />
        <div className="tmh-content-offset">
        {/* ID for Home */}
        <div id="home">
          <Hero content={homepageContent?.hero} />
        </div>

        <WhatIsTechMNHub content={homepageContent?.whatIsTechMNHub} />
        
        <WhoIsItFor content={homepageContent?.whoIsItFor} />
        <SkillEcosystem content={homepageContent?.skillEcosystem} />

        {/* ID for Events */}
        <div id="events">
          <UpcomingEvents content={homepageContent?.upcomingEvents} />
        </div>

        <ImpactStats content={homepageContent?.impactStats} />

        {/* ID for Media */}
        <div id="media">
          <MediaAndRecognition content={homepageContent?.mediaAndRecognition} />
        </div>

        <FinalCTA content={homepageContent?.finalCta} />
        <Footer />
        </div>
    </div>
  )
}

export default Home;















