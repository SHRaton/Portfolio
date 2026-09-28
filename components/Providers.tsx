'use client'

import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '@/lib/LanguageContext'

/** One delegated listener feeds the pointer position to every `.spotlight` element. */
function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useSpotlight()
  return (
    // reducedMotion="user": framer-motion skips transform/layout animations
    // when the OS "reduce motion" setting is on
    <MotionConfig reducedMotion="user">
      <LanguageProvider>{children}</LanguageProvider>
    </MotionConfig>
  )
}
