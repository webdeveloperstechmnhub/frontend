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


const Home = () => {
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















