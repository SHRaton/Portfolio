'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { assetPath } from '@/lib/assetPath'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  subtitle?: string
  description: string
  icon?: React.ReactNode
  image?: string
  logo?: string
  logoFallback?: string
  category?: string
  color?: string
  tags?: string[]
  link?: { url: string; text: string }
}

interface Timeline3DProps {
  events: TimelineEvent[]
  className?: string
}

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  purple:  { bg: 'bg-purple-500',  border: 'border-purple-400',  text: 'text-purple-400'  },
  violet:  { bg: 'bg-violet-500',  border: 'border-violet-400',  text: 'text-violet-400'  },
  fuchsia: { bg: 'bg-fuchsia-500', border: 'border-fuchsia-400', text: 'text-fuchsia-400' },
  indigo:  { bg: 'bg-indigo-500',  border: 'border-indigo-400',  text: 'text-indigo-400'  },
  // legacy aliases
  cyan: { bg: 'bg-violet-500', border: 'border-violet-400', text: 'text-violet-400' },
  emerald: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-400' },
  amber: { bg: 'bg-fuchsia-500', border: 'border-fuchsia-400', text: 'text-fuchsia-400' },
  rose: { bg: 'bg-violet-600', border: 'border-violet-500', text: 'text-violet-400' },
  blue: { bg: 'bg-indigo-500', border: 'border-indigo-400', text: 'text-indigo-400' },
}

function LogoBadge({ event, borderCls }: { event: TimelineEvent; borderCls: string }) {
  const fallback = event.logoFallback ?? event.subtitle?.charAt(0) ?? '?'
  return (
    <div
      className={`absolute bottom-3 left-4 w-12 h-12 rounded-xl border-2 ${borderCls} overflow-hidden shadow-lg`}
      style={{ background: 'rgba(109, 40, 217, 0.18)', backdropFilter: 'blur(8px)' }}
    >
      {event.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={assetPath(event.logo)} alt={`Logo ${event.title}`} className="w-full h-full object-contain p-1.5" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
          {fallback}
        </div>
      )}
    </div>
  )
}

function TimelineCard({
  event, index, activeEvent, setActiveEvent, mousePosition,
}: {
  event: TimelineEvent
  index: number
  activeEvent: string | null
  setActiveEvent: (id: string | null) => void
  mousePosition: { x: number; y: number }
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: false })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  const isLeft = index % 2 === 0
  const isActive = activeEvent === event.id
  const c = COLOR_MAP[event.color ?? 'purple'] ?? COLOR_MAP.purple

  const card = (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isLeft ? -50 : 50, y: 15 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${mousePosition.x * (isLeft ? 2.5 : -2.5)}deg) rotateX(${mousePosition.y * -2}deg)`,
        }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        onMouseEnter={() => setActiveEvent(event.id)}
        onMouseLeave={() => setActiveEvent(null)}
      >
        {event.image ? (
          <div className="relative h-44 overflow-hidden">
            <motion.img
              src={assetPath(event.image)}
              alt={event.title}
              className="w-full h-full object-cover"
              animate={{ scale: isActive ? 1.06 : 1, y: isActive ? -8 : 0 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            {event.category && (
              <div className="absolute top-3 right-3">
                <span className={`${c.text} text-xs font-semibold tracking-wider uppercase bg-black/40 px-3 py-1 rounded-full border border-current`}>
                  {event.category}
                </span>
              </div>
            )}
            <LogoBadge event={event} borderCls={c.border} />
          </div>
        ) : (
          <div className="relative h-32 overflow-hidden border-b border-white/10 flex items-center justify-center bg-white/[0.03]">
            <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.category && (
              <div className="absolute top-3 right-3">
                <span className={`${c.text} text-xs font-semibold tracking-wider uppercase bg-black/40 px-3 py-1 rounded-full border border-current`}>
                  {event.category}
                </span>
              </div>
            )}
            <LogoBadge event={event} borderCls={c.border} />
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold text-white leading-tight">{event.title}</h3>
          {event.subtitle && <p className="text-sm text-slate-400 mt-0.5">{event.subtitle}</p>}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-slate-300 mt-3 leading-relaxed text-sm">{event.description}</p>
            {event.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {event.tags.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {event.link && (
              <a
                href={event.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block mt-4 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:-translate-y-0.5 ${c.bg} text-white`}
              >
                {event.link.text}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${c.bg}`}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.45 }}
        />
      </motion.div>
    </motion.div>
  )

  return (
    <div className="relative mb-10 md:mb-12">
      {/* Mobile: stacked with inline date */}
      <div className="flex flex-col w-full md:hidden gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-500 border border-violet-300 flex-shrink-0 shadow-sm shadow-violet-500/40" />
          <span className="text-xs font-mono text-violet-300 font-semibold">{event.date}</span>
        </div>
        {card}
      </div>

      {/* Desktop: 3-column layout */}
      <div className="hidden md:flex w-full items-start">
        {/* Left slot */}
        <div className="w-[45%] pr-6">
          {isLeft && card}
        </div>

        {/* Center: dot + date on the line */}
        <div className="w-[10%] flex flex-col items-center pt-5 flex-shrink-0">
          <motion.div
            className="w-3.5 h-3.5 rounded-full bg-violet-500 border-2 border-violet-300 shadow-md shadow-violet-500/50 cursor-pointer relative z-10"
            whileHover={{ scale: 1.5 }}
            onClick={() => setActiveEvent(isActive ? null : event.id)}
            animate={isActive ? {
              boxShadow: [
                '0 0 0px rgba(167,139,250,0.3)',
                '0 0 14px rgba(167,139,250,0.9)',
                '0 0 0px rgba(167,139,250,0.3)',
              ],
            } : {}}
            transition={{ repeat: isActive ? Infinity : 0, duration: 1.4 }}
          />
          <span className="text-[9px] font-mono text-violet-300/75 mt-1.5 text-center leading-tight w-full px-1">
            {event.date}
          </span>
        </div>

        {/* Right slot */}
        <div className="w-[45%] pl-6">
          {!isLeft && card}
        </div>
      </div>
    </div>
  )
}

export const Timeline3D: React.FC<Timeline3DProps> = ({ events, className = '' }) => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      })
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    return () => el?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={`w-full py-4 px-2 overflow-hidden ${className}`}>
      <div className="relative max-w-4xl mx-auto">
        {/* Central violet gradient line — desktop only */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/80 via-purple-500/55 to-violet-700/20 rounded-full hidden md:block" />

        {events.map((event, i) => (
          <TimelineCard
            key={event.id}
            event={event}
            index={i}
            activeEvent={activeEvent}
            setActiveEvent={setActiveEvent}
            mousePosition={mousePosition}
          />
        ))}
      </div>
    </div>
  )
}

export default Timeline3D
