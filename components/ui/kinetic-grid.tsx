'use client'

// Warping grid that bends toward the cursor and ripples on click — adapted from
// "Kinetic Grid" by satoriui on 21st.dev. Changes: scoped to its parent section
// (absolute canvas, section-relative coordinates) instead of full-screen, transparent
// background, site violet palette, DPR-aware, renders only while something moves
// (idle and offscreen → no frames), static under reduced motion, decorative-only.

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  opacity: number
  born: number
}

const CELL_SIZE = 56
const INFLUENCE_RADIUS = 240
const MAX_WARP = 22
const LERP_SPEED = 0.1

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.07 }
const LINE_ACTIVE = { r: 167, g: 139, b: 250, a: 0.85 }
const NODE_BASE = { r: 255, g: 255, b: 255, a: 0.16 }
const NODE_ACTIVE = { r: 196, g: 181, b: 253, a: 1 }
const GLOW = '167,139,250'
const NODE_BASE_RADIUS = 1.4
const NODE_ACTIVE_RADIUS = 3

const OFF = -9999

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function lerpColor(base: typeof LINE_BASE, active: typeof LINE_BASE, t: number) {
  return `rgba(${Math.round(lerp(base.r, active.r, t))},${Math.round(lerp(base.g, active.g, t))},${Math.round(
    lerp(base.b, active.b, t)
  )},${lerp(base.a, active.a, t).toFixed(3)})`
}

export function KineticGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const maybeCanvas = canvasRef.current
    const maybeCtx = maybeCanvas?.getContext('2d')
    if (!maybeCanvas || !maybeCtx) return
    const canvas: HTMLCanvasElement = maybeCanvas
    const ctx: CanvasRenderingContext2D = maybeCtx
    const host = canvas.parentElement ?? canvas

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse: Point = { x: OFF, y: OFF }
    const target: Point = { x: OFF, y: OFF }
    const ripples: Ripple[] = []
    let W = 0
    let H = 0
    let raf = 0
    let inView = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    function warp(gx: number, gy: number, col: number, row: number, cols: number, rows: number) {
      // Pin the outer rows/columns so the grid edges stay straight
      const edge = 1.5
      const colPin = Math.min(col / edge, (cols - 1 - col) / edge, 1)
      const rowPin = Math.min(row / edge, (rows - 1 - row) / edge, 1)
      const pin = colPin * colPin * rowPin * rowPin

      const dx = gx - mouse.x
      const dy = gy - mouse.y
      const dist = Math.hypot(dx, dy)
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pin

      let rx = 0
      let ry = 0
      for (const r of ripples) {
        const rdx = gx - r.x
        const rdy = gy - r.y
        const diff = Math.hypot(rdx, rdy) - r.radius
        const width = 55
        if (Math.abs(diff) < width) {
          const strength = (1 - Math.abs(diff) / width) * r.opacity * 16 * pin
          const angle = Math.atan2(rdy, rdx)
          const sign = diff < 0 ? 1 : -1
          rx += Math.cos(angle) * strength * sign
          ry += Math.sin(angle) * strength * sign
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pin > 0) {
        const t = dist / INFLUENCE_RADIUS
        const eased = (1 - t) * (1 - t) * Math.min(1, dist / 60)
        const amount = eased * MAX_WARP * pin
        const angle = Math.atan2(dy, dx)
        return { x: gx - Math.cos(angle) * amount + rx, y: gy - Math.sin(angle) * amount + ry, p: proximity }
      }
      return { x: gx + rx, y: gy + ry, p: proximity }
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, W, H)

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        const age = (now - r.born) / 1000
        r.radius = Math.max(0, age * 380)
        r.opacity = Math.max(0, 1 - age * 1.2)
        if (r.opacity <= 0) ripples.splice(i, 1)
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1
      const cw = W / (cols - 1)
      const ch = H / (rows - 1)

      const pts: { x: number; y: number; p: number }[][] = []
      for (let row = 0; row < rows; row++) {
        pts[row] = []
        for (let col = 0; col < cols; col++) pts[row][col] = warp(col * cw, row * ch, col, row, cols, rows)
      }

      const seg = (a: { x: number; y: number; p: number }, b: { x: number; y: number; p: number }) => {
        const avg = (a.p + b.p) / 2
        const t = avg * avg * (3 - 2 * avg)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = lerpColor(LINE_BASE, LINE_ACTIVE, t)
        ctx.lineWidth = lerp(0.7, 1.4, t)
        ctx.stroke()
      }
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols - 1; col++) seg(pts[row][col], pts[row][col + 1])
      for (let col = 0; col < cols; col++) for (let row = 0; row < rows - 1; row++) seg(pts[row][col], pts[row + 1][col])

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const pt = pts[row][col]
          const t = pt.p * pt.p * (3 - 2 * pt.p)
          const r = lerp(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t)
          if (t > 0.3) {
            const glowR = r + lerp(0, 7, (t - 0.3) / 0.7)
            const grd = ctx.createRadialGradient(pt.x, pt.y, r * 0.5, pt.x, pt.y, glowR)
            grd.addColorStop(0, `rgba(${GLOW},${(t * 0.35).toFixed(3)})`)
            grd.addColorStop(1, `rgba(${GLOW},0)`)
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, glowR, 0, Math.PI * 2)
            ctx.fillStyle = grd
            ctx.fill()
          }
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2)
          ctx.fillStyle = lerpColor(NODE_BASE, NODE_ACTIVE, t)
          ctx.fill()
        }
      }

      for (const r of ripples) {
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${GLOW},${(r.opacity * 0.3).toFixed(3)})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    const settled = () =>
      ripples.length === 0 && Math.abs(target.x - mouse.x) < 0.5 && Math.abs(target.y - mouse.y) < 0.5

    function frame(now: number) {
      raf = 0
      mouse.x = lerp(mouse.x, target.x, LERP_SPEED)
      mouse.y = lerp(mouse.y, target.y, LERP_SPEED)
      draw(now)
      if (!settled()) wake()
    }
    function wake() {
      if (!reduceMotion && inView && raf === 0) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (mouse.x === OFF) {
        mouse.x = x
        mouse.y = y
      }
      target.x = x
      target.y = y
      wake()
    }
    const onLeave = () => {
      // Glide the influence point off-canvas so the grid relaxes smoothly
      target.x = mouse.x < W / 2 ? -INFLUENCE_RADIUS : W + INFLUENCE_RADIUS
      wake()
    }
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0, opacity: 1, born: performance.now() })
      wake()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) wake()
    })
    io.observe(canvas)
    if (!reduceMotion) {
      host.addEventListener('pointermove', onMove, { passive: true })
      host.addEventListener('pointerleave', onLeave)
      host.addEventListener('click', onClick)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />
}
