import React from 'react'
import GlowCard from './GlowCard'

const TmhCard = ({ className = '', children, floating = true, pulse = false }) => {
  return (
    <GlowCard className={`tmh-card-surface ${className}`.trim()} floating={floating} pulse={pulse}>
      {children}
    </GlowCard>
  )
}

export default TmhCard
