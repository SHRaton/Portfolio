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
      badge: 'DISPONIBLE POUR UN STAGE DE FIN D\'ÉTUDES DE 6 MOIS À PARTIR DE MARS 2027',
      greeting: 'Bonjour, je suis',
      desc1: 'Étudiant à ',
      desc2: ', passionné par le développement système, les jeux et la cybersécurité. Je construis des projets ',
      descAccent: 'ambitieux',
      desc3: ' en C#, C++, C, Python et JavaScript.',
      cta1: 'Voir mes projets',
      cta2: 'Me contacter',
      cv: 'Télécharger mon CV',
      statProjects: 'Projets présentés',
      statTech: 'Technologies',
      statYearsValue: '5e',
      statYears: 'année à Epitech',
    },
    about: {
      label: 'À PROPOS',
      title: 'Qui suis-je ?',
      techLabel: 'TECHNOLOGIES',
      role: 'Étudiant',
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
      p1: 'Je recherche un stage de fin d\'études de 6 mois, à partir de mars 2027.',
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
      badge: 'AVAILABLE FOR A 6-MONTH FINAL-YEAR INTERNSHIP FROM MARCH 2027',
      greeting: 'Hello, I am',
      desc1: 'Student at ',
      desc2: ', passionate about systems development, game dev and cybersecurity. I build ',
      descAccent: 'ambitious',
      desc3: ' projects in C#, C++, C, Python and JavaScript.',
      cta1: 'View my projects',
      cta2: 'Contact me',
      cv: 'Download my resume',
      statProjects: 'Featured projects',
      statTech: 'Technologies',
      statYearsValue: '5th',
      statYears: 'year at Epitech',
    },
    about: {
      label: 'ABOUT',
      title: 'Who am I?',
      techLabel: 'TECHNOLOGIES',
      role: 'Student',
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
      p1: 'I am looking for a 6-month final-year internship, starting March 2027.',
      p2: "Whether it's a game project, a systems application, a web app or a cybersecurity challenge — feel free to reach out.",
    },
    footer: {
      built: 'Built with Next.js & Tailwind CSS',
    },
  },
} as const
