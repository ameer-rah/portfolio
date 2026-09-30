import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import Placeholder from '../components/Placeholder';
import StackShowcase from '../components/StackShowcase';

const SCHOOLS = [
  {
    num: '001',
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
    num: '002',
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
  'At Archly, I work across a TypeScript monorepo: a React and Vite frontend, a Hono API on Cloudflare Workers, and PostgreSQL through Drizzle ORM. At Jasfel Analytics, I built data pipelines for U.S. Census records and demographic analysis.',
  'My current projects follow the same instinct. RUPlanner models Rutgers requirements and prerequisites before it builds a schedule. The clinical lab monitor keeps reference ranges in data instead of code. Mini Redis explores LRU eviction, TTL behavior, concurrency, and a TCP protocol from first principles.',
];

const PRINCIPLES = [
  {
    quote:
      'Reference ranges live in a table, not in code. 13.0 g/dL of hemoglobin comes back low for one patient and normal for another, and the rule is data you can point at.',
    source: 'Clinical Lab & Patient Monitoring',
  },
  {
    quote:
      'The README documents where the model fails. A softmax over four classes stays confident even on inputs that are not X-rays at all, and saying so is part of the work.',
    source: 'Chest X-Ray Classifier',
  },
  {
    quote:
      'The Jersey City rings cross into New York, so those tracts are excluded by design rather than silently folded in.',
    source: 'NJCU Community Analysis',
  },
  {
    quote:
      'Prerequisites always land in an earlier semester. The planner resolves degree requirements against the catalog before it will hand you a schedule.',
    source: 'RUPlanner',
  },
  {
    quote:
      'One ReentrantLock protects the map and list invariant, with stress tests for concurrent access and expiration behavior.',
    source: 'Mini Redis',
  },
  {
    quote:
      'Ship through a pipeline that runs linting, type checks, database and API tests, and end-to-end tests before anything deploys.',
    source: 'Archly',
  },
];

// `logo: true` contains the artwork on a cream ground instead of cropping it,
// which is what transparent wordmarks need.
const MARQUEE: { label: string; src?: string; alt?: string; logo?: boolean }[] = [
  {
    label: 'Rutgers, New Brunswick',
    src: '/assets/rutgers-college-ave.jpg',
    alt: 'College Avenue campus at Rutgers University, New Brunswick',
  },
  {
    label: 'Queens, NYC',
    src: '/assets/queens-unisphere.jpg',
    alt: 'The Unisphere in Flushing Meadows Corona Park, Queens',
  },
  {
    label: 'The five boroughs',
    src: '/assets/nyc-skyline.jpg',
    alt: 'The Manhattan skyline seen from Upper New York Bay',
  },
  {
    label: 'Archly',
    src: '/assets/archly-logo.jpg',
    alt: 'Archly logo',
  },
  {
    label: 'Jasfel Analytics',
    src: '/assets/jasfel-logo.png',
    alt: 'Jasfel Analytics logo',
    logo: true,
  },
  {
    label: "NASA L'SPACE",
    src: '/assets/lspace-logo.png',
    alt: "NASA L'SPACE logo",
    logo: true,
  },
  {
    label: 'Werblin Rec Center',
    src: '/assets/werblin-rec-center.jpg',
    alt: 'The diving platform tower at the Sonny Werblin Recreation Center, Rutgers',
  },
];

const FAQS = [
  {
    q: 'What are you looking for right now?',
    a: 'A Spring 2027 software engineering internship or co-op, and New Grad roles for 2027. I graduate from Rutgers in May 2027.',
  },
  {
    q: 'What kind of work interests you most?',
    a: 'Anything where being wrong has a cost you can name — clinical data, degree requirements, demographic analysis, systems internals. The constraint is the interesting part.',
  },
  {
    q: 'What is your stack?',
    a: 'TypeScript and Python day to day. React, Next.js, and Vite on the front; Hono, FastAPI, and Flask on the back; PostgreSQL and SQLite for storage; Docker and Cloudflare Workers for deployment.',
  },
  {
    q: 'Are you open to relocating?',
    a: 'I am based in New York City and comfortable working remote or on site across the NY/NJ area. For the right team I would consider relocating.',
  },
  {
    q: 'Can I see the code?',
    a: 'Nearly everything is public on GitHub, including the project READMEs that document what each system does not handle.',
  },
  {
    q: 'What is the fastest way to reach you?',
    a: 'Email. I answer quickly, and I am happy to walk through any of the projects in detail.',
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-12">
      {FAQS.map((item, i) => (
        <div key={item.q} className="accordion-item">
          <button
            type="button"
            className="accordion-trigger"
            aria-expanded={open === i}
            aria-controls={`faq-panel-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="display-num text-sm text-ink/50">{String(i + 1).padStart(3, '0')}</span>
            {item.q}
            <Plus size={18} className="accordion-sign" aria-hidden />
          </button>
          <div id={`faq-panel-${i}`} className="accordion-panel" data-open={open === i}>
            <div>
              <p className="max-w-2xl pb-6 pl-12 text-sm leading-relaxed text-ink/80 sm:text-base">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 01 — Hero, full-bleed red */}
      <section className="panel panel-tall justify-center bg-red text-white">
        <div aria-hidden className="kenburns opacity-25">
          <Placeholder label="Hero photograph" tone="dark" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        <span aria-hidden className="bubble left-[8%] top-[22%] h-24 w-24 bg-white/10" />
        <span aria-hidden className="bubble right-[12%] top-[30%] h-16 w-16 bg-yellow/25" style={{ animationDelay: '1.4s' }} />
        <span aria-hidden className="bubble bottom-[18%] left-[18%] h-10 w-10 bg-white/15" style={{ animationDelay: '2.8s' }} />

        <div className="panel-inner text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-eyebrow text-white/75">Ameer Rahman — Software Engineer</p>
            <h1 className="hero-title mx-auto mt-6 max-w-5xl">
              I build software for rooms
              <br />
              where being wrong costs something.
            </h1>
            <p className="section-subtext mx-auto mt-6 max-w-xl text-white/85">
              Computer science at Rutgers. Clinical data, degree requirements, census
              records, systems internals — domains with rules you cannot hand-wave past.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/projects" className="btn btn-light">View the work</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 — Philosophy, cream on blue type, portrait alongside */}
      <section className="panel panel-tall bg-cream text-blue">
        <div className="panel-inner">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <h2 className="section-title">
                  Making it run
                  <br />
                  is the easy half.
                </h2>
                <p className="section-subtext mt-6">
                  The hard half is making the answer defensible.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-10 max-w-2xl space-y-5">
                {ABOUT_PARAGRAPHS.map(p => (
                  <p key={p} className="section-subtext text-blue/80">{p}</p>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:justify-self-end">
              <figure className="tile mx-auto w-full max-w-[20rem]">
                <div className="tile-media tile-media--portrait">
                  <img
                    src="/assets/ameer-rahman.jpg"
                    alt="Ameer Rahman"
                    width={900}
                    height={1200}
                    loading="lazy"
                  />
                </div>
                <figcaption className="pt-3 text-xs text-blue/60">
                  Ameer Rahman — Queens, NY
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Portrait + marquee */}
      <section className="panel bg-cream text-blue">
        <div className="panel-inner text-center">
          <Reveal>
            <h2 className="section-title">
              Queens.
              <br />
              Rutgers.
              <br />
              New York.
            </h2>
            <p className="section-subtext mx-auto mt-5 max-w-md text-blue/80">
              Where I am from shapes what I think is worth building carefully.
            </p>
          </Reveal>
        </div>

        <div className="marquee mt-14" style={{ ['--marquee-duration' as string]: '52s' }}>
          {[0, 1].map(dup => (
            <div className="marquee-track" key={dup} aria-hidden={dup === 1}>
              {MARQUEE.map((item, i) => (
                <figure key={`${dup}-${i}`} className="tile w-[220px] shrink-0 sm:w-[260px]">
                  <div className={`tile-media${item.logo ? ' tile-media--logo' : ''}`}>
                    {item.src ? (
                      <img src={item.src} alt={item.alt ?? item.label} loading="lazy" width={600} height={750} />
                    ) : (
                      <Placeholder label={item.label} tone={i % 2 ? 'dark' : 'light'} />
                    )}
                  </div>
                  <figcaption className="pt-3 text-left text-xs text-blue/70">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>

        {/* CC BY requires credit; the CC0 and public-domain items do not, but
            are listed for provenance. */}
        <p className="panel-inner mt-8 text-center text-[11px] leading-relaxed text-blue/50">
          Unisphere photo by Robert Barlow (CC BY 3.0) · Manhattan skyline by Jakub Hałun
          (CC BY 4.0) · Werblin and Rutgers photos by Rosslieb and Tomwsulcer (CC0) ·
          via Wikimedia Commons
        </p>
      </section>

      {/* 04 — Toolkit, warm black */}
      <StackShowcase />

      {/* 05 — Education, blue */}
      <section className="panel panel-tall bg-blue text-white">
        <div className="panel-inner">
          <Reveal>
            <h2 className="section-title max-w-2xl">
              Where the
              <br />
              foundation got built.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/20 md:grid-cols-2">
            {SCHOOLS.map((school, i) => (
              <Reveal key={school.abbr} delay={i * 0.08}>
                <article className="flex h-full flex-col bg-blue p-7 sm:p-9">
                  <span className="display-num text-4xl text-white/35">{school.num}</span>
                  <h3 className="font-display mt-6 text-2xl leading-tight tracking-tight">{school.name}</h3>
                  <p className="mt-3 text-sm font-medium text-white/90">{school.degree}</p>
                  {school.minor && <p className="mt-1 text-sm text-white/70">{school.minor}</p>}
                  <p className="mt-1 text-sm text-white/60">{school.period}</p>
                  <p className="mt-4 text-sm font-medium text-yellow">{school.gpa}</p>
                  {school.honors && <p className="mt-1 text-sm text-white/80">{school.honors}</p>}
                  {school.courses && (
                    <p className="mt-6 border-t border-white/20 pt-5 text-sm leading-relaxed text-white/70">
                      <span className="font-medium text-white">Coursework: </span>
                      {school.courses}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Principles, warm black quote wall */}
      <section className="panel bg-warmblack text-cream">
        <div className="panel-inner">
          <Reveal>
            <h2 className="section-title text-center">how the work actually reads</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <Reveal key={item.source} delay={Math.min(i * 0.06, 0.3)}>
                <figure className="group relative h-full rounded-xl border border-cream/15 p-7 pt-9 transition-colors duration-300 hover:border-cream/35">
                  <span aria-hidden className="quote-mark">&ldquo;</span>
                  <blockquote className="font-display text-lg font-medium leading-snug text-white">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-xs uppercase tracking-[0.08em] text-cream/50">
                    {item.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — FAQ, yellow */}
      <section className="panel bg-yellow text-ink">
        <div className="panel-inner panel-narrow">
          <Reveal>
            <h2 className="section-title text-center">Questions people ask.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
