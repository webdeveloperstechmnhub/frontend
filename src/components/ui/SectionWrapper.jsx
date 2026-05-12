import { MotionItem, MotionSection } from './MotionSystem'

const SectionWrapper = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  contentClassName = '',
  maxWidth = 'max-w-6xl',
}) => {
  return (
    <MotionSection id={id} className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`.trim()}>
      <MotionItem
        className={`mx-auto w-full ${maxWidth} ${contentClassName}`.trim()}
      >
        {(title || subtitle) && (
          <div className="mb-8">
            {title ? <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2> : null}
            {subtitle ? <p className="mt-3 max-w-3xl text-[#A0A0A0]">{subtitle}</p> : null}
          </div>
        )}
        {children}
      </MotionItem>
    </MotionSection>
  )
}

export default SectionWrapper
