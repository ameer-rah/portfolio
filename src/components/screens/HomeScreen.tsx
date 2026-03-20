import { useTypingEffect } from '../../hooks/useTypingEffect';

const DIALOG_LINES = [
  '> AMEER RAHMAN',
  '> CS @ Rutgers University',
  '> Full-Stack + Cybersecurity',
  '> Building tools that matter.',
];

const STATS = [
  { label: 'FULL STACK', value: 62, color: '#ffffff' },
  { label: 'SECURITY',   value: 55, color: 'var(--pixel-amber)' },
  { label: 'ALGORITHMS', value: 58, color: '#00ddff' },
  { label: 'RESEARCH',   value: 50, color: 'var(--pixel-purple)' },
];

const SCHOOLS = [
  {
    abbr: 'RU - NB',
    name: 'Rutgers University – New Brunswick',
    degree: 'B.S. Computer Science',
    minor: 'Minor: Critical Intelligence Studies',
    period: 'Expected May 2027',
    gpa: '3.4 GPA',
    honors: null,
    courses: 'Data Structures · Systems Programming · Computer Architecture · Software Methodology · Principles of PL',
  },
  {
    abbr: 'CCNY',
    name: 'CUNY City College of New York',
    degree: 'Transferred May 2024',
    minor: null,
    period: 'Fall 2023 – Spring 2024',
    gpa: '4.0 GPA',
    honors: "Dean's List — Fall 2023 & Spring 2024",
    courses: null,
  },
];

const LORE_PARAGRAPHS = [
  "I'm a first-gen CS student at Rutgers with a minor in Critical Intelligence Studies. My work lives at the intersection of software engineering and security — building things that matter while making sure they're built right.",
  "Two internships in one summer: malware detection pipeline at Jasfel Analytics, and pen testing with Burp Suite + OWASP ZAP at Redynox. I don't just want to write code — I want to understand how it breaks.",
  "Whether architecting RUPlanner's prerequisite engine, cataloging CVEs in a pen test report, or founding the Rutgers Run Club — same energy: try hard, build something real, make it count.",
];

function PixelSprite() {
  const T  = 'transparent';
  const H  = '#3d2b1f';
  const S  = '#f4c48a';
  const G  = '#1a6b3a';
  const P  = '#1a3a6b';
  const W  = '#ffffff';
  const E  = '#2c1810';
  const SH = '#2c1810';

  const grid: string[][] = [
    [H,  H,  H,  H,  H,  H,  H,  H ],
    [H,  H,  H,  H,  H,  H,  H,  H ],
    [H,  S,  S,  S,  S,  S,  S,  H ],
    [H,  S,  W,  W,  S,  W,  W,  H ],
    [H,  S,  E,  E,  S,  E,  E,  H ],
    [H,  S,  S,  S,  S,  S,  S,  H ],
    [T,  T,  G,  G,  G,  G,  T,  T ],
    [T,  G,  G,  G,  G,  G,  G,  T ],
    [T,  G,  G,  G,  G,  G,  G,  T ],
    [T,  P,  P,  P,  P,  P,  P,  T ],
    [T,  P,  P,  T,  T,  P,  P,  T ],
    [T,  SH, SH, T,  T,  SH, SH, T ],
  ];

  return (
    <div className="pixel-sprite-wrap">
      <svg
        width="96"
        height="144"
        viewBox="0 0 8 12"
        className="pixel-sprite"
        style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 4px #00cc66) drop-shadow(0 0 10px rgba(0,204,102,0.4))' }}
      >
        {grid.map((row, y) =>
          row.map((color, x) =>
            color !== T ? (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

export default function HomeScreen() {
  const text = useTypingEffect(DIALOG_LINES, 55);
  const lines = text.split('\n').filter((_, i, arr) => i < arr.length);

  return (
    <div className="home-screen">

      {/* ── CHARACTER SELECT ── */}
      <div className="home-top">
        <div className="character-panel">
          <PixelSprite />
          <div className="char-name-plate">
            <div className="char-name">AMEER</div>
            <div className="char-class">[ FULL STACK / SEC ]</div>
          </div>
        </div>

        <div className="dialog-panel pixel-box">
          <div className="dialog-header">★ CHARACTER INFO</div>
          <div className="dialog-body">
            {lines.map((line, i) => (
              <div key={i} className="dialog-line">{line}</div>
            ))}
            <span className="cursor" />
          </div>
          <div className="dialog-links">
            <a href="https://github.com/ameer-rah" target="_blank" rel="noopener noreferrer" className="dialog-link" style={{ color: '#ffffff' }}>
              [GITHUB]
            </a>
            <a href="https://linkedin.com/in/ameer-rahman" target="_blank" rel="noopener noreferrer" className="dialog-link" style={{ color: 'var(--pixel-cyan)' }}>
              [LINKEDIN]
            </a>
            <a href="mailto:ameerrahman456@gmail.com" className="dialog-link" style={{ color: 'var(--pixel-amber)' }}>
              [MAIL]
            </a>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-grid">
        {STATS.map(stat => (
          <div key={stat.label} className="stat-card pixel-box">
            <div className="stat-label" style={{ color: stat.color }}>{stat.label}</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${stat.value}%`, background: stat.color }} />
            </div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}/100</div>
          </div>
        ))}
      </div>

      {/* ── EDUCATION ── */}
      <div className="home-section-header">
        <span className="home-section-title">◈ EDUCATION LOG</span>
      </div>

      <div className="edu-grid">
        {SCHOOLS.map(school => (
          <div key={school.abbr} className="edu-card pixel-box">
            <div className="edu-card-top">
              <div className="edu-abbr">{school.abbr}</div>
              <div className="edu-gpa">{school.gpa}</div>
            </div>
            <div className="edu-name">{school.name}</div>
            <div className="edu-degree">{school.degree}</div>
            {school.minor && <div className="edu-minor">{school.minor}</div>}
            <div className="edu-period">{school.period}</div>
            {school.honors && (
              <div className="edu-honors">★ {school.honors}</div>
            )}
            {school.courses && (
              <div className="edu-courses">
                <span className="edu-courses-label">COURSEWORK: </span>
                {school.courses}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── WHAT DRIVES ME ── */}
      <div className="home-section-header">
        <span className="home-section-title">◈ LORE / BACKSTORY</span>
      </div>

      <div className="lore-box pixel-box">
        <div className="lore-quote">
          "I had a purpose before everyone had an opinion"
        </div>
        <div className="lore-cite">— Jalen Hurts</div>
        <div className="lore-paragraphs">
          {LORE_PARAGRAPHS.map((p, i) => (
            <p key={i} className="lore-p">▸ {p}</p>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="home-section-header">
        <span className="home-section-title">◈ FILES</span>
      </div>

      <div className="docs-row">
        <a
          href="/assets/PDF/Ameer Rahman Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="doc-card pixel-box"
        >
          <span className="doc-icon">📄</span>
          <div className="doc-info">
            <div className="doc-name">RESUME</div>
            <div className="doc-sub">Ameer Rahman Resume.pdf</div>
          </div>
          <span className="doc-action">[OPEN]</span>
        </a>

        <a
          href="/assets/PDF/CUNY_transcript.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="doc-card pixel-box"
        >
          <span className="doc-icon">📋</span>
          <div className="doc-info">
            <div className="doc-name">TRANSCRIPT</div>
            <div className="doc-sub">CUNY_transcript.pdf</div>
          </div>
          <span className="doc-action">[OPEN]</span>
        </a>
      </div>

      {/* ── BIO ── */}
      <div className="home-bio pixel-box-amber">
        <span className="bio-label">STATUS: </span>
        <span className="bio-text">
          Open to internships & collaborations · Summer 2026 · New York, NY
        </span>
      </div>

    </div>
  );
}
