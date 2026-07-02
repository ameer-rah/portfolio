export interface ProjectHighlight {
  title: string;
  text: string;
  tech: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  stack: string[];
  highlights: ProjectHighlight[];
  github?: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'ruplanner',
    name: 'RUPlanner',
    type: 'Full-Stack Web App',
    description:
      'Degree planning tool for Rutgers students. Course search, 4-year plan builder, and graduation requirement tracker with real-time sync.',
    stack: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Redis', 'Prisma'],
    highlights: [
      {
        title: 'Core engine',
        text: 'Built the course graph and requirement resolution engine in TypeScript. Modeled degree requirements as a constraint satisfaction problem.',
        tech: ['TypeScript', 'Node.js', 'PostgreSQL'],
      },
      {
        title: 'Frontend',
        text: 'React + Next.js frontend with drag-and-drop semester planning. Upstash Redis caching for sub-100ms course lookups.',
        tech: ['React', 'Next.js', 'Redis'],
      },
      {
        title: 'Deployment',
        text: 'Prisma ORM for type-safe DB access. Deployed on Vercel with AWS Amplify fallback.',
        tech: ['Prisma', 'Vercel', 'Amplify'],
      },
    ],
    github: 'https://github.com/ameer-rah',
  },
  {
    id: 'malware',
    name: 'Malware Detector',
    type: 'Security Pipeline',
    description:
      'SHA-256 file fingerprinting pipeline. Automated hash comparisons against 200+ known malware samples with Pandas/Scikit-learn preprocessing.',
    stack: ['Python', 'SHA-256', 'Pandas', 'Scikit-learn'],
    highlights: [
      {
        title: 'Ingestion',
        text: 'File ingestion pipeline that computes SHA-256 hashes of submitted binaries and normalizes metadata.',
        tech: ['Python', 'HashLib'],
      },
      {
        title: 'Detection',
        text: 'Hash comparison against a curated threat database. ML-assisted anomaly scoring with Scikit-learn.',
        tech: ['Scikit-learn', 'Pandas'],
      },
    ],
    github: 'https://github.com/ameer-rah',
  },
  {
    id: 'portfolio',
    name: 'ameer-rahman.info',
    type: 'Personal Site',
    description:
      'This very site. A personal portfolio built with React, TypeScript, and Tailwind, with live GitHub data and a curated reading list.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'AWS Amplify'],
    highlights: [
      {
        title: 'First iteration',
        text: 'Started life as a retro pixel-art RPG with a hand-built CSS design system, keyboard navigation, and animated stat bars.',
        tech: ['CSS', 'React'],
      },
      {
        title: 'Redesign',
        text: 'Rebuilt as a modern site with Tailwind CSS, client-side routing, and live GitHub repos, contributions, and activity.',
        tech: ['Tailwind CSS', 'TypeScript', 'Vite'],
      },
    ],
    github: 'https://github.com/ameer-rah/portfolio',
    live: 'https://ameer-rahman.info',
  },
];
