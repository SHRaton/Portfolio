export interface Project {
  title: string
  slug: string
  description: string
  longDesc: string
  tags: string[]
  language: string
  languageColor: string
  githubUrl: string
  homepageUrl?: string
  featured: boolean
  icon: string
  category: string
}

export const projects: Project[] = [
  {
    title: 'Milo',
    slug: 'milo',
    description: 'Plateforme d\'apprentissage interactive — EIP Epitech 4e & 5e année.',
    longDesc:
      'Projet Innovant Epitech (EIP) sur 2 ans. Application web et mobile complète pour l\'apprentissage interactif : parcours pédagogiques, quiz, missions, duels entre amis, OCR de documents, et interactions 3D avec le personnage Milo via Three.js. Interface parent, espace étudiant, et génération de QCM par IA.',
    tags: ['React 19', 'Three.js', 'TypeScript', 'React Native', 'Expo', 'Zustand', 'TanStack Query', 'Tailwind', 'EIP'],
    language: 'TypeScript',
    languageColor: '#3178c6',
    githubUrl: 'https://github.com/orgs/Education-Milo/repositories',
    featured: true,
    icon: '🎓',
    category: 'Full-Stack',
    homepageUrl: 'https://milo-web-three.vercel.app',
  },
  {
    title: 'R-Type',
    slug: 'rtype',
    description: 'Jeu de shoot\'em-up multijoueur en réseau, inspiré du classique arcade.',
    longDesc:
      'Implémentation complète d\'un jeu de shoot\'em-up en C++17 avec architecture ECS (Entity Component System), moteur réseau UDP asynchrone, et rendu SFML. Supporte Windows, Linux et macOS.',
    tags: ['C++17', 'SFML', 'ECS', 'UDP', 'CMake', 'Conan', 'Multijoueur'],
    language: 'C++',
    languageColor: '#f34b7d',
    githubUrl: 'https://github.com/SHRaton/B-CPP-500-MAR-5-2-rtype-jeremy.bisson',
    featured: true,
    icon: '🚀',
    category: 'Game Dev',
  },
  {
    title: 'AREA',
    slug: 'area',
    description: 'Plateforme d\'automation type IFTTT/Zapier avec clients web et mobile.',
    longDesc:
      'Suite logicielle complète avec un serveur d\'application Python, un client web React et un client mobile. Permet de connecter des services et d\'automatiser des workflows via des blocs Action-REAction.',
    tags: ['Python', 'JavaScript', 'React', 'Docker', 'REST API', 'OAuth', 'Mobile'],
    language: 'Python',
    languageColor: '#3572A5',
    githubUrl: 'https://github.com/SHRaton/B-DEV-500-MAR-5-1-area-noam.bouriche',
    featured: true,
    icon: '🔗',
    category: 'Full-Stack',
  },
  {
    title: 'Zappy',
    slug: 'zappy',
    description: 'Serveur de jeu réseau multi-clients avec IA compétitives en langage personnalisé.',
    longDesc:
      'Serveur TCP/IP en C gérant un monde de jeu en temps réel où des équipes d\'IA s\'affrontent pour collecter des ressources. Inclut un protocole réseau custom, une interface de visualisation graphique et des IA autonomes.',
    tags: ['C', 'TCP/IP', 'Network', 'AI', 'Multi-thread', 'Protocol'],
    language: 'C',
    languageColor: '#555555',
    githubUrl: 'https://github.com/SHRaton/B-YEP-400-MAR-4-1-zappy-theo.berget',
    featured: true,
    icon: '🌐',
    category: 'Réseau',
  },
  {
    title: 'Raytracer',
    slug: 'raytracer',
    description: 'Moteur de rendu raytracing physiquement réaliste, built from scratch en C++.',
    longDesc:
      'Implémentation d\'un moteur de rendu basé sur le lancer de rayons. Supporte les matériaux (miroir, diffus, transparent), les lumières, les ombres, l\'anticrénelage et le rendu multi-thread pour des performances optimales.',
    tags: ['C++', 'Raytracing', 'OOP', 'Multi-thread', 'Mathématiques', 'Physique'],
    language: 'C++',
    languageColor: '#f34b7d',
    githubUrl: 'https://github.com/SHRaton/B-OOP-400-MAR-4-1-raytracer-noam.bouriche',
    featured: false,
    icon: '✨',
    category: 'Graphisme',
  },
  {
    title: 'Groundhog',
    slug: 'groundhog',
    description: 'Prédiction climatique par analyse numérique et modèles mathématiques.',
    longDesc:
      'Projet d\'analyse numérique en C++ implémentant des modèles de prédiction de températures climatiques. Utilise des algorithmes de régression, d\'interpolation et de décomposition matricielle.',
    tags: ['C++', 'Analyse Numérique', 'Mathématiques', 'Prédiction', 'Algorithmes'],
    language: 'C++',
    languageColor: '#f34b7d',
    githubUrl: 'https://github.com/SHRaton/B-CNA-410-MAR-4-1-groundhog-meddi.gueran',
    featured: false,
    icon: '📊',
    category: 'Mathématiques',
  },
  {
    title: 'Survivor',
    slug: 'survivor',
    description: 'Application web de gestion d\'un camp de survie — projet full-stack JavaScript.',
    longDesc:
      'Webapp full-stack développée en JavaScript pour gérer les données d\'un camp de survie fictif. Inclut une interface de gestion des survivants, leurs attributs, et les relations entre personnages.',
    tags: ['JavaScript', 'Node.js', 'Web', 'Full-Stack', 'REST API'],
    language: 'JavaScript',
    languageColor: '#f1e05a',
    githubUrl: 'https://github.com/SHRaton/B-SVR-500-MAR-5-1-survivor-theo.berget',
    featured: false,
    icon: '🏕️',
    category: 'Full-Stack',
  },
  {
    title: 'Tekspice',
    slug: 'tekspice',
    description: 'Simulateur de circuits logiques — implémentation de portes NAND, NOR, etc.',
    longDesc:
      'Simulateur de circuits électroniques logiques en C++. Implémente les composants de base (portes logiques, bascules, mux) et permet de créer des circuits complexes définis en fichiers texte.',
    tags: ['C++', 'OOP', 'Simulation', 'Électronique', 'Design Patterns'],
    language: 'C++',
    languageColor: '#f34b7d',
    githubUrl: 'https://github.com/SHRaton/B-OOP-400-MAR-4-1-tekspice-alexandre.vittenet',
    featured: false,
    icon: '⚡',
    category: 'Système',
  },
  {
    title: 'RPGG',
    slug: 'rpgg',
    description: 'Jeu de rôle en C avec gestion d\'inventaire, combats et exploration.',
    longDesc:
      'Jeu RPG développé en C avec une architecture modulaire. Inclut un système de combat au tour par tour, gestion d\'inventaire, et exploration de cartes.',
    tags: ['C', 'Game Dev', 'RPG', 'Structures de données'],
    language: 'C',
    languageColor: '#555555',
    githubUrl: 'https://github.com/SHRaton/RPGG',
    featured: false,
    icon: '⚔️',
    category: 'Game Dev',
  },
  {
    title: 'CyberSec Tricks',
    slug: 'cybersec',
    description: 'Collection de techniques et notes de cybersécurité — outils et exploits.',
    longDesc:
      'Repository de ressources personnelles en cybersécurité : techniques offensives et défensives, notes de CTF, outils de pentest, et découvertes sur les vulnérabilités systèmes.',
    tags: ['Cybersécurité', 'CTF', 'Pentest', 'Outils', 'Shell'],
    language: 'Shell',
    languageColor: '#89e051',
    githubUrl: 'https://github.com/SHRaton/CyberSec_Tricks',
    featured: false,
    icon: '🔐',
    category: 'CyberSec',
  },
  {
    title: 'Jam Itachi',
    slug: 'jam-itachi',
    description: 'Projet Game Jam — jeu développé en 48h en C avec SFML.',
    longDesc:
      'Jeu créé dans le cadre d\'une Game Jam sous contrainte de temps. Développé en C avec gestion des sprites, animations, et collisions. Une expérience de développement intensif sous pression.',
    tags: ['C', 'Game Jam', 'SFML', 'Sprite', 'Game Dev'],
    language: 'C',
    languageColor: '#555555',
    githubUrl: 'https://github.com/SHRaton/Jam-Itachi-Amaterastu',
    featured: false,
    icon: '🎌',
    category: 'Game Dev',
  },
]
