import { motion } from 'framer-motion';
import {
  SiDocker,
  SiFastapi,
  SiNextdotjs,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import Reveal from './Reveal';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

const STACK = [
  { name: 'Python', icon: SiPython },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Docker', icon: SiDocker },
];

export default function StackShowcase() {
  return (
    <section className="overflow-hidden bg-[#0b1f18]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="relative overflow-hidden">
          <Spotlight className="z-20" size={420} />
          <div className="grid min-h-[500px] lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-12">
                <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#d7ee79] before:h-[3px] before:w-7 before:bg-gold">
                  Interactive systems
                </p>
                <h2 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#fffdf7] sm:text-5xl">
                  Built with tools that{' '}
                  <span className="font-accent italic text-[#d7ee79]">actually ship.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#fffdf7]/70">
                  A stack chosen for reliability, not trend chasing. The same languages,
                  frameworks, and infrastructure across RUPlanner, the X-ray classifier,
                  and this site.
                </p>
              </div>
            </Reveal>
            <div className="relative h-[360px] min-h-0 lg:h-auto">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0b1f18] to-transparent" />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>

          <Reveal delay={0.15} className="border-t border-white/10 px-8 pb-10 pt-10 sm:px-12 sm:pb-12">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide text-[#f7f6f3]/60 before:h-[3px] before:w-7 before:bg-gold">
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
      </div>
    </section>
  );
}
