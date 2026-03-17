const logoNames = ['Campus Daily', 'STEM Spark', 'Youth Works', 'City Pulse', 'EdTech Wire', 'Local Lens']

const MediaAndRecognition = () => {
  return (
    <section className="tmh-section tmh-font-body tmh-media">
      <div className="tmh-container">
        <div className="tmh-stack">
          <h2 className="tmh-title tmh-font-display">Featured across the student innovation map.</h2>
          <p className="tmh-subtitle">
            Press highlights, community spotlights, and the stories that push student talent into
            the mainstream.
          </p>
        </div>

        <div className="tmh-logo-grid">
          {logoNames.map((name) => (
            <div key={name} className="tmh-logo-tile">
              <span>{name}</span>
            </div>
          ))}
        </div>

        <div className="tmh-gallery">
          <div className="tmh-gallery-card">
            <img
              className="tmh-gallery-image"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Students collaborating at a workshop"
            />
            <div>
              <div className="tmh-gallery-title">State summit showcase</div>
              <div className="tmh-gallery-meta">Gallery preview</div>
            </div>
          </div>
          <div className="tmh-gallery-card">
            <img
              className="tmh-gallery-image tmh-gallery-image-alt"
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              alt="Team presenting a project"
            />
            <div>
              <div className="tmh-gallery-title">Skill sprint finale</div>
              <div className="tmh-gallery-meta">Gallery preview</div>
            </div>
          </div>
          <div className="tmh-gallery-card">
            <img
              className="tmh-gallery-image"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
              alt="Students networking at an event"
            />
            <div>
              <div className="tmh-gallery-title">District demo day</div>
              <div className="tmh-gallery-meta">Gallery preview</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaAndRecognition