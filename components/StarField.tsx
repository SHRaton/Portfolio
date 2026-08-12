'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
}

const NUM_STARS = 800
const SPEED = 3

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const cx = width / 2
    const cy = height / 2

    // Init stars spread across all depths
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width - cx,
      y: Math.random() * height - cy,
      z: Math.random() * width,
      prevZ: 0,
    }))
    stars.forEach((s) => (s.prevZ = s.z))

    function draw() {
      if (!ctx || !canvas) return

      // Fade trail — semi-transparent black overlay
      ctx.fillStyle = 'rgba(10, 10, 15, 0.25)'
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        star.prevZ = star.z
        star.z -= SPEED

        // Reset star that went past the viewer
        if (star.z <= 0) {
          star.x = Math.random() * width - cx
          star.y = Math.random() * height - cy
          star.z = width
          star.prevZ = star.z
          continue
        }

        // Project current position
        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * width + cy

        // Project previous position for trail
        const px = (star.x / star.prevZ) * width + cx
        const py = (star.y / star.prevZ) * width + cy

        // Skip if out of bounds
        if (sx < 0 || sx > width || sy < 0 || sy > height) continue

        // Size & brightness grow as star approaches
        const size = Math.max(0.3, (1 - star.z / width) * 2.5)
        const brightness = Math.floor((1 - star.z / width) * 255)

        // Draw streak from previous to current position
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `rgba(${brightness}, ${Math.floor(brightness * 0.85)}, 255, ${(1 - star.z / width) * 0.9})`
        ctx.lineWidth = size
        ctx.stroke()

        // Draw dot at tip
        ctx.beginPath()
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${(1 - star.z / width) * 0.95})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    function onResize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  )
}
