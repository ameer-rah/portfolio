export interface Phase {
  label: string;
  text: string;
  abilities: string[];
}

export interface DungeonProject {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  diffColor: string;
  accent: 'green' | 'amber' | 'cyan' | 'purple';
  hp: number;
  description: string;
  stack: string[];
  phases: Phase[];
  github?: string;
  live?: string;
}

export const PROJECTS: DungeonProject[] = [
  {
    id: 'ruplanner',
    name: 'RUPlanner',
    type: 'Full-Stack Web App',
    difficulty: 'BOSS FIGHT',
    diffColor: '#ff3333',
    accent: 'green',
    hp: 100,
    description: 'Degree planning tool for Rutgers students. Course search, 4-year plan builder, and graduation requirement tracker with real-time sync.',
    stack: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Redis', 'Prisma'],
    phases: [
      {
        label: 'PHASE 1 — Core Engine',
        text: 'Built the course graph and requirement resolution engine in TypeScript. Modeled degree requirements as a constraint satisfaction problem.',
        abilities: ['TypeScript', 'Node.js', 'PostgreSQL'],
      },
      {
        label: 'PHASE 2 — Frontend',
        text: 'React + Next.js frontend with drag-and-drop semester planning. Upstash Redis caching for sub-100ms course lookups.',
        abilities: ['React', 'Next.js', 'Redis'],
      },
      {
        label: 'PHASE 3 — Deployment',
        text: 'Prisma ORM for type-safe DB access. Deployed on Vercel with AWS Amplify fallback.',
        abilities: ['Prisma', 'Vercel', 'Amplify'],
      },
    ],
    github: 'https://github.com/ameer-rah',
  },
  {
    id: 'malware',
    name: 'Malware Detector',
    type: 'Security Pipeline',
    difficulty: 'DANGER ZONE',
    diffColor: '#ffb700',
    accent: 'amber',
    hp: 65,
    description: 'SHA-256 file fingerprinting pipeline. Automated hash comparisons against 200+ known malware samples with Pandas/Scikit-learn preprocessing.',
    stack: ['Python', 'SHA-256', 'Pandas', 'Scikit-learn'],
    phases: [
      {
        label: 'PHASE 1 — Ingestion',
        text: 'File ingestion pipeline that computes SHA-256 hashes of submitted binaries and normalizes metadata.',
        abilities: ['Python', 'HashLib'],
      },
      {
        label: 'PHASE 2 — Detection',
        text: 'Hash comparison against a curated threat database. ML-assisted anomaly scoring with Scikit-learn.',
        abilities: ['Scikit-learn', 'Pandas'],
      },
    ],
    github: 'https://github.com/ameer-rah',
  },
  {
    id: 'portfolio',
    name: 'ameer.dev',
    type: 'Pixel Portfolio',
    difficulty: 'CURRENT RUN',
    diffColor: '#00ddff',
    accent: 'cyan',
    hp: 85,
    description: 'This very site. Retro pixel RPG-themed personal portfolio with dungeon crawler navigation, quest logs, and terminal contact screens.',
    stack: ['TypeScript', 'React', 'Vite', 'CSS', 'AWS Amplify'],
    phases: [
      {
        label: 'PHASE 1 — Design System',
        text: 'Established the pixel design system: CSS variables, Press Start 2P font, scanline overlay, and pixel border utilities.',
        abilities: ['CSS', 'Press Start 2P'],
      },
      {
        label: 'PHASE 2 — Game Shell',
        text: 'Built GameShell with screen routing, keyboard navigation hook, and animated stat bars.',
        abilities: ['React', 'TypeScript', 'Vite'],
      },
    ],
    github: 'https://github.com/ameer-rah/portfolio',
    live: 'https://ameer.dev',
  },
];
