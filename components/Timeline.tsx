'use client'

import { SectionTitle } from './About'
import { ScrollTimeline, type TimelineItem, type TimelineKind } from './ui/scroll-timeline'
import { useLanguage } from '@/lib/LanguageContext'
import { ui } from '@/lib/i18n'

type Bil = { fr: string; en: string }

interface BilEvent {
  id: string
  date: Bil
  title: Bil
  /** "Organisation · Place" */
  subtitle: string
  description: Bil
  category: Bil
  color?: string
  image?: string
  logo?: string
  logoFallback?: string
  logoBg?: 'light' | 'dark'
  tags?: string[]
}

const KIND: Record<string, TimelineKind> = {
  Formation: 'education',
  Stage: 'internship',
  Échange: 'exchange',
}

const bilEvents: BilEvent[] = [
  {
    id: '1',
    date: { fr: '2019', en: '2019' },
    title: { fr: 'Baccalauréat — Mention Bien', en: 'High School Diploma — With Honours' },
    subtitle: 'Lycée Paul Mélizan · France',
    description: {
      fr: 'Spécialités Mathématiques & Physique-Chimie. Mention Bien obtenue au baccalauréat général.',
      en: 'Majoring in Mathematics & Physics-Chemistry. Graduated with Honours (Mention Bien).',
    },
    category: { fr: 'Formation', en: 'Education' },
    color: 'fuchsia',
    image: '/photos/melizan.webp',
    logo: '/logos/melizan.webp',
    logoFallback: 'LP',
    tags: ['Maths', 'Physique-Chimie', 'Mention Bien'],
  },
  {
    id: '2',
    date: { fr: '2022', en: '2022' },
    title: { fr: 'Étudiant en informatique', en: 'Computer Science Student' },
    subtitle: 'Epitech · Marseille, France',
    description: {
      fr: "Programme de 5 ans axé sur la pratique : projets en C, C++, Python et JavaScript sans cours magistraux. Projet Innovant Epitech (EIP) en 4e et 5e année — plateforme éducative Milo.",
      en: '5-year project-based program: hands-on coding in C, C++, Python and JavaScript with no traditional lectures. Epitech Innovative Project (EIP) in 4th & 5th year — the Milo educational platform.',
    },
    category: { fr: 'Formation', en: 'Education' },
    color: 'violet',
    image: '/photos/epitech.webp',
    logo: '/logos/epitech_logo.webp',
    logoFallback: 'EP',
    tags: ['C', 'C++', 'Python', 'JavaScript', 'EIP', 'Milo'],
  },
  {
    id: '3',
    date: { fr: '2023', en: '2023' },
    title: { fr: 'Stage — Développeur Full Stack', en: 'Internship — Full Stack Developer' },
    subtitle: 'Quantic Dream · Paris, France',
    description: {
      fr: "Stage dans le domaine du jeu vidéo au sein du studio français connu pour Detroit: Become Human, Heavy Rain et Star Wars Eclipse. Développement full stack dans un environnement AAA.",
      en: 'Internship at the French game studio known for Detroit: Become Human, Heavy Rain and Star Wars Eclipse. Full-stack development in an AAA environment.',
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'purple',
    image: '/photos/quantic_dream.webp',
    logo: '/logos/quantic_dream_logo.webp',
    logoFallback: 'QD',
    tags: ['Full Stack', 'Jeu Vidéo', 'AAA', 'Paris'],
  },
  {
    id: '4',
    date: { fr: '2024', en: '2024' },
    title: { fr: 'Stage — Développeur Full Stack', en: 'Internship — Full Stack Developer' },
    subtitle: 'Eight Bamboos · France',
    description: {
      fr: "Stage à temps partiel — développement full stack sur un jeu indépendant jouable directement sur navigateur web. Participation à toutes les phases du cycle de développement.",
      en: 'Part-time internship — full-stack development on an indie game playable directly in the browser. Involved in all phases of the development cycle.',
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'violet',
    image: '/photos/eight_bamboos.webp',
    logo: '/logos/eight_bamboos_logo.webp',
    logoBg: 'dark',
    logoFallback: 'EB',
    tags: ['Full Stack', 'Jeu Indie', 'Web', 'Browser Game'],
  },
  {
    id: '5',
    date: { fr: '2025', en: '2025' },
    title: { fr: 'Stage — Développeur 3D', en: 'Internship — 3D Developer' },
    subtitle: 'Cyclife Digital Solutions · France',
    description: {
      fr: "Développement en C# avec le moteur physique BeepU Physics. Travail sur un moteur physique avancé et rendu de nuages de points pour des applications de simulation.",
      en: 'C# development with the BeepU Physics engine. Work on an advanced physics engine and point cloud rendering for simulation applications.',
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'purple',
    image: '/photos/cyclife.webp',
    logo: '/logos/cyclife_logo.webp',
    logoFallback: 'CD',
    tags: ['C#', 'BeepU Physics', '3D', 'Nuage de points', 'Moteur physique'],
  },
  {
    id: '6',
    date: { fr: '2025', en: '2025' },
    title: {
      fr: "Étudiant d'échange — Double diplôme Big Data",
      en: 'Exchange Student — Big Data Dual Degree',
    },
    subtitle: 'Keimyung University · Daegu, South Korea',
    description: {
      fr: "Année universitaire en échange à la Keimyung University. Cursus Big Data en double diplôme avec Epitech. Immersion culturelle complète en Asie du Sud-Est.",
      en: 'Academic exchange year at Keimyung University. Big Data dual-degree curriculum with Epitech. Full cultural immersion in South Korea.',
    },
    category: { fr: 'Échange', en: 'Exchange' },
    color: 'fuchsia',
    image: '/photos/keimyung.webp',
    logo: '/logos/keimyung_logo.webp',
    logoFallback: 'KU',
    tags: ['Big Data', 'Double diplôme', 'Corée du Sud', 'Échange universitaire'],
  },
]

export default function Timeline() {
  const { lang } = useLanguage()
  const t = ui[lang].timeline

  const items: TimelineItem[] = bilEvents.map((e) => {
    const [org, ...place] = e.subtitle.split(' · ')
    return {
      id: e.id,
      year: e.date[lang],
      kind: KIND[e.category.fr] ?? 'education',
      category: e.category[lang],
      title: e.title[lang],
      org,
      place: place.join(' · ') || undefined,
      description: e.description[lang],
      image: e.image,
      logo: e.logo,
      logoBg: e.logoBg,
      tags: e.tags,
    }
  })

  return (
    <section id="parcours" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label={t.label} title={t.title} />
        <div className="mt-14 max-w-5xl">
          <ScrollTimeline
            items={items}
            end={
              lang === 'fr'
                ? {
                    year: '2026',
                    title: 'Et maintenant ?',
                    text: "Dernière année à Epitech — je cherche un stage de fin d'études de 6 mois à partir de mars 2027 pour mettre tout ça en pratique dans une équipe.",
                    cta: 'Me contacter',
                    href: '#contact',
                  }
                : {
                    year: '2026',
                    title: "What's next?",
                    text: 'Final year at Epitech — looking for a 6-month final-year internship from March 2027 to put all of this to work in a team.',
                    cta: 'Get in touch',
                    href: '#contact',
                  }
            }
          />
        </div>
      </div>
    </section>
  )
}
