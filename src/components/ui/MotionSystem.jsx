import { motion } from 'framer-motion'
import { useMemo } from 'react'

export const tmhSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 22,
  mass: 0.7,
}

export const tmhContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
}

export const tmhItem = {
  hidden: { opacity: 0, y: 22, scale: 0.985, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: tmhSpring,
  },
}

export const tmhHover = {
  y: -5,
  scale: 1.015,
  boxShadow: '0 18px 46px rgba(0,0,0,0.45), 0 0 26px rgba(212,175,55,0.14)',
  transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.55 },
}

export const MotionSection = ({ as = 'section', className = '', children, ...props }) => {
  const Component = useMemo(
    () => (typeof as === 'string' ? motion[as] || motion.section : motion.create(as)),
    [as],
  )

  return (
    <Component
      variants={tmhContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

export const MotionItem = ({ as = 'div', className = '', hover = false, children, ...props }) => {
  const Component = useMemo(
    () => (typeof as === 'string' ? motion[as] || motion.div : motion.create(as)),
    [as],
  )

  return (
    <Component
      variants={tmhItem}
      whileHover={hover ? tmhHover : undefined}
      whileTap={hover ? { scale: 0.985, y: 1 } : undefined}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
