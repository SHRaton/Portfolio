import { SectionTitle } from './About'
import Timeline3D, { TimelineEvent } from './ui/3d-interactive-timeline'

const events: TimelineEvent[] = [
  {
    id: '1',
    date: '2019',
    title: 'Baccalauréat — Mention Bien',
    subtitle: 'Lycée Paul Mélizan · France',
    description: 'Spécialités Mathématiques & Physique-Chimie. Mention Bien obtenue au baccalauréat général.',
    category: 'Formation',
    color: 'purple',
    image: '/photos/melizan.jpg',
    logo: '/logos/melizan.jpeg',
    logoFallback: 'LP',
    tags: ['Maths', 'Physique-Chimie', 'Mention Bien'],
  },
  {
    id: '2',
    date: '2022 — aujourd\'hui',
    title: 'Étudiant en informatique',
    subtitle: 'Epitech · Marseille, France',
    description: 'Programme de 5 ans axé sur la pratique : projets en C, C++, Python et JavaScript sans cours magistraux. Projet Innovant Epitech (EIP) en 4e et 5e année — plateforme éducative Milo.',
    category: 'Formation',
    color: 'indigo',
    image: '/photos/epitech.jpg',
    logo: '/logos/epitech.png',
    logoFallback: 'EP',
    tags: ['C', 'C++', 'Python', 'JavaScript', 'EIP', 'Milo'],
  },
  {
    id: '3',
    date: '2023',
    title: 'Stage — Développeur Full Stack',
    subtitle: 'Quantic Dream · Paris, France',
    description: 'Stage dans le domaine du jeu vidéo au sein du studio français connu pour Detroit: Become Human, Heavy Rain et Star Wars Eclipse. Développement full stack dans un environnement AAA.',
    category: 'Stage',
    color: 'cyan',
    image: '/photos/quantic_dream.jpeg',
    logo: '/logos/quantic_dream.png',
    logoFallback: 'QD',
    tags: ['Full Stack', 'Jeu Vidéo', 'AAA', 'Paris'],
  },
  {
    id: '4',
    date: '2024',
    title: 'Stage — Développeur Full Stack',
    subtitle: 'Eight Bamboos · France',
    description: 'Stage à temps partiel — développement full stack sur un jeu indépendant jouable directement sur navigateur web. Participation à toutes les phases du cycle de développement.',
    category: 'Stage',
    color: 'cyan',
    image: '/photos/eight_bamboos.jpg',
    logo: '/logos/eight_bamboos.png',
    logoFallback: 'EB',
    tags: ['Full Stack', 'Jeu Indie', 'Web', 'Browser Game'],
  },
  {
    id: '5',
    date: '2025',
    title: 'Stage — Développeur 3D',
    subtitle: 'Cyclife Digital Solutions · France',
    description: 'Développement en C# avec le moteur physique BeepU Physics. Travail sur un moteur physique avancé et rendu de nuages de points pour des applications de simulation.',
    category: 'Stage',
    color: 'emerald',
    image: '/photos/cyclife.jpg',
    logo: '/logos/cyclife.png',
    logoFallback: 'CD',
    tags: ['C#', 'BeepU Physics', '3D', 'Nuage de points', 'Moteur physique'],
  },
  {
    id: '6',
    date: '2025',
    title: 'Étudiant d\'échange — Double diplôme Big Data',
    subtitle: 'Keimyung University · Daegu, Corée du Sud',
    description: 'Année universitaire en échange à la Keimyung University. Cursus Big Data en double diplôme avec Epitech. Immersion culturelle complète en Asie du Sud-Est.',
    category: 'Échange',
    color: 'amber',
    image: '/photos/keimyung.jpeg',
    logo: '/logos/keimyung.png',
    logoFallback: 'KU',
    tags: ['Big Data', 'Double diplôme', 'Corée du Sud', 'Échange universitaire'],
  },
]

export default function Timeline() {
  return (
    <section id="parcours" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="PARCOURS" title="Mon parcours & expériences" />
        <p className="text-slate-500 text-sm mt-3">Survolez une carte pour la développer.</p>
        <div className="mt-12">
          <Timeline3D events={events} />
        </div>
      </div>
    </section>
  )
}
