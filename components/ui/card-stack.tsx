'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export interface CardStackItem {
  id: string | number
  title: string
  description?: string
  imageSrc?: string
  href?: string
  ctaLabel?: string
  tag?: string
}

interface CardStackProps<T extends CardStackItem> {
  items: T[]
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
  showDots?: boolean
  loop?: boolean
}

const CARD_ASPECT = 340 / 520
const MAX_VISIBLE = 2   // cards shown on each side of active
const NEIGHBOR_SCALE = 0.86

// Shortest signed distance in a circular array
function signedDist(i: number, active: number, n: number): number {
  const raw = ((i - active) % n + n) % n
  return raw > n / 2 ? raw - n : raw
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function NavBtn({ onClick, disabled, children }: {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white text-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  )
}

export function CardStack<T extends CardStackItem>({
  items,
  renderCard,
  showDots = true,
  loop = true,
}: CardStackProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [dims, setDims] = useState({ container: 960, card: 520 })
  const containerRef = useRef<HTMLDivElement>(null)
  const n = items.length

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = Math.min(containerRef.current.offsetWidth, 1100)
      setDims({ container: w, card: Math.min(520, Math.round(w * 0.56)) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { container: containerWidth, card: cardWidth } = dims
  const cardHeight = Math.round(cardWidth * CARD_ASPECT)
  // Spacing: neighbor center is slightly outside the container edge so ~40% is visible
  const SPACING = Math.round(containerWidth * 0.55)

  const goTo = useCallback((i: number) => {
    if (loop) setActiveIndex(((i % n) + n) % n)
    else setActiveIndex(Math.max(0, Math.min(i, n - 1)))
  }, [loop, n])

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -60 || info.velocity.x < -300) goTo(activeIndex + 1)
    else if (info.offset.x > 60 || info.velocity.x > 300) goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    })
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 w-full select-none">
      {/* Overflow wrapper clips neighbors cleanly */}
      <div className="overflow-hidden w-full">
        {/* Perspective stage — cards are positioned relative to this */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            height: cardHeight + 24,
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {items.map((item, i) => {
            const d = signedDist(i, activeIndex, n)
            const absD = Math.abs(d)
            const isActive = d === 0
            const isVisible = absD <= MAX_VISIBLE
            const scale = Math.pow(NEIGHBOR_SCALE, absD)
            const rotY = -d * 30    // tilt toward center: right card angles left
            const opacity = absD === 0 ? 1 : absD === 1 ? 0.85 : 0.6

            return (
              <motion.div
                key={item.id}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  top: 0,
                  left: '50%',
                  marginLeft: -cardWidth / 2,
                  zIndex: isActive ? 10 : MAX_VISIBLE + 2 - absD,
                  boxShadow: isActive
                    ? '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)'
                    : '0 10px 30px -10px rgba(0,0,0,0.6)',
                  cursor: isActive ? 'grab' : isVisible ? 'pointer' : 'default',
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
                animate={{
                  x: d * SPACING + (isActive ? tilt.x * 10 : 0),
                  y: isActive ? tilt.y * -8 : 0,
                  rotateY: isActive ? tilt.x * 8 : rotY,
                  rotateX: isActive ? tilt.y * -6 : 0,
                  scale,
                  opacity: isVisible ? opacity : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={isActive ? handleDragEnd : undefined}
                onMouseMove={isActive ? handleMouseMove : undefined}
                onMouseLeave={isActive ? () => setTilt({ x: 0, y: 0 }) : undefined}
                onClick={!isActive && isVisible ? () => goTo(activeIndex + Math.sign(d)) : undefined}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {renderCard
                  ? renderCard(item as T, { active: isActive })
                  : <DefaultCard item={item} />
                }
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Dots navigation */}
      {showDots && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <NavBtn onClick={() => goTo(activeIndex - 1)} disabled={!loop && activeIndex === 0}>‹</NavBtn>

          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-5 h-2 bg-purple-500'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <NavBtn onClick={() => goTo(activeIndex + 1)} disabled={!loop && activeIndex === n - 1}>›</NavBtn>

          {items[activeIndex]?.href && (
            <a
              href={items[activeIndex].href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function DefaultCard({ item }: { item: CardStackItem }) {
  return (
    <div
      className="w-full h-full relative flex flex-col items-center justify-center gap-4"
      style={{ background: 'rgba(15, 15, 28, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      {item.imageSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageSrc} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      )}
      <div className="relative z-10 text-center px-6">
        {item.tag && <p className="text-xs font-mono text-purple-300 tracking-wider mb-2">{item.tag}</p>}
        <h3 className="text-white font-bold text-xl">{item.title}</h3>
        {item.description && <p className="text-slate-300 text-sm mt-2 line-clamp-2">{item.description}</p>}
      </div>
    </div>
  )
}
