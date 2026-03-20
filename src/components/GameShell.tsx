import { useNavigate, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import NavMenu from './NavMenu';
import GameFooter from './GameFooter';
import HomeScreen from './screens/HomeScreen';
import QuestLog from './screens/QuestLog';
import Inventory from './screens/Inventory';
import Dungeons from './screens/Dungeons';
import ContactTerminal from './screens/ContactTerminal';
import LibraryScreen from './screens/LibraryScreen';
import type { Screen } from '../hooks/useKeyboardNav';
import { useKeyboardNav } from '../hooks/useKeyboardNav';

const ROUTE_TO_SCREEN: Record<string, Screen> = {
  '/':          'home',
  '/quests':    'quests',
  '/inventory': 'inventory',
  '/dungeons':  'dungeons',
  '/library':   'library',
  '/terminal':  'contact',
};

const SCREEN_TO_ROUTE: Record<Screen, string> = {
  home:      '/',
  quests:    '/quests',
  inventory: '/inventory',
  dungeons:  '/dungeons',
  contact:   '/terminal',
  library:   '/library',
};

export default function GameShell() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const active: Screen = ROUTE_TO_SCREEN[location.pathname] ?? 'home';

  const handleSelect = (s: Screen) => navigate(SCREEN_TO_ROUTE[s]);

  useKeyboardNav(active, handleSelect);

  const screens: Record<Screen, JSX.Element> = {
    home:      <HomeScreen />,
    quests:    <QuestLog />,
    inventory: <Inventory />,
    dungeons:  <Dungeons />,
    contact:   <ContactTerminal navigate={handleSelect} />,
    library:   <LibraryScreen />,
  };

  return (
    <div className="game-shell">
      <TopBar />
      <NavMenu active={active} onSelect={handleSelect} />
      <main className={`game-content${(active === 'dungeons' || active === 'inventory') ? ' game-content--full' : ''}`} key={active}>
        {screens[active]}
      </main>
      <GameFooter />
    </div>
  );
}
