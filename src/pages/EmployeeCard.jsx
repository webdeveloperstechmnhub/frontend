import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './EmployeeCard.css'

const FIRE_PARTICLES = [
  { type: '', vars: { '--x': '4%', '--size': '6px', '--dur': '5.9s', '--delay': '-0.8s', '--drift': '14px', '--path': 'riseA', '--flicker': '2.1s' } },
  { type: 'medium', vars: { '--x': '9%', '--size': '10px', '--dur': '7.1s', '--delay': '-3.9s', '--drift': '-20px', '--path': 'riseB', '--flicker': '3.3s' } },
  { type: 'deep', vars: { '--x': '12%', '--size': '16px', '--dur': '9.8s', '--delay': '-2.4s', '--drift': '26px', '--path': 'riseC', '--flicker': '4.4s' } },
  { type: 'glow', vars: { '--x': '16%', '--size': '13px', '--dur': '8.2s', '--delay': '-1.2s', '--drift': '-16px', '--path': 'riseB', '--flicker': '2.9s' } },
  { type: '', vars: { '--x': '21%', '--size': '7px', '--dur': '5.4s', '--delay': '-5.2s', '--drift': '11px', '--path': 'riseA', '--flicker': '2.5s' } },
  { type: 'medium', vars: { '--x': '25%', '--size': '9px', '--dur': '6.7s', '--delay': '-4.5s', '--drift': '19px', '--path': 'riseC', '--flicker': '3.1s' } },
  { type: 'deep', vars: { '--x': '29%', '--size': '15px', '--dur': '10.2s', '--delay': '-0.7s', '--drift': '-24px', '--path': 'riseB', '--flicker': '4.2s' } },
  { type: 'glow', vars: { '--x': '33%', '--size': '14px', '--dur': '8.7s', '--delay': '-6.1s', '--drift': '21px', '--path': 'riseA', '--flicker': '3.8s' } },
  { type: '', vars: { '--x': '38%', '--size': '8px', '--dur': '5.8s', '--delay': '-3.1s', '--drift': '-13px', '--path': 'riseB', '--flicker': '2.4s' } },
  { type: 'medium', vars: { '--x': '43%', '--size': '11px', '--dur': '7.4s', '--delay': '-1.9s', '--drift': '18px', '--path': 'riseC', '--flicker': '3.5s' } },
  { type: 'deep', vars: { '--x': '47%', '--size': '18px', '--dur': '11.1s', '--delay': '-7.3s', '--drift': '-28px', '--path': 'riseA', '--flicker': '5.2s' } },
  { type: 'glow', vars: { '--x': '51%', '--size': '15px', '--dur': '9.3s', '--delay': '-2.8s', '--drift': '24px', '--path': 'riseB', '--flicker': '3.6s' } },
  { type: '', vars: { '--x': '55%', '--size': '7px', '--dur': '5.2s', '--delay': '-4.1s', '--drift': '-15px', '--path': 'riseA', '--flicker': '2.2s' } },
  { type: 'medium', vars: { '--x': '60%', '--size': '10px', '--dur': '6.9s', '--delay': '-0.9s', '--drift': '14px', '--path': 'riseC', '--flicker': '2.8s' } },
  { type: 'deep', vars: { '--x': '64%', '--size': '16px', '--dur': '10.6s', '--delay': '-5.8s', '--drift': '-22px', '--path': 'riseB', '--flicker': '4.8s' } },
  { type: 'glow', vars: { '--x': '68%', '--size': '13px', '--dur': '8.5s', '--delay': '-6.6s', '--drift': '19px', '--path': 'riseA', '--flicker': '3.4s' } },
  { type: '', vars: { '--x': '72%', '--size': '6px', '--dur': '5.6s', '--delay': '-2.2s', '--drift': '17px', '--path': 'riseB', '--flicker': '2.6s' } },
  { type: 'medium', vars: { '--x': '77%', '--size': '9px', '--dur': '6.4s', '--delay': '-3.9s', '--drift': '-17px', '--path': 'riseC', '--flicker': '3.2s' } },
  { type: 'deep', vars: { '--x': '80%', '--size': '17px', '--dur': '10.8s', '--delay': '-1.4s', '--drift': '27px', '--path': 'riseA', '--flicker': '4.6s' } },
  { type: 'glow', vars: { '--x': '84%', '--size': '16px', '--dur': '9.6s', '--delay': '-4.9s', '--drift': '-21px', '--path': 'riseB', '--flicker': '3.9s' } },
  { type: '', vars: { '--x': '88%', '--size': '8px', '--dur': '5.7s', '--delay': '-0.6s', '--drift': '13px', '--path': 'riseA', '--flicker': '2.3s' } },
  { type: 'medium', vars: { '--x': '92%', '--size': '10px', '--dur': '6.8s', '--delay': '-5.1s', '--drift': '16px', '--path': 'riseC', '--flicker': '2.9s' } },
  { type: 'deep', vars: { '--x': '95%', '--size': '14px', '--dur': '9.9s', '--delay': '-2.7s', '--drift': '-18px', '--path': 'riseB', '--flicker': '4.1s' } },
  { type: 'glow', vars: { '--x': '98%', '--size': '12px', '--dur': '8.1s', '--delay': '-6.4s', '--drift': '15px', '--path': 'riseA', '--flicker': '3.7s' } },
]

const FALLBACK_EMPLOYEE = {
  name: 'Name',
  empId: 'ID',
  designation: 'designation',
  department: 'department',
}

const resolveBackendBase = () => {
  const direct = String(import.meta.env.VITE_BACKEND_URL || '').trim()
  const api = String(import.meta.env.VITE_API_URL || '').trim()
  return direct || api || 'http://localhost:5001/api'
}

const safeText = (value, fallback = 'N/A') => {
  const v = String(value || '').trim()
  return v || fallback
}

const setTiltStyles = (shell, tiltX, tiltY) => {
  const tiltMagnitude = Math.min(1, (Math.abs(tiltX) + Math.abs(tiltY)) / 13)
  const badgeDepth = 82 - tiltMagnitude * 52
  const badgeGlow = 0.52 - tiltMagnitude * 0.14
  const cardGlow = 0.18 + tiltMagnitude * 0.16
  const cardGlowHover = Math.min(0.52, cardGlow + 0.12)

  shell.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
  shell.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
  shell.style.setProperty('--badge-z', `${badgeDepth.toFixed(2)}px`)
  shell.style.setProperty('--badge-glow', `${badgeGlow.toFixed(3)}`)
  shell.style.setProperty('--card-glow', `${cardGlow.toFixed(3)}`)
  shell.style.setProperty('--card-glow-hover', `${cardGlowHover.toFixed(3)}`)
}

const resolvePhotoUrl = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''

  if (/^(data:|blob:|https?:)/i.test(raw)) {
    return raw
  }

  if (raw.startsWith('//')) {
    return `https:${raw}`
  }

  const backendBase = resolveBackendBase()
  try {
    const backendOrigin = new URL(backendBase).origin
    return `${backendOrigin}${raw.startsWith('/') ? raw : `/${raw}`}`
  } catch {
    return raw
  }
}

const getInitials = (name) => {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!parts.length) return 'TM'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase()
}

const EmployeeCard = () => {
  const shellRef = useRef(null)
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [employee, setEmployee] = useState(null)
  const [avatarLoadError, setAvatarLoadError] = useState(false)
  const [motionMode, setMotionMode] = useState('desktop')

  const empId = useMemo(() => {
    return (
      String(searchParams.get('empId') || '').trim() ||
      String(searchParams.get('registrationId') || '').trim()
    )
  }, [searchParams])

  const showcaseEmployee = employee || FALLBACK_EMPLOYEE

  const showcaseData = useMemo(() => ({
    name: safeText(showcaseEmployee?.name, FALLBACK_EMPLOYEE.name),
    id: safeText(showcaseEmployee?.empId, FALLBACK_EMPLOYEE.empId),
    role: safeText(showcaseEmployee?.designation, FALLBACK_EMPLOYEE.designation),
    department: safeText(showcaseEmployee?.department, FALLBACK_EMPLOYEE.department),
    photoUrl: resolvePhotoUrl(showcaseEmployee?.photoUrl || showcaseEmployee?.photo),
    initials: getInitials(showcaseEmployee?.name || 'VV'),
  }), [showcaseEmployee])

  useEffect(() => {
    setAvatarLoadError(false)
  }, [showcaseData.photoUrl])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isTouchDevice =
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 920px)').matches

      if (prefersReducedMotion) {
        setMotionMode('reduced')
        return undefined
      }

      if (!isTouchDevice) {
        setMotionMode('desktop')
        return undefined
      }

      setMotionMode('mobile')
    } catch {
      setMotionMode('desktop')
    }

    return undefined
  }, [])

  useEffect(() => {
    const shell = shellRef.current

    if (!shell || motionMode !== 'desktop' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId = null

    const maxTiltX = 6
    const maxTiltY = 7
    const lerp = 0.12

    const animate = () => {
      currentX += (targetX - currentX) * lerp
      currentY += (targetY - currentY) * lerp

      setTiltStyles(shell, currentX, currentY)

      const shouldContinue =
        Math.abs(targetX - currentX) > 0.01 ||
        Math.abs(targetY - currentY) > 0.01

      if (shouldContinue) {
        rafId = window.requestAnimationFrame(animate)
      } else {
        rafId = null
      }
    }

    const requestAnimate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate)
      }
    }

    const handleMove = (event) => {
      const rect = shell.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      targetX = (0.5 - py) * maxTiltX
      targetY = (px - 0.5) * maxTiltY
      requestAnimate()
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      requestAnimate()
    }

    shell.addEventListener('pointermove', handleMove)
    shell.addEventListener('pointerleave', handleLeave)
    shell.addEventListener('pointerenter', requestAnimate)

    return () => {
      shell.removeEventListener('pointermove', handleMove)
      shell.removeEventListener('pointerleave', handleLeave)
      shell.removeEventListener('pointerenter', requestAnimate)

      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [motionMode])

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!empId) {
        setError('Invalid QR. Employee ID is missing.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        const res = await fetch(`${resolveBackendBase()}/checkin/employee/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ empId }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          setError(data.msg || 'Employee details not found.')
          setEmployee(null)
          return
        }

        setEmployee(data.employee || null)
      } catch (err) {
        setError('Unable to load employee details right now.')
        setEmployee(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [empId])

  return (
    <main className="employee-page">
      {loading && <div className="employee-state">Loading employee profile...</div>}
      {!loading && error && <div className="employee-state employee-state-error">{error}</div>}

      <div className="stage">
        <section ref={shellRef} className="employee-id-shell" aria-label="Futuristic Employee ID Card">
          <div className="logo-badge" aria-label="Company logo badge">
            <span className="logo-halo" aria-hidden="true"></span>
            <img className="logo-mark" src="/TechMNHub-Logo.png" alt="TechMNHub logo" />
          </div>

          <section className="card">
            <div className="fire-system" aria-hidden="true">
              <div className="heat-layer"></div>
              {FIRE_PARTICLES.map((particle, index) => (
                <span
                  key={`particle-${index}`}
                  className={`particle${particle.type ? ` ${particle.type}` : ''}`}
                  style={particle.vars}
                />
              ))}
            </div>

            <section className="left-zone" aria-label="Identity panel">
              <div className="identity-stack">
                <div className="avatar" aria-label={showcaseData.photoUrl && !avatarLoadError ? 'Employee profile photo' : 'Employee initials'}>
                  {showcaseData.photoUrl && !avatarLoadError ? (
                    <img
                      className="avatar-image"
                      src={showcaseData.photoUrl}
                      alt={`${showcaseData.name} profile`}
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    showcaseData.initials
                  )}
                </div>
                <h1 className="employee-name">{showcaseData.name}</h1>
              </div>
            </section>

            <section className="right-zone" aria-label="Employee details panel">
              <div className="data-panel">
                <div className="row">
                  <p className="label">Employee ID:</p>
                  <p className="value">{showcaseData.id}</p>
                </div>
                <div className="row">
                  <p className="label">Designation:</p>
                  <p className="value">{showcaseData.role}</p>
                </div>
                <div className="row">
                  <p className="label">Department:</p>
                  <p className="value">{showcaseData.department}</p>
                </div>
              </div>
            </section>
          </section>
        </section>

      </div>
    </main>
  )
}

export default EmployeeCard
