'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
}

const NUM_STARS = 700
const SPEED = 3

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = canvas.offsetWidth || window.innerWidth
    let height = canvas.offsetHeight || window.innerHeight

    canvas.width = width
    canvas.height = height

    const cx = width / 2
    const cy = height / 2

    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width - cx,
      y: Math.random() * height - cy,
      z: Math.random() * width,
      prevZ: 0,
    }))
    stars.forEach((s) => (s.prevZ = s.z))

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(10, 10, 15, 0.25)'
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        star.prevZ = star.z
        star.z -= SPEED

        if (star.z <= 0) {
          star.x = Math.random() * width - cx
          star.y = Math.random() * height - cy
          star.z = width
          star.prevZ = star.z
          continue
        }

        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * width + cy
        const px = (star.x / star.prevZ) * width + cx
        const py = (star.y / star.prevZ) * width + cy

        if (sx < 0 || sx > width || sy < 0 || sy > height) continue

        const size = Math.max(0.3, (1 - star.z / width) * 2.5)
        const t = 1 - star.z / width  // 0=far, 1=close
        const alpha = t * 0.9

        // Violet/white star streak — no blue channel bias
        const r = Math.floor(180 + t * 75)
        const g = Math.floor(130 + t * 80)
        const b = Math.floor(255)
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.lineWidth = size
        ctx.stroke()

        // Bright dot tip — pale violet-white
        ctx.beginPath()
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 210, 255, ${alpha * 1.05})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    function onResize() {
      if (!canvas) return
      width = canvas.offsetWidth || window.innerWidth
      height = canvas.offsetHeight || window.innerHeight
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
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
