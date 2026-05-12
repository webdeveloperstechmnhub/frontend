import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MotionItem, MotionSection } from './MotionSystem'

const TmhSidebar = ({ title = 'TechMNHub', items = [] }) => {
  const location = useLocation()

  return (
    <MotionSection as="aside" className="tmh-sidebar">
      <MotionItem>
        <p className="tmh-sidebar-brand">{title}</p>
        <p className="tmh-sidebar-sub">Premium Console</p>
      </MotionItem>

      <nav className="tmh-sidebar-nav">
        {items.map((item) => {
          const active = location.pathname === item.to
          return (
            <MotionItem as={Link} hover key={item.to} to={item.to} className={`tmh-sidebar-link ${active ? 'active' : ''}`}>
              {item.label}
            </MotionItem>
          )
        })}
      </nav>
    </MotionSection>
  )
}

export default TmhSidebar
