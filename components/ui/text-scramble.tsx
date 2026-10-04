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
 * left to right. The overlay sits on top of the (visually hidden) real text, so the
 * layout never shifts and the text exists exactly once in the DOM.
 */
export function TextScramble({
  text,
  className = '',
  duration = 900,
  delay = 0,
  scrambleOnHover = false,
}: TextScrambleProps) {
  // null = not animating: only the real text is rendered (that is also what the static HTML contains)
  const [display, setDisplay] = useState<string | null>(null)
  const frame = useRef(0)
  const running = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  const scramble = useCallback(
    (locked: number) => {
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        out += i < locked || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      return out
    },
    [text]
  )

  const run = useCallback(
    (wait = 0) => {
      if (running.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      running.current = true
      setDisplay(scramble(0))
      const begin = performance.now() + wait
      const tick = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - begin) / duration))
        if (progress >= 1) {
          running.current = false
          setDisplay(null)
          return
        }
        setDisplay(scramble(Math.floor(progress * text.length)))
        frame.current = requestAnimationFrame(tick)
      }
      frame.current = requestAnimationFrame(tick)
    },
    [scramble, duration, text.length]
  )

  useEffect(() => {
    if (!inView) return
    run(delay)
    return () => {
      cancelAnimationFrame(frame.current)
      running.current = false
      setDisplay(null)
    }
  }, [inView, run, delay])

  return (
    // The real text is the only text in the HTML (crawlers, text extractors and screen readers
    // read it once). While animating it is hidden visually and an aria-hidden overlay shows the
    // glyphs; className goes on both layers so background-clip: text gradients still apply.
    <span ref={ref} className="relative inline-block" onMouseEnter={scrambleOnHover ? () => run() : undefined}>
      <span className={`${className} ${display !== null ? 'opacity-0' : ''}`}>{text}</span>
      {display !== null && (
        <span aria-hidden className={`absolute inset-0 whitespace-nowrap ${className}`}>
          {display}
        </span>
      )}
    </span>
  )
}
