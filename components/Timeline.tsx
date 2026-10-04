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
  /** "Organisation · Place · Period" */
  subtitle: Bil
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
    date: { fr: '2022', en: '2022' },
    title: { fr: 'Baccalauréat général — Mention Bien', en: 'French Baccalaureate — With Honours' },
    subtitle: { fr: 'Lycée Paul Mélizan · Marseille, France · 2019 – 2022', en: 'Lycée Paul Mélizan · Marseille, France · 2019 – 2022' },
    description: {
      fr: 'Baccalauréat général, spécialités Mathématiques et Physique-Chimie, obtenu avec mention Bien.',
      en: 'General baccalaureate majoring in Mathematics and Physics-Chemistry, graduated with honours (Mention Bien).',
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
    title: {
      fr: 'Programme Grande École — Expert en Ingénierie Logicielle',
      en: 'Master-level programme — Software Engineering Expert',
    },
    subtitle: { fr: 'Epitech · Marseille, France · 2022 – 2027', en: 'Epitech · Marseille, France · 2022 – 2027' },
    description: {
      fr: "Titre RNCP niveau 7 (Bac+5), pédagogie par projets : développement logiciel et web, architecture de code, programmation orientée objet et gestion de projet. Projet de fin d'études (EIP) : Milo, une application d'aide aux devoirs par IA.",
      en: 'RNCP level 7 degree (Master level), project-based learning: software and web development, code architecture, object-oriented programming and project management. Final-year project (EIP): Milo, an AI-powered homework help app.',
    },
    category: { fr: 'Formation', en: 'Education' },
    color: 'violet',
    image: '/photos/epitech.webp',
    logo: '/logos/epitech_logo.webp',
    logoFallback: 'EP',
    tags: ['C', 'C++', 'C#', 'Python', 'TypeScript', 'RNCP 7', 'EIP Milo'],
  },
  {
    id: '3',
    date: { fr: '2023', en: '2023' },
    title: { fr: 'Stage — Développement jeu vidéo', en: 'Internship — Game Development' },
    subtitle: { fr: 'Quantic Dream · Paris, France · 09/2023 – 12/2023', en: 'Quantic Dream · Paris, France · 09/2023 – 12/2023' },
    description: {
      fr: "Au studio de Detroit: Become Human et Heavy Rain : entretiens avec l'ensemble des métiers du studio pour cartographier les rôles et les process internes, puis intégration de cette synthèse dans les dialogues d'un jeu d'onboarding interactif destiné aux nouveaux collaborateurs.",
      en: "At the studio behind Detroit: Become Human and Heavy Rain: interviewed every team in the studio to map roles and internal processes, then turned that synthesis into the dialogue of an interactive onboarding game for new employees.",
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'purple',
    image: '/photos/quantic_dream.webp',
    logo: '/logos/quantic_dream_logo.webp',
    logoFallback: 'QD',
    tags: ['C', 'CSFML', 'Jeu vidéo', 'Onboarding'],
  },
  {
    id: '4',
    date: { fr: '2024', en: '2024' },
    title: { fr: 'Stage — Développement Full-Stack Python/JavaScript', en: 'Internship — Full-Stack Python/JavaScript Development' },
    subtitle: { fr: 'Eight Bamboos · Distanciel · 09/2024 – 02/2025', en: 'Eight Bamboos · Remote · 09/2024 – 02/2025' },
    description: {
      fr: "Sur un MMORPG jouable dans le navigateur : développement d'un système d'enchères complet, conception d'un système de tags muraux en jeu avec son panneau d'administration, et modélisation procédurale 3D des décors en optimisant draw calls et nombre de polygones.",
      en: 'On a browser-based MMORPG: built a complete auction system, designed an in-game wall-tag system with its admin panel, and procedurally modelled 3D scenery while optimising draw calls and polygon count.',
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'violet',
    image: '/photos/eight_bamboos.webp',
    logo: '/logos/eight_bamboos_logo.webp',
    logoBg: 'dark',
    logoFallback: 'EB',
    tags: ['Python', 'MariaDB', 'JavaScript', 'Three.js', 'Canvas'],
  },
  {
    id: '5',
    date: { fr: '2025', en: '2025' },
    title: { fr: 'Stage — Développement C#/.NET', en: 'Internship — C#/.NET Development' },
    subtitle: {
      fr: 'Cyclife Digital Solutions (Groupe EDF) · Bagnols-sur-Cèze, France · 04/2025 – 07/2025',
      en: 'Cyclife Digital Solutions (EDF Group) · Bagnols-sur-Cèze, France · 04/2025 – 07/2025',
    },
    description: {
      fr: "Conception d'un wrapper physique modulaire autour de BEPUphysics 2, intégré à une application de simulation 3D industrielle. Prototypage d'un visualiseur de nuages de points LiDAR et évaluation d'optimisations de rendu (LOD, culling, codes de Morton).",
      en: 'Designed a modular physics wrapper around BEPUphysics 2, integrated into an industrial 3D simulation application. Prototyped a LiDAR point-cloud viewer and evaluated rendering optimisations (LOD, culling, Morton codes).',
    },
    category: { fr: 'Stage', en: 'Internship' },
    color: 'purple',
    image: '/photos/cyclife.webp',
    logo: '/logos/cyclife_logo.webp',
    logoFallback: 'CD',
    tags: ['C#', '.NET', 'BEPUphysics 2', 'LiDAR', 'Rendu 3D'],
  },
  {
    id: '6',
    date: { fr: '2025', en: '2025' },
    title: {
      fr: 'Échange universitaire — Double diplôme Big Data',
      en: 'University exchange — Big Data Dual Degree',
    },
    subtitle: {
      fr: 'Keimyung University · Daegu, Corée du Sud · 2025 – 2026',
      en: 'Keimyung University · Daegu, South Korea · 2025 – 2026',
    },
    description: {
      fr: "Année d'échange dans le cadre du cursus Epitech, en double diplôme Big Data : intelligence artificielle, analyse statistique, cybersécurité, transformation digitale et coréen.",
      en: 'Exchange year as part of the Epitech curriculum, earning a Big Data dual degree: artificial intelligence, statistical analysis, cybersecurity, digital transformation and Korean.',
    },
    category: { fr: 'Échange', en: 'Exchange' },
    color: 'fuchsia',
    image: '/photos/keimyung.webp',
    logo: '/logos/keimyung_logo.webp',
    logoFallback: 'KU',
    tags: ['Big Data', 'IA', 'Cybersécurité', 'Corée du Sud'],
  },
]

export default function Timeline() {
  const { lang } = useLanguage()
  const t = ui[lang].timeline

  const items: TimelineItem[] = bilEvents.map((e) => {
    const [org, ...place] = e.subtitle[lang].split(' · ')
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
