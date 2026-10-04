import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import Providers from '@/components/Providers'
import { jsonLd, profileJsonLd } from '@/lib/structuredData'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alexandre-vittenet.fr'),
  title: 'Alexandre Vittenet — Portfolio',
  description: 'Étudiant Epitech — Développeur passionné par les systèmes, les jeux et la cybersécurité.',
  keywords: ['Portfolio', 'Alexandre Vittenet', 'Epitech', 'C++', 'Developer', 'Game Dev'],
  openGraph: {
    title: 'Alexandre Vittenet — Portfolio',
    description: 'Étudiant Epitech — Développeur passionné par les systèmes, les jeux et la cybersécurité.',
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alexandre Vittenet — Portfolio' }],
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      {/* Extensions (e.g. Video Speed Controller) inject classes on <body> before hydration */}
      <body className="antialiased noise" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profileJsonLd)} />
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  )
}
