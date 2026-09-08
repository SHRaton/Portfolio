'use client'

import { useEffect, useRef } from 'react'

// --- Perspective projection config ---
const FOCAL = 600        // focal length: higher = more zoom, less distortion
const MAX_CAM_Z = 2800   // camera travel distance (scroll 0→100%)
const MIN_REL_Z = 8      // clip planes closer than this (avoids singularity)

interface PlanetDef {
  name: string
  worldZ: number      // depth position in 3D world
  worldX: number      // lateral world offset (determines which side it flies past)
  worldY: number      // vertical world offset
  worldRadius: number // sphere radius in world units
  color: string
  highlight: string
  shadow: string
  hasRings?: boolean
  ringInner?: number  // multiplier of worldRadius
  ringOuter?: number
  ringTilt?: number
  stripes?: { color: string; weight: number }[]
  continents?: { nx: number; ny: number; nr: number; color: string }[]
}

// Planets spread along Z axis — all visible at scroll=0, each flies past in order
// worldRadius is tuned so all appear as ~5-18px dots at scroll=0
const PLANETS: PlanetDef[] = [
  {
    name: 'Mercure',
    worldZ: 300, worldX: -80, worldY: -60, worldRadius: 3.6,
    color: '#8c8c8c', highlight: '#c8c8c8', shadow: '#3a3a3a',
  },
  {
    name: 'Vénus',
    worldZ: 600, worldX: 100, worldY: 80, worldRadius: 8.4,
    color: '#dfc27d', highlight: '#f5e6b8', shadow: '#907030',
  },
  {
    name: 'Terre',
    worldZ: 900, worldX: -110, worldY: -80, worldRadius: 10.8,
    color: '#2a6db5', highlight: '#6ab0f0', shadow: '#0d2a50',
    continents: [
      { nx: -0.15, ny: -0.2, nr: 0.28, color: '#2d8a45' },
      { nx: 0.25, ny: 0.1, nr: 0.22, color: '#3a9a50' },
      { nx: -0.05, ny: 0.32, nr: 0.2, color: '#2d8a45' },
    ],
  },
  {
    name: 'Mars',
    worldZ: 1200, worldX: 120, worldY: 65, worldRadius: 7.2,
    color: '#b5391a', highlight: '#e07050', shadow: '#600c00',
  },
  {
    name: 'Jupiter',
    worldZ: 1500, worldX: -90, worldY: 110, worldRadius: 45,
    color: '#c8933a', highlight: '#e8b860', shadow: '#704818',
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
    worldZ: 1800, worldX: 110, worldY: -90, worldRadius: 35,
    color: '#e2d480', highlight: '#f5edbb', shadow: '#a09040',
    hasRings: true, ringInner: 1.3, ringOuter: 2.2, ringTilt: 0.3,
  },
  {
    name: 'Uranus',
    worldZ: 2100, worldX: -130, worldY: 65, worldRadius: 25,
    color: '#6dd8e8', highlight: '#a8f0f8', shadow: '#2888a0',
    hasRings: true, ringInner: 1.2, ringOuter: 1.65, ringTilt: 0.15,
  },
  {
    name: 'Neptune',
    worldZ: 2400, worldX: 95, worldY: -105, worldRadius: 24,
    color: '#3050d8', highlight: '#6080ff', shadow: '#0c1880',
  },
]

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  sx: number, sy: number,   // screen position
  radius: number,
  planet: PlanetDef,
  w: number, h: number,     // canvas dimensions (for culling)
) {
  // Cull: if center is so far off-screen that even the ring is invisible, skip
  const maxExtent = radius * (planet.ringOuter ?? 1) + 40
  if (
    sx + maxExtent < 0 || sx - maxExtent > w ||
    sy + maxExtent < 0 || sy - maxExtent > h
  ) return

  ctx.save()

  // --- Back half of rings ---
  if (planet.hasRings) {
    const ro = radius * (planet.ringOuter ?? 2.2)
    const ri = radius * (planet.ringInner ?? 1.3)
    const tilt = planet.ringTilt ?? 0.3
    ctx.save()
    ctx.globalAlpha = 0.6
    for (let r = ri; r <= ro; r += Math.max(1, radius * 0.018)) {
      const t = (r - ri) / (ro - ri)
      const b = Math.floor(160 + t * 60)
      ctx.strokeStyle = `rgb(${b},${Math.floor(b * 0.88)},${Math.floor(b * 0.52)})`
      ctx.lineWidth = Math.max(0.8, radius * 0.012)
      ctx.beginPath()
      ctx.ellipse(sx, sy, r, r * tilt, 0, Math.PI, 2 * Math.PI)
      ctx.stroke()
    }
    ctx.restore()
  }

  // --- Clip to sphere ---
  ctx.beginPath()
  ctx.arc(sx, sy, radius, 0, Math.PI * 2)
  ctx.clip()

  // Base color
  ctx.fillStyle = planet.color
  ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2)

  // Horizontal stripes (Jupiter)
  if (planet.stripes) {
    const total = planet.stripes.reduce((s, st) => s + st.weight, 0)
    let yy = sy - radius
    for (const stripe of planet.stripes) {
      const sh = (radius * 2 * stripe.weight) / total
      ctx.fillStyle = stripe.color
      ctx.fillRect(sx - radius, yy, radius * 2, sh)
      yy += sh
    }
  }

  // Earth continents
  if (planet.continents) {
    for (const c of planet.continents) {
      ctx.beginPath()
      ctx.arc(sx + c.nx * radius, sy + c.ny * radius, c.nr * radius, 0, Math.PI * 2)
      ctx.fillStyle = c.color
      ctx.fill()
    }
  }

  // 3D shading gradient (highlight top-left → shadow bottom-right)
  const grad = ctx.createRadialGradient(
    sx - radius * 0.35, sy - radius * 0.35, radius * 0.05,
    sx + radius * 0.2, sy + radius * 0.2, radius * 1.1,
  )
  grad.addColorStop(0, planet.highlight + '72')
  grad.addColorStop(0.4, 'transparent')
  grad.addColorStop(1, planet.shadow + 'cc')
  ctx.fillStyle = grad
  ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2)

  ctx.restore()

  // --- Front half of rings ---
  if (planet.hasRings) {
    const ro = radius * (planet.ringOuter ?? 2.2)
    const ri = radius * (planet.ringInner ?? 1.3)
    const tilt = planet.ringTilt ?? 0.3
    ctx.save()
    ctx.globalAlpha = 0.6
    for (let r = ri; r <= ro; r += Math.max(1, radius * 0.018)) {
      const t = (r - ri) / (ro - ri)
      const b = Math.floor(160 + t * 60)
      ctx.strokeStyle = `rgb(${b},${Math.floor(b * 0.88)},${Math.floor(b * 0.52)})`
      ctx.lineWidth = Math.max(0.8, radius * 0.012)
      ctx.beginPath()
      ctx.ellipse(sx, sy, r, r * tilt, 0, 0, Math.PI)
      ctx.stroke()
    }
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

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }

    const onResize = () => {
      if (!canvas) return
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      if (document.documentElement.dataset.planets === 'hidden') {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      // Camera has moved cameraZ units forward
      const cameraZ = scrollRef.current * MAX_CAM_Z
      const cx = w / 2
      const cy = h / 2

      for (const planet of PLANETS) {
        const relZ = planet.worldZ - cameraZ
        if (relZ < MIN_REL_Z) continue // behind or too close to camera

        const scale = FOCAL / relZ
        const sx = cx + planet.worldX * scale
        const sy = cy + planet.worldY * scale
        const radius = planet.worldRadius * scale

        if (radius < 0.5) continue // too far to be visible

        drawPlanet(ctx, sx, sy, radius, planet, w, h)
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
