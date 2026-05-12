import React from 'react'
import GlowButton from './GlowButton'

const TmhButton = ({ variant = 'primary', className = '', type = 'button', children, ...props }) => {
  return (
    <GlowButton type={type} variant={variant} className={className} {...props}>
      {children}
    </GlowButton>
  )
}

export default TmhButton
