import { projects } from './projects'

// Schema.org JSON-LD: tells search engines and AI assistants who this page is about and
// links the site to the same person's GitHub and LinkedIn (sameAs). Facts mirror cv.pdf.

const SITE = 'https://alexandre-vittenet.fr'
const PERSON_ID = `${SITE}/#person`

export const profileJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Alexandre Vittenet',
      url: `${SITE}/`,
      image: `${SITE}/photo.jpeg`,
      jobTitle: 'Étudiant ingénieur logiciel',
      description:
        "Étudiant en 5e année à Epitech Marseille (Expert en Ingénierie Logicielle, RNCP niveau 7), expérience en C#/.NET, C++ et développement full-stack. Recherche un stage de fin d'études de 6 mois à partir de mars 2027.",
      email: 'mailto:alexandre.vittenet@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Marseille', addressCountry: 'FR' },
      sameAs: ['https://github.com/SHRaton', 'https://www.linkedin.com/in/alexandre-vittenet'],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Epitech', url: 'https://www.epitech.eu' },
        { '@type': 'CollegeOrUniversity', name: 'Keimyung University', url: 'https://www.kmu.ac.kr' },
      ],
      knowsLanguage: ['fr', 'en'],
      knowsAbout: [
        'C#',
        '.NET',
        'C++',
        'C',
        'Python',
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'Three.js',
        'BEPUphysics',
        'Développement de jeux vidéo',
        'Simulation 3D',
        'Développement full-stack',
        'Big Data',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Alexandre Vittenet — Portfolio',
      inLanguage: 'fr-FR',
      author: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: 'Alexandre Vittenet — Portfolio',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': PERSON_ID },
      dateModified: new Date().toISOString().slice(0, 10),
    },
  ],
}

// No rich result for this on Google; it only helps engines and assistants connect projects to the person
export const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE}/#projects`,
  name: "Projets d'Alexandre Vittenet",
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.description,
      codeRepository: p.githubUrl,
      ...(p.homepageUrl ? { url: p.homepageUrl } : {}),
      programmingLanguage: p.language,
      author: { '@id': PERSON_ID },
    },
  })),
}

/** Serialise for a <script type="application/ld+json">, escaping "<" so content can't close the tag */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}
