import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from 'react-icons/si';
import Reveal from './Reveal';

const VantaClouds = lazy(() => import('./VantaClouds'));

const STACK = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Python', icon: SiPython },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Redis', icon: SiRedis },
];

function FloatCard({
  children,
  className,
  rotate,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute w-52 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_16px_40px_-12px_rgba(28,25,23,0.22)] ${className}`}
      style={{ rotate }}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function StackShowcase() {
  return (
    <section className="relative overflow-hidden border-t border-stone-200">
      {/* animated Vanta clouds background, tinted to the site palette */}
      <Suspense fallback={<div className="absolute inset-0 bg-[#3f4c40]" aria-hidden />}>
        <VantaClouds className="absolute inset-0" />
      </Suspense>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_460px] lg:items-center">
          <Reveal>
            <h2 className="max-w-lg text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Built with tools that{' '}
              <span className="font-accent text-4xl italic text-[#a8dcb8] sm:text-5xl lg:text-6xl">
                actually
              </span>{' '}
              ship.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              A stack chosen for reliability, not resume padding — the same
              languages, frameworks, and infrastructure across RUPlanner, the
              malware detector, and this site.
            </p>
          </Reveal>

          <div className="relative hidden h-[420px] lg:block">
            <svg
              aria-hidden
              viewBox="0 0 460 420"
              className="pointer-events-none absolute inset-0 h-full w-full text-white/30"
            >
              <line x1="230" y1="210" x2="90" y2="70" strokeDasharray="4 5" stroke="currentColor" />
              <line x1="230" y1="210" x2="380" y2="130" strokeDasharray="4 5" stroke="currentColor" />
              <line x1="230" y1="210" x2="140" y2="350" strokeDasharray="4 5" stroke="currentColor" />
              <circle cx="90" cy="70" r="3" fill="currentColor" />
              <circle cx="380" cy="130" r="3" fill="currentColor" />
              <circle cx="140" cy="350" r="3" fill="currentColor" />
            </svg>

            {/* center emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              style={{ rotate: -4 }}
              className="absolute left-[192px] top-[172px] flex h-20 w-20 items-center justify-center rounded-2xl border border-stone-200 bg-white shadow-[0_16px_40px_-12px_rgba(28,25,23,0.25)]"
            >
              <span className="font-accent text-3xl italic text-brg">AR</span>
            </motion.div>

            <FloatCard className="left-[6px] top-0" rotate={-6} delay={0.1}>
              <p className="text-xs font-medium text-stone-500">Languages</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                TypeScript, Python, SQL
              </p>
            </FloatCard>

            <FloatCard className="right-0 top-[92px]" rotate={5} delay={0.4}>
              <p className="text-xs font-medium text-stone-500">Data layer</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                PostgreSQL + Prisma + Redis
              </p>
            </FloatCard>

            <FloatCard className="left-[52px] top-[300px]" rotate={-3} delay={0.7}>
              <p className="text-xs font-medium text-stone-500">Frontend</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                React + Next.js + Tailwind
              </p>
            </FloatCard>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-20">
          <p className="text-sm font-medium uppercase tracking-wide text-white/60">
            Core stack
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STACK.map((tool, i) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col items-center gap-3 rounded-xl border border-stone-200/80 bg-white/95 p-5 text-center"
              >
                <span className="absolute left-3 top-2 font-mono text-[10px] text-stone-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <tool.icon size={26} className="mt-2 text-ink" />
                <p className="text-xs font-medium text-stone-600">{tool.name}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
