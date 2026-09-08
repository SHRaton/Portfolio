'use client'

import { useEffect, useRef } from 'react'
import { InfiniteSlider, SliderLogo } from './ui/infinite-slider'

const highlights = [
  {
    icon: '🎮',
    title: 'Game Development',
    desc: 'R-Type, RPGG, Game Jams — je construis des jeux avec C et C++, en gérant les boucles de jeu, la physique et les graphismes.',
  },
  {
    icon: '🌐',
    title: 'Systèmes & Réseau',
    desc: 'Serveurs TCP/UDP, protocoles multi-clients, architecture client-serveur avec des projets comme Zappy et R-Type.',
  },
  {
    icon: '🔐',
    title: 'Cybersécurité',
    desc: 'Passionné par la sécurité offensive et défensive, CTF et exploration des vulnérabilités systèmes.',
  },
  {
    icon: '🤖',
    title: 'Automatisation',
    desc: 'Plateformes d\'automation type IFTTT/Zapier, intégration d\'APIs tierces, interfaces web et mobile.',
  },
]

// Logos sourced from Simple Icons CDN — colors are brand or adjusted for dark background visibility
const logos: SliderLogo[] = [
  { src: 'https://cdn.simpleicons.org/c/a8b9cc', alt: 'C' },
  { src: 'https://cdn.simpleicons.org/cplusplus/659ad2', alt: 'C++' },
  { src: 'https://cdn.simpleicons.org/python/ffdf76', alt: 'Python' },
  { src: 'https://cdn.simpleicons.org/javascript/f7df1e', alt: 'JavaScript' },
  { src: 'https://cdn.simpleicons.org/typescript/3178c6', alt: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/react/61dafb', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/nodedotjs/6da55f', alt: 'Node.js' },
  { src: 'https://cdn.simpleicons.org/docker/2496ed', alt: 'Docker' },
  { src: 'https://cdn.simpleicons.org/git/f05032', alt: 'Git' },
  { src: 'https://cdn.simpleicons.org/github/c4b5fd', alt: 'GitHub' },
  { src: 'https://cdn.simpleicons.org/linux/fcc624', alt: 'Linux' },
  { src: 'https://cdn.simpleicons.org/tailwindcss/38bdf8', alt: 'Tailwind' },
  { src: 'https://cdn.simpleicons.org/threedotjs/ffffff', alt: 'Three.js' },
  { src: 'https://cdn.simpleicons.org/expo/ffffff', alt: 'Expo' },
  { src: 'https://cdn.simpleicons.org/visualstudiocode/007acc', alt: 'VS Code' },
  { src: 'https://cdn.simpleicons.org/cmake/3fbfbf', alt: 'CMake' },
]

export default function About() {
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
    <section id="about" className="py-24 px-6">
      <div ref={ref} className="section-animate max-w-6xl mx-auto">
        <SectionTitle label="À PROPOS" title="Qui suis-je ?" />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <p className="text-slate-300 leading-relaxed text-lg">
              Je suis <span className="text-white font-semibold">Alexandre Vittenet</span>, étudiant en 5ème année
              à <span className="gradient-text font-semibold">Epitech</span> (École pour l&apos;Informatique et les
              nouvelles Technologies).
            </p>
            <p className="text-slate-400 leading-relaxed">
              Mon parcours m&apos;a conduit à travailler sur des projets variés et ambitieux : des moteurs de rendu
              graphique en C++, des jeux multi-joueurs en réseau, des plateformes web full-stack et des outils
              d&apos;automatisation. Chaque projet Epitech est une opportunité de pousser mes limites.
            </p>
            <p className="text-slate-400 leading-relaxed">
              En dehors de l&apos;école, je m&apos;intéresse à la{' '}
              <span className="text-violet-400">cybersécurité</span>, aux game jams et à l&apos;exploration des
              architectures logicielles modernes.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {['C', 'C++', 'Python', 'JavaScript', 'CMake', 'SFML', 'Docker', 'Git'].map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-5 glass-hover transition-all duration-300 cursor-default"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech logos marquee */}
        <div className="mt-16">
          <p className="text-xs font-mono text-slate-600 tracking-widest mb-6 text-center">TECHNOLOGIES</p>
          <InfiniteSlider logos={logos} speed={30} />
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <span className="font-mono text-xs tracking-widest text-purple-400">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h2>
      <div className="mt-3 w-16 h-1 rounded-full bg-gradient-to-r from-violet-400 to-purple-700" />
    </div>
  )
}
