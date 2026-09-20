import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Mode = 'system' | 'light' | 'dark';
const ThemeContext = createContext<{ theme: 'light' | 'dark'; mode: Mode; setMode: (mode: Mode) => void }>({ theme: 'light', mode: 'system', setMode: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch { return 'system'; }
  });
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const theme = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', mode); } catch { /* Theme still works when storage is unavailable. */ }
  }, [mode, theme]);
  return <ThemeContext.Provider value={{ theme, mode, setMode }}>{children}</ThemeContext.Provider>;
}

// Shared by the navigation and the atmospheric backgrounds.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() { return useContext(ThemeContext); }

export function ThemeControl() {
  const { mode, setMode } = useTheme();
  return <label className="theme-control"><span className="sr-only">Color theme</span><select aria-label="Color theme" value={mode} onChange={event => setMode(event.target.value as Mode)}><option value="system">Auto</option><option value="light">Day</option><option value="dark">Night</option></select></label>;
}
