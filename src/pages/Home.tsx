import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import StackShowcase from '../components/StackShowcase';
import Parallax from '../components/Parallax';
import { FeatureShaderBackdrop } from '../components/ui/feature-shader-card';
import VintageKeyboard from '../components/ui/VintageKeyboard';

const SCHOOLS = [
  {
    abbr: 'Rutgers',
    name: 'Rutgers University, New Brunswick',
    degree: 'B.S. Computer Science',
    minor: 'Minor in Critical Intelligence Studies',
    period: 'Expected May 2027',
    gpa: '3.4 GPA',
    honors: null as string | null,
    courses:
      'Data Structures, Systems Programming, Computer Architecture, Software Methodology, Intro to Data Science',
  },
  {
    abbr: 'CCNY',
    name: 'CUNY City College of New York',
    degree: 'Transferred May 2024',
    minor: null as string | null,
    period: 'Fall 2023 - Spring 2024',
    gpa: '4.0 GPA',
    honors: "Dean's List, Fall 2023 & Spring 2024",
    courses: null as string | null,
  },
];

const ABOUT_PARAGRAPHS = [
  "First-gen, Bengali-Guyanese, out of Queens. CS at Rutgers with a minor in Critical Intelligence Studies. Almost everything I build lands in a domain with rules I can't hand-wave past, so the interesting work is making the answer defensible, not just making it run.",
  "At Archly, I work across a TypeScript monorepo: a React and Vite frontend, a Hono API on Cloudflare Workers, and PostgreSQL through Drizzle ORM. At Jasfel Analytics, I built data pipelines for U.S. Census records and demographic analysis.",
  "My current projects follow the same instinct. RUPlanner models Rutgers requirements and prerequisites before it builds a schedule. The clinical lab monitor keeps reference ranges in data instead of code. Mini Redis explores LRU eviction, TTL behavior, concurrency, and a TCP protocol from first principles.",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-y border-stone-200/70 bg-surface">
        <Parallax speed={50}>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-brg-soft/55 blur-3xl"
          />
        </Parallax>
        <Parallax speed={25}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
          />
        </Parallax>

        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-ink sm:text-6xl">
              hey! i like building{' '}
              <span className="font-accent italic text-brg">software</span>
            </h1>
            <p className="mt-6 whitespace-nowrap text-[clamp(0.72rem,1.45vw,1.125rem)] leading-relaxed text-stone-600">
              ameer rahman | computer science ꩜ rutgers university |{' '}
              <MapPin size={16} strokeWidth={1.75} className="inline align-[-2px]" /> nyc
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-brg px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brg-mid active:translate-y-px"
              >
                View projects
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-stone-200/80 bg-white/75 p-4 shadow-[18px_18px_0_var(--color-gold)] backdrop-blur-sm sm:p-6"
          >
            <VintageKeyboard />
          </motion.div>
        </div>
      </section>

      <StackShowcase />

      {/* About */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              About
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <Reveal delay={0.05} className="max-w-[65ch] space-y-5 text-base leading-relaxed text-stone-600">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-5">
                <figure className="h-fit rounded-xl border-l-4 border-gold bg-brg-soft p-6">
                  <blockquote className="text-lg font-medium leading-snug text-brg">
                    "I had a purpose before everyone had an opinion"
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-stone-600">
                    Jalen Hurts
                  </figcaption>
                </figure>

                <figure className="rounded-xl border border-stone-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brg">
                      New York City
                    </p>
                    <span className="flex items-center gap-2 text-xs font-medium text-stone-600">
                      <span className="h-2.5 w-2.5 rounded-sm bg-[#c83b31]" aria-hidden />
                      Queens · home
                    </span>
                  </div>
                  <img
                    src="/assets/nyc-boroughs.svg"
                    alt="Map outlining Manhattan, Queens, the Bronx, Brooklyn, and Staten Island, with Queens shaded red"
                    className="mx-auto mt-4 h-auto w-full max-w-[300px]"
                  />
                  <figcaption className="sr-only">
                    The five boroughs of New York City. Queens is highlighted as where I am from.
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-stone-200">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Education
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SCHOOLS.map((school, i) => (
              <Reveal key={school.abbr} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-6"
                >
                  <FeatureShaderBackdrop variant={i} />
                  <div className="relative flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-ink">{school.name}</h3>
                    <span className="shrink-0 text-sm font-medium text-brg">{school.gpa}</span>
                  </div>
                  <p className="relative mt-2 text-sm font-medium text-stone-700">{school.degree}</p>
                  {school.minor && <p className="relative mt-1 text-sm text-stone-600">{school.minor}</p>}
                  <p className="relative mt-1 text-sm text-stone-500">{school.period}</p>
                  {school.honors && (
                    <p className="relative mt-3 text-sm font-medium text-brg-bright">{school.honors}</p>
                  )}
                  {school.courses && (
                    <p className="relative mt-4 border-t border-stone-100 pt-4 text-sm leading-relaxed text-stone-500">
                      <span className="font-medium text-stone-700">Coursework: </span>
                      {school.courses}
                    </p>
                  )}
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
