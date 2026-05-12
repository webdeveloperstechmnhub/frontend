import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TmhButton from './ui/TmhButton'

const Hero = () => {
  const items = useMemo(
    () => [
      { label: 'Verified profiles', value: 'Student-first' },
      { label: 'Institutes onboarded', value: 'Admin-ready' },
      { label: 'Events managed', value: 'Premium flow' },
    ],
    [],
  )

  return (
    <section className="relative flex min-h-[calc(100svh-84px)] w-full flex-col justify-center overflow-hidden bg-[#0D0D0D] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div
        className="absolute inset-0 z-0 opacity-85"
        style={{
          backgroundImage: 'url("/hero-img.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.16),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(212,175,55,0.12),transparent_20%),linear-gradient(135deg,rgba(7,16,18,0.94),rgba(7,16,18,0.8)_46%,rgba(7,16,18,0.96))]" />

      <motion.div
        aria-hidden="true"
        className="absolute left-[-5%] top-[18%] h-72 w-72 rounded-full bg-yellow-400/18 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ type: 'spring', stiffness: 24, damping: 16, mass: 1.05, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-6%] top-[16%] h-96 w-96 rounded-full bg-yellow-500/12 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 16, 0] }}
        transition={{ type: 'spring', stiffness: 20, damping: 14, mass: 1.1, repeat: Infinity, repeatType: 'mirror' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-12 xl:max-w-7xl">
        <div className="max-w-3xl lg:pr-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="inline-flex items-center rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200"
          >
            Empowering the next generation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.05 }}
            className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block text-yellow-300 [text-shadow:0_0_18px_rgba(212,175,55,0.35)]">TechMNHub</span>
            <span className="mt-3 block text-balance text-white">
              Futuristic events, verified student growth, and institute operations in one premium system.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
            className="mt-6 max-w-2xl text-sm leading-7 text-[#A0A0A0] sm:text-base md:text-lg md:leading-8"
          >
            We help students build credibility, help institutes manage engagement, and help event teams deliver polished
            experiences with clarity, speed, and confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <TmhButton className="w-full min-w-[160px] sm:min-w-[190px]">Join as Student</TmhButton>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <TmhButton variant="secondary" className="w-full min-w-[160px] sm:min-w-[190px]">Partner with Us</TmhButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3 text-sm text-[#A0A0A0]"
          >
            <span className="rounded-full border border-yellow-400/20 bg-[#111111]/70 px-4 py-2">Verified profiles</span>
            <span className="rounded-full border border-yellow-400/20 bg-[#111111]/70 px-4 py-2">Event journeys</span>
            <span className="rounded-full border border-yellow-400/20 bg-[#111111]/70 px-4 py-2">Institute dashboards</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.12 }}
          className="relative w-full max-w-[520px] justify-self-center lg:max-w-[500px] lg:justify-self-end xl:max-w-[540px]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-yellow-400/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-[#0D0D0D]/75 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_30%),linear-gradient(160deg,rgba(212,175,55,0.03),transparent_40%)]" />
            <div className="relative grid gap-4">
              <div className="rounded-2xl border border-yellow-400/15 bg-[#111111] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-yellow-200">Live ecosystem</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Students. Institutes. Events.</h3>
                <p className="mt-2 text-sm leading-6 text-[#A0A0A0]">
                  A focused experience designed for clarity, trust, and momentum from first visit to long-term engagement.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-yellow-400/15 bg-[#111111]/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A0A0A0]">Student flow</p>
                  <p className="mt-2 text-lg font-semibold text-yellow-200">Profiles, certificates, leaderboard</p>
                </div>
                <div className="rounded-2xl border border-yellow-400/15 bg-[#111111]/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A0A0A0]">Institute flow</p>
                  <p className="mt-2 text-lg font-semibold text-yellow-200">Students, activities, analytics</p>
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-400/15 bg-[#111111]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#A0A0A0]">Built for</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Students', 'Institutes', 'Coordinators', 'Event teams'].map((item) => (
                    <span key={item} className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.section
        className="relative z-10 mx-auto mt-12 grid w-full max-w-6xl gap-3 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-4 xl:max-w-7xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      >
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-yellow-400/15 bg-[#0D0D0D]/70 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.22em] text-[#A0A0A0]">{item.label}</p>
            <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </motion.section>
    </section>
  )
}

export default Hero
