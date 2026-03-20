export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY';
export type EquipSlot = 'weapon' | 'armor' | 'ring' | 'spell' | 'cert';

export interface StatBonuses {
  STR: number;
  INT: number;
  DEX: number;
  MGK: number;
}

export interface SkillItem {
  name: string;
  icon: string;
  stars: number;
  url: string;
  rarity: Rarity;
  slot: EquipSlot;
  stats: StatBonuses;
  desc: string;
}

export interface SkillCategory {
  label: string;
  subtitle: string;
  items: SkillItem[];
}

export const SKILLS: SkillCategory[] = [
  {
    label: 'WEAPONS',
    subtitle: 'Languages',
    items: [
      {
        name: 'TypeScript', icon: '⚡', stars: 5, url: 'https://www.typescriptlang.org',
        rarity: 'LEGENDARY', slot: 'weapon',
        stats: { STR: 30, INT: 20, DEX: 10, MGK: 0 },
        desc: 'Strongly typed JavaScript superset. Primary language for all frontend and backend work. Legendary for a reason.',
      },
      {
        name: 'Python', icon: '🐍', stars: 4, url: 'https://www.python.org',
        rarity: 'RARE', slot: 'weapon',
        stats: { STR: 20, INT: 25, DEX: 5, MGK: 10 },
        desc: 'Scripting, data science, and security tooling. Used in ML pipelines, automation, and the malware detector project.',
      },
      {
        name: 'Java', icon: '☕', stars: 3, url: 'https://www.java.com',
        rarity: 'UNCOMMON', slot: 'weapon',
        stats: { STR: 25, INT: 10, DEX: 5, MGK: 0 },
        desc: 'OOP fundamentals and data structures coursework. Solid enterprise-grade language with verbose but powerful syntax.',
      },
      {
        name: 'SQL', icon: '🔧', stars: 4, url: 'https://en.wikipedia.org/wiki/SQL',
        rarity: 'RARE', slot: 'weapon',
        stats: { STR: 10, INT: 20, DEX: 15, MGK: 0 },
        desc: 'Relational query language used across PostgreSQL and SQLite. Core skill for backend data access and schema design.',
      },
      {
        name: 'C++', icon: '⚙', stars: 3, url: 'https://isocpp.org',
        rarity: 'UNCOMMON', slot: 'weapon',
        stats: { STR: 35, INT: 10, DEX: 0, MGK: 0 },
        desc: 'Low-level systems programming. High STR — raw power and memory control. Used in systems and OS coursework.',
      },
      {
        name: 'JavaScript', icon: '🟡', stars: 3, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        rarity: 'UNCOMMON', slot: 'weapon',
        stats: { STR: 15, INT: 10, DEX: 20, MGK: 5 },
        desc: 'The web\'s native scripting language. High DEX — fast to iterate and prototype. Predecessor to TypeScript.',
      },
      {
        name: 'HTML', icon: '🌐', stars: 3, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        rarity: 'COMMON', slot: 'weapon',
        stats: { STR: 5, INT: 5, DEX: 15, MGK: 0 },
        desc: 'Markup foundation of the web. Every UI starts here. Deceptively simple, mastery shows in semantics.',
      },
      {
        name: 'CSS', icon: '🎨', stars: 3, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        rarity: 'COMMON', slot: 'weapon',
        stats: { STR: 5, INT: 10, DEX: 15, MGK: 5 },
        desc: 'Styling layer of the web. This entire portfolio is hand-crafted CSS — pixel art, animations, layouts.',
      },
    ],
  },
  {
    label: 'ARMOR',
    subtitle: 'Frameworks & Tools',
    items: [
      {
        name: 'React', icon: '⚛', stars: 5, url: 'https://react.dev',
        rarity: 'LEGENDARY', slot: 'armor',
        stats: { STR: 0, INT: 30, DEX: 20, MGK: 15 },
        desc: 'Primary UI framework. Used in every web project. Component model, hooks, and state management are second nature.',
      },
      {
        name: 'Next.js', icon: '▲', stars: 4, url: 'https://nextjs.org',
        rarity: 'RARE', slot: 'armor',
        stats: { STR: 5, INT: 25, DEX: 15, MGK: 0 },
        desc: 'Full-stack React framework with SSR and API routes. Used as the core of RUPlanner\'s web layer.',
      },
      {
        name: 'Node.js', icon: '🟢', stars: 4, url: 'https://nodejs.org',
        rarity: 'RARE', slot: 'armor',
        stats: { STR: 10, INT: 20, DEX: 10, MGK: 0 },
        desc: 'Server-side JavaScript runtime. Backbone of backend services and CLI tooling across multiple projects.',
      },
      {
        name: 'PostgreSQL', icon: '🐘', stars: 4, url: 'https://www.postgresql.org',
        rarity: 'RARE', slot: 'armor',
        stats: { STR: 0, INT: 25, DEX: 5, MGK: 0 },
        desc: 'Relational database used in RUPlanner. Handles complex course graph queries and student data at scale.',
      },
    ],
  },
  {
    label: 'RINGS',
    subtitle: 'Infrastructure & Utilities',
    items: [
      {
        name: 'Docker', icon: '🐳', stars: 3, url: 'https://www.docker.com',
        rarity: 'UNCOMMON', slot: 'ring',
        stats: { STR: 5, INT: 10, DEX: 10, MGK: 0 },
        desc: 'Containerization for consistent dev and prod environments. Used for local DB setup and CI pipelines.',
      },
      {
        name: 'Redis', icon: '🔴', stars: 3, url: 'https://redis.io',
        rarity: 'UNCOMMON', slot: 'ring',
        stats: { STR: 0, INT: 10, DEX: 20, MGK: 0 },
        desc: 'In-memory caching via Upstash Redis. Dropped RUPlanner course lookups to under 100ms response time.',
      },
      {
        name: 'AWS', icon: '☁', stars: 3, url: 'https://aws.amazon.com',
        rarity: 'UNCOMMON', slot: 'ring',
        stats: { STR: 5, INT: 15, DEX: 5, MGK: 0 },
        desc: 'Cloud deployment via Amplify and S3. Used for hosting this portfolio and production builds of RUPlanner.',
      },
      {
        name: 'Prisma', icon: '💎', stars: 3, url: 'https://www.prisma.io',
        rarity: 'COMMON', slot: 'ring',
        stats: { STR: 0, INT: 15, DEX: 5, MGK: 0 },
        desc: 'TypeScript-native ORM for PostgreSQL. Enables type-safe database queries and schema migrations in RUPlanner.',
      },
    ],
  },
  {
    label: 'SPELLS',
    subtitle: 'Security',
    items: [
      {
        name: 'OWASP/ZAP', icon: '🛡', stars: 4, url: 'https://www.zaproxy.org',
        rarity: 'RARE', slot: 'spell',
        stats: { STR: 0, INT: 15, DEX: 0, MGK: 25 },
        desc: 'Web app vulnerability scanner. Used to audit projects for OWASP Top 10 issues and injection vectors.',
      },
      {
        name: 'Wireshark', icon: '🔍', stars: 4, url: 'https://www.wireshark.org',
        rarity: 'RARE', slot: 'spell',
        stats: { STR: 0, INT: 20, DEX: 0, MGK: 20 },
        desc: 'Network packet analysis. Used for traffic inspection, protocol dissection, and network forensics labs.',
      },
      {
        name: 'Burp Suite', icon: '🕷', stars: 3, url: 'https://portswigger.net/burp',
        rarity: 'UNCOMMON', slot: 'spell',
        stats: { STR: 0, INT: 10, DEX: 0, MGK: 15 },
        desc: 'HTTP intercept proxy for web app pen testing. Used to identify auth bypass and injection vulnerabilities.',
      },
      {
        name: 'Metasploit', icon: '💀', stars: 3, url: 'https://www.metasploit.com',
        rarity: 'UNCOMMON', slot: 'spell',
        stats: { STR: 10, INT: 5, DEX: 0, MGK: 15 },
        desc: 'Exploitation framework for controlled lab environments. Used in ethical hacking and CTF coursework.',
      },
      {
        name: 'Snort', icon: '🔔', stars: 2, url: 'https://www.snort.org',
        rarity: 'COMMON', slot: 'spell',
        stats: { STR: 0, INT: 5, DEX: 0, MGK: 10 },
        desc: 'Network intrusion detection system. Configured rule-based alerting for traffic anomaly detection labs.',
      },
      {
        name: 'Nmap', icon: '🗺', stars: 4, url: 'https://nmap.org',
        rarity: 'RARE', slot: 'spell',
        stats: { STR: 0, INT: 15, DEX: 5, MGK: 20 },
        desc: 'Network discovery and port scanning. Core recon tool for mapping infrastructure in security assessments.',
      },
      {
        name: 'SHA-256', icon: '🔑', stars: 3, url: 'https://en.wikipedia.org/wiki/SHA-2',
        rarity: 'UNCOMMON', slot: 'spell',
        stats: { STR: 0, INT: 10, DEX: 0, MGK: 15 },
        desc: 'Cryptographic hashing used in the malware detector project for file fingerprinting and integrity checking.',
      },
      {
        name: 'Auth0/JWT', icon: '🔐', stars: 4, url: 'https://auth0.com',
        rarity: 'RARE', slot: 'spell',
        stats: { STR: 0, INT: 20, DEX: 0, MGK: 20 },
        desc: 'Auth layer for web applications. Implemented token-based auth flows and secure session management.',
      },
    ],
  },
  {
    label: 'POTIONS',
    subtitle: 'Certifications',
    items: [
      {
        name: 'CompTIA Security+', icon: '🔒', stars: 5, url: 'https://www.comptia.org/certifications/security',
        rarity: 'LEGENDARY', slot: 'cert',
        stats: { STR: 0, INT: 30, DEX: 0, MGK: 40 },
        desc: 'Industry-standard security certification covering network security, cryptography, threats, and compliance. In progress.',
      },
      {
        name: 'Google Cybersecurity', icon: '🛡', stars: 4, url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        rarity: 'RARE', slot: 'cert',
        stats: { STR: 0, INT: 20, DEX: 0, MGK: 25 },
        desc: 'Google Professional Certificate covering threat detection, incident response, SIEM tools, and Python for security. Earned.',
      },
      {
        name: 'Google Data Analytics', icon: '📊', stars: 4, url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        rarity: 'RARE', slot: 'cert',
        stats: { STR: 0, INT: 25, DEX: 10, MGK: 0 },
        desc: 'Google Professional Certificate covering data cleaning, analysis, visualization, and SQL/R/Tableau workflows. Earned.',
      },
    ],
  },
];
