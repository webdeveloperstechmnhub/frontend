import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = ['AI', 'Events', 'Hackathons', 'Mentors', 'Internships', 'Communities']

const cards = [
  { title: 'Neural UI Sprint', tag: 'Hackathon', meta: 'Starts in 2 days' },
  { title: 'Prompt Engineering Lab', tag: 'AI', meta: 'Live cohort' },
  { title: 'Campus Builder Program', tag: 'Community', meta: 'Applications open' },
]

const ExploreScreen = () => {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('AI')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return cards.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q)
      const tagMatch = item.tag.toLowerCase().includes(q)
      return titleMatch || tagMatch
    })
  }, [search])

  return (
    <div className="tmh-screen-shell">
      <header className="tmh-screen-header">
        <p className="tmh-screen-overline">Explore</p>
        <h1 className="tmh-screen-title">Discover Opportunities</h1>
      </header>

      <div className="tmh-search-wrap">
        <Search size={18} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, topic, event..."
          className="tmh-search-input"
        />
      </div>

      <div className="tmh-chip-row">
        {categories.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`tmh-chip ${active === chip ? 'is-active' : ''}`}
            onClick={() => setActive(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <section className="tmh-scroll-cards">
        {filtered.map((item) => (
          <motion.article key={item.title} className="tmh-explore-card" whileTap={{ y: 1 }}>
            <span className="tmh-card-pill">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

export default ExploreScreen
