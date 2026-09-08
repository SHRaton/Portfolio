'use client'

import React, { useState } from 'react'
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
  cardWidth?: number
  cardHeight?: number
  showDots?: boolean
  loop?: boolean
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
}

const MAX_BEHIND = 3

// Fan geometry per stack offset (0 = active)
const FAN = [
  { rot: 0, scale: 1, y: 0 },
  { rot: -7, scale: 0.95, y: 8 },
  { rot: 7, scale: 0.90, y: 16 },
  { rot: -4, scale: 0.85, y: 24 },
]

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

export function CardStack<T extends CardStackItem>({
  items,
  cardWidth = 520,
  cardHeight = 320,
  showDots = true,
  loop = true,
  renderCard,
}: CardStackProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const n = items.length

  const goTo = (i: number) => {
    if (loop) setActiveIndex(((i % n) + n) % n)
    else setActiveIndex(Math.max(0, Math.min(i, n - 1)))
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60) goTo(activeIndex + 1)
    else if (info.offset.x > 60) goTo(activeIndex - 1)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    })
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full select-none">
      {/* Stack */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: cardWidth, height: cardHeight + MAX_BEHIND * 8 + 8 }}
      >
        {items.map((item, i) => {
          const dist = ((i - activeIndex + n) % n)
          const isActive = dist === 0
          const isVisible = dist <= MAX_BEHIND
          const fan = FAN[dist] ?? FAN[MAX_BEHIND]

          return (
            <motion.div
              key={item.id}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                zIndex: isVisible ? MAX_BEHIND - dist + 1 : 0,
                boxShadow: isActive
                  ? '0 25px 50px -12px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)'
                  : '0 8px 24px -8px rgba(0,0,0,0.5)',
                cursor: isActive ? 'grab' : isVisible ? 'pointer' : 'default',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              animate={{
                rotate: isActive ? 0 : fan.rot,
                scale: isActive ? 1 : fan.scale,
                y: isActive ? 0 : fan.y,
                opacity: isVisible ? 1 : 0,
                rotateX: isActive ? tilt.y * -8 : 0,
                rotateY: isActive ? tilt.x * 8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={isActive ? handleDragEnd : undefined}
              onMouseMove={isActive ? handleMouseMove : undefined}
              onMouseLeave={isActive ? () => setTilt({ x: 0, y: 0 }) : undefined}
              onClick={!isActive && isVisible ? () => goTo(activeIndex + 1) : undefined}
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

      {/* Dots navigation */}
      {showDots && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={!loop && activeIndex === 0}
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xl leading-none disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>

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

          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={!loop && activeIndex === n - 1}
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xl leading-none disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>

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
      className="w-full h-full relative"
      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}
    >
      {item.imageSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {item.tag && (
          <p className="text-xs font-mono text-purple-300 tracking-wider mb-1">{item.tag}</p>
        )}
        <h3 className="text-white font-bold text-xl">{item.title}</h3>
        {item.description && (
          <p className="text-slate-300 text-sm mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  )
}
