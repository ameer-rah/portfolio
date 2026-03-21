import { useState, useRef, useEffect } from 'react';
import { EXPERIENCE } from '../../data/experience';

const PATH_ORDER = ['runclub', 'werblin', 'jasfel', 'redynox', 'motazedi'];

const T  = 'transparent';
const H  = '#3d2b1f';
const S  = '#f4c48a';
const G  = '#1a6b3a';
const P  = '#1a3a6b';
const W  = '#ffffff';
const E  = '#2c1810';
const SH = '#2c1810';

const SPRITE: string[][] = [
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

function QuestSprite({ walking, flipped }: { walking: boolean; flipped: boolean }) {
  return (
    <svg
      width="32" height="48" viewBox="0 0 8 12"
      className={walking ? 'quest-sprite-walk' : 'quest-sprite-idle'}
      style={{ imageRendering: 'pixelated', transform: flipped ? 'scaleX(-1)' : undefined }}
    >
      {SPRITE.map((row, y) =>
        row.map((color, x) =>
          color !== T
            ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
            : null
        )
      )}
    </svg>
  );
}

export default function QuestLog() {
  const quests = PATH_ORDER
    .map(id => EXPERIENCE.find(e => e.id === id))
    .filter((e): e is NonNullable<typeof e> => e != null);
  const N = quests.length;

  const [activeIdx, setActiveIdx] = useState(N - 1);
  const [prevIdx,   setPrevIdx]   = useState(N - 1);
  const [isWalking, setIsWalking] = useState(false);
  const [openIdx,   setOpenIdx]   = useState<number | null>(null);
  const [spriteTop, setSpriteTop] = useState(0);
  const [measured,  setMeasured]  = useState(false);
  const [bubble,    setBubble]    = useState<string | null>('Click a node above to begin!');

  const mapRef = useRef<HTMLDivElement>(null);
  const wpRefs = useRef<(HTMLDivElement | null)[]>([]);

  function measure(idx: number) {
    const wp = wpRefs.current[idx];
    if (!wp) return;
    setSpriteTop(wp.offsetTop + wp.offsetHeight / 2);
    setMeasured(true);
  }

  useEffect(() => {
    const t = setTimeout(() => setBubble(null), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => measure(activeIdx), 20);
    return () => clearTimeout(t);
  }, [activeIdx, openIdx]);

  useEffect(() => {
    const obs = new ResizeObserver(() => measure(activeIdx));
    const el = mapRef.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [activeIdx]);

  function handleNode(idx: number) {
    if (isWalking) return;
    if (idx === activeIdx) {
      setOpenIdx(prev => (prev === idx ? null : idx));
      return;
    }
    const dist = Math.abs(idx - activeIdx);
    const duration = 320 + dist * 140;
    setPrevIdx(activeIdx);
    setActiveIdx(idx);
    setIsWalking(true);
    setOpenIdx(null);
    setBubble(null);
    setTimeout(() => {
      setIsWalking(false);
      setOpenIdx(idx);
      setBubble(quests[idx].status === 'active' ? '★ QUEST ACTIVE!' : '✓ QUEST COMPLETE!');
      setTimeout(() => setBubble(null), 2400);
    }, duration);
  }

  const walkSecs = ((320 + Math.abs(activeIdx - prevIdx) * 140) / 1000).toFixed(2) + 's';

  return (
    <div className="quest-log">
      <div className="screen-header">
        <span className="screen-title">★ QUEST LOG</span>
        <span className="screen-subtitle">[ WORK EXPERIENCE ]</span>
      </div>

      <div className="quest-map" ref={mapRef}>
        <div
          className="qsprite-pin"
          style={{
            top: spriteTop,
            opacity: measured ? 1 : 0,
            transition: isWalking
              ? `top ${walkSecs} ease-in-out, opacity 0.2s`
              : 'top 0.12s ease, opacity 0.2s',
          }}
        >
          {bubble && <div className="quest-bubble">{bubble}</div>}
          <QuestSprite walking={isWalking} flipped={activeIdx < prevIdx} />
        </div>

        {quests.map((quest, i) => (
          <div key={quest.id} className="quest-path-row">

            <div
              className="quest-node-col"
              ref={el => { wpRefs.current[i] = el; }}
              onClick={() => handleNode(i)}
              title={`Travel to ${quest.company}`}
            >
              {i > 0 && (
                <div className={`qline${activeIdx < i ? ' lit' : ''}`} />
              )}

              <div className={`qnode ${quest.status}${activeIdx === i ? ' here' : ''}`}>
                {quest.status === 'active' ? '★' : '✓'}
              </div>

              {i < N - 1 && (
                <div className={`qline${activeIdx <= i ? ' lit' : ''}`} />
              )}
            </div>

            <div className="quest-card-col">
              <div
                className={`quest-card pixel-box ${quest.status}${activeIdx === i ? ' here' : ''}`}
                onClick={() => handleNode(i)}
              >
                <div className="quest-header">
                  <div className="quest-header-left">
                    <span className="quest-name">{quest.company}</span>
                    <span className="quest-role">{quest.role}</span>
                  </div>
                  <div className="quest-header-right">
                    <span className={`badge badge-${quest.status}`}>
                      {quest.status === 'active' ? '● ACTIVE' : '✓ DONE'}
                    </span>
                    <span className="quest-period">{quest.period}</span>
                  </div>
                </div>

                {openIdx === i && (
                  <div className="quest-body">
                    <ul className="quest-bullets">
                      {quest.bullets.map((b, j) => <li key={j}>▸ {b}</li>)}
                    </ul>
                    {quest.tags.length > 0 && (
                      <div className="quest-tags">
                        {quest.tags.map(tag => (
                          <span key={tag} className="quest-tag">[{tag}]</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="quest-expand-hint">
                  {openIdx === i ? '▲ COLLAPSE' : '▼ EXPAND'}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="quest-travel-hint">
        ▸ CLICK A NODE TO TRAVEL  ·  CLICK CARD TO EXPAND
      </div>
    </div>
  );
}
