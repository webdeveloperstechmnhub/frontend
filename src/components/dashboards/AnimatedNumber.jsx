import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

const AnimatedNumber = ({ value, duration = 1, suffix = '' }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.9, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [value, duration])

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export default AnimatedNumber
