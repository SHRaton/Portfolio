import type { Metadata } from 'next'
import './globals.css'
import StarField from '@/components/StarField'
import SolarSystem from '@/components/SolarSystem'
import PlanetsToggle from '@/components/PlanetsToggle'

export const metadata: Metadata = {
  title: 'Alexandre Vittenet — Portfolio',
  description: 'Étudiant Epitech — Développeur passionné par les systèmes, les jeux et la cybersécurité.',
  keywords: ['Portfolio', 'Alexandre Vittenet', 'Epitech', 'C++', 'Developer', 'Game Dev'],
  openGraph: {
    title: 'Alexandre Vittenet — Portfolio',
    description: 'Étudiant Epitech — Développeur passionné par les systèmes, les jeux et la cybersécurité.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased noise">
        <StarField />
        <SolarSystem />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <PlanetsToggle />
        {children}
      </body>
    </html>
  )
}
