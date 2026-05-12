import { Link } from 'react-router-dom'
import { MotionItem, MotionSection } from './ui/MotionSystem'

const defaultContent = {
  title: 'You are not joining a website. You are joining India\'s Student Skill Operating System.',
  subtitle: 'Build skills, lead chapters, and put student potential at the center of the ecosystem.',
  actions: [
    { label: 'Join TechMNHub', to: '/signup', variant: 'primary' },
    { label: 'Book a Session', to: '/book-session', variant: 'secondary' },
    { label: 'Contact Us', to: '/contact', variant: 'ghost' },
  ],
}

const actionClass = {
  primary: 'tmh-btn tmh-btn-primary',
  secondary: 'tmh-btn tmh-btn-ghost',
  ghost: 'tmh-btn tmh-btn-ghost',
}

const FinalCTA = ({ content }) => {
  const section = content || defaultContent

  return (
    <MotionSection className="tmh-section tmh-font-body tmh-cta">
      <div className="tmh-container tmh-cta-inner">
        <MotionItem>
          <h2 className="tmh-title tmh-font-display tmh-cta-title">
            {section.title}
          </h2>
          <p className="tmh-subtitle tmh-cta-subtitle">
            {section.subtitle}
          </p>
        </MotionItem>
        <MotionItem className="tmh-cta-actions">
          {(section.actions || defaultContent.actions).map((action) => (
            <MotionItem
              key={action.label}
              as={Link}
              hover
              className={actionClass[action.variant] || actionClass.secondary}
              to={action.to}
            >
              {action.label}
            </MotionItem>
          ))}
        </MotionItem>
      </div>
    </MotionSection>
  )
}

export default FinalCTA
