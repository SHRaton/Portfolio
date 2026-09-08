'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { stiffness: 110, damping: 18, mass: 0.12 })
  const ringY = useSpring(mouseY, { stiffness: 110, damping: 18, mass: 0.12 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], .glass-hover, .card-hover'))
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  const ringSize = clicking ? 28 : hovering ? 52 : 36

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: hovering
            ? 'rgba(168, 85, 247, 0.9)'
            : 'rgba(168, 85, 247, 0.45)',
          backgroundColor: hovering
            ? 'rgba(124, 58, 237, 0.08)'
            : 'transparent',
        }}
        transition={{
          width: { type: 'spring', stiffness: 200, damping: 22 },
          height: { type: 'spring', stiffness: 200, damping: 22 },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
      />

      {/* Precise dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(167, 139, 250)',
        }}
        animate={{
          width: clicking ? 5 : hovering ? 4 : 8,
          height: clicking ? 5 : hovering ? 4 : 8,
          boxShadow: hovering
            ? '0 0 14px rgba(168, 85, 247, 0.9), 0 0 28px rgba(168, 85, 247, 0.35)'
            : '0 0 8px rgba(168, 85, 247, 0.6)',
        }}
        transition={{ width: { duration: 0.08 }, height: { duration: 0.08 } }}
      />
    </>
  )
}
