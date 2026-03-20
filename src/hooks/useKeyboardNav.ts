import { useEffect } from 'react';

export type Screen = 'home' | 'quests' | 'inventory' | 'dungeons' | 'contact' | 'library';
export const NAV_ORDER: Screen[] = ['home', 'quests', 'inventory', 'dungeons', 'library', 'contact'];

export function useKeyboardNav(active: Screen, setActive: (s: Screen) => void) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      // Don't hijack when user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = NAV_ORDER.indexOf(active);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive(NAV_ORDER[(idx + 1) % NAV_ORDER.length]);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive(NAV_ORDER[(idx - 1 + NAV_ORDER.length) % NAV_ORDER.length]);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, setActive]);
}
