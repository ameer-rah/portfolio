import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

const CompanionContext = createContext<{
  paused: boolean;
  togglePause: () => void;
  heroVisible: boolean;
  setHeroVisible: (visible: boolean) => void;
}>({ paused: false, togglePause: () => {}, heroVisible: true, setHeroVisible: () => {} });

export function CompanionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  return <CompanionContext.Provider value={{ paused, togglePause: () => setPaused(value => !value), heroVisible, setHeroVisible }}>{children}</CompanionContext.Provider>;
}

const greetings: Record<string, string> = {
  '/': 'hi, i’m ameer.',
  '/experience': 'my journey so far.',
  '/projects': 'here’s what i’ve built.',
  '/contact': 'let’s say hello.',
};

const pageActions: Record<string, { name: string; label: string }> = {
  '/experience': { name: 'journal', label: 'Replay Ameer turning a journal page' },
  '/projects': { name: 'coding', label: 'Replay Ameer typing and showing his code' },
  '/contact': { name: 'letter', label: 'Replay Ameer offering a letter' },
};

export default function PixelCompanion({ hero = false, embedded = false }: { hero?: boolean; embedded?: boolean }) {
  const { pathname } = useLocation();
  const { paused, togglePause, heroVisible, setHeroVisible } = useContext(CompanionContext);
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState(0);
  const [greeting, setGreeting] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const hidden = !hero && !embedded && (dismissed || pathname !== '/' || heroVisible);
  const still = paused || reducedMotion || !pageVisible || hidden;
  const action = embedded ? pageActions[pathname] : undefined;

  useEffect(() => {
    if (!hero || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [hero, setHeroVisible]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!greeting) return;
    const timeout = window.setTimeout(() => setGreeting(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [greeting, wave]);

  return (
    <div ref={root} className={`pixel-companion ${hero ? 'pixel-companion--hero' : embedded ? 'pixel-companion--embedded' : 'pixel-companion--dock'}${still ? ' pixel-companion--still' : ''}`} hidden={hidden}>
      {(hero || (greeting && !embedded)) && <p className="pixel-greeting">{greetings[pathname] ?? greetings['/']}</p>}
      <button type="button" className="pixel-character" aria-label={action?.label ?? 'Wave hello to pixel Ameer'} onClick={() => { setWave(value => value + 1); setGreeting(true); }}>
        <span key={`${pathname}-${wave}-${still}`} className={`pixel-pose${action ? ` pixel-pose--activity pixel-pose--${action.name}` : ''}`} aria-hidden="true" />
        <span className="pixel-ground" aria-hidden="true" />
      </button>
      <div className="pixel-controls">
        {hero && <span className="pixel-hint">{greeting ? 'hey there!' : 'click to wave'}</span>}
        {!reducedMotion && <button type="button" onClick={togglePause} aria-pressed={paused} aria-label={paused ? 'Resume sprite animation' : 'Pause sprite animation'}>{paused ? 'Play' : 'Pause'}</button>}
        {!hero && !embedded && <button type="button" onClick={() => setDismissed(true)} aria-label="Hide companion">Hide</button>}
      </div>
    </div>
  );
}
