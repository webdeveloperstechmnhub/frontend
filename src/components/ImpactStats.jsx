
import geminiLogo from '../assets/gemini.png';


const ImpactStats = () => {
  return (
    <section className="tmh-section tmh-font-body bg-white">
      <div className="tmh-container">
        <div className="tmh-stack">
          <h2 className="tmh-title tmh-font-display">Momentum, You can measure.</h2>
          <p className="tmh-subtitle">
            Real outcomes across campuses and districts, built through student-led action and partner trust.
          </p>
          <div style={{
            margin: '18px 0 0 0',
            background: 'rgba(246,248,250,0.85)',
            borderRadius: 12,
            padding: '14px 20px',
            border: '1px solid #e0e7ef',
            maxWidth: 520,
            boxShadow: '0 2px 8px rgba(30,64,175,0.04)',
            fontSize: 15.5,
            color: '#223',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            <span style={{ color: 'var(--tmh-ocean)', fontWeight: 700 }}>Gemini-powered events:</span>
            <span style={{ display: 'block', marginTop: 6 }}>
              <b>TechStars</b> and <b>TechFront</b> were conducted to inspire, connect, and empower students with hands-on Gemini AI experiences, workshops, and real-world applications—showcasing innovation and collaboration across campuses.
            </span>
          </div>
        </div>

        <div className="tmh-trust">
          <div className="tmh-trust-line">Trusted by educators, student leaders, and local partners.</div>
          <div className="tmh-trust-rail">
            <span>Verified cohorts</span>
            <span>Community-driven</span>
            <span>Outcomes tracked</span>
          </div>
        </div>
      </div>

      <div className="tmh-blob tmh-blob-left" aria-hidden="true" />
      <div className="tmh-blob tmh-blob-right" aria-hidden="true" />
    </section>
  )
}

export default ImpactStats