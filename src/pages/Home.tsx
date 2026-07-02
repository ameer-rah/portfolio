import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, GitCommitHorizontal, ShieldCheck, Sparkles } from 'lucide-react';
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
      'Data Structures, Systems Programming, Computer Architecture, Software Methodology, Principles of Programming Languages',
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
  "I'm a first-gen CS student at Rutgers with a minor in Critical Intelligence Studies. My work lives at the intersection of software engineering and security: building things that matter while making sure they're built right.",
  "Two internships in one summer: a malware detection pipeline at Jasfel Analytics, and pen testing with Burp Suite and OWASP ZAP at Redynox. I don't just want to write code, I want to understand how it breaks.",
  "Whether architecting RUPlanner's prerequisite engine, cataloging CVEs in a pen test report, or founding the Rutgers Run Club, it's the same energy: try hard, build something real, make it count.",
];

function FloatingCard({
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
      className={`absolute w-60 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_16px_40px_-12px_rgba(28,25,23,0.18)] ${className}`}
      style={{ rotate }}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-24 pt-4 sm:pt-10">
        <Parallax speed={50}>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-brg-soft/70 blur-3xl"
          />
        </Parallax>
        <Parallax speed={25}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-brg-soft/40 blur-3xl"
          />
        </Parallax>

        <div className="relative grid gap-14 lg:grid-cols-[1fr_400px] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium text-brg-bright">
              Open to internships and collaborations for Summer 2026
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Full-stack engineer with a{' '}
              <span className="font-accent italic text-brg">security mindset</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              Ameer Rahman. Computer science at Rutgers University, expected May
              2027. Based in NYC, NY.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-brg px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brg-mid active:translate-y-px"
              >
                View projects
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
              <a
                href="/assets/PDF/Ameer Rahman Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brg hover:text-brg active:translate-y-px"
              >
                <FileText size={16} strokeWidth={1.75} />
                Resume
              </a>
            </div>
          </motion.div>

          <div className="relative hidden h-[420px] lg:block">
            <FloatingCard className="left-6 top-0" rotate={-6} delay={0.15}>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                <GitCommitHorizontal size={14} strokeWidth={2} className="text-brg" />
                GitHub activity
              </div>
              <div className="mt-3 flex gap-[3px]">
                {[0.15, 0.4, 0.85, 0.3, 0.65, 1, 0.5, 0.2, 0.7, 0.9].map((v, i) => (
                  <span
                    key={i}
                    className="h-6 w-2 rounded-sm bg-brg"
                    style={{ opacity: 0.25 + v * 0.75 }}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">Shipping consistently</p>
            </FloatingCard>

            <FloatingCard className="left-32 top-[168px]" rotate={5} delay={0.55}>
              <div className="flex items-center gap-2 text-xs font-medium text-brg-bright">
                <Sparkles size={14} strokeWidth={2} />
                Available now
              </div>
              <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                Summer 2026 internships &amp; collabs
              </p>
            </FloatingCard>

            <FloatingCard className="left-2 top-[300px]" rotate={-3} delay={0.95}>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                <ShieldCheck size={14} strokeWidth={2} className="text-brg" />
                Security-minded
              </div>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-stone-600">
                <span className="text-brg">$</span> whoami
                <br />
                full-stack + pentesting
              </p>
            </FloatingCard>
          </div>
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
              <figure className="h-fit rounded-xl bg-brg-soft p-6">
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

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a
              href="/assets/PDF/Rutgers_transcript.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brg px-4 py-2 font-medium text-white transition-colors hover:bg-brg-mid active:translate-y-px"
            >
              Rutgers transcript
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
            <a
              href="/assets/PDF/CUNY_transcript.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brg px-4 py-2 font-medium text-white transition-colors hover:bg-brg-mid active:translate-y-px"
            >
              CUNY transcript
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
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
                text: 'Five roles across security, software engineering, and leadership.',
              },
              {
                to: '/projects',
                title: 'Projects',
                text: 'RUPlanner, a malware detection pipeline, and live GitHub activity.',
              },
              {
                to: '/contact',
                title: 'Contact',
                text: 'Open to internships and collaborations for Summer 2026.',
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
