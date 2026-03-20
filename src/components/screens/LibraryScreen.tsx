import { useState, useEffect } from 'react';

interface ReadingItem {
  id: string;
  title: string;
  author?: string;
  description?: string;
  url: string;
  pdf?: string;
  image?: string;
  tags: string[];
  dateAdded: string;
  read?: boolean;
  lean?: number;
}

// ── helpers ────────────────────────────────────────────────────────────────

function shortTitle(title: string): string {
  return title.split(' — ')[0].split(':')[0].trim();
}

function displayTags(item: ReadingItem): string[] {
  return item.tags.filter(t => t !== 'book' && t !== 'paper');
}

function primaryGenre(item: ReadingItem): 'SECURITY' | 'SWE' | 'ALGORITHMS' {
  if (item.tags.includes('security'))   return 'SECURITY';
  if (item.tags.includes('algorithms')) return 'ALGORITHMS';
  return 'SWE';
}

const GENRE_COLORS: Record<string, { color: string; dim: string }> = {
  SECURITY:   { color: '#ff3333', dim: '#5c0a0a' },
  SWE:        { color: '#00cc66', dim: '#0a3a1a' },
  ALGORITHMS: { color: '#00ddff', dim: '#003344' },
};

function spineColor(item: ReadingItem): { bg: string; text: string; glow: string } {
  if (item.tags.includes('security'))             return { bg: '#5c0a0a', text: '#ff6666', glow: '#ff3333' };
  if (item.tags.includes('distributed systems'))  return { bg: '#3a0a5c', text: '#cc88ff', glow: '#aa44ff' };
  if (item.tags.includes('algorithms'))           return { bg: '#5c3a00', text: '#ffcc44', glow: '#ffaa00' };
  if (item.tags.includes('software engineering')) return { bg: '#0a3a1a', text: '#44cc88', glow: '#00cc66' };
  if (item.tags.includes('systems'))              return { bg: '#0a1a5c', text: '#4488ff', glow: '#2266ff' };
  return { bg: '#1a1a1a', text: '#aaaaaa', glow: '#666666' };
}

function spineSize(item: ReadingItem): { width: number; height: number } {
  const isBook = item.tags.includes('book');
  const heights = [110, 100, 120, 95, 115, 105, 90, 118, 100, 112, 95, 108];
  const idx = parseInt(item.id.replace(/\D/g, ''), 10) % heights.length;
  return { width: isBook ? 42 : 26, height: heights[idx] };
}

function formatAdded(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

function getLastTwelveMonths(): { year: number; month: number; label: string }[] {
  const now = new Date();
  const result = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    });
  }
  return result;
}

// ── Book spine ─────────────────────────────────────────────────────────────

function BookSpine({
  item, selected, onClick,
}: { item: ReadingItem; selected: boolean; onClick: () => void }) {
  const { bg, text, glow } = spineColor(item);
  const { width, height } = spineSize(item);
  const isBook = item.tags.includes('book');
  const lean = item.lean ?? 0;
  const label = shortTitle(item.title)
    .split(' ')
    .slice(0, isBook ? 4 : 3)
    .join(' ');

  return (
    <div
      className="book-spine"
      style={{
        width,
        height,
        background: bg,
        borderColor: selected ? glow : text,
        boxShadow: selected
          ? `0 0 10px ${glow}, 0 0 20px ${glow}44`
          : `inset -3px 0 6px rgba(0,0,0,0.5)`,
        color: text,
        cursor: 'pointer',
        alignSelf: 'flex-end',
        transform: `translateY(${selected ? -7 : 0}px) rotate(${lean}deg)`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.15s, box-shadow 0.15s, filter 0.15s',
        filter: selected ? 'brightness(1.25)' : undefined,
        zIndex: lean !== 0 || selected ? 2 : 1,
      }}
      onClick={onClick}
      title={item.title}
    >
      <span className="book-spine-label" style={{ color: text }}>{label}</span>
      {isBook && <span className="book-spine-type" style={{ color: text, opacity: 0.6 }}>▬</span>}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function LibraryScreen() {
  const [items, setItems]       = useState<ReadingItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [selected, setSelected] = useState<ReadingItem | null>(null);
  const [streakIn, setStreakIn]  = useState(false);

  useEffect(() => {
    fetch('/data/reading_list.json')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data: ReadingItem[]) =>
        setItems(data.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()))
      )
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && items.length > 0) {
      const t = setTimeout(() => setStreakIn(true), 400);
      return () => clearTimeout(t);
    }
  }, [loading, items]);

  function toggle(item: ReadingItem) {
    setSelected(prev => prev?.id === item.id ? null : item);
  }

  // ── stats ────────────────────────────────────────────────────────────────
  const readCount   = 11;
  const total       = items.length;
  const completePct = total ? Math.round((readCount / total) * 100) : 0;

  const currentYear   = new Date().getFullYear();
  const yearReadCount = items.filter(i =>
    new Date(i.dateAdded).getFullYear() === currentYear && i.read !== false
  ).length;
  const yearGoal = 20;

  const GENRES = ['SECURITY', 'SWE', 'ALGORITHMS'] as const;
  const genreStats = GENRES.map(g => {
    const all  = items.filter(i => primaryGenre(i) === g);
    const done = all.filter(i => i.read !== false).length;
    return { genre: g, total: all.length, done };
  }).filter(gs => gs.total > 0);

  const maxGenreTotal = Math.max(...genreStats.map(gs => gs.total), 1);

  const months     = getLastTwelveMonths();
  const activeKeys = new Set(
    items.map(i => { const d = new Date(i.dateAdded); return `${d.getFullYear()}-${d.getMonth()}`; })
  );

  const recentItems = items.slice(0, 4);

  return (
    <div className="library">
      {/* Header */}
      <div className="screen-header">
        <span className="screen-title">[ LIBRARY ]</span>
        <span className="screen-subtitle">{total} ENTRIES — TAP A BOOK</span>
      </div>

      {loading && (
        <div className="lib-loading">
          <span className="dungeon-loading-text">LOADING LIBRARY</span>
          <span className="cursor" />
        </div>
      )}

      {error && (
        <div className="dungeon-error pixel-box-amber">⚠ LOAD FAILED: {error}</div>
      )}

      {!loading && !error && (
        <>
          {/* ── SHELF ── */}
          <div className="bookshelf">
            <div className="shelf-books">
              {items.map(item => (
                <BookSpine
                  key={item.id}
                  item={item}
                  selected={selected?.id === item.id}
                  onClick={() => toggle(item)}
                />
              ))}
            </div>

            <div className="shelf-plank">
              <div className="shelf-plank-top" />
              <div className="shelf-plank-body" />
            </div>
            <div className="shelf-supports">
              <div className="shelf-support" />
              <div className="shelf-support" />
            </div>
          </div>

          {/* ── DETAIL STRIP ── */}
          <div
            className="lib-detail-strip pixel-box"
            style={selected ? { borderColor: spineColor(selected).glow, boxShadow: `0 0 12px ${spineColor(selected).glow}22` } : {}}
          >
            {selected ? (
              <div className="lib-detail-content">
                <div className="lib-detail-accent" style={{ background: spineColor(selected).glow }} />

                <div className="lib-detail-info">
                  <div className="lib-detail-title" style={{ color: spineColor(selected).glow }}>
                    {shortTitle(selected.title)}
                  </div>
                  {selected.author && (
                    <div className="lib-detail-author">{selected.author}</div>
                  )}
                  <div className="lib-detail-tags">
                    {displayTags(selected).map(tag => (
                      <span key={tag} className="lib-tag" style={{ borderColor: spineColor(selected).text, color: spineColor(selected).text }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selected.description && (
                    <div className="lib-detail-desc">{selected.description}</div>
                  )}
                </div>

                <div className="lib-detail-actions">
                  <div className="lib-detail-meta-date">ADDED: {formatAdded(selected.dateAdded)}</div>
                  {selected.read !== false && (
                    <div className="lib-detail-read-badge" style={{ color: spineColor(selected).glow, borderColor: spineColor(selected).glow }}>✓ READ</div>
                  )}
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lib-open-btn"
                    style={{ borderColor: spineColor(selected).glow, color: spineColor(selected).glow }}
                  >
                    [ OPEN ]
                  </a>
                </div>
              </div>
            ) : (
              <div className="lib-detail-empty">SELECT A BOOK TO INSPECT</div>
            )}
          </div>

          {/* ── STATS GRID ── */}
          <div className="lib-stats-grid">

            {/* Left — Reading Progress */}
            <div className="lib-stats-card pixel-box">
              <div className="lib-card-title">READING PROGRESS</div>
              <div className="lib-card-divider" />

              <div className="lib-big-stats">
                <div className="lib-big-stat">
                  <span className="lib-big-number" style={{ color: '#00cc66' }}>{readCount}</span>
                  <span className="lib-big-label">BOOKS READ</span>
                </div>
                <div className="lib-big-stat">
                  <span className="lib-big-number" style={{ color: '#ffb700' }}>{total}</span>
                  <span className="lib-big-label">IN LIBRARY</span>
                </div>
                <div className="lib-big-stat">
                  <span className="lib-big-number" style={{ color: '#00ddff' }}>{completePct}%</span>
                  <span className="lib-big-label">COMPLETE</span>
                </div>
              </div>

              <div className="lib-progress-rows">
                <div className="lib-progress-row">
                  <span className="lib-progress-label">{currentYear} GOAL</span>
                  <div className="lib-progress-track">
                    <div
                      className="lib-progress-fill"
                      style={{ width: `${Math.min((yearReadCount / yearGoal) * 100, 100)}%`, background: '#00cc66' }}
                    />
                  </div>
                  <span className="lib-progress-count">{yearReadCount}/{yearGoal}</span>
                </div>

                {genreStats.map(gs => (
                  <div key={gs.genre} className="lib-progress-row">
                    <span className="lib-progress-label">{gs.genre}</span>
                    <div className="lib-progress-track">
                      <div
                        className="lib-progress-fill"
                        style={{
                          width: gs.total ? `${(gs.done / gs.total) * 100}%` : '0%',
                          background: GENRE_COLORS[gs.genre].color,
                        }}
                      />
                    </div>
                    <span className="lib-progress-count" style={{ color: GENRE_COLORS[gs.genre].color }}>
                      {gs.done}/{gs.total}
                    </span>
                  </div>
                ))}
              </div>

              <div className="lib-streak-section">
                <div className="lib-streak-label">MONTHLY STREAK</div>
                <div className="lib-streak-grid">
                  {months.map((m, i) => {
                    const key = `${m.year}-${m.month}`;
                    const active = activeKeys.has(key);
                    const monthAbbr = new Date(m.year, m.month, 1)
                      .toLocaleDateString('en-US', { month: 'short' })
                      .toUpperCase();
                    return (
                      <div key={key} className="lib-streak-col">
                        <div
                          className={`lib-streak-block ${active ? 'lib-streak-active' : ''} ${streakIn ? 'lib-streak-in' : ''}`}
                          style={{ animationDelay: streakIn ? `${i * 50}ms` : '0ms' }}
                        />
                        <span className={`lib-streak-month ${active ? 'lib-streak-month-active' : ''}`}>
                          {monthAbbr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lib-right-col">

              <div className="lib-stats-card pixel-box">
                <div className="lib-card-title">GENRE BREAKDOWN</div>
                <div className="lib-card-divider" />
                <div className="lib-genre-list">
                  {genreStats.map(gs => {
                    const { color, dim } = GENRE_COLORS[gs.genre];
                    const pct = (gs.total / maxGenreTotal) * 100;
                    return (
                      <div key={gs.genre} className="lib-genre-row">
                        <div className="lib-genre-dot" style={{ background: dim, border: `2px solid ${color}` }} />
                        <span className="lib-genre-name" style={{ color }}>{gs.genre}</span>
                        <div className="lib-genre-track">
                          <div className="lib-genre-fill" style={{ width: `${pct}%`, background: color }} />
                        </div>
                        <span className="lib-genre-count" style={{ color }}>{gs.total}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lib-stats-card pixel-box">
                <div className="lib-card-title">RECENTLY ADDED</div>
                <div className="lib-card-divider" />
                <div className="lib-recent-list">
                  {recentItems.map(item => {
                    const { glow, bg } = spineColor(item);
                    return (
                      <div key={item.id} className="lib-recent-row" onClick={() => toggle(item)}>
                        <div className="lib-recent-dot" style={{ background: bg, border: `2px solid ${glow}` }} />
                        <span className="lib-recent-title">{shortTitle(item.title)}</span>
                        <span className="lib-recent-date">{formatAdded(item.dateAdded)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
