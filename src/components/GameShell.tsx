import { useState } from 'react';
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

export default function GameShell() {
  const [active, setActive] = useState<Screen>('home');
  useKeyboardNav(active, setActive);

  const screens: Record<Screen, JSX.Element> = {
    home:      <HomeScreen />,
    quests:    <QuestLog />,
    inventory: <Inventory />,
    dungeons:  <Dungeons />,
    contact:   <ContactTerminal navigate={setActive} />,
    library:   <LibraryScreen />,
  };

  return (
    <div className="game-shell">
      <TopBar />
      <NavMenu active={active} onSelect={setActive} />
      <main className={`game-content${(active === 'dungeons' || active === 'inventory') ? ' game-content--full' : ''}`} key={active}>
        {screens[active]}
      </main>
      <GameFooter />
    </div>
  );
}
