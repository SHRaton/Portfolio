'use client'

import { useEffect, useState } from 'react'
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
  const [cardWidth, setCardWidth] = useState(520)

  useEffect(() => {
    const update = () => setCardWidth(Math.min(520, window.innerWidth - 48))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cardHeight = Math.round(cardWidth * (340 / 520))

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="PROJETS" title="Ce que j'ai construit" />
        <p className="text-slate-500 text-sm mt-3">
          Glissez ou cliquez pour naviguer · {cardItems.length} projets
        </p>

        <div className="mt-12">
          <CardStack<ProjectCard>
            items={cardItems}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            showDots
            loop
            renderCard={(item, { active }) => (
              <ProjectCardContent item={item} active={active} />
            )}
          />
        </div>

        <div className="text-center mt-16">
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
      </div>
    </section>
  )
}

function ProjectCardContent({ item, active }: { item: ProjectCard; active: boolean }) {
  return (
    <div
      className="relative h-full w-full flex flex-col p-6 gap-3"
      style={{
        background: 'rgba(8, 8, 18, 0.75)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Featured badge */}
      {item.featured && (
        <span className="absolute top-4 right-4 text-xs font-mono bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">
          ⭐ Featured
        </span>
      )}

      {/* Header */}
      <div className="flex items-start gap-4" style={{ paddingRight: item.featured ? '6rem' : '0' }}>
        <span className="text-4xl flex-shrink-0">{item.icon}</span>
        <div>
          <span className="text-xs font-mono text-slate-500 tracking-wider uppercase">{item.tag}</span>
          <h3 className="text-xl font-bold text-white leading-tight mt-0.5">{item.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1 line-clamp-4">
        {active ? item.longDesc : item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.slice(0, 5).map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-slate-300"
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

      {/* Active indicator bar */}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500" />
      )}
    </div>
  )
}
