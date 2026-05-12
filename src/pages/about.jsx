import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'
import GlowButton from '../components/ui/GlowButton'

const focusAreas = [
  {
    title: 'Community Collaboration',
    description: 'Partnering with student communities and innovation networks to build stronger local tech ecosystems.',
  },
  {
    title: 'Skill Development',
    description: 'Workshops, practical sessions, and live projects designed for real-world readiness.',
  },
  {
    title: 'Innovation Challenges',
    description: 'Hackathons and guided problem-solving tracks to convert ideas into working outcomes.',
  },
  {
    title: 'Mentorship Network',
    description: 'Connecting learners with founders, professionals, and domain experts for guidance.',
  },
]

const About = () => {
  return (
    <PageScaffold>
      <SectionWrapper
        className="pb-10"
        title="About TechMNHub"
        subtitle="A startup-driven technology ecosystem empowering students through opportunities, mentorship, and collaborative growth."
      >
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <GlowCard className="p-6" floating={false} hoverScale={1.01}>
            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">Mission</p>
            <p className="mt-3 text-white">
              We help learners and early-stage professionals access practical tech exposure through events, projects,
              communities, and mentorship.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#D4AF37]">Vision</p>
            <p className="mt-3 text-white">
              Build an inclusive technology ecosystem where creators can collaborate, build meaningful products, and grow sustainably.
            </p>
          </GlowCard>

          <GlowCard className="flex flex-col items-center justify-center gap-4 p-6 text-center" floating={false} hoverScale={1.01}>
            <img
              src={assets.logo}
              alt="TechMNHub logo"
              className="h-24 w-24 rounded-full border border-[#D4AF37]/45 object-cover shadow-[0_0_26px_rgba(212,175,55,0.24)]"
            />
            <h2 className="text-2xl font-bold tracking-[0.12em] text-white">TechMNHub</h2>
            <p className="text-sm text-[#A0A0A0]">Students. Institutions. Innovators. One connected growth platform.</p>
          </GlowCard>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Core Focus Areas" subtitle="Everything we build is centered around practical impact and learner outcomes.">
        <div className="grid gap-4 md:grid-cols-2">
          {focusAreas.map((area, index) => (
            <GlowCard key={area.title} className="p-5" floating={false} hoverScale={1.015}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="text-lg font-semibold text-white"
              >
                {area.title}
              </motion.p>
              <p className="mt-2 text-sm leading-6 text-[#A0A0A0]">{area.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Signature Events" subtitle="Our flagship event series in collaboration with AI-first learning initiatives.">
        <div className="grid gap-5 md:grid-cols-2">
          <GlowCard className="p-5" floating={false}>
            <img src="/tech-stars.jpg" alt="TechStars event" className="h-44 w-full rounded-xl object-cover" />
            <h3 className="mt-4 text-xl font-semibold text-white">TechStars</h3>
            <p className="mt-2 text-sm text-[#A0A0A0]">
              Interactive sessions, challenge rounds, and AI-powered activities focused on real learning outcomes.
            </p>
            <Link to="/techstars" className="mt-4 inline-flex">
              <GlowButton className="px-4 py-2" type="button">Know More</GlowButton>
            </Link>
          </GlowCard>

          <GlowCard className="p-5" floating={false}>
            <img src="/tech-front.gif" alt="TechFront event" className="h-44 w-full rounded-xl object-cover" />
            <h3 className="mt-4 text-xl font-semibold text-white">TechFront</h3>
            <p className="mt-2 text-sm text-[#A0A0A0]">
              Summit-style event experience bringing together students, faculty, and innovators around AI and product thinking.
            </p>
            <Link to="/techfront" className="mt-4 inline-flex">
              <GlowButton className="px-4 py-2" type="button">Know More</GlowButton>
            </Link>
          </GlowCard>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Leadership" subtitle="Led by builders passionate about creating opportunities for every learner.">
        <div className="grid gap-5 md:grid-cols-2">
          <GlowCard className="flex flex-col items-center p-6 text-center" floating={false}>
            <img src={assets.nikhil_tomar} alt="Nikhil Tomar" className="h-28 w-28 rounded-full object-cover" />
            <h3 className="mt-3 text-xl font-semibold text-white">Nikhil Tomar</h3>
            <p className="text-sm text-[#A0A0A0]">Founder & CEO</p>
          </GlowCard>
          <GlowCard className="flex flex-col items-center p-6 text-center" floating={false}>
            <img src={assets.madhav_katyayan} alt="Madhav Katyayan" className="h-28 w-28 rounded-full object-cover" />
            <h3 className="mt-3 text-xl font-semibold text-white">Madhav Katyayan</h3>
            <p className="text-sm text-[#A0A0A0]">Co-Founder & COO</p>
          </GlowCard>
        </div>
      </SectionWrapper>
    </PageScaffold>
  )
}

export default About
