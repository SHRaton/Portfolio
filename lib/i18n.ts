export type Lang = 'fr' | 'en'

export const ui = {
  fr: {
    nav: {
      about: 'À propos',
      timeline: 'Parcours',
      projects: 'Projets',
      contact: 'Contact',
    },
    hero: {
      badge: 'DISPONIBLE',
      greeting: 'Bonjour, je suis',
      desc1: 'Étudiant à ',
      desc2: ', passionné par le développement système, les jeux et la cybersécurité. Je construis des projets ',
      descAccent: 'ambitieux',
      desc3: ' en C, C++, Python et JavaScript.',
      cta1: 'Voir mes projets',
      cta2: 'Me contacter',
      statYears: 'Ans Epitech',
    },
    about: {
      label: 'À PROPOS',
      title: 'Qui suis-je ?',
      techLabel: 'TECHNOLOGIES',
    },
    timeline: {
      label: 'PARCOURS',
      title: 'Mon parcours & expériences',
    },
    projects: {
      label: 'PROJETS',
      title: 'Mes Projets',
    },
    contact: {
      label: 'CONTACT',
      title: 'Travaillons ensemble',
      p1: 'Je suis ouvert aux opportunités de stage',
      p2: "Que ce soit pour un projet de jeu, une application système, une webapp ou un défi en cybersécurité — n'hésitez pas à me contacter.",
    },
    footer: {
      built: 'Construit avec Next.js & Tailwind CSS',
    },
  },
  en: {
    nav: {
      about: 'About',
      timeline: 'Timeline',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      badge: 'AVAILABLE',
      greeting: 'Hello, I am',
      desc1: 'Student at ',
      desc2: ', passionate about systems development, game dev and cybersecurity. I build ',
      descAccent: 'ambitious',
      desc3: ' projects in C, C++, Python and JavaScript.',
      cta1: 'View my projects',
      cta2: 'Contact me',
      statYears: 'Years at Epitech',
    },
    about: {
      label: 'ABOUT',
      title: 'Who am I?',
      techLabel: 'TECHNOLOGIES',
    },
    timeline: {
      label: 'TIMELINE',
      title: 'My journey & experience',
    },
    projects: {
      label: 'PROJECTS',
      title: 'My Projects',
    },
    contact: {
      label: 'CONTACT',
      title: "Let's work together",
      p1: 'I am open to internship opportunities',
      p2: "Whether it's a game project, a systems application, a web app or a cybersecurity challenge — feel free to reach out.",
    },
    footer: {
      built: 'Built with Next.js & Tailwind CSS',
    },
  },
} as const
