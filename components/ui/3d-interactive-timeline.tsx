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
  logo?: string       // URL du logo (ou chemin /public)
  logoFallback?: string // initiales si pas de logo
  category?: string
  color?: string
  tags?: string[]
  link?: { url: string; text: string }
}

interface Timeline3DProps {
  events: TimelineEvent[]
  className?: string
}

// Logo badge — shown in the bottom-left corner of the image/placeholder area
function LogoBadge({ event, dotClass }: { event: TimelineEvent; dotClass: string }) {
  const borderColor = dotClass.split(' ')[1] ?? 'border-purple-400'
  const fallback = event.logoFallback ?? event.subtitle?.charAt(0) ?? '?'

  return (
    <div className={`absolute bottom-3 left-4 w-12 h-12 rounded-xl border-2 ${borderColor} overflow-hidden shadow-lg`}
      style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(8px)' }}
    >
      {event.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetPath(event.logo!)}
          alt={`Logo ${event.title}`}
          className="w-full h-full object-contain p-1.5"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
          {fallback}
        </div>
      )}
    </div>
  )
}

// Each card is its own component so hooks are called at the top level (not inside .map())
function TimelineCard({
  event,
  index,
  activeEvent,
  setActiveEvent,
  mousePosition,
}: {
  event: TimelineEvent
  index: number
  activeEvent: string | null
  setActiveEvent: (id: string | null) => void
  mousePosition: { x: number; y: number }
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  const isEven = index % 2 === 0
  const isActive = activeEvent === event.id

  const colorMap: Record<string, string> = {
    purple: 'bg-purple-500 border-purple-400',
    cyan: 'bg-cyan-500 border-cyan-400',
    emerald: 'bg-emerald-500 border-emerald-400',
    amber: 'bg-amber-500 border-amber-400',
    rose: 'bg-rose-500 border-rose-400',
    blue: 'bg-blue-500 border-blue-400',
    indigo: 'bg-indigo-500 border-indigo-400',
  }
  const textColorMap: Record<string, string> = {
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    blue: 'text-blue-400',
    indigo: 'text-indigo-400',
  }
  const dotClass = colorMap[event.color ?? 'purple'] ?? colorMap.purple
  const textClass = textColorMap[event.color ?? 'purple'] ?? textColorMap.purple

  return (
    <motion.div
      ref={ref}
      className={`relative mb-12 md:mb-16 flex ${isEven ? 'md:justify-start md:ml-auto' : 'md:justify-end md:mr-auto'} md:w-1/2`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isEven ? 60 : -60, y: 20 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      }}
    >
      {/* Dot on central line */}
      <div
        className={`absolute top-6 z-20 ${isEven ? 'md:-left-5' : 'md:-right-5'} left-1/2 md:left-auto md:right-auto -translate-x-1/2 md:translate-x-0`}
      >
        <motion.div
          className={`w-10 h-10 rounded-full ${dotClass} flex items-center justify-center border-2 cursor-pointer shadow-lg`}
          whileHover={{ scale: 1.25 }}
          onClick={() => setActiveEvent(isActive ? null : event.id)}
          animate={isActive ? { boxShadow: ['0 0 0px rgba(255,255,255,0.3)', '0 0 18px rgba(255,255,255,0.7)', '0 0 0px rgba(255,255,255,0.3)'] } : {}}
          transition={{ repeat: isActive ? Infinity : 0, duration: 1.4 }}
        >
          {event.icon ?? <span className="text-white font-bold text-sm">{index + 1}</span>}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className={`relative z-10 w-full md:w-[calc(100%-2.5rem)] ${isEven ? 'md:ml-10' : 'md:mr-10'} rounded-2xl overflow-hidden border border-white/10 shadow-xl`}
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${mousePosition.x * (isEven ? -2.5 : 2.5)}deg) rotateX(${mousePosition.y * -2}deg)`,
        }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        onMouseEnter={() => setActiveEvent(event.id)}
        onMouseLeave={() => setActiveEvent(null)}
      >
        {/* Optional image */}
        {event.image && (
          <div className="relative h-44 overflow-hidden">
            <motion.img
              src={assetPath(event.image!)}
              alt={event.title}
              className="w-full h-full object-cover"
              animate={{ scale: isActive ? 1.06 : 1, y: isActive ? -8 : 0 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            {event.category && (
              <div className="absolute top-3 right-3">
                <span className={`${textClass} text-xs font-semibold tracking-wider uppercase bg-black/40 px-3 py-1 rounded-full border border-current`}>
                  {event.category}
                </span>
              </div>
            )}
            {/* Logo overlapping bottom-left of image */}
            <LogoBadge event={event} dotClass={dotClass} />
          </div>
        )}

        {/* Photo placeholder when no image */}
        {!event.image && (
          <div className="relative h-32 overflow-hidden border-b border-white/10 flex items-center justify-center bg-white/[0.03]">
            <div className="flex flex-col items-center gap-2 text-white/20">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-mono">Photo de l&apos;établissement</span>
            </div>
            {event.category && (
              <div className="absolute top-3 right-3">
                <span className={`${textClass} text-xs font-semibold tracking-wider uppercase bg-black/40 px-3 py-1 rounded-full border border-current`}>
                  {event.category}
                </span>
              </div>
            )}
            {/* Logo overlapping bottom-left of placeholder */}
            <LogoBadge event={event} dotClass={dotClass} />
          </div>
        )}

        <div className="p-6">
          {/* Date + pulse dot */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-mono ${textClass} tracking-wider font-semibold`}>{event.date}</span>
            <motion.div
              className={`w-2.5 h-2.5 rounded-full ${dotClass.split(' ')[0]}`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            />
          </div>

          <h3 className="text-xl font-bold text-white leading-tight">{event.title}</h3>
          {event.subtitle && (
            <p className="text-sm text-slate-400 mt-0.5">{event.subtitle}</p>
          )}

          {/* Description — expands on hover */}
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
                  <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-slate-300 font-mono">
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
                className={`inline-block mt-4 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 ${dotClass.split(' ')[0]} text-white`}
              >
                {event.link.text}
              </a>
            )}
          </motion.div>
        </div>

        {/* Bottom progress bar on hover */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${dotClass.split(' ')[0]}`}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.45 }}
        />
      </motion.div>
    </motion.div>
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
        {/* Central vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/70 via-cyan-500/50 to-emerald-500/30 rounded-full" />

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
