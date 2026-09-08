'use client'

import { useEffect, useRef } from 'react'
import { SectionTitle } from './About'

interface TimelineEntry {
  year: string
  title: string
  org: string
  location: string
  description: string
  type: 'education' | 'internship' | 'exchange'
  tags?: string[]
}

const entries: TimelineEntry[] = [
  {
    year: '2019',
    title: 'Baccalauréat — Mention Bien',
    org: 'Lycée Paul Mélizan',
    location: 'France',
    description: 'Spécialités Mathématiques & Physique-Chimie.',
    type: 'education',
    tags: ['Maths', 'Physique', 'Mention Bien'],
  },
  {
    year: '2022',
    title: 'Étudiant en informatique',
    org: 'Epitech',
    location: 'Marseille, France',
    description:
      'Programme de 5 ans axé sur la pratique : projets en C, C++, Python, JavaScript. Pédagogie par projets sans cours magistraux.',
    type: 'education',
    tags: ['C', 'C++', 'Python', 'JavaScript', 'EIP'],
  },
  {
    year: '2023',
    title: 'Stage — Développeur Full Stack',
    org: 'Quantic Dream',
    location: 'Paris, France',
    description:
      'Stage dans le domaine du jeu vidéo au sein du studio français connu pour Detroit: Become Human et Heavy Rain.',
    type: 'internship',
    tags: ['Full Stack', 'Jeu Vidéo', 'AAA'],
  },
  {
    year: '2024',
    title: 'Stage — Développeur Full Stack',
    org: 'Eight Bamboos',
    location: 'France',
    description:
      'Stage à temps partiel — développement full stack sur un jeu indépendant jouable sur navigateur web.',
    type: 'internship',
    tags: ['Full Stack', 'Jeu Indie', 'Web', 'Browser Game'],
  },
  {
    year: '2025',
    title: 'Stage — Développeur 3D',
    org: 'Stage Dev 3D',
    location: 'France',
    description:
      'Développement en C# avec le moteur physique BeepU Physics. Travail sur un moteur physique et rendu de nuages de points.',
    type: 'internship',
    tags: ['C#', 'BeepU Physics', '3D', 'Nuage de points', 'Moteur physique'],
  },
  {
    year: '2025',
    title: 'Étudiant d\'échange — Double diplôme Big Data',
    org: 'Keimyung University',
    location: 'Daegu, Corée du Sud',
    description:
      'Année universitaire en échange à la Keimyung University. Cursus Big Data en double diplôme, immersion culturelle en Asie.',
    type: 'exchange',
    tags: ['Big Data', 'Double diplôme', 'Corée du Sud', 'Échange universitaire'],
  },
]

const typeConfig = {
  education: { color: 'border-purple-500 bg-purple-500', label: 'Formation', textColor: 'text-purple-400' },
  internship: { color: 'border-cyan-500 bg-cyan-500', label: 'Stage', textColor: 'text-cyan-400' },
  exchange: { color: 'border-emerald-500 bg-emerald-500', label: 'Échange', textColor: 'text-emerald-400' },
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <section id="parcours" className="py-24 px-6">
      <div ref={ref} className="section-animate max-w-4xl mx-auto">
        <SectionTitle label="PARCOURS" title="Mon parcours & expériences" />

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-cyan-500/40 to-transparent" />

          <div className="flex flex-col gap-10">
            {entries.map((entry, i) => {
              const cfg = typeConfig[entry.type]
              return (
                <div key={i} className="relative pl-16">
                  {/* Dot on the line */}
                  <div className={`absolute left-[18px] top-6 w-4 h-4 rounded-full border-2 ${cfg.color} -translate-x-1/2 z-10 shadow-lg`} />

                  {/* Card */}
                  <div className="glass rounded-2xl p-6 glass-hover transition-all duration-300 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-mono text-xs font-semibold ${cfg.textColor}`}>{entry.year}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.textColor} border-current opacity-70`}>
                            {cfg.label}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight">{entry.title}</h3>
                        <p className="text-slate-400 text-sm mt-0.5">
                          {entry.org}
                          {entry.location && (
                            <span className="text-slate-500"> · {entry.location}</span>
                          )}
                        </p>
                      </div>

                      {/* Photo placeholder */}
                      <div className="flex-shrink-0 w-24 h-20 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-1 text-slate-600 hover:border-purple-500/40 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-center leading-tight px-1">Photo</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">{entry.description}</p>

                    {/* Tags */}
                    {entry.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
