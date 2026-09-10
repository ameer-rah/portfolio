export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  bullets: string[];
  tags: string[];
  link?: string;
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'lspace-npwee',
    company: "NASA L'SPACE Program",
    role: 'Incoming NPWEE Participant',
    period: 'Fall 2026',
    location: 'Remote',
    current: true,
    tags: ['NPWEE', "NASA L'SPACE"],
    link: 'https://www.lspace.asu.edu/',
    bullets: [
      'Incoming Fall 2026 participant in the NASA Proposal Writing and Evaluation Experience (NPWEE) Academy',
    ],
  },
  {
    id: 'archly',
    company: 'Archly',
    role: 'Co-Founder & Engineer',
    period: 'Jul 2026 - Present',
    location: 'New York, NY',
    current: true,
    tags: ['TypeScript', 'React', 'Hono', 'PostgreSQL', 'Cloudflare Workers'],
    link: 'https://joinarchly.com/',
    bullets: [
      'Build and maintain a two-sided marketplace connecting architecture students across New York with NYC firms offering project work',
      'Develop the TypeScript monorepo across a React and Vite frontend, a Hono API on Cloudflare Workers, and PostgreSQL through Drizzle ORM',
      'Implemented session-based authentication and role-scoped workflows for students, firm members, and administrators',
      'Ship through a GitHub Actions pipeline that runs linting, type checks, database and API tests, and Playwright end-to-end tests before deployment',
    ],
  },
  {
    id: 'werblin',
    company: 'Werblin Recreation Center',
    role: 'Supervisor',
    period: 'Present',
    location: 'Rutgers University',
    current: true,
    tags: ['Leadership', 'Operations'],
    link: 'https://recreation.rutgers.edu/facilities/werblin',
    bullets: [
      "Supervise daily operations at Rutgers' largest recreation facility",
      'Help maintain a safe, welcoming environment serving more than 500 students each day',
    ],
  },
  {
    id: 'jasfel',
    company: 'Jasfel Analytics',
    role: 'Software Engineering Intern',
    period: 'Jul 2025 - Aug 2025',
    location: 'Newark, NJ',
    current: false,
    tags: ['Python', 'pandas', 'NumPy', 'U.S. Census ACS'],
    link: 'https://jasfel.com/',
    bullets: [
      'Built a modular Python ETL pipeline with pandas and NumPy to ingest, transform, and validate more than 50,000 U.S. Census Bureau records',
      'Developed cleaning and validation logic for missing values, inconsistent formatting, and duplicate records',
      'Used ACS 2019–2023 estimates and TIGER/Line geography to profile every New Jersey census tract centered within three and five miles of NJCU\'s three campuses',
    ],
  },
];
