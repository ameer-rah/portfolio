import { useState } from 'react';
import { SKILLS, SkillItem, EquipSlot } from '../../data/skills';

type TabLabel = 'WEAPONS' | 'ARMOR' | 'RINGS' | 'SPELLS' | 'POTIONS';
type SlotKey = 'weapon' | 'armor' | 'ring1' | 'ring2' | 'spell1' | 'spell2';

interface Loadout {
  weapon:  SkillItem | null;
  armor:   SkillItem | null;
  ring1:   SkillItem | null;
  ring2:   SkillItem | null;
  spell1:  SkillItem | null;
  spell2:  SkillItem | null;
}

const RARITY_COLOR: Record<string, string> = {
  LEGENDARY: 'var(--pixel-amber)',
  RARE:      '#bb44ff',
  UNCOMMON:  'var(--pixel-cyan)',
  COMMON:    '#3a5a3a',
};

function renderStars(n: number) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function calcStats(loadout: Loadout) {
  const items = Object.values(loadout).filter(Boolean) as SkillItem[];
  return items.reduce(
    (acc, item) => ({
      STR: acc.STR + item.stats.STR,
      INT: acc.INT + item.stats.INT,
      DEX: acc.DEX + item.stats.DEX,
      MGK: acc.MGK + item.stats.MGK,
    }),
    { STR: 0, INT: 0, DEX: 0, MGK: 0 }
  );
}

function equipSlotForType(slot: EquipSlot, loadout: Loadout): SlotKey {
  if (slot === 'weapon') return 'weapon';
  if (slot === 'armor')  return 'armor';
  if (slot === 'ring')   return loadout.ring1 ? 'ring2' : 'ring1';
  // spell
  return loadout.spell1 ? 'spell2' : 'spell1';
}

function slotLabel(key: SlotKey): string {
  const labels: Record<SlotKey, string> = {
    weapon: 'WEAPON', armor: 'ARMOR',
    ring1: 'RING 1', ring2: 'RING 2',
    spell1: 'SPELL 1', spell2: 'SPELL 2',
  };
  return labels[key];
}

function slotIcon(key: SlotKey): string {
  const icons: Record<SlotKey, string> = {
    weapon: '✕', armor: '🛡', ring1: '◯', ring2: '◯', spell1: '✦', spell2: '✦',
  };
  return icons[key];
}

const STAT_MAX = 120;

function InvSprite() {
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
    <svg
      width="48" height="72"
      viewBox="0 0 8 12"
      style={{ imageRendering: 'pixelated' }}
    >
      {grid.map((row, y) =>
        row.map((fill, x) =>
          fill !== T ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} /> : null
        )
      )}
    </svg>
  );
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<TabLabel>('WEAPONS');
  const [loadout, setLoadout] = useState<Loadout>({
    weapon: null, armor: null, ring1: null, ring2: null, spell1: null, spell2: null,
  });
  const [selected, setSelected] = useState<SkillItem | null>(null);

  const tabItems = SKILLS.find(c => c.label === activeTab)?.items ?? [];
  const stats = calcStats(loadout);
  const filledSlots = Object.values(loadout).filter(Boolean).length;

  function handleEquip(item: SkillItem) {
    setLoadout(prev => {
      const key = equipSlotForType(item.slot, prev);
      return { ...prev, [key]: item };
    });
  }

  function handleUnequip(key: SlotKey) {
    setLoadout(prev => ({ ...prev, [key]: null }));
  }

  function isEquipped(item: SkillItem) {
    return Object.values(loadout).some(v => v?.name === item.name);
  }

  const slotKeys: SlotKey[] = ['weapon', 'armor', 'ring1', 'ring2', 'spell1', 'spell2'];

  return (
    <div className="inv-shell">

      {/* ── LEFT PANEL ─────────────────────────────── */}
      <div className="inv-left">

        {/* Header */}
        <div className="inv-panel-header">
          <span className="inv-panel-title">[ INVENTORY ]</span>
          <span className="inv-slot-count">SLOTS {filledSlots}/6</span>
        </div>

        {/* Character card */}
        <div className="inv-char-card">
          <div className="inv-sprite-wrap">
            <InvSprite />
          </div>
          <div className="inv-char-name">AMEER RAHMAN</div>
          <div className="inv-char-class">FULL-STACK SORCERER</div>
        </div>

        {/* Equipped slots */}
        <div className="inv-section-label">EQUIPPED</div>
        <div className="inv-equip-slots">
          {slotKeys.map(key => {
            const item = loadout[key];
            return (
              <div key={key} className={`inv-equip-row ${item ? 'inv-equip-row--filled' : ''}`}>
                <div className="inv-equip-icon">
                  {item ? <span style={{ fontSize: 12, imageRendering: 'auto' }}>{item.icon}</span>
                        : <span className="inv-equip-placeholder">{slotIcon(key)}</span>}
                </div>
                <div className="inv-equip-info">
                  <div className="inv-equip-slot-label">{slotLabel(key)}</div>
                  {item
                    ? <div className="inv-equip-item-name" style={{ color: RARITY_COLOR[item.rarity] }}>{item.name}</div>
                    : <div className="inv-equip-empty">— empty —</div>
                  }
                </div>
                {item && (
                  <button className="inv-unequip-btn" onClick={() => handleUnequip(key)}>✕</button>
                )}
              </div>
            );
          })}
        </div>

        {/* Power stats */}
        <div className="inv-section-label">POWER STATS</div>
        <div className="inv-stats">
          {(['STR', 'INT', 'DEX', 'MGK'] as const).map(stat => (
            <div key={stat} className="inv-stat-row">
              <span className="inv-stat-label">{stat}</span>
              <div className="inv-stat-track">
                <div
                  className="inv-stat-fill"
                  style={{ width: `${Math.min(100, (stats[stat] / STAT_MAX) * 100)}%` }}
                />
              </div>
              <span className="inv-stat-val">{stats[stat]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────── */}
      <div className="inv-right">

        {/* Tabs */}
        <div className="inv-tabs">
          {SKILLS.map(cat => (
            <button
              key={cat.label}
              className={`inv-tab ${activeTab === cat.label ? 'inv-tab--active' : ''}`}
              onClick={() => setActiveTab(cat.label as TabLabel)}
            >
              <span className="inv-tab-label">{cat.label} ({cat.items.length})</span>
              <span className="inv-tab-sub">{cat.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Item list */}
        <div className="inv-item-list">
          {tabItems.map(item => {
            const equipped = isEquipped(item);
            const rarityColor = RARITY_COLOR[item.rarity];
            return (
              <div
                key={item.name}
                className={`inv-item-row ${selected?.name === item.name ? 'inv-item-row--selected' : ''} ${equipped ? 'inv-item-row--equipped' : ''}`}
                onClick={() => setSelected(item)}
                style={selected?.name === item.name ? { borderColor: rarityColor } : {}}
              >
                <div className="inv-item-icon" style={{ borderColor: rarityColor, background: rarityColor + '18' }}>
                  <span style={{ fontSize: 16, imageRendering: 'auto' }}>{item.icon}</span>
                </div>
                <div className="inv-item-info">
                  <div className="inv-item-name-row">
                    <span className="inv-item-name" style={{ color: rarityColor }}>{item.name}</span>
                    <span className="inv-rarity-badge" style={{ borderColor: rarityColor, color: rarityColor }}>
                      {item.rarity}
                    </span>
                    {equipped && <span className="inv-equipped-badge">EQUIPPED</span>}
                  </div>
                  <div className="inv-item-stats">
                    {item.slot.toUpperCase()} · STR+{item.stats.STR} INT+{item.stats.INT} DEX+{item.stats.DEX} MGK+{item.stats.MGK}
                  </div>
                  <div className="inv-item-stars" style={{ color: rarityColor }}>
                    {renderStars(item.stars)}
                  </div>
                </div>
                        {item.slot === 'cert'
                  ? <span className="inv-cert-badge" style={{ borderColor: rarityColor, color: rarityColor }}>
                      {item.name === 'CompTIA Security+' ? '[ IN PROGRESS ]' : '[ EARNED ]'}
                    </span>
                  : <button
                      className="inv-equip-btn"
                      onClick={e => { e.stopPropagation(); handleEquip(item); }}
                      disabled={equipped}
                    >
                      {equipped ? '[ ON ]' : '[ EQUIP ]'}
                    </button>
                }
              </div>
            );
          })}
        </div>

        {/* Detail bar */}
        <div className="inv-detail-bar">
          {selected
            ? <span className="inv-detail-text">{selected.name}: {selected.desc}</span>
            : <span className="inv-detail-placeholder">SELECT AN ITEM TO INSPECT</span>
          }
        </div>
      </div>
    </div>
  );
}
