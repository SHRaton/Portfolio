'use client'

import { useEffect, useRef } from 'react'
import StarField from './StarField'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const t = ui[lang].hero

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setTimeout(() => el.classList.add('visible'), 100)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      <StarField />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div
        ref={containerRef}
        className="section-animate relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-8"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-sm text-violet-400 tracking-widest">{t.badge}</span>
        </div>

        <div>
          <p className="text-slate-400 font-mono text-sm mb-4 tracking-wider">{t.greeting}</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <span className="text-white">Alexandre</span>
            <br />
            <span className="gradient-text">Vittenet</span>
          </h1>
        </div>

        <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl">
          {t.desc1}
          <span className="text-purple-400 font-semibold">Epitech</span>
          {t.desc2}
          <span className="text-violet-300 font-semibold">{t.descAccent}</span>
          {t.desc3}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="btn-primary">{t.cta1}</a>
          <a href="#contact" className="btn-secondary">{t.cta2}</a>
        </div>

        <div className="flex gap-12 pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">20+</div>
            <div className="text-xs text-slate-500 mt-1">Projets</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">25+</div>
            <div className="text-xs text-slate-500 mt-1">Technologies</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">4+</div>
            <div className="text-xs text-slate-500 mt-1">{t.statYears}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 z-10">
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
