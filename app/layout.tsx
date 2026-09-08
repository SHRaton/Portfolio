import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import { LanguageProvider } from '@/lib/LanguageContext'

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
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
