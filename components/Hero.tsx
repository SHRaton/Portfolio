'use client'

import { Download } from 'lucide-react'
import StarField from './StarField'
import { AuroraShader } from './ui/aurora-shader'
import { TextScramble } from './ui/text-scramble'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'
import { assetPath } from '@/lib/assetPath'
import { projects } from '@/lib/projects'

export default function Hero() {
  const { lang } = useLanguage()
  const t = ui[lang].hero

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-28 px-6 overflow-hidden">
      {/* Aurora (WebGL, reacts to the cursor) fading into the page at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 55%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent)',
        }}
      >
        <AuroraShader className="w-full h-full opacity-90" />
      </div>
      <StarField />

      {/* No fade-in here: the hero is above the fold, hiding it until hydration delayed LCP by ~1.7s on mobile */}
      <div
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-6 md:gap-8"
      >
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-2xl sm:rounded-full border border-violet-400/25 bg-violet-500/10 max-w-full">
          <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
          <span className="font-mono text-xs md:text-sm text-violet-200 tracking-wide sm:tracking-widest text-center">{t.badge}</span>
        </div>

        <div>
          <p className="text-slate-400 font-mono text-xs md:text-sm mb-3 md:mb-4 tracking-wider">{t.greeting}</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <TextScramble text="Alexandre" className="text-white" delay={250} scrambleOnHover />{' '}
            <br />
            <TextScramble text="Vittenet" className="gradient-text" delay={450} duration={1100} scrambleOnHover />
          </h1>
        </div>

        <p className="text-slate-400 text-base md:text-xl lg:text-2xl leading-relaxed max-w-3xl">
          {t.desc1}
          <span className="text-purple-400 font-semibold">Epitech</span>
          {t.desc2}
          <span className="text-violet-300 font-semibold">{t.descAccent}</span>
          {t.desc3}
        </p>

        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          <a href="#projects" className="btn-glow text-sm md:text-base">{t.cta1}</a>
          <a href="#contact" className="btn-secondary text-sm md:text-base">{t.cta2}</a>
          <a
            href={assetPath('/cv.pdf')}
            download="CV-Alexandre-Vittenet.pdf"
            className="btn-secondary text-sm md:text-base inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" aria-hidden />
            {t.cv}
          </a>
        </div>

        <ul className="flex gap-4 md:gap-8 pt-2 md:pt-4">
          {[
            { value: String(projects.length), label: t.statProjects, href: '#projects' },
            { value: '25+', label: t.statTech, href: '#about' },
            { value: t.statYearsValue, label: t.statYears, href: '#parcours' },
          ].map(({ value, label, href }, i) => (
            <li key={href} className="flex gap-4 md:gap-8">
              {i > 0 && <span className="w-px bg-white/10" aria-hidden />}
              <a
                href={href}
                className="group text-center rounded-lg px-2 py-1 hover:bg-white/5 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text">{value}</div>
                <div className="text-xs md:text-sm text-slate-400 group-hover:text-violet-300 mt-1 transition-colors">
                  {label}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 z-10">
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
