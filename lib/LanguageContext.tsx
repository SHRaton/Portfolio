'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from './i18n'

interface LangCtx {
  lang: Lang
  toggleLang: () => void
}

const LanguageContext = createContext<LangCtx>({ lang: 'fr', toggleLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang
    if (saved === 'fr' || saved === 'en') setLang(saved)
  }, [])

  const toggleLang = () =>
    setLang(prev => {
      const next = prev === 'fr' ? 'en' : 'fr'
      localStorage.setItem('portfolio-lang', next)
      return next
    })

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
