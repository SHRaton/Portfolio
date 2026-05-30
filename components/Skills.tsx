'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from './About'

const skills = [
  { name: 'C / C++', level: 85, category: 'Système', color: 'from-blue-500 to-cyan-400' },
  { name: 'Python', level: 75, category: 'Scripting', color: 'from-yellow-500 to-orange-400' },
  { name: 'JavaScript', level: 70, category: 'Web', color: 'from-yellow-400 to-yellow-300' },
  { name: 'CMake / Make', level: 75, category: 'Build', color: 'from-purple-500 to-pink-400' },
  { name: 'SFML / SDL', level: 70, category: 'Graphics', color: 'from-green-500 to-emerald-400' },
  { name: 'Git / GitHub', level: 80, category: 'Outils', color: 'from-orange-500 to-red-400' },
  { name: 'Réseau TCP/UDP', level: 72, category: 'Système', color: 'from-cyan-500 to-blue-400' },
  { name: 'Cybersécurité', level: 60, category: 'Sécurité', color: 'from-red-500 to-pink-400' },
]

const tools = [
  { name: 'Linux', icon: '🐧' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GDB', icon: '🔍' },
  { name: 'Valgrind', icon: '🧹' },
  { name: 'VS Code', icon: '📝' },
  { name: 'CMake', icon: '⚙️' },
  { name: 'Conan', icon: '📦' },
  { name: 'GitHub Actions', icon: '🚀' },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          setAnimate(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-24 px-6">
      <div ref={ref} className="section-animate max-w-6xl mx-auto">
        <SectionTitle label="COMPÉTENCES" title="Ce que je maîtrise" />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {/* Skill bars */}
          <div className="flex flex-col gap-6">
            {skills.map(({ name, level, category, color }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{name}</span>
                    <span className="tag text-xs">{category}</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">{level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className={`skill-fill bg-gradient-to-r ${color}`}
                    style={{ width: animate ? `${level}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools + categories */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Environnement & Outils</h3>
              <div className="grid grid-cols-2 gap-3">
                {tools.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="glass rounded-xl p-3 flex items-center gap-3 glass-hover transition-all duration-300"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm text-slate-300 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Domaines d&apos;expertise</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Développement Système',
                  'Programmation réseau',
                  'ECS Architecture',
                  'Game Development',
                  'Full-Stack Web',
                  'Cybersécurité',
                  'Analyse numérique',
                  'Raytracing',
                ].map((domain) => (
                  <span key={domain} className="tag-cyan tag">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
