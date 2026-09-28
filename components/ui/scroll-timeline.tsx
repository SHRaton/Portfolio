'use client'

// Scroll-driven timeline. Inspired by Aceternity UI's Timeline (sticky headings + a beam
// that fills as you scroll) and the "Growth Story Timeline" block on 21st.dev (image cards).
// One rail on the left at every breakpoint: the same reading order on phone and desktop.

import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Briefcase, GraduationCap, Plane, type LucideIcon } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import { TextScramble } from './text-scramble'

export type TimelineKind = 'education' | 'internship' | 'exchange'

export interface TimelineItem {
  id: string
  year: string
  kind: TimelineKind
  category: string
  title: string
  org: string
  place?: string
  description: string
  image?: string
  logo?: string
  /** Background behind the logo: 'dark' for logos with white artwork */
  logoBg?: 'light' | 'dark'
  tags?: string[]
}

interface ScrollTimelineProps {
  items: TimelineItem[]
  end?: { year: string; title: string; text: string; cta: string; href: string }
}

const KIND_STYLE: Record<TimelineKind, { icon: LucideIcon; chip: string }> = {
  education: { icon: GraduationCap, chip: 'text-violet-200 border-violet-400/40 bg-violet-500/15' },
  internship: { icon: Briefcase, chip: 'text-fuchsia-200 border-fuchsia-400/40 bg-fuchsia-500/15' },
  exchange: { icon: Plane, chip: 'text-sky-200 border-sky-400/40 bg-sky-500/15' },
}

// Where the beam's head sits in the viewport (fraction from the top)
const BEAM_LINE = 0.55

export function ScrollTimeline({ items, end }: ScrollTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const groupRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeCount, setActiveCount] = useState(0)
  const reduceMotion = useReducedMotion()

  // Group consecutive items that share a year under one heading
  const groups: { year: string; items: TimelineItem[] }[] = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (last && last.year === item.year) last.items.push(item)
    else groups.push({ year: item.year, items: [item] })
  }
  const totalGroups = groups.length + (end ? 1 : 0)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: [`start ${BEAM_LINE * 100}%`, `end ${BEAM_LINE * 100}%`],
  })
  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // A year lights up once the beam has reached its dot
  const updateActive = (progress: number) => {
    const list = listRef.current
    if (!list) return
    const beamY = progress * list.offsetHeight
    let count = 0
    groupRefs.current.forEach((el) => {
      if (el && el.offsetTop + 16 <= beamY + 1) count++
    })
    setActiveCount((prev) => (prev === count ? prev : count))
  }
  useMotionValueEvent(scrollYProgress, 'change', updateActive)
  useLayoutEffect(() => {
    if (reduceMotion) setActiveCount(totalGroups)
    else updateActive(scrollYProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, totalGroups])

  return (
    <ol ref={listRef} className="relative">
      {/* Rail + scroll beam. Rail x = centre of the dot column (16px mobile, 152px desktop). */}
      <div aria-hidden className="absolute top-3 bottom-3 left-4 md:left-[152px] w-px -translate-x-1/2 bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-violet-500/0 via-violet-400 to-fuchsia-400"
          style={{ height: reduceMotion ? '100%' : beamHeight }}
        >
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-fuchsia-300 shadow-[0_0_14px_4px_rgba(232,121,249,0.55)]" />
        </motion.div>
      </div>

      {groups.map((group, gi) => {
        const active = gi < activeCount
        return (
          <li
            key={group.year + gi}
            ref={(el) => {
              groupRefs.current[gi] = el
            }}
            className="relative grid grid-cols-[32px_1fr] md:grid-cols-[120px_64px_1fr] pb-14"
          >
            {/* Desktop: big sticky year */}
            <div className="hidden md:block">
              <div className="sticky top-28 mt-1 h-12 flex items-center">
                <YearLabel year={group.year} active={active} />
              </div>
            </div>

            {/* Dot */}
            <div className="relative flex justify-center">
              {/* Same sticky offset and height as the year label so dot and year stay aligned */}
              <div className="sticky top-[4.75rem] md:top-28 md:mt-1 h-8 md:h-12 flex items-center justify-center">
                <Dot active={active} />
              </div>
            </div>

            <div className="min-w-0 flex flex-col gap-5">
              {/* Mobile: sticky year pill under the navbar */}
              <div className="md:hidden sticky top-[4.75rem] z-10">
                <span
                  className={`inline-flex items-center h-8 rounded-full px-3 font-mono text-lg font-bold border backdrop-blur-md transition-colors duration-500 ${
                    active
                      ? 'text-violet-100 border-violet-400/50 bg-violet-950/70'
                      : 'text-slate-400 border-white/10 bg-[#0a0a0f]/80'
                  }`}
                >
                  {group.year}
                </span>
              </div>

              {group.items.map((item) => (
                <TimelineCard key={item.id} item={item} />
              ))}
            </div>
          </li>
        )
      })}

      {end && (
        <li
          ref={(el) => {
            groupRefs.current[groups.length] = el
          }}
          className="relative grid grid-cols-[32px_1fr] md:grid-cols-[120px_64px_1fr]"
        >
          <div className="hidden md:flex mt-1 h-12 items-center">
            <YearLabel year={end.year} active={activeCount > groups.length} />
          </div>
          <div className="relative flex justify-center">
            <div className="h-8 md:h-12 md:mt-1 flex items-center">
              <Dot active={activeCount > groups.length} pulse />
            </div>
          </div>
          <div className="min-w-0">
            <span className="md:hidden inline-flex items-center h-8 font-mono text-lg font-bold text-violet-200 mb-3">{end.year}</span>
            <div className="rounded-2xl border border-dashed border-violet-400/40 bg-violet-500/[0.06] p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white">{end.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mt-2">{end.text}</p>
              <a href={end.href} className="btn-glow mt-4 text-sm">
                {end.cta}
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>
        </li>
      )}
    </ol>
  )
}

function YearLabel({ year, active }: { year: string; active: boolean }) {
  return (
    <span
      className={`block font-mono text-5xl font-bold leading-none tracking-tight transition-colors duration-500 ${
        active ? 'text-violet-200' : 'text-slate-500'
      }`}
    >
      <TextScramble text={year} duration={600} />
    </span>
  )
}

function Dot({ active, pulse = false }: { active: boolean; pulse?: boolean }) {
  return (
    <span className="relative flex w-4 h-4 items-center justify-center" aria-hidden>
      {pulse && active && <span className="absolute inset-0 rounded-full bg-fuchsia-400/60 animate-ping" />}
      <span
        className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 ${
          active
            ? 'bg-violet-400 border-violet-100 shadow-[0_0_16px_3px_rgba(167,139,250,0.6)]'
            : 'bg-[#0a0a0f] border-white/25'
        }`}
      />
    </span>
  )
}

function TimelineCard({ item }: { item: TimelineItem }) {
  const style = KIND_STYLE[item.kind]
  const Icon = style.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] md:flex hover:border-violet-400/35 transition-colors"
    >
      {item.image && (
        <div className="relative h-24 md:h-auto md:w-60 lg:w-72 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(item.image)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#0f0f1a]/80" />
          {item.logo && (
            <div
              className={`absolute bottom-3 left-3 h-10 px-2.5 py-1.5 rounded-lg shadow-lg flex items-center ${
                item.logoBg === 'dark' ? 'bg-[#141024]/95 border border-white/10' : 'bg-white/95'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetPath(item.logo)} alt="" loading="lazy" className="h-full w-auto max-w-[120px] object-contain" />
            </div>
          )}
        </div>
      )}

      <div className="relative z-[2] p-5 md:p-6 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.chip}`}>
            <Icon className="w-3.5 h-3.5" aria-hidden />
            {item.category}
          </span>
          {item.place && <span className="text-xs text-slate-400 font-mono">{item.place}</span>}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white leading-snug mt-3">{item.title}</h3>
        <p className="text-sm text-violet-300 font-medium mt-0.5">{item.org}</p>
        <p className="text-sm text-slate-300 leading-relaxed mt-3">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map((tag) => (
              <li key={tag} className="px-2 py-0.5 rounded-full text-xs font-mono bg-white/[0.07] border border-white/10 text-slate-300">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  )
}
