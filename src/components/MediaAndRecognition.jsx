import { MotionItem, MotionSection } from './ui/MotionSystem'

const defaultContent = {
  title: 'Featured across the student innovation map.',
  subtitle: 'Press highlights, community spotlights, and the stories that push student talent into the mainstream.',
  logos: ['Campus Daily', 'STEM Spark', 'Youth Works', 'City Pulse', 'EdTech Wire', 'Local Lens'],
  gallery: [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    alt: 'Students collaborating at a workshop',
    title: 'State summit showcase',
    className: 'tmh-gallery-image',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    alt: 'Team presenting a project',
    title: 'Skill sprint finale',
    className: 'tmh-gallery-image tmh-gallery-image-alt',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    alt: 'Students networking at an event',
    title: 'District demo day',
    className: 'tmh-gallery-image',
  },
  ],
}

const MediaAndRecognition = ({ content }) => {
  const section = content || defaultContent

  return (
    <MotionSection className="tmh-section tmh-font-body tmh-media">
      <div className="tmh-container">
        <MotionItem className="tmh-stack">
          <h2 className="tmh-title tmh-font-display">{section.title}</h2>
          <p className="tmh-subtitle">{section.subtitle}</p>
        </MotionItem>

        <div className="tmh-logo-grid">
          {(section.logos || defaultContent.logos).map((name) => (
            <MotionItem key={name} hover className="tmh-logo-tile">
              <span>{name}</span>
            </MotionItem>
          ))}
        </div>

        <div className="tmh-gallery">
          {(section.gallery || defaultContent.gallery).map((item) => (
            <MotionItem key={item.title} hover className="tmh-gallery-card">
              <img className={item.className} src={item.src} alt={item.alt} />
              <div>
                <div className="tmh-gallery-title">{item.title}</div>
                <div className="tmh-gallery-meta">Gallery preview</div>
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}

export default MediaAndRecognition
