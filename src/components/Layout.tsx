import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

// Prefetch the Projects page's heavy Vanta/p5 chunk before navigation, so
// it's already cached by the time the user clicks and the effect can boot
// without competing with the route's entrance animations.
let projectsPrefetched = false;
function prefetchProjectsEffect() {
  if (projectsPrefetched) return;
  projectsPrefetched = true;
  import('./VantaTopology');
}

function navClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-brg-soft text-brg' : 'text-stone-500 hover:text-ink',
  ].join(' ');
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <div className="flex w-full max-w-6xl items-center justify-between gap-3">
          <NavLink
            to="/"
            className={[
              'pointer-events-auto flex items-center gap-2 rounded-full border border-stone-200/70 bg-white/95 py-2 pl-2 pr-5 text-[15px] font-semibold tracking-tight text-ink transition-shadow',
              scrolled ? 'shadow-[0_4px_20px_-4px_rgba(28,25,23,0.12)]' : 'shadow-sm',
            ].join(' ')}
          >
            <img src="/assets/ar-logo.png" alt="" className="h-7 w-7 rounded-full" />
            Ameer Rahman
          </NavLink>

          <nav
            aria-label="Primary"
            className={[
              'pointer-events-auto hidden items-center gap-1 rounded-full border border-stone-200/70 bg-white/95 p-1.5 transition-shadow md:flex',
              scrolled ? 'shadow-[0_4px_20px_-4px_rgba(28,25,23,0.12)]' : 'shadow-sm',
            ].join(' ')}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={navClass}
                onMouseEnter={link.to === '/projects' ? prefetchProjectsEffect : undefined}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/ameer-rah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="ml-1 flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brg"
            >
              <Github size={14} strokeWidth={1.75} />
              GitHub
            </a>
          </nav>

          <button
            type="button"
            className={[
              'pointer-events-auto flex items-center justify-center rounded-full border border-stone-200/70 bg-white/95 p-2.5 text-stone-600 transition-shadow md:hidden',
              scrolled ? 'shadow-[0_4px_20px_-4px_rgba(28,25,23,0.12)]' : 'shadow-sm',
            ].join(' ')}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            aria-label="Primary mobile"
            className="fixed inset-x-4 top-[76px] z-50 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-lg md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      [
                        'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive ? 'bg-brg-soft text-brg' : 'text-stone-600 hover:text-ink',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/ameer-rah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:text-ink"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24 sm:pt-28">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Ameer Rahman</p>
            <p className="mt-1 text-sm text-stone-500">
              CS @ Rutgers University. New Brunswick, NJ.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:ameerrahman456@gmail.com"
              className="text-stone-500 transition-colors hover:text-brg"
            >
              Email
            </a>
            <a
              href="https://github.com/ameer-rah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors hover:text-brg"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ameer-rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 transition-colors hover:text-brg"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
