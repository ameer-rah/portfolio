import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../data/experience';
import Reveal from '../components/Reveal';

export default function Experience() {
  return (
    <>
      {/* Page header, full-bleed red */}
      <section className="panel flex min-h-[70svh] items-end bg-red text-white">
        <div className="panel-inner">
          <Reveal>
            <p className="section-eyebrow text-white/75">002 — Experience</p>
            <h1 className="hero-title mt-6 max-w-4xl">
              Four rooms,
              <br />
              four sets of rules.
            </h1>
            <p className="section-subtext mt-6 max-w-xl text-white/85">
              Incoming NASA L'SPACE NPWEE participant, marketplace co-founder, data
              engineering intern, and campus recreation supervisor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline, cream */}
      <section className="panel bg-cream text-ink">
        <div className="panel-inner">
          <div className="grid gap-px overflow-hidden rounded-xl bg-ink/15">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.id} delay={Math.min(i * 0.06, 0.24)}>
                <article
                  id={`experience-${job.id}`}
                  tabIndex={-1}
                  className="scroll-mt-28 grid gap-6 bg-cream p-7 sm:grid-cols-[13rem_1fr] sm:gap-10 sm:p-10"
                >
                  <div>
                    <span className="display-num text-4xl text-ink/25">
                      {String(i + 1).padStart(3, '0')}
                    </span>
                    <p className="mt-5 text-sm font-medium text-ink/70">{job.period}</p>
                    <p className="mt-1 text-sm text-ink/50">{job.location}</p>
                    {job.current && (
                      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1 text-xs font-medium text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                      {job.role}
                    </h2>
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-base font-medium text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue"
                      >
                        {job.company}
                        <ArrowUpRight size={14} strokeWidth={2} />
                      </a>
                    ) : (
                      <p className="mt-2 text-base font-medium text-blue">{job.company}</p>
                    )}

                    <ul className="mt-6 space-y-3">
                      {job.bullets.map(bullet => (
                        <li key={bullet} className="flex gap-4 text-[15px] leading-relaxed text-ink/75">
                          <span aria-hidden className="mt-[11px] h-px w-5 shrink-0 bg-orange" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <li
                          key={tag}
                          className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing, blue */}
      <section className="panel bg-blue text-white">
        <div className="panel-inner panel-narrow text-center">
          <Reveal>
            <h2 className="section-title">Want the code behind it?</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/projects" className="btn btn-light">Read the projects</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
