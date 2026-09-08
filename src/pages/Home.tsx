import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitCommitHorizontal, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import StackShowcase from '../components/StackShowcase';
import Parallax from '../components/Parallax';

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
  "Two internships in one summer, from both directions. At Jasfel Analytics I built a Python malware detection pipeline that hashed and compared 200+ samples to cut manual triage time 20%, and cleaned 50,000-row datasets with Pandas and scikit-learn for a 12% accuracy lift. At Redynox I attacked instead: Wireshark analysis cataloging 100+ malicious traffic signatures, web app pen testing with Burp Suite and OWASP ZAP, and custom Snort rules that dropped false positives 15%.",
  "The projects run on the same instinct. RUPlanner models Rutgers prerequisites as a real dependency graph, so a generated semester plan can't come back invalid. My clinical lab monitor keeps reference ranges in a table scoped by sex and age, so one engine interprets every measurement and the dashboard renders what the API decided rather than guessing. The chest X-ray classifier hits 81.6% test accuracy behind a FastAPI endpoint, and ships labeled educational, not diagnostic, because that line matters.",
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

        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.75fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
              I build systems for domains where{' '}
              <span className="font-accent italic text-brg">being wrong matters</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
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

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm bg-hero-panel p-8 text-[#fffdf7] shadow-[18px_18px_0_var(--color-gold)] sm:p-10"
          >
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/10" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">
              At a glance
            </p>
            <div className="mt-7 divide-y divide-white/15">
              <div className="py-5 first:pt-0">
                <div className="flex items-center gap-2 text-lime">
                  <GitCommitHorizontal size={16} strokeWidth={2} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Builder</span>
                </div>
                <p className="mt-2 text-base font-medium">Full-stack systems built to hold up in practice.</p>
              </div>
              <div className="py-5">
                <div className="flex items-center gap-2 text-lime">
                  <ShieldCheck size={16} strokeWidth={2} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Security-minded</span>
                </div>
                <p className="mt-2 text-base font-medium">Defensive engineering informed by offensive testing.</p>
              </div>
              <div className="pt-5">
                <div className="flex items-center gap-2 text-lime">
                  <Sparkles size={16} strokeWidth={2} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Focus</span>
                </div>
                <p className="mt-2 text-base font-medium">Reliable software for domains where correctness matters.</p>
              </div>
            </div>
          </motion.aside>
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
              <figure className="h-fit rounded-xl border-l-4 border-gold bg-brg-soft p-6">
                <blockquote className="text-lg font-medium leading-snug text-brg">
                  "I had a purpose before everyone had an opinion"
                </blockquote>
                <figcaption className="mt-3 text-sm text-stone-600">
                  Jalen Hurts
                </figcaption>
              </figure>
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
                  className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-ink">{school.name}</h3>
                    <span className="shrink-0 text-sm font-medium text-brg">{school.gpa}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-stone-700">{school.degree}</p>
                  {school.minor && <p className="mt-1 text-sm text-stone-600">{school.minor}</p>}
                  <p className="mt-1 text-sm text-stone-500">{school.period}</p>
                  {school.honors && (
                    <p className="mt-3 text-sm font-medium text-brg-bright">{school.honors}</p>
                  )}
                  {school.courses && (
                    <p className="mt-4 border-t border-stone-100 pt-4 text-sm leading-relaxed text-stone-500">
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

      {/* Pointers */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                to: '/experience',
                title: 'Experience',
                text: 'Four roles across startups, security, and software engineering.',
              },
              {
                to: '/projects',
                title: 'Projects',
                text: 'RUPlanner, a chest X-ray classifier, a census data study, and live GitHub activity.',
              },
              {
                to: '/contact',
                title: 'Contact',
                text: 'Email is the fastest way to reach me about work or collaboration.',
              },
            ].map((card, i) => (
              <Reveal key={card.to} delay={i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={card.to}
                    className="group block rounded-xl border border-stone-200 p-6 transition-colors hover:border-brg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-ink group-hover:text-brg">
                        {card.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                        className="text-stone-400 transition-colors group-hover:text-brg"
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{card.text}</p>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
