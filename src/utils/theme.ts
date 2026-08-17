import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

// The inline script in index.html sets the class before first paint, so the
// class on <html> is the source of truth once the page is up.
let current: Theme = document.documentElement.classList.contains('dark')
  ? 'dark'
  : storedTheme() ?? systemTheme();

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

apply(current);

// Follow the OS until the user makes an explicit choice.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (storedTheme()) return;
  current = e.matches ? 'dark' : 'light';
  apply(current);
  listeners.forEach((fn) => fn());
});

export function setTheme(theme: Theme) {
  if (theme === current) return;
  current = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private browsing: the choice just won't survive a reload.
  }
  apply(theme);
  listeners.forEach((fn) => fn());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => current,
    () => 'light' as Theme,
  );
}
