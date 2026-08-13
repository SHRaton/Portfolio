'use client'

import { useEffect, useRef } from 'react'

interface PlanetDef {
  name: string
  baseColor: string
  highlightColor: string
  shadowColor: string
  maxRadius: number   // fraction of min(width, height)
  offsetX: number     // fraction of width from center (-0.5 to 0.5)
  offsetY: number     // fraction of height from center
  hasRings?: boolean
  ringColor?: string
  ringInner?: number  // ring inner radius multiplier
  ringOuter?: number  // ring outer radius multiplier
  stripes?: { color: string; weight: number }[]
  spots?: { cx: number; cy: number; r: number; color: string }[]
}

const PLANETS: PlanetDef[] = [
  {
    name: 'Mercure',
    baseColor: '#8c8c8c',
    highlightColor: '#c8c8c8',
    shadowColor: '#3a3a3a',
    maxRadius: 0.13,
    offsetX: 0.15,
    offsetY: -0.1,
  },
  {
    name: 'Vénus',
    baseColor: '#dfc27d',
    highlightColor: '#f5e6b8',
    shadowColor: '#907030',
    maxRadius: 0.19,
    offsetX: -0.13,
    offsetY: 0.12,
  },
  {
    name: 'Terre',
    baseColor: '#2a6db5',
    highlightColor: '#6ab0f0',
    shadowColor: '#0d2a50',
    maxRadius: 0.21,
    offsetX: 0.08,
    offsetY: -0.12,
    spots: [
      { cx: -0.15, cy: -0.2, r: 0.28, color: '#2d8a45' },
      { cx: 0.25, cy: 0.1, r: 0.2, color: '#2d8a45' },
      { cx: -0.05, cy: 0.3, r: 0.18, color: '#3a9a50' },
    ],
  },
  {
    name: 'Mars',
    baseColor: '#b5391a',
    highlightColor: '#e07050',
    shadowColor: '#600c00',
    maxRadius: 0.15,
    offsetX: -0.16,
    offsetY: 0.06,
  },
  {
    name: 'Jupiter',
    baseColor: '#c8933a',
    highlightColor: '#e8b860',
    shadowColor: '#704818',
    maxRadius: 0.36,
    offsetX: 0.06,
    offsetY: -0.06,
    stripes: [
      { color: '#c8933a', weight: 2 },
      { color: '#9a5c20', weight: 1.2 },
      { color: '#d8aa60', weight: 1.6 },
      { color: '#b87030', weight: 1 },
      { color: '#c8933a', weight: 1.8 },
      { color: '#854010', weight: 0.9 },
      { color: '#d0a050', weight: 1.5 },
      { color: '#9a5c20', weight: 1 },
      { color: '#c8933a', weight: 2 },
    ],
  },
  {
    name: 'Saturne',
    baseColor: '#e2d480',
    highlightColor: '#f5edbb',
    shadowColor: '#a09040',
    maxRadius: 0.25,
    offsetX: -0.1,
    offsetY: 0.1,
    hasRings: true,
    ringColor: '#c8b060',
    ringInner: 1.3,
    ringOuter: 2.3,
  },
  {
    name: 'Uranus',
    baseColor: '#6dd8e8',
    highlightColor: '#a8f0f8',
    shadowColor: '#2888a0',
    maxRadius: 0.22,
    offsetX: 0.14,
    offsetY: -0.04,
    hasRings: true,
    ringColor: '#80c8d8',
    ringInner: 1.25,
    ringOuter: 1.7,
  },
  {
    name: 'Neptune',
    baseColor: '#3050d8',
    highlightColor: '#6080ff',
    shadowColor: '#0c1880',
    maxRadius: 0.22,
    offsetX: -0.08,
    offsetY: -0.12,
  },
]

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  planet: PlanetDef,
  alpha: number,
) {
  if (radius < 1 || alpha < 0.01) return
  ctx.save()
  ctx.globalAlpha = alpha

  // Back half of rings (Saturn/Uranus)
  if (planet.hasRings) {
    const ro = radius * (planet.ringOuter ?? 2.2)
    const ri = radius * (planet.ringInner ?? 1.3)
    const tilt = 0.32
    ctx.save()
    ctx.globalAlpha = alpha * 0.55
    for (let r = ri; r <= ro; r += 1.5) {
      const t = (r - ri) / (ro - ri)
      const brightness = Math.floor(180 + t * 50)
      ctx.strokeStyle = `rgb(${brightness},${Math.floor(brightness * 0.9)},${Math.floor(brightness * 0.6)})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(cx, cy, r, r * tilt, 0, Math.PI, 2 * Math.PI)
      ctx.stroke()
    }
    ctx.restore()
  }

  // Clip circle for sphere
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.clip()

  // Base fill
  ctx.fillStyle = planet.baseColor
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)

  // Jupiter / stripe planets
  if (planet.stripes) {
    const totalWeight = planet.stripes.reduce((s, st) => s + st.weight, 0)
    let yOff = cy - radius
    for (const stripe of planet.stripes) {
      const h = (radius * 2 * stripe.weight) / totalWeight
      ctx.fillStyle = stripe.color
      ctx.fillRect(cx - radius, yOff, radius * 2, h)
      yOff += h
    }
  }

  // Earth continents
  if (planet.spots) {
    for (const spot of planet.spots) {
      ctx.beginPath()
      ctx.arc(cx + spot.cx * radius, cy + spot.cy * radius, spot.r * radius, 0, Math.PI * 2)
      ctx.fillStyle = spot.color
      ctx.fill()
    }
  }

  // Sphere shading gradient (highlight top-left + shadow bottom-right)
  const grad = ctx.createRadialGradient(
    cx - radius * 0.35, cy - radius * 0.35, radius * 0.05,
    cx + radius * 0.15, cy + radius * 0.15, radius * 1.1,
  )
  grad.addColorStop(0, planet.highlightColor + '70')
  grad.addColorStop(0.45, 'transparent')
  grad.addColorStop(1, planet.shadowColor + 'cc')
  ctx.fillStyle = grad
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)

  ctx.restore()

  // Front half of rings
  if (planet.hasRings) {
    const ro = radius * (planet.ringOuter ?? 2.2)
    const ri = radius * (planet.ringInner ?? 1.3)
    const tilt = 0.32
    ctx.save()
    ctx.globalAlpha = alpha * 0.55
    for (let r = ri; r <= ro; r += 1.5) {
      const t = (r - ri) / (ro - ri)
      const brightness = Math.floor(180 + t * 50)
      ctx.strokeStyle = `rgb(${brightness},${Math.floor(brightness * 0.9)},${Math.floor(brightness * 0.6)})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(cx, cy, r, r * tilt, 0, 0, Math.PI)
      ctx.stroke()
    }
    ctx.restore()
  }

  // Planet name label — appears as planet grows
  if (radius > 30) {
    const labelAlpha = clamp((radius - 30) / 60, 0, 1) * alpha
    ctx.save()
    ctx.globalAlpha = labelAlpha
    ctx.font = `${clamp(radius * 0.18, 12, 22)}px Inter, system-ui, sans-serif`
    ctx.fillStyle = '#e2e8f0'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '0.1em'
    const labelY = cy + radius * (planet.hasRings ? (planet.ringOuter ?? 2.2) * 0.32 + 0.2 : 1.15) + 20
    ctx.fillText(planet.name.toUpperCase(), cx, labelY)
    ctx.restore()
  }

  ctx.restore()
}

export default function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }

    const onResize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const progress = scrollRef.current
      const zoneSize = 1 / PLANETS.length
      const minDim = Math.min(width, height)

      for (let i = 0; i < PLANETS.length; i++) {
        const planet = PLANETS[i]
        const zoneStart = i * zoneSize

        // Local progress in this planet's zone [0, 1]
        const local = clamp((progress - zoneStart) / zoneSize, 0, 1)

        // Alpha: fade in 0→0.3, full 0.3→0.72, fade out 0.72→1
        let alpha: number
        if (local < 0.3) alpha = local / 0.3
        else if (local < 0.72) alpha = 1
        else alpha = 1 - (local - 0.72) / 0.28
        alpha = clamp(alpha, 0, 1)

        if (alpha < 0.01) continue

        // Radius: grows with smoothstep easing (exponential approach)
        const eased = smoothstep(local)
        const minR = minDim * planet.maxRadius * 0.025
        const maxR = minDim * planet.maxRadius
        const radius = minR + (maxR - minR) * eased

        const cx = width / 2 + planet.offsetX * width
        const cy = height / 2 + planet.offsetY * height

        drawPlanet(ctx, cx, cy, radius, planet, alpha * 0.82)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
