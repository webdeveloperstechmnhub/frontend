import { Link } from 'react-router-dom'

const FinalCTA = () => {
  return (
    <section className="tmh-section tmh-font-body tmh-cta">
      <div className="tmh-container tmh-cta-inner">
        <div>
          <h2 className="tmh-title tmh-font-display tmh-cta-title">
            You are not joining a website. You are joining India's Student Skill Operating System.
          </h2>
          <p className="tmh-subtitle tmh-cta-subtitle">
            Build skills, lead chapters, and put student potential at the center of the ecosystem.
          </p>
        </div>
        <div className="tmh-cta-actions">
          <Link className="tmh-btn tmh-btn-primary" to="/join">Join TechMNHub</Link>
          <Link className="tmh-btn tmh-btn-ghost" to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA