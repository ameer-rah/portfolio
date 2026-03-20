import type { Screen } from '../hooks/useKeyboardNav';

const TABS: { id: Screen; label: string }[] = [
  { id: 'home',      label: 'HOME'      },
  { id: 'quests',    label: 'QUESTS'    },
  { id: 'inventory', label: 'INVENTORY' },
  { id: 'dungeons',  label: 'DUNGEONS'  },
  { id: 'library',   label: 'LIBRARY'   },
  { id: 'contact',   label: 'TERMINAL'  },
];

export default function NavMenu({
  active,
  onSelect,
}: {
  active: Screen;
  onSelect: (s: Screen) => void;
}) {
  return (
    <nav className="nav-menu">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${active === tab.id ? 'nav-btn-active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          [ {tab.label} ]
        </button>
      ))}
    </nav>
  );
}
