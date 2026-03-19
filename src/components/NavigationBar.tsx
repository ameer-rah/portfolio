import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NavigationBar() {
  const [hovered, setHovered] = useState(false);
  const { scrollY } = useScroll();

  const bg = useTransform(scrollY, [0, 60], ["rgba(0,0,0,0)", "rgba(0,0,0,0.92)"]);
  const borderOpacity = useTransform(scrollY, [40, 80], [0, 1]);

  const links = [
    { to: "/about",       label: "About"    },
    { to: "/work",        label: "Work"     },
    { to: "/projects",    label: "Projects" },
    { to: "/expertise",   label: "Skills"   },
    { to: "/reading-list", label: "Reading" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-[2px]"
      style={{ backgroundColor: bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-primary/15"
        style={{ opacity: borderOpacity }}
      />

      <div className="flex flex-col items-center">
        {/* Logo — always visible */}
        <div className="flex items-center justify-center h-14 w-full">
          <NavLink
            to="/about"
            className="font-display text-base font-extralight text-primary tracking-[0.35em] hover:text-[#E8C870] transition-colors duration-500"
          >
            AR
          </NavLink>
        </div>

        {/* Nav links — slide down on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="nav-links"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "2.5rem" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-10 overflow-hidden"
            >
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `font-sans text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 relative group pb-3 ${
                      isActive ? "text-primary" : "text-text-muted-light hover:text-text-dark"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        className={`absolute bottom-2 left-0 h-px bg-primary transition-all duration-500 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
