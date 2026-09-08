'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()
  const t = ui[lang].nav

  const links = [
    { href: '#about', label: t.about },
    { href: '#parcours', label: t.timeline },
    { href: '#projects', label: t.projects },
    { href: '#contact', label: t.contact },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
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
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
              >
                {label}
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
            className="text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/SHRaton"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      )}
    </header>
  )
}

function LangToggle({ lang, toggleLang }: { lang: 'fr' | 'en'; toggleLang: () => void }) {
  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="relative flex items-center glass rounded-full border border-white/10 overflow-hidden"
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
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
