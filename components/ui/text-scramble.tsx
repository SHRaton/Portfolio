'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]#$%&*+=_'

interface TextScrambleProps {
  text: string
  className?: string
  /** Total decode time in ms */
  duration?: number
  /** Delay before the first decode, in ms */
  delay?: number
  /** Re-run the decode when hovered */
  scrambleOnHover?: boolean
}

/**
 * Cipher-style decode: each character cycles through random glyphs, then locks in
 * left to right. The real text is kept in an invisible layer so the layout never
 * shifts, and screen readers only ever read the final text.
 */
export function TextScramble({
  text,
  className = '',
  duration = 900,
  delay = 0,
  scrambleOnHover = false,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const running = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  const run = useCallback(() => {
    if (running.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    running.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const locked = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        out += i < locked || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setDisplay(out)
      if (progress < 1) frame.current = requestAnimationFrame(tick)
      else running.current = false
    }
    frame.current = requestAnimationFrame(tick)
  }, [text, duration])

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(run, delay)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(frame.current)
      running.current = false
      setDisplay(text)
    }
  }, [inView, run, delay, text])

  return (
    // className goes on the text layers themselves (not the wrapper) so effects like
    // background-clip: text (gradient text) apply to the visible, absolutely-positioned layer
    <span ref={ref} className="relative inline-block" onMouseEnter={scrambleOnHover ? run : undefined}>
      <span className={`invisible ${className}`} aria-hidden>
        {text}
      </span>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={`absolute inset-0 whitespace-nowrap ${className}`}>
        {display}
      </span>
    </span>
  )
}
