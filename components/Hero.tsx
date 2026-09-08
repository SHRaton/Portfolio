'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import StarField from './StarField'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setTimeout(() => el.classList.add('visible'), 100)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      {/* Stars — contained to this section only */}
      <StarField />

      {/* Ambient orbs — contained to hero */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div
        ref={containerRef}
        className="section-animate relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-sm text-violet-400 tracking-widest">DISPONIBLE</span>
          </div>

          <div>
            <p className="text-slate-400 font-mono text-sm mb-2 tracking-wider">Bonjour, je suis</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Alexandre</span>
              <br />
              <span className="gradient-text">Vittenet</span>
            </h1>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            Étudiant à <span className="text-purple-400 font-semibold">Epitech</span>, passionné par le développement
            système, les jeux et la cybersécurité. Je construis des projets{' '}
            <span className="text-violet-300 font-semibold">ambitieux</span> en C, C++, Python et JavaScript.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn-secondary">
              Me contacter
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold gradient-text">10+</div>
              <div className="text-xs text-slate-500 mt-1">Projets</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold gradient-text">4+</div>
              <div className="text-xs text-slate-500 mt-1">Langages</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold gradient-text">3+</div>
              <div className="text-xs text-slate-500 mt-1">Ans Epitech</div>
            </div>
          </div>
        </div>

        {/* Right: Avatar card */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute -inset-8 rounded-full border border-purple-500/20 animate-pulse-slow" />
            <div className="absolute -inset-16 rounded-full border border-violet-500/10" />

            {/* Avatar */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden glass glow-purple border-2 border-purple-500/30">
              <Image
                src="https://avatars.githubusercontent.com/u/114911012?v=4"
                alt="Alexandre Vittenet"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-2 border border-purple-500/30">
              <div className="flex items-center gap-2">
                <span className="text-xl">💻</span>
                <div>
                  <div className="text-xs font-semibold text-white">Epitech</div>
                  <div className="text-xs text-slate-400">Student</div>
                </div>
              </div>
            </div>

            {/* Tech badge floating */}
            <div className="absolute -top-4 -left-4 glass rounded-xl px-3 py-1.5 border border-violet-500/30 font-mono text-xs text-violet-300">
              C++ / ECS
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 z-10">
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
