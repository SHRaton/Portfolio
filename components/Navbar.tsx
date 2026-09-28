'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const { lang, toggleLang } = useLanguage()
  const t = ui[lang].nav

  const links = [
    { href: '#about', label: t.about },
    { href: '#parcours', label: t.timeline },
    { href: '#projects', label: t.projects },
    { href: '#contact', label: t.contact },
  ]

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Highlight the link of the section crossing the middle of the viewport
  useEffect(() => {
    const sections = ['about', 'parcours', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((el) => observer.observe(el))
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActiveId(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
    <a href="#main" className="skip-link">
      {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
    </a>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <nav aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'} className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          aria-label={lang === 'fr' ? 'Retour en haut — Alexandre Vittenet' : 'Back to top — Alexandre Vittenet'}
          className="font-mono text-lg font-semibold gradient-text hover:opacity-80 transition-opacity"
        >
          AV<span className="text-white/40">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={activeId === href.slice(1) ? 'location' : undefined}
                className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                  activeId === href.slice(1) ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
                {activeId === href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <LangToggle lang={lang} toggleLang={toggleLang} />

          <a
            href="https://github.com/SHRaton"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 btn-secondary text-sm py-2 px-4"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle lang={lang} toggleLang={toggleLang} />
          <button
            className="w-11 h-11 -mr-2 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? (lang === 'fr' ? 'Fermer le menu' : 'Close menu') : (lang === 'fr' ? 'Ouvrir le menu' : 'Open menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" aria-hidden fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" aria-hidden fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden glass border-t border-white/10 px-6 py-2 flex flex-col">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={activeId === href.slice(1) ? 'location' : undefined}
              className={`transition-colors text-base font-medium py-3 ${
                activeId === href.slice(1) ? 'text-violet-300' : 'text-slate-300 hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/SHRaton"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors text-base font-medium flex items-center gap-2 py-3"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      )}
    </header>

    <AnimatePresence>
      {showTop && (
        <motion.a
          href="#"
          aria-label={lang === 'fr' ? 'Retour en haut de la page' : 'Back to top'}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass border border-white/15 flex items-center justify-center text-slate-200 hover:text-white hover:border-violet-400/60 shadow-lg shadow-violet-900/30 transition-colors"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="w-5 h-5" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
    </>
  )
}

function LangToggle({ lang, toggleLang }: { lang: 'fr' | 'en'; toggleLang: () => void }) {
  return (
    <button
      onClick={toggleLang}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className="relative flex items-center min-h-[36px] glass rounded-full border border-white/10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-y-[2px] rounded-full bg-gradient-to-r from-violet-700 to-purple-500"
        animate={
          lang === 'fr'
            ? { left: '2px', right: '50%' }
            : { left: '50%', right: '2px' }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <span
        className={`relative z-10 w-10 text-center py-1.5 text-xs font-mono font-bold transition-colors duration-150 ${
          lang === 'fr' ? 'text-white' : 'text-slate-400'
        }`}
      >
        FR
      </span>
      <span
        className={`relative z-10 w-10 text-center py-1.5 text-xs font-mono font-bold transition-colors duration-150 ${
          lang === 'en' ? 'text-white' : 'text-slate-400'
        }`}
      >
        EN
      </span>
    </button>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
