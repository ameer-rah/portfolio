import { useState, useEffect, useCallback } from 'react';
import { PROJECTS, type DungeonProject } from '../../data/projects';
import { fetchUserRepos, fetchContributions, fetchUserEvents, type GitHubRepo, type ContributionData, type ContributionDay, type GitHubEvent } from '../../utils/githubApi';

// ── Types ───────────────────────────────────────────────────────────
type Direction = 'n' | 's' | 'e' | 'w';
type RoomType  = 'entry' | 'boss' | 'treasure' | 'archive' | 'chronicle';
type FloorId   = 'b1' | 'b2' | 'b3' | 'b4';

interface Room {
  x: number; y: number;
  label: string;
  type: RoomType;
  exits: Partial<Record<Direction, string | null>>;
  color: string;
  project?: string;
}

interface Corridor {
  x1: number; y1: number;
  w: number; h: number;
  type: 'h' | 'v';
}

interface Floor {
  label: string;
  rooms: Record<string, Room>;
  corridors: Corridor[];
  start: string;
}

// ── Floor / Room Data ───────────────────────────────────────────────
const FLOORS: Record<FloorId, Floor> = {
  b1: {
    label: 'B1F — BOSS CHAMBERS',
    rooms: {
      //  entry sits directly below b1-01; corridor connects them vertically
      //  b1-01 → b1-02 → b1-03 connected by horizontal corridor at room mid-height
      //  All rooms + entry fit inside a 190×160 canvas
      entry:   { x:8,   y:118, label:'ENTRY',   type:'entry',    exits:{ n:'b1-01' },            color:'#00cc66' },
      'b1-01': { x:8,   y:55,  label:'B1-01',   type:'boss',     exits:{ e:'b1-02', s:'entry' }, color:'#ff3333', project:'ruplanner' },
      'b1-02': { x:77,  y:55,  label:'B1-02',   type:'boss',     exits:{ w:'b1-01', e:'b1-03' }, color:'#ff3333', project:'malware'   },
      'b1-03': { x:146, y:55,  label:'B1-03',   type:'boss',     exits:{ w:'b1-02' },            color:'#ff3333', project:'portfolio' },
    },
    corridors: [
      { x1:25,  y1:83, w:2,  h:35, type:'v' },  // b1-01 bottom → entry top  (x=26 = center of b1-01)
      { x1:44,  y1:69, w:33, h:2,  type:'h' },  // b1-01 right (44) → b1-02 left (77)
      { x1:113, y1:69, w:33, h:2,  type:'h' },  // b1-02 right (113) → b1-03 left (146)
    ],
    start: 'entry',
  },
  b2: {
    label: 'B2F — TREASURE VAULTS',
    rooms: {
      entry: { x:77, y:118, label:'ENTRY', type:'entry',    exits:{ n:'vault' }, color:'#00cc66' },
      vault: { x:77, y:50,  label:'VAULT', type:'treasure', exits:{ s:'entry' }, color:'#ffb700', project:'repos' },
    },
    corridors: [
      { x1:94, y1:78, w:2, h:40, type:'v' },  // vault bottom (78) → entry top (118)
    ],
    start: 'entry',
  },
  b3: {
    label: 'B3F — ARCHIVES',
    rooms: {
      entry:   { x:77, y:118, label:'ENTRY',   type:'entry',   exits:{ n:'archive' }, color:'#00cc66' },
      archive: { x:77, y:50,  label:'ARCHIVE', type:'archive', exits:{ s:'entry'   }, color:'#cc44ff', project:'about' },
    },
    corridors: [
      { x1:94, y1:78, w:2, h:40, type:'v' },
    ],
    start: 'entry',
  },
  b4: {
    label: 'B4F — CHRONICLES',
    rooms: {
      entry:     { x:77, y:118, label:'ENTRY',      type:'entry',     exits:{ n:'chronicle' }, color:'#00cc66' },
      chronicle: { x:77, y:50,  label:'CHRONICLE',  type:'chronicle', exits:{ s:'entry'     }, color:'#00ddff' },
    },
    corridors: [
      { x1:94, y1:78, w:2, h:40, type:'v' },
    ],
    start: 'entry',
  },
};

const PROJECT_MAP = Object.fromEntries(PROJECTS.map(p => [p.id, p])) as Record<string, DungeonProject>;

const ACCENT_HEX: Record<string, string> = {
  green:  '#00cc66',
  amber:  '#ffb700',
  cyan:   '#00ddff',
  purple: '#cc44ff',
  red:    '#ff3333',
};

const VAULT_ACCENTS = ['#00cc66', '#ffb700', '#00ddff', '#cc44ff'];

// ── Reachability ─────────────────────────────────────────────────────
function checkReachable(floorId: FloorId, currentRoom: string, cleared: Set<string>, target: string): boolean {
  if (target === FLOORS[floorId].start) return true;
  const rooms = FLOORS[floorId].rooms;
  const accessible = new Set([...cleared, currentRoom]);
  for (const [roomId, room] of Object.entries(rooms)) {
    if (!accessible.has(roomId)) continue;
    if (Object.values(room.exits ?? {}).includes(target)) return true;
  }
  return false;
}

// ── HP Bar ────────────────────────────────────────────────────────────
function HPBar({ hp, maxHp, color }: { hp: number; maxHp: number; color: string }) {
  return (
    <div className="dg-hp-row">
      <div className="dg-hp-label" style={{ color }}>HP</div>
      <div className="dg-hp-track">
        <div className="dg-hp-fill" style={{ width: `${(hp / maxHp) * 100}%`, background: color }} />
      </div>
      <div className="dg-hp-val" style={{ color }}>{hp}/{maxHp}</div>
    </div>
  );
}

// ── Map Panel ─────────────────────────────────────────────────────────
function MapPanel({
  floorId, currentRoom, cleared, onJump, onSwitchFloor,
}: {
  floorId: FloorId;
  currentRoom: string;
  cleared: Set<string>;
  onJump: (id: string) => void;
  onSwitchFloor: (f: FloorId) => void;
}) {
  const floor = FLOORS[floorId];
  return (
    <div className="dg-map-panel">
      <div>
        <div className="dg-map-label">FLOOR MAP</div>
        <div className="dg-map-canvas">
          {floor.corridors.map((c, i) => (
            <div
              key={i}
              className={c.type === 'h' ? 'dg-corridor-h' : 'dg-corridor-v'}
              style={c.type === 'h'
                ? { left: c.x1, top: c.y1, width: c.w }
                : { left: c.x1, top: c.y1, height: c.h }}
            />
          ))}
          {Object.entries(floor.rooms).map(([id, rm]) => {
            const isCurrent = id === currentRoom;
            const isCleared = cleared.has(id) && !isCurrent;
            const isLocked  = !checkReachable(floorId, currentRoom, cleared, id);
            const borderColor = isCurrent ? '#00cc66' : isLocked ? '#223322' : isCleared ? '#664400' : rm.color;
            const bg          = isCurrent ? 'rgba(0,204,102,0.2)' : isLocked ? '#050c05' : isCleared ? 'rgba(255,170,0,0.08)' : rm.color + '18';
            const color       = isCurrent ? '#00cc66' : isLocked ? '#223322' : isCleared ? '#664400' : rm.color;
            return (
              <div
                key={id}
                className={`dg-room-node${isCurrent ? ' dg-room-node--current' : ''}${isLocked ? ' dg-room-node--locked' : ''}`}
                style={{ left: rm.x, top: rm.y, borderColor, background: bg, color }}
                onClick={() => !isLocked && onJump(id)}
              >
                {rm.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="dg-legend">
        <div className="dg-map-label">LEGEND</div>
        <div className="dg-legend-row"><div className="dg-legend-box" style={{ borderColor:'#00cc66', background:'rgba(0,204,102,0.15)' }} /> CURRENT</div>
        <div className="dg-legend-row"><div className="dg-legend-box" style={{ borderColor:'#ff3333', background:'rgba(255,51,51,0.1)' }} /> BOSS</div>
        <div className="dg-legend-row"><div className="dg-legend-box" style={{ borderColor:'#ffb700', background:'rgba(255,170,0,0.1)' }} /> CLEARED</div>
        <div className="dg-legend-row"><div className="dg-legend-box" style={{ borderColor:'#334433' }} /> LOCKED</div>
      </div>

      <div className="dg-floor-list-wrap">
        <div className="dg-floor-list-label">◆ SWITCH FLOOR</div>
        <div className="dg-floor-list">
          {(['b1', 'b2', 'b3', 'b4'] as FloorId[]).map(f => {
            const active = floorId === f;
            const label = f === 'b1' ? 'B1F BOSSES' : f === 'b2' ? 'B2F VAULTS' : f === 'b3' ? 'B3F ARCHIVE' : 'B4F CHRONICLES';
            return (
              <button
                key={f}
                className={`dg-floor-btn${active ? ' dg-floor-btn--active' : ''}`}
                onClick={() => onSwitchFloor(f)}
              >
                <span className="dg-floor-btn-arrow">{active ? '▶' : '▷'}</span>
                {label}
              </button>
            );
          })}
        </div>
        <div className="dg-floor-hint">CLICK TO SWITCH</div>
      </div>
    </div>
  );
}

// ── Nav Bar ───────────────────────────────────────────────────────────
function NavBar({
  exits, onMove, battleMode,
}: {
  exits: Partial<Record<Direction, string | null>>;
  onMove: (d: Direction) => void;
  battleMode: boolean;
}) {
  const activeExits = (Object.entries(exits) as [Direction, string | null][])
    .filter(([, v]) => v)
    .map(([k]) => k.toUpperCase());

  return (
    <div className="dg-nav-bar">
      <div className="dg-nav-keys">
        {(['n', 'w', 'e', 's'] as Direction[]).map(d => (
          <button
            key={d}
            className="dg-nav-btn"
            disabled={battleMode || !exits[d]}
            onClick={() => onMove(d)}
          >
            {d.toUpperCase()}
          </button>
        ))}
        <span className="dg-nav-hint">or WASD</span>
      </div>
      <div className="dg-nav-status">
        {battleMode ? 'RAIDING...' : activeExits.length ? `EXITS: ${activeExits.join(' ')}` : 'NO EXIT'}
      </div>
    </div>
  );
}

// ── Pixel Sprite (same as HomeScreen / QuestLog) ─────────────────────
function DungeonHero() {
  const T = 'transparent';
  const H = '#3d2b1f';
  const S = '#f4c48a';
  const B = '#1a6b3a';
  const P = '#1a3a6b';
  const W = '#ffffff';
  const E = '#2c1810';
  const SH = '#2c1810';

  const grid: string[][] = [
    [H,  H,  H,  H,  H,  H,  H,  H ],
    [H,  H,  H,  H,  H,  H,  H,  H ],
    [H,  S,  S,  S,  S,  S,  S,  H ],
    [H,  S,  W,  W,  S,  W,  W,  H ],
    [H,  S,  E,  E,  S,  E,  E,  H ],
    [H,  S,  S,  S,  S,  S,  S,  H ],
    [T,  T,  B,  B,  B,  B,  T,  T ],
    [T,  B,  B,  B,  B,  B,  B,  T ],
    [T,  B,  B,  B,  B,  B,  B,  T ],
    [T,  P,  P,  P,  P,  P,  P,  T ],
    [T,  P,  P,  T,  T,  P,  P,  T ],
    [T,  SH, SH, T,  T,  SH, SH, T ],
  ];

  return (
    <svg
      width="56" height="84"
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', flexShrink: 0 }}
    >
      {grid.map((row, y) =>
        row.map((fill, x) =>
          fill !== T ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} /> : null
        )
      )}
    </svg>
  );
}

// ── Entry Room ────────────────────────────────────────────────────────
function EntryRoom({ cleared, floorId }: { cleared: Set<string>; floorId: FloorId }) {
  return (
    <div className="dg-entry-room">
      {/* Sprite + thought bubble */}
      <div className="dg-hero-row">
        <div className="dg-hero-sprite">
          <DungeonHero />
        </div>
        <div className="dg-thought-bubble">
          USE WASD TO MOVE.<br />
          ENTER BOSS CHAMBERS<br />
          TO RAID PROJECTS!<br />
          <span className="dg-thought-dim">▼ CLICK MAP ROOMS TO WARP</span>
        </div>
      </div>

      <div className="dg-stats-row">
        <div className="dg-stat-box"><div className="dg-stat-num">{cleared.size}</div><div className="dg-stat-lab">ROOMS CLEARED</div></div>
        <div className="dg-stat-box"><div className="dg-stat-num">{Object.keys(FLOORS[floorId].rooms).length}</div><div className="dg-stat-lab">FLOOR ROOMS</div></div>
        <div className="dg-stat-box"><div className="dg-stat-num">3</div><div className="dg-stat-lab">FLOORS TOTAL</div></div>
      </div>
    </div>
  );
}

// ── Boss Card ─────────────────────────────────────────────────────────
function BossCard({ proj, onRaid }: { proj: DungeonProject; onRaid: () => void }) {
  const hex = ACCENT_HEX[proj.accent] ?? '#00cc66';
  return (
    <div className="dg-boss-card" style={{ borderColor: hex, background: hex + '0a' }}>
      <div className="dg-boss-name" style={{ color: hex }}>{proj.name}</div>
      <div className="dg-boss-meta">
        <span className="dg-boss-type">{proj.type}</span>
        <span className="dg-diff-badge" style={{ borderColor: proj.diffColor, color: proj.diffColor }}>{proj.difficulty}</span>
      </div>
      <HPBar hp={proj.hp} maxHp={100} color={hex} />
      <div className="dg-desc">{proj.description}</div>
      <div className="dg-tags">
        {proj.stack.map(t => (
          <span key={t} className="dg-tag" style={{ color: hex, borderColor: hex + '55' }}>{t}</span>
        ))}
      </div>
      <div className="dg-boss-actions">
        {proj.phases.length > 0 && (
          <button className="dg-raid-btn" style={{ color: hex, borderColor: hex }} onClick={onRaid}>
            [ RAID BOSS ]
          </button>
        )}
        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="dg-link" style={{ color: hex }}>
            [GITHUB]
          </a>
        )}
        {proj.live && (
          <a href={proj.live} target="_blank" rel="noopener noreferrer" className="dg-link" style={{ color: '#00ddff' }}>
            [LIVE]
          </a>
        )}
      </div>
    </div>
  );
}

// ── Battle / Raid Log ─────────────────────────────────────────────────
function BattleScreen({ proj, onExit }: { proj: DungeonProject; onExit: () => void }) {
  const hex = ACCENT_HEX[proj.accent] ?? '#00cc66';
  return (
    <div className="dg-battle-screen">
      <button className="dg-back-btn" onClick={onExit}>[ BACK TO ROOM ]</button>
      <div className="dg-battle-title" style={{ color: hex }}>
        --- {proj.name.toUpperCase()} : RAID LOG ---
      </div>
      <HPBar hp={proj.hp} maxHp={100} color={hex} />
      <div className="dg-battle-phases">
        {proj.phases.map((phase, i) => (
          <div key={i} className={`dg-phase${i === 0 ? ' dg-phase--active' : ''}`}>
            <div className="dg-phase-label">{phase.label}</div>
            <div className="dg-phase-text">{phase.text}</div>
            <div className="dg-ability-row">
              {phase.abilities.map(a => <span key={a} className="dg-ability">{a}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vault Room (GitHub repos) ─────────────────────────────────────────
function VaultRoom({ repos, loading, error }: { repos: GitHubRepo[]; loading: boolean; error: string | null }) {
  if (loading) {
    return (
      <div className="dg-loading">
        <span style={{ animation: 'badgePulse 1s ease-in-out infinite' }}>SCOUTING VAULTS</span>
        <span className="cursor" />
      </div>
    );
  }
  if (error) return <div className="dg-error">⚠ FETCH FAILED: {error}</div>;

  return (
    <div className="dg-vault-room">
      <div className="dg-vault-header">★ {repos.length} REPOSITORIES DISCOVERED</div>
      <div className="dg-vault-grid">
        {repos.map((repo, i) => {
          const accent = VAULT_ACCENTS[i % VAULT_ACCENTS.length];
          const date = new Date(repo.updated_at).toLocaleDateString('en-US', {
            year: '2-digit', month: 'short', day: 'numeric',
          });
          return (
            <div key={repo.id} className="dg-vault-card" style={{ borderColor: accent }}>
              <div className="dg-vault-icon" style={{ color: accent }}>◈</div>
              <div className="dg-vault-info">
                <div className="dg-vault-name" style={{ color: accent }}>{repo.name}</div>
                <div className="dg-vault-meta">{repo.language ?? 'UNKNOWN'} · {date}</div>
                {repo.description && (
                  <div className="dg-vault-desc">{repo.description}</div>
                )}
                {repo.topics.length > 0 && (
                  <div className="dg-tags" style={{ marginTop: 4 }}>
                    {repo.topics.map(t => <span key={t} className="dg-tag">{t}</span>)}
                  </div>
                )}
                <div className="dg-vault-links">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="dg-link" style={{ color: accent }}>[LOOT]</a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="dg-link" style={{ color: '#00ddff' }}>[PORTAL]</a>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span style={{ fontSize: '6px', color: '#ffb700', marginLeft: 'auto' }}>★ {repo.stargazers_count}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Archive Room ──────────────────────────────────────────────────────
function ArchiveRoom() {
  return (
    <div className="dg-boss-card" style={{ borderColor: '#cc44ff', background: 'rgba(204,68,255,0.06)' }}>
      <div className="dg-boss-name" style={{ color: '#cc44ff' }}>Ameer Rahman</div>
      <div className="dg-boss-meta">
        <span className="dg-boss-type">Character Archive</span>
        <span className="dg-diff-badge" style={{ borderColor: '#cc44ff', color: '#cc44ff' }}>ORIGIN STORY</span>
      </div>
      <HPBar hp={100} maxHp={100} color="#cc44ff" />
      <div className="dg-desc">
        CS + Critical Intelligence Studies @ Rutgers. Founded the Rutgers Run Club. Based in New York. Seeking SWE internship 2025.
      </div>
      <div className="dg-tags">
        {['Rutgers 2026', 'New York', 'Run Club', 'Open to Work'].map(t => (
          <span key={t} className="dg-tag" style={{ color: '#00cc66', borderColor: 'rgba(0,204,102,0.4)' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Chronicle Room (GitHub Contribution Calendar) ─────────────────────
const CONTRIB_COLORS: Record<0|1|2|3|4, string> = {
  0: '#0a0a0a',
  1: '#2e2e2e',
  2: '#717171',
  3: '#b0b0b0',
  4: '#ffffff',
};

const CONTRIB_BORDERS: Record<0|1|2|3|4, string> = {
  0: '#141414',
  1: '#3d3d3d',
  2: '#888888',
  3: '#cccccc',
  4: '#ffffff',
};

function groupByWeek(contributions: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];
  contributions.forEach((day, i) => {
    week.push(day);
    if (week.length === 7 || i === contributions.length - 1) {
      weeks.push(week);
      week = [];
    }
  });
  return weeks;
}

function formatEvent(ev: GitHubEvent): { prefix: string; text: string; color: string } {
  const repo = ev.repo.name.replace('ameer-rah/', '');
  switch (ev.type) {
    case 'PushEvent': {
      const commits = (ev.payload.commits as unknown[])?.length ?? 1;
      return { prefix: 'PUSH', text: `${commits} commit${commits !== 1 ? 's' : ''} → ${repo}`, color: '#00cc66' };
    }
    case 'CreateEvent':
      return { prefix: 'CREATE', text: `${ev.payload.ref_type} ${ev.payload.ref ?? ''} in ${repo}`, color: '#00ddff' };
    case 'PullRequestEvent':
      return { prefix: 'PR', text: `${String(ev.payload.action).toUpperCase()} — ${repo}`, color: '#cc44ff' };
    case 'IssuesEvent':
      return { prefix: 'ISSUE', text: `${String(ev.payload.action).toUpperCase()} — ${repo}`, color: '#ffb700' };
    case 'WatchEvent':
      return { prefix: 'STAR', text: repo, color: '#ffb700' };
    case 'ForkEvent':
      return { prefix: 'FORK', text: repo, color: '#00ddff' };
    case 'DeleteEvent':
      return { prefix: 'DELETE', text: `${ev.payload.ref_type} in ${repo}`, color: '#ff3333' };
    default:
      return { prefix: ev.type.replace('Event', '').toUpperCase(), text: repo, color: '#334433' };
  }
}

function ActivityLog({ events, loading }: { events: GitHubEvent[]; loading: boolean }) {
  return (
    <div className="dg-activity-wrap">
      <div className="dg-activity-header">▶ RECENT ACTIVITY LOG</div>
      <div className="dg-activity-scroll-anchor">
      <div className="dg-activity-log">
        {loading ? (
          <div className="dg-activity-row" style={{ color: '#334433' }}>SCANNING FIELD REPORTS...</div>
        ) : events.length === 0 ? (
          <div className="dg-activity-row" style={{ color: '#334433' }}>NO RECENT ACTIVITY</div>
        ) : (
          events.map(ev => {
            const { prefix, text, color } = formatEvent(ev);
            const date = new Date(ev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return (
              <div key={ev.id} className="dg-activity-row">
                <span className="dg-activity-date">{date}</span>
                <span className="dg-activity-prefix" style={{ color }}>[{prefix}]</span>
                <span className="dg-activity-text">{text}</span>
              </div>
            );
          })
        )}
      </div>
      </div>
    </div>
  );
}

function ChronicleRoom({ data, loading, error, events, loadingEvents, repos, loadingRepos }: {
  data: ContributionData | null;
  loading: boolean;
  error: string | null;
  events: GitHubEvent[];
  loadingEvents: boolean;
  repos: GitHubRepo[];
  loadingRepos: boolean;
}) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  if (loading) {
    return (
      <div className="dg-loading">
        <span style={{ animation: 'badgePulse 1s ease-in-out infinite' }}>DECODING CHRONICLES</span>
        <span className="cursor" />
      </div>
    );
  }
  if (error || !data) return <div className="dg-error">⚠ CHRONICLES UNAVAILABLE: {error}</div>;

  const weeks = groupByWeek(data.contributions);
  const totalThisYear = Object.values(data.total).reduce((a, b) => a + b, 0);

  // Compute current streak (days in a row with count > 0, going backwards)
  let streak = 0;
  for (let i = data.contributions.length - 1; i >= 0; i--) {
    if (data.contributions[i].count > 0) streak++;
    else break;
  }

  // Build month label positions: find first week index where month changes
  const MONTH_NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const monthLabels: { wi: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const m = new Date(week[0].date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ wi, label: MONTH_NAMES[m] });
      lastMonth = m;
    }
  });

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="dg-chronicle-room" onMouseLeave={() => setTooltip(null)}>
      {tooltip && (
        <div className="dg-cal-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
      <div className="dg-vault-header" style={{ color: '#ffffff' }}>
        ◈ CONTRIBUTION CHRONICLES — ameer-rah
      </div>

      <div className="dg-stats-row" style={{ marginBottom: 10 }}>
        <div className="dg-stat-box">
          <div className="dg-stat-num" style={{ color: '#00cc66' }}>{totalThisYear}</div>
          <div className="dg-stat-lab">TOTAL COMMITS</div>
        </div>
        <div className="dg-stat-box">
          <div className="dg-stat-num" style={{ color: '#00ddff' }}>{streak}</div>
          <div className="dg-stat-lab">CURRENT STREAK</div>
        </div>
        <div className="dg-stat-box">
          <div className="dg-stat-num" style={{ color: '#ffb700' }}>{weeks.length}</div>
          <div className="dg-stat-lab">WEEKS LOGGED</div>
        </div>
      </div>

      <div className="dg-cal-wrap">
        <div className="dg-cal-days">
          <div className="dg-cal-day-spacer" />
          {DAYS.map(d => <div key={d} className="dg-cal-day-label">{d}</div>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          {/* Month labels row */}
          <div className="dg-cal-months">
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find(m => m.wi === wi);
              return (
                <div key={wi} className="dg-cal-month-cell">
                  {lbl ? lbl.label : ''}
                </div>
              );
            })}
          </div>
          <div className="dg-cal-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="dg-cal-week">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className="dg-cal-cell"
                    style={{
                      background: CONTRIB_COLORS[day.level as 0|1|2|3|4],
                      borderColor: CONTRIB_BORDERS[day.level as 0|1|2|3|4],
                      boxShadow: day.level >= 3 ? `0 0 4px ${CONTRIB_COLORS[day.level as 0|1|2|3|4]}88` : 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const parent = (e.currentTarget as HTMLElement).closest('.dg-chronicle-room')!.getBoundingClientRect();
                      setTooltip({
                        text: `${day.date} — ${day.count} contribution${day.count !== 1 ? 's' : ''}`,
                        x: rect.left - parent.left + rect.width / 2,
                        y: rect.top - parent.top - 24,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => window.open('https://github.com/ameer-rah', '_blank', 'noopener,noreferrer')}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dg-cal-legend">
        <span className="dg-cal-legend-label">LESS</span>
        {([0,1,2,3,4] as const).map(l => (
          <div key={l} className="dg-cal-cell" style={{ background: CONTRIB_COLORS[l], borderColor: CONTRIB_BORDERS[l], boxShadow: l >= 3 ? `0 0 4px ${CONTRIB_COLORS[l]}88` : 'none' }} />
        ))}
        <span className="dg-cal-legend-label">MORE</span>
      </div>

      <div className="dg-chronicle-bottom">
        <CharStatsPanel repos={repos} contribs={data} loadingRepos={loadingRepos} loadingCal={loading} />
        <ActivityLog events={events} loading={loadingEvents} />
      </div>
    </div>
  );
}

// ── Char Stats Panel ──────────────────────────────────────────────────
function CharStatsPanel({
  repos, contribs, loadingRepos, loadingCal,
}: {
  repos: GitHubRepo[];
  contribs: ContributionData | null;
  loadingRepos: boolean;
  loadingCal: boolean;
}) {
  const totalCommits = contribs ? Object.values(contribs.total).reduce((a, b) => a + b, 0) : 0;
  const uniqueLangs = loadingRepos ? 0 : new Set(repos.map(r => r.language).filter(Boolean)).size;
  let streak = 0;
  if (contribs) {
    for (let i = contribs.contributions.length - 1; i >= 0; i--) {
      if (contribs.contributions[i].count > 0) streak++;
      else break;
    }
  }
  const level = Math.min(99, Math.floor(Math.sqrt(totalCommits / 2)));
  const stats = [
    { key: 'STR', label: 'STR', sub: 'COMMITS',   val: totalCommits, max: 1000, color: '#ff3333', loading: loadingCal },
    { key: 'INT', label: 'INT', sub: 'LANGUAGES',  val: uniqueLangs,  max: 20,   color: '#00ddff', loading: loadingRepos },
    { key: 'DEX', label: 'DEX', sub: 'DAY STREAK', val: streak,       max: 30,   color: '#00cc66', loading: loadingCal },
  ];
  return (
    <div className="dg-char-stats-panel">
      <div className="dg-char-stats-header">[ CHAR STATS ]</div>
      <div className="dg-char-sprite-wrap"><DungeonHero /></div>
      <div className="dg-char-id-name">AMEER RAHMAN</div>
      <div className="dg-char-id-class">FULL-STACK SORCERER</div>
      <div className="dg-char-id-level">
        <span className="dg-char-lv-badge">LV</span>
        <span className="dg-char-lv-num">{loadingCal ? '--' : level}</span>
      </div>
      <div className="dg-char-divider" />
      {stats.map(s => {
        const filled = s.loading ? 0 : Math.round(Math.min(100, (s.val / s.max) * 100) / 10);
        return (
          <div key={s.key} className="dg-char-stat-block">
            <div className="dg-char-stat-head">
              <span className="dg-char-stat-name" style={{ color: s.color }}>{s.label}</span>
              <span className="dg-char-stat-sub">{s.sub}</span>
              <span className="dg-char-stat-val" style={{ color: s.color }}>{s.loading ? '...' : s.val > s.max ? `${s.max}+` : s.val}</span>
            </div>
            <div className="dg-char-seg-track">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="dg-char-seg" style={{ background: i < filled ? s.color : '#0a0a0a', borderColor: i < filled ? s.color : '#1a3a1a', boxShadow: i < filled ? `0 0 3px ${s.color}66` : 'none' }} />
              ))}
            </div>
          </div>
        );
      })}
      <div className="dg-char-divider" />
      <div className="dg-char-stat-hint">DERIVED FROM<br />GITHUB DATA</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────
export default function Dungeons() {
  const [floor,        setFloor]       = useState<FloorId>('b1');
  const [room,         setRoom]        = useState<string>('entry');
  const [cleared,      setCleared]     = useState<Set<string>>(new Set(['entry']));
  const [battle,       setBattle]      = useState<string | null>(null);
  const [repos,        setRepos]       = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos]= useState(true);
  const [repoError,    setRepoError]   = useState<string | null>(null);
  const [contribs,     setContribs]    = useState<ContributionData | null>(null);
  const [loadingCal,   setLoadingCal]  = useState(true);
  const [calError,     setCalError]    = useState<string | null>(null);
  const [events,       setEvents]      = useState<GitHubEvent[]>([]);
  const [loadingEvents,setLoadingEvents]= useState(true);

  // Fetch GitHub repos once on mount
  useEffect(() => {
    const featuredIds = new Set(PROJECTS.map(p => p.id));
    fetchUserRepos('ameer-rah')
      .then(data => setRepos(data.filter(r => !featuredIds.has(r.name.toLowerCase()))))
      .catch(err => setRepoError(err.message))
      .finally(() => setLoadingRepos(false));
  }, []);

  // Fetch contribution calendar once on mount
  useEffect(() => {
    fetchContributions('ameer-rah')
      .then(data => setContribs(data))
      .catch(err => setCalError(err.message))
      .finally(() => setLoadingCal(false));
  }, []);

  // Fetch recent events once on mount
  useEffect(() => {
    fetchUserEvents('ameer-rah')
      .then(data => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setLoadingEvents(false));
  }, []);

  const move = useCallback((dir: Direction) => {
    if (battle) return;
    const dest = FLOORS[floor].rooms[room]?.exits[dir];
    if (!dest) return;
    setCleared(prev => new Set([...prev, room]));
    setRoom(dest);
  }, [floor, room, battle]);

  const switchFloor = useCallback((f: FloorId) => {
    setFloor(f);
    setRoom(FLOORS[f].start);
    setCleared(new Set([FLOORS[f].start]));
    setBattle(null);
  }, []);

  const jumpTo = useCallback((targetId: string) => {
    if (!checkReachable(floor, room, cleared, targetId)) return;
    setCleared(prev => new Set([...prev, room]));
    setRoom(targetId);
    setBattle(null);
  }, [floor, room, cleared]);

  // WASD keyboard navigation (does not use arrow keys to avoid conflict with screen switcher)
  useEffect(() => {
    const KEY_MAP: Record<string, Direction> = {
      w:'n', s:'s', a:'w', d:'e',
      W:'n', S:'s', A:'w', D:'e',
    };
    function handler(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (battle) return;
      const dir = KEY_MAP[e.key];
      if (dir) move(dir);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move, battle]);

  const floorDef = FLOORS[floor];
  const roomDef  = floorDef.rooms[room];
  const exits    = roomDef?.exits ?? {};

  const roomTypeLabel =
    battle                          ? 'RAID IN PROGRESS' :
    roomDef?.type === 'boss'        ? 'BOSS CHAMBER'     :
    roomDef?.type === 'treasure'    ? 'TREASURE VAULT'   :
    roomDef?.type === 'archive'     ? 'ARCHIVES'         :
    roomDef?.type === 'chronicle'   ? 'CHRONICLES'       : 'ENTRANCE';

  const roomTypeColor =
    battle                          ? '#ff3333' :
    roomDef?.type === 'boss'        ? '#ff3333' :
    roomDef?.type === 'treasure'    ? '#ffb700' :
    roomDef?.type === 'archive'     ? '#cc44ff' :
    roomDef?.type === 'chronicle'   ? '#00ddff' : '#334433';

  function renderContent() {
    if (battle) {
      const proj = PROJECT_MAP[battle];
      return proj ? <BattleScreen proj={proj} onExit={() => setBattle(null)} /> : null;
    }
    if (!roomDef) return null;
    switch (roomDef.type) {
      case 'entry':    return <EntryRoom cleared={cleared} floorId={floor} />;
      case 'boss': {
        const proj = PROJECT_MAP[roomDef.project ?? ''];
        return proj ? <BossCard proj={proj} onRaid={() => setBattle(roomDef.project!)} /> : null;
      }
      case 'treasure':  return <VaultRoom repos={repos} loading={loadingRepos} error={repoError} />;
      case 'archive':   return <ArchiveRoom />;
      case 'chronicle': return <ChronicleRoom data={contribs} loading={loadingCal} error={calError} events={events} loadingEvents={loadingEvents} repos={repos} loadingRepos={loadingRepos} />;
      default:          return null;
    }
  }

  return (
    <div className="dg-wrap">

      {/* Header */}
      <div className="dg-header">
        <div className="dg-title">[ DUNGEON RAIDS ]</div>
        <div className="dg-floor-badge">{floorDef.label}</div>
      </div>

      {/* Body */}
      <div className="dg-body">

        <MapPanel
          floorId={floor}
          currentRoom={room}
          cleared={cleared}
          onJump={jumpTo}
          onSwitchFloor={switchFloor}
        />

        <div className="dg-main-panel">
          <div className="dg-room-header">
            <div className="dg-room-id">{room.toUpperCase()} — {roomDef?.label ?? 'ROOM'}</div>
            <div className="dg-type-badge" style={{ borderColor: roomTypeColor, color: roomTypeColor }}>
              {roomTypeLabel}
            </div>
          </div>

          <div className="dg-room-content">
            {renderContent()}
          </div>

          <NavBar exits={exits} onMove={move} battleMode={!!battle} />
        </div>


      </div>
    </div>
  );
}
