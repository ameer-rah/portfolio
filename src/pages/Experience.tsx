import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import Reveal from '../components/Reveal';

export default function Experience() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 h-[420px] w-[420px] rounded-full bg-brg-soft/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-brg-soft/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <h1 className="font-accent text-4xl font-bold italic text-brg sm:text-5xl">
            Experience
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600">
            Internships in cybersecurity and software engineering, plus leadership
            roles on campus at Rutgers.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-brg-soft via-stone-200 to-transparent sm:left-[199px]"
          />

          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => {
              return (
                <Reveal key={job.id} delay={Math.min(i * 0.07, 0.28)}>
                  <article className="relative grid gap-3 pl-8 sm:grid-cols-[200px_1fr] sm:gap-10 sm:pl-0">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-brg sm:left-[193px]"
                    />
                    {job.current && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1.5 h-3.5 w-3.5 animate-ping rounded-full bg-brg-bright/60 sm:left-[193px]"
                      />
                    )}

                    <div>
                      <p className="text-sm font-medium text-stone-500">{job.period}</p>
                      <p className="mt-1 text-sm text-stone-400">{job.location}</p>
                      {job.current && (
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brg-soft px-2.5 py-0.5 text-xs font-medium text-brg">
                          <span className="h-1.5 w-1.5 rounded-full bg-brg-bright" />
                          Current
                        </span>
                      )}
                    </div>

                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-colors hover:border-brg/40 sm:p-7"
                    >
                      <h2 className="text-xl font-semibold text-ink">{job.role}</h2>
                      <p className="mt-0.5 text-base font-medium text-brg">{job.company}</p>

                      <ul className="mt-5 space-y-2.5">
                        {job.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex gap-3 text-[15px] leading-relaxed text-stone-600"
                          >
                            <span
                              aria-hidden
                              className="mt-[11px] h-px w-4 shrink-0 bg-brg-bright"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-600"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
