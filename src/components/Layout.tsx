import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Github, Menu, X, Flag } from 'lucide-react';
import PixelCompanion, { CompanionProvider } from './PixelCompanion';
import { ThemeControl } from './ThemeProvider';

let projectsPrefetched = false;
function prefetchProjects() {
  if (projectsPrefetched) return;
  projectsPrefetched = true;
  void Promise.all([import('../pages/Projects'), import('./VantaTopology')]);
}
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];
const AREAS: Record<string, string> = { '/': 'Base camp', '/experience': 'Quest log', '/projects': 'Workshop', '/contact': 'Message board' };

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  return (
    <CompanionProvider>
      <div className="portfolio-layout flex min-h-[100dvh] flex-col">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="game-header">
          <div className="game-nav">
            <NavLink to="/" className="game-brand"><img src="/favicon.svg" alt="" width={28} height={28} /><span>Ameer Rahman</span></NavLink>
            <nav className="desktop-nav" aria-label="Primary">
              {NAV_LINKS.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'} className="game-nav-link" onMouseEnter={link.to === '/projects' ? prefetchProjects : undefined} onFocus={link.to === '/projects' ? prefetchProjects : undefined}>{link.label}</NavLink>)}
            </nav>
            <div className="game-nav-tools"><ThemeControl /><a className="game-github" href="https://github.com/ameer-rah" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={18} /></a><button className="game-menu" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
          </div>
          {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Primary mobile">{NAV_LINKS.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'} className="game-nav-link">{link.label}</NavLink>)}</nav>}
        </header>
        <main id="main-content" className="flex-1 pt-24 sm:pt-28" tabIndex={-1}>
          <div className="area-bar"><span><Flag size={13} aria-hidden="true" />{AREAS[pathname] ?? 'Base camp'}</span><span>A personal adventure in software</span></div>
          <Suspense fallback={<p className="game-loading" role="status">Loading area…</p>}><Outlet /></Suspense>
        </main>
        <PixelCompanion />
        <footer className="game-footer">
          <div><p className="font-accent text-brg">Thanks for stopping by.</p><p className="mt-2 text-sm text-stone-500">Ameer Rahman / CS at Rutgers / New Brunswick, NJ</p></div>
          <div className="flex flex-wrap gap-6 text-sm"><a href="mailto:ameerrahman456@gmail.com">Email ↗</a><a href="https://github.com/ameer-rah" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/ameer-rahman" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><NavLink to="/">Back to camp ↑</NavLink></div>
        </footer>
      </div>
    </CompanionProvider>
  );
}
