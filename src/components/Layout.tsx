import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

let projectsPrefetched = false;
function prefetchProjects() {
  if (projectsPrefetched) return;
  projectsPrefetched = true;
  void import('../pages/Projects');
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  // Every page opens on a dark full-bleed panel, so the header sits on it in
  // white until the page scrolls and picks up its own cream background.
  const overHero = !scrolled;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-cream">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-scrolled={scrolled}>
        {/* Three equal tracks keep the name optically centred no matter how wide
            the link list or the button gets. */}
        <div className="mx-auto grid max-w-[84rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <nav className="hidden items-center gap-8 justify-self-start lg:flex" aria-label="Primary">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={`nav-link ${overHero ? 'text-white' : 'text-ink'}`}
                onMouseEnter={link.to === '/projects' ? prefetchProjects : undefined}
                onFocus={link.to === '/projects' ? prefetchProjects : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/"
            className={`col-start-2 justify-self-center font-display text-base tracking-tight transition-colors ${
              overHero ? 'text-white' : 'text-ink'
            }`}
          >
            Ameer Rahman
          </NavLink>

          <NavLink
            to="/contact"
            className={`col-start-3 hidden justify-self-end rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 lg:inline-flex ${
              overHero ? 'bg-white text-ink hover:bg-yellow' : 'bg-ink text-cream hover:bg-blue'
            }`}
          >
            Get in touch
          </NavLink>

          <button
            className={`col-start-3 justify-self-end lg:hidden ${overHero ? 'text-white' : 'text-ink'}`}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(value => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-ink/10 bg-cream px-5 py-6 lg:hidden"
            aria-label="Primary mobile"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav-link text-ink">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="flex min-h-[60svh] items-center justify-center">
              <span className="loader" role="status" aria-label="Loading" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="bg-warmblack text-cream">
        <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 lg:px-12">
          <p className="section-title max-w-3xl">
            Let's build something
            <br />
            worth getting right.
          </p>

          <div className="mt-12 grid gap-8 border-t border-cream/15 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="section-eyebrow text-cream/50">Elsewhere</p>
              <div className="mt-3 flex flex-col gap-2">
                <a className="text-cream/85 transition-colors hover:text-white" href="mailto:ameerrahman456@gmail.com">Email</a>
                <a className="text-cream/85 transition-colors hover:text-white" href="https://github.com/ameer-rah" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="text-cream/85 transition-colors hover:text-white" href="https://linkedin.com/in/ameer-rahman" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

            <div>
              <p className="section-eyebrow text-cream/50">Pages</p>
              <div className="mt-3 flex flex-col gap-2">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} className="text-cream/85 transition-colors hover:text-white">
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div>
              <p className="section-eyebrow text-cream/50">Based in</p>
              <p className="mt-3 text-cream/85">New York City</p>
              <p className="text-cream/85">Open to NY / NJ and remote</p>
            </div>

            <div>
              <p className="section-eyebrow text-cream/50">Now</p>
              <p className="mt-3 text-cream/85">
                Seeking Spring 2027 internships and co-ops, and New Grad 2027 roles.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ameer Rahman</p>
            <p>Correctness in consequential domains.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
