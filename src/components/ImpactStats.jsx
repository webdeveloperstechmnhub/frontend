import { MotionItem, MotionSection } from './ui/MotionSystem'

const defaultContent = {
  title: 'Momentum, You can measure.',
  subtitle: 'Real outcomes across campuses and districts, built through student-led action and partner trust.',
  note:
    'Gemini-powered events: TechStars and TechFront were conducted to inspire, connect, and empower students with hands-on Gemini AI experiences, workshops, and real-world applications, showcasing innovation and collaboration across campuses.',
  trustLine: 'Trusted by educators, student leaders, and local partners.',
  trustRail: ['Verified cohorts', 'Community-driven', 'Outcomes tracked'],
}

const ImpactStats = ({ content }) => {
  const section = content || defaultContent

  return (
    <MotionSection className="tmh-section tmh-font-body bg-[#111111]">
      <div className="tmh-container">
        <MotionItem className="tmh-stack">
          <h2 className="tmh-title tmh-font-display">{section.title}</h2>
          <p className="tmh-subtitle">{section.subtitle}</p>
          <MotionItem
            hover
            style={{
              margin: '18px 0 0 0',
              background: '#111111',
              borderRadius: 12,
              padding: '14px 20px',
              border: '1px solid rgba(212,175,55,0.22)',
              maxWidth: 520,
              boxShadow: '0 0 22px rgba(212,175,55,0.08)',
              fontSize: 15.5,
              color: '#FFFFFF',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: 'var(--tmh-ocean)', fontWeight: 700 }}>Highlights:</span>
            <span style={{ display: 'block', marginTop: 6 }}>{section.note}</span>
          </MotionItem>
        </MotionItem>

        <MotionItem className="tmh-trust">
          <div className="tmh-trust-line">{section.trustLine}</div>
          <div className="tmh-trust-rail">
            {(section.trustRail || defaultContent.trustRail).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </MotionItem>
      </div>

      <div className="tmh-blob tmh-blob-left" aria-hidden="true" />
      <div className="tmh-blob tmh-blob-right" aria-hidden="true" />
    </MotionSection>
  )
}

export default ImpactStats
