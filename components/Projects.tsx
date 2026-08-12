'use client'

import { useEffect, useRef, useState } from 'react'
import { projects, Project } from '@/lib/projects'
import { SectionTitle } from './About'

const categories = ['Tous', 'Game Dev', 'Full-Stack', 'Réseau', 'Système', 'Graphisme', 'CyberSec', 'Mathématiques']

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('Tous')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const featured = projects.filter((p) => p.featured)
  const filtered =
    activeCategory === 'Tous'
      ? projects.filter((p) => !p.featured)
      : projects.filter((p) => !p.featured && p.category === activeCategory)

  return (
    <section id="projects" className="py-24 px-6">
      <div ref={ref} className="section-animate max-w-6xl mx-auto">
        <SectionTitle label="PROJETS" title="Ce que j'ai construit" />

        {/* Featured */}
        <div className="mt-16">
          <h3 className="text-slate-400 text-sm font-mono mb-6 tracking-wider">⭐ PROJETS PHARES</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((project) => (
              <FeaturedCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* All projects */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-slate-400 text-sm font-mono tracking-wider">TOUS LES PROJETS</h3>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'glass text-slate-400 hover:text-white hover:border-purple-500/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-12 text-slate-500">
                Aucun projet dans cette catégorie.
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
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

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="gradient-border glass rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4 group hover:bg-white/[0.08] hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]">
      <div className="flex items-start justify-between">
        <div className="text-4xl">{project.icon}</div>
        <span className="tag">{project.category}</span>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{project.longDesc}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag">+{project.tags.length - 4}</span>
        )}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.languageColor }} />
        <span className="text-xs text-slate-400 font-mono">{project.language}</span>

        <div className="ml-auto flex items-center gap-2">
          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Démo live
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-600 hover:text-purple-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-xl p-5 glass-hover transition-all duration-300 flex flex-col gap-3 group"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{project.icon}</span>
        <div>
          <h3 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-slate-500">{project.category}</span>
        </div>
        <svg className="w-4 h-4 ml-auto text-slate-700 group-hover:text-purple-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1 mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag text-xs">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.languageColor }} />
        <span className="text-xs text-slate-500 font-mono">{project.language}</span>
      </div>
    </a>
  )
}
