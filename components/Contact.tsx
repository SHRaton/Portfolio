'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
  },
  {
    name: 'LinkedIn',
    handle: 'alexandre-vittenet',
    url: 'https://linkedin.com/in/alexandre-vittenet',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
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
      <div ref={ref} className="section-animate max-w-2xl mx-auto">
        <SectionTitle label="CONTACT" title="Travaillons ensemble" />

        <div className="mt-12 flex flex-col gap-5">
          <p className="text-slate-300 text-lg leading-relaxed">
            Je suis ouvert aux opportunités de stage
          </p>
          <p className="text-slate-400 leading-relaxed">
            Que ce soit pour un projet de jeu, une application système, une webapp ou un défi en
            cybersécurité — n&apos;hésitez pas à me contacter.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            {socials.map(({ name, handle, url, icon }) => (
              <motion.a
                key={name}
                href={url}
                target={url.startsWith('http') ? '_blank' : undefined}
                rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl px-5 py-4 flex items-center gap-4 border border-white/10 group"
                whileHover={{
                  y: -5,
                  borderColor: 'rgba(168, 85, 247, 0.55)',
                  boxShadow: '0 16px 40px rgba(124, 58, 237, 0.22), 0 0 0 1px rgba(168, 85, 247, 0.12)',
                  backgroundColor: 'rgba(124, 58, 237, 0.07)',
                }}
                whileTap={{ y: -2, scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <span className="text-slate-500 group-hover:text-violet-400 transition-colors duration-200">
                  {icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 font-mono">{name}</div>
                  <div className="text-sm text-slate-200 font-medium truncate">{handle}</div>
                </div>
                <svg
                  className="w-4 h-4 shrink-0 text-slate-700 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
