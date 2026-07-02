export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: Experience[] = [
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
    id: 'runclub',
    company: 'Rutgers Run Club',
    role: 'Founder',
    period: 'Present',
    location: 'Rutgers University',
    current: true,
    tags: ['Leadership', 'Community'],
    bullets: [
      'Founded student running community with 40+ active members in the first semester',
      'Weekly group runs, health challenges, social events',
      'Onboarded 5 club officers via structured leadership pipeline',
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
    tags: ['Python', 'Pandas', 'Scikit-learn', 'SHA-256'],
    bullets: [
      'Python malware detection: SHA-256 hash comparison vs 200+ samples',
      'Pandas/Scikit-learn preprocessing on 50k+ entries, improving accuracy by 12%',
      'Integrated cryptographic utilities into ML feature extraction',
    ],
  },
  {
    id: 'motazedi',
    company: 'Michael Motazedi, C.P.A.',
    role: 'IT Intern',
    period: 'Feb 2024 - Aug 2024',
    location: 'Jamaica, NY',
    current: false,
    tags: ['Network Security', 'Hardware', 'VPN'],
    bullets: [
      'Diagnosed 50+ hardware/network issues, improving uptime by 35%',
      'Overhauled firewall rules and patch management, cutting alerts by 40%',
      'Restructured VPN/access control for 15+ remote employees',
    ],
  },
];
