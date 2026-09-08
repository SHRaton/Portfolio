'use client'

import { useEffect, useRef } from 'react'
import { InfiniteSlider, SliderLogo } from './ui/infinite-slider'
import { assetPath } from '@/lib/assetPath'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'

const logos: SliderLogo[] = [
  { src: 'https://cdn.simpleicons.org/c/a8b9cc', alt: 'C' },
  { src: 'https://cdn.simpleicons.org/cplusplus/659ad2', alt: 'C++' },
  { src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/csharp/default.svg', alt: 'CSharp' },
  { src: 'https://cdn.simpleicons.org/python/ffdf76', alt: 'Python' },
  { src: 'https://cdn.simpleicons.org/css/663399', alt: 'Css' },
  { src: 'https://cdn.simpleicons.org/html5/E34F26', alt: 'Html' },
  { src: 'https://cdn.simpleicons.org/javascript/f7df1e', alt: 'JavaScript' },
  { src: 'https://cdn.simpleicons.org/typescript/3178c6', alt: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/react/61dafb', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/nodedotjs/6da55f', alt: 'Node.js' },
  { src: 'https://cdn.simpleicons.org/docker/2496ed', alt: 'Docker' },
  { src: 'https://cdn.simpleicons.org/git/f05032', alt: 'Git' },
  { src: 'https://cdn.simpleicons.org/github/ffffff', alt: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/visual-studio-code/default.svg', alt: 'VS Code' },
  { src: 'https://cdn.simpleicons.org/linux/fcc624', alt: 'Linux' },
  { src: 'https://cdn.simpleicons.org/tailwindcss/38bdf8', alt: 'Tailwind' },
  { src: 'https://cdn.simpleicons.org/threedotjs/ffffff', alt: 'Three.js' },
  { src: 'https://cdn.simpleicons.org/expo/ffffff', alt: 'Expo' },
  { src: 'https://cdn.simpleicons.org/sfml/8CC445', alt: 'SFML' },
  { src: 'https://cdn.simpleicons.org/dotnet/512BD4', alt: 'DotNet' },
  { src: 'https://cdn.simpleicons.org/unity/ffffff', alt: 'Unity' },
  { src: 'https://cdn.simpleicons.org/blender/E87D0D', alt: 'Blender' },
  { src: 'https://cdn.simpleicons.org/sqlite/003B57', alt: 'SQLite' },
  { src: 'https://cdn.simpleicons.org/postgresql/4169E1', alt: 'PostgreSQL' },
  { src: 'https://cdn.simpleicons.org/mariadb/003545', alt: 'MariaDB' },
  { src: 'https://cdn.simpleicons.org/cmake/3fbfbf', alt: 'CMake' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const t = ui[lang].about

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
    <section id="about" className="section-alt py-24 px-6">
      <div ref={ref} className="section-animate max-w-6xl mx-auto">
        <SectionTitle label={t.label} title={t.title} />

        <div className="grid md:grid-cols-2 gap-12 mt-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            {lang === 'fr' ? (
              <>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {'Je suis '}
                  <span className="text-white font-semibold">Alexandre Vittenet</span>
                  {', étudiant en 5ème année à '}
                  <span className="gradient-text font-semibold">Epitech Marseille</span>
                  {'. Ma formation m\'a conduit à travailler sur des projets variés et ambitieux : des moteurs de rendu graphique en C++, des jeux multi-joueurs en réseau, des plateformes web full-stack et des outils d\'automatisation. Chaque projet Epitech est une opportunité de pousser mes limites.'}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {'J\'ai validé mon échange universitaire en Corée du Sud à '}
                  <span className="text-purple-400">Keimyung University</span>
                  {' à Daegu, où j\'ai approfondi mes compétences en '}
                  <span className="text-violet-400">cybersécurité</span>
                  {' et '}
                  <span className="text-violet-400">Big Data</span>
                  {', tout en découvrant une culture fascinante.'}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {'Mon parcours professionnel m\'a permis de travailler sur des projets concrets, notamment au sein de studios de jeux vidéo et d\'entreprises technologiques, où j\'ai pu appliquer mes compétences en développement logiciel '}
                  <span className="text-violet-400">backend</span>
                  {' et '}
                  <span className="text-violet-400">frontend</span>
                  {' en résolution de '}
                  <span className="text-violet-400">problèmes complexes</span>
                  {'.'}
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {'I am '}
                  <span className="text-white font-semibold">Alexandre Vittenet</span>
                  {', a 5th-year student at '}
                  <span className="gradient-text font-semibold">Epitech Marseille</span>
                  {'. My training led me to work on varied and ambitious projects: C++ rendering engines, networked multiplayer games, full-stack web platforms and automation tools. Every Epitech project is an opportunity to push my limits.'}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {'I completed my university exchange in South Korea at '}
                  <span className="text-purple-400">Keimyung University</span>
                  {' in Daegu, where I deepened my skills in '}
                  <span className="text-violet-400">cybersecurity</span>
                  {' and '}
                  <span className="text-violet-400">Big Data</span>
                  {', while discovering a fascinating culture.'}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {'My professional journey allowed me to work on real-world projects at video game studios and tech companies, where I applied my '}
                  <span className="text-violet-400">backend</span>
                  {' and '}
                  <span className="text-violet-400">frontend</span>
                  {' development skills to tackle '}
                  <span className="text-violet-400">complex challenges</span>
                  {'.'}
                </p>
              </>
            )}
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full border border-purple-500/20 animate-pulse" />
              <div className="absolute -inset-16 rounded-full border border-violet-500/10" />

              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden glass glow-purple border-2 border-purple-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath('/photo.jpg')}
                  alt="Alexandre Vittenet"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-2 border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💻</span>
                  <div>
                    <div className="text-xs font-semibold text-white">Epitech</div>
                    <div className="text-xs text-slate-400">Student</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 glass rounded-xl px-3 py-1.5 border border-violet-500/30 font-mono text-xs text-violet-300">
                21
              </div>
            </div>
          </div>
        </div>

        {/* Tech logos marquee */}
        <div className="mt-16">
          <p className="text-xs font-mono text-slate-600 tracking-widest mb-6 text-center">{t.techLabel}</p>
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
