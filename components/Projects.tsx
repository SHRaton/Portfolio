'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects'
import { SectionTitle } from './About'
import { CardStack, CardStackItem } from './ui/card-stack'

interface ProjectCard extends CardStackItem {
  icon: string
  tags: string[]
  language: string
  languageColor: string
  featured: boolean
  homepageUrl?: string
  longDesc: string
}

const cardItems: ProjectCard[] = projects.map((p) => ({
  id: p.slug,
  title: p.title,
  description: p.description,
  href: p.githubUrl,
  tag: p.category,
  icon: p.icon,
  tags: p.tags,
  language: p.language,
  languageColor: p.languageColor,
  featured: p.featured,
  homepageUrl: p.homepageUrl,
  longDesc: p.longDesc,
}))

export default function Projects() {
  return (
    <section id="projects" className="section-alt py-24">
      {/* Constrained title */}
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle label="PROJETS" title="Ce que j'ai construit" />
        <p className="text-slate-500 text-sm mt-3">
          Survolez la carte active pour découvrir · glissez ou cliquez pour naviguer · {cardItems.length} projets
        </p>
      </div>

      {/* Full-width carousel */}
      <div className="mt-12">
        <CardStack<ProjectCard>
          items={cardItems}
          showDots
          loop
          renderCard={(item, { active }) => (
            <ProjectCardContent item={item} active={active} />
          )}
        />
      </div>

      {/* GitHub CTA */}
      <div className="max-w-5xl mx-auto px-6 text-center mt-16">
        <a
          href="https://github.com/SHRaton"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Voir tous mes repos GitHub
        </a>
      </div>
    </section>
  )
}

// Individual project card: shows icon + title by default, reveals details on hover (active card only)
function ProjectCardContent({ item, active }: { item: ProjectCard; active: boolean }) {
  const [hovered, setHovered] = useState(false)
  const showDetails = active && hovered

  // Gradient background using the project's language color
  const bg = `radial-gradient(ellipse at 75% 25%, ${item.languageColor}40 0%, transparent 55%),
               radial-gradient(ellipse at 25% 75%, ${item.languageColor}25 0%, transparent 50%),
               rgba(8, 8, 18, 0.97)`

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── DEFAULT VIEW: big icon + name ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6"
        animate={{ opacity: showDetails ? 0 : 1, scale: showDetails ? 0.92 : 1 }}
        transition={{ duration: 0.22 }}
        style={{ pointerEvents: showDetails ? 'none' : 'auto' }}
      >
        <span className="text-7xl drop-shadow-lg leading-none">{item.icon}</span>
        <div className="text-center">
          <h3 className="text-white font-bold text-2xl tracking-tight leading-snug">{item.title}</h3>
          <span
            className="text-xs font-mono tracking-widest uppercase mt-1.5 block"
            style={{ color: item.languageColor }}
          >
            {item.tag}
          </span>
        </div>
        {item.featured && (
          <span className="absolute top-4 right-4 text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-mono">
            ⭐ Featured
          </span>
        )}
      </motion.div>

      {/* ── HOVER VIEW: full details ── */}
      <motion.div
        className="absolute inset-0 flex flex-col p-6 gap-3"
        animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 14 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: showDetails ? 'auto' : 'none' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl flex-shrink-0 leading-none">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
            <span className="text-xs font-mono tracking-wider uppercase" style={{ color: item.languageColor }}>
              {item.tag}
            </span>
          </div>
          {item.featured && (
            <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-mono flex-shrink-0">
              ⭐
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed flex-1 line-clamp-4">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-slate-300"
            >
              {t}
            </span>
          ))}
          {item.tags.length > 5 && (
            <span className="text-xs text-slate-500 self-center">+{item.tags.length - 5}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.languageColor }}
          />
          <span className="text-xs text-slate-400 font-mono flex-1">{item.language}</span>
          {item.homepageUrl && (
            <a
              href={item.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Démo live
            </a>
          )}
        </div>
      </motion.div>

      {/* Bottom fade (default view only) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
        animate={{ opacity: showDetails ? 0 : 1 }}
        transition={{ duration: 0.22 }}
      />
    </div>
  )
}
