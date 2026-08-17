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
    id: 'archly',
    company: 'Archly',
    role: 'Co-Founder & Engineer',
    period: 'Jul 2026 - Present',
    location: 'New York, NY',
    current: true,
    tags: ['Vue 3', 'Node.js', 'Express', 'PostgreSQL', 'CI/CD'],
    link: 'https://joinarchly.com/',
    bullets: [
      'Started Archly with a small founding team, building a two-sided marketplace that connects the people posting work with the people doing it',
      'Own the stack end to end: a Vue 3 + Vite frontend against a Node.js/Express and PostgreSQL backend',
      'Built the geolocation search that matches listings to nearby users, plus the REST API it runs on',
      'Set up the CI/CD pipeline so a small team can ship to production without ceremony',
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
    bullets: [
      'Supervise daily operations at Rutgers largest rec facility',
      'Ensure safe and welcoming environment for 500+ students daily',
    ],
  },
  {
    id: 'redynox',
    company: 'Redynox',
    role: 'Cybersecurity Intern',
    period: 'May 2025 - Jun 2025',
    location: 'Remote',
    current: false,
    tags: ['Wireshark', 'OWASP ZAP', 'Burp Suite', 'Snort'],
    bullets: [
      'Packet analysis pipeline: 100+ malicious traffic signatures cataloged',
      'Web app pen tests with OWASP ZAP + Burp Suite (SQLi, XSS)',
      'Custom Snort IDS rules, reducing false positives by 15%',
    ],
  },
  {
    id: 'jasfel',
    company: 'Jasfel Analytics',
    role: 'Software Engineering Intern',
    period: 'Jul 2025 - Aug 2025',
    location: 'Newark, NJ',
    current: false,
    tags: ['Python', 'pandas', 'scikit-learn', 'Data Pipelines'],
    bullets: [
      'Built a Python data pipeline processing 50,000+ records, with modular stages and defensive error handling so bad rows failed loudly instead of silently',
      'Cleaned and engineered features with pandas and scikit-learn, raising downstream model accuracy by 12%',
      'Turned raw sample metadata into ML-ready features, joining SHA-256 hashes against a 200+ sample reference set',
    ],
  },
];
