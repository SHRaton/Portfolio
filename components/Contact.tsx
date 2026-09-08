'use client'

import { useEffect, useRef } from 'react'
import { SectionTitle } from './About'

const socials = [
  {
    name: 'GitHub',
    handle: '@SHRaton',
    url: 'https://github.com/SHRaton',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: 'hover:border-slate-400/40 hover:text-slate-200',
  },
  {
    name: 'Email',
    handle: 'alexandre.vittenet@gmail.com',
    url: 'mailto:alexandre.vittenet@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'hover:border-purple-400/40 hover:text-purple-300',
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="py-24 px-6">
      <div ref={ref} className="section-animate max-w-4xl mx-auto">
        <SectionTitle label="CONTACT" title="Travaillons ensemble" />

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Je suis ouvert aux opportunités de stage
            </p>
            <p className="text-slate-400 leading-relaxed">
              Que ce soit pour un projet de jeu, une application système, une webapp ou un défi en
              cybersécurité — n&apos;hésitez pas à me contacter.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {socials.map(({ name, handle, url, icon, color }) => (
                <a
                  key={name}
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`glass rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-300 border border-white/10 ${color} group`}
                >
                  <span className="text-slate-400 group-hover:scale-110 transition-transform">{icon}</span>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{name}</div>
                    <div className="text-sm text-slate-200 font-medium">{handle}</div>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto text-slate-700 group-hover:text-current transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="glass rounded-2xl p-8 border border-purple-500/20 glow-purple">
            <div className="text-4xl mb-4">👋</div>
            <h3 className="text-white font-bold text-xl mb-3">Disponible pour des opportunités</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Étudiant en 5ème année à Epitech à la recherche de stage. Passionné, autonome et toujours prêt à
              relever de nouveaux défis techniques.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-300">Disponible immédiatement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-sm text-slate-300">Stage / Durée : 6 mois</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm text-slate-300">Remote ou présentiel</span>
              </div>
            </div>

            <a
              href="mailto:alexandre.vittenet@epitech.eu"
              className="btn-primary mt-6 w-full text-center block"
            >
              M&apos;envoyer un email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
