import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GitCommit, Star } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import Reveal from '../components/Reveal';
import {
  fetchGitHubOverview,
  fetchContributions,
  type GitHubRepo,
  type ContributionData,
  type GitHubActivity,
} from '../utils/githubApi';

const GITHUB_USERNAME = 'ameer-rah';

// Cream through to blue, so the graph reads on the cream panel.
const LEVEL_COLORS = ['#e7e0d4', '#c9d2f6', '#93a6f0', '#5c79f7', '#3159f4'];

function ContributionGraph({ data }: { data: ContributionData }) {
  const days = data.contributions;
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-ink/15 p-6">
      <p className="text-sm text-ink/60">
        <span className="font-display text-base text-ink">{total.toLocaleString()}</span>{' '}
        contributions in the last year
      </p>
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map(day => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink/50">
        Less
        {LEVEL_COLORS.map(color => (
          <span
            key={color}
            className="inline-block h-[11px] w-[11px] rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        More
      </div>
    </div>
  );
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-ink/10 ${className}`} />;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoError, setRepoError] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [contribs, setContribs] = useState<ContributionData | null>(null);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [activity, setActivity] = useState<GitHubActivity[]>([]);
  const [githubError, setGitHubError] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    fetchGitHubOverview()
      .then(data => {
        setRepos(data.repos);
        setActivity(data.activity);
        setRepoError(!data.reposAvailable);
        setGitHubError(!data.activityAvailable);
      })
      .catch(() => {
        setRepoError(true);
        setGitHubError(true);
      })
      .finally(() => {
        setLoadingRepos(false);
        setLoadingEvents(false);
      });
    fetchContributions(GITHUB_USERNAME)
      .then(setContribs)
      .catch(() => setContribs(null))
      .finally(() => setLoadingContribs(false));
  }, []);

  return (
    <>
      {/* Page header, warm black */}
      <section className="panel flex min-h-[70svh] items-end bg-warmblack text-cream">
        <div className="panel-inner">
          <Reveal>
            <p className="section-eyebrow text-cream/50">003 — Projects</p>
            <h1 className="hero-title mt-6 max-w-4xl">
              Five systems,
              <br />
              and what each one refuses to fake.
            </h1>
            <p className="section-subtext mt-6 max-w-xl text-cream/80">
              Selected work across full-stack development, machine learning, data
              analysis, and systems, plus live activity from my GitHub profile below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Project list, cream */}
      <section className="panel bg-cream text-ink">
        <div className="panel-inner">
          <div className="grid gap-px overflow-hidden rounded-xl bg-ink/15">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 0.05, 0.2)}>
                <article
                  id={`project-${project.id}`}
                  tabIndex={-1}
                  className="scroll-mt-28 bg-cream p-7 sm:p-10"
                >
                  <div className="flex flex-wrap items-baseline gap-5">
                    <span className="display-num text-4xl text-ink/25">
                      {String(i + 1).padStart(3, '0')}
                    </span>
                    <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                      {project.name}
                    </h2>
                  </div>

                  <p className="mt-6 max-w-[68ch] text-[15px] leading-relaxed text-ink/75">
                    {project.description}
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {project.highlights.map(highlight => (
                      <div key={highlight.title} className="border-l-2 border-orange pl-4">
                        <h3 className="text-sm font-semibold text-blue">{highlight.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/70">{highlight.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-6">
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <li
                          key={tech}
                          className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink/70"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline !px-4 !py-2 !text-xs"
                        >
                          Source
                          <ArrowUpRight size={14} strokeWidth={2} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark !px-4 !py-2 !text-xs"
                        >
                          Live
                          <ArrowUpRight size={14} strokeWidth={2} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live GitHub, cream with blue accents */}
      <section className="panel bg-cream text-ink">
        <div className="panel-inner">
          <Reveal>
            <p className="section-eyebrow text-ink/50">Live from GitHub</p>
            {/* Lower clamp floor than .section-title so it still fits on one
                line at phone widths. */}
            <h2 className="section-title mt-4 whitespace-nowrap text-[clamp(1.25rem,5vw,4.5rem)]">
              What I have been pushing.
            </h2>
            <p className="mt-5 text-base text-ink/70">
              Pulled live from{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue"
              >
                @{GITHUB_USERNAME}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            {loadingContribs ? (
              <SkeletonBlock className="h-40 w-full" />
            ) : contribs ? (
              <ContributionGraph data={contribs} />
            ) : (
              <p className="text-sm text-ink/60">Contribution data is temporarily unavailable.</p>
            )}
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem]">
            <div>
              <h3 className="font-display text-xl tracking-tight">Recent repositories</h3>
              {loadingRepos ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[0, 1, 2, 3].map(i => (
                    <SkeletonBlock key={i} className="h-28" />
                  ))}
                </div>
              ) : repoError ? (
                <div className="mt-5 rounded-xl border border-ink/15 p-6">
                  <p className="text-sm text-ink/60">GitHub's live data is temporarily unavailable.</p>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
                  >
                    Browse on GitHub
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </a>
                </div>
              ) : (
                <div className="mt-5 grid gap-px overflow-hidden rounded-xl bg-ink/15 sm:grid-cols-2">
                  {repos.map(repo => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col bg-cream p-5 transition-colors duration-300 hover:bg-yellow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="truncate text-[15px] font-semibold">{repo.name}</h4>
                        {repo.stargazers_count > 0 && (
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-ink/60">
                            <Star size={12} strokeWidth={2} />
                            {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60">
                        {repo.description ?? 'No description provided.'}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-ink/50">
                        {repo.language && <span className="font-medium text-ink/70">{repo.language}</span>}
                        <span>{relativeTime(repo.updated_at)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="h-fit rounded-xl border border-ink/15 p-6">
              <h3 className="font-display text-xl tracking-tight">Recent activity</h3>
              {loadingEvents ? (
                <div className="mt-5 space-y-3">
                  {[0, 1, 2, 3].map(i => (
                    <SkeletonBlock key={i} className="h-10" />
                  ))}
                </div>
              ) : githubError ? (
                <p className="mt-5 text-sm leading-relaxed text-ink/60">
                  Activity is temporarily unavailable.{' '}
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue hover:underline"
                  >
                    View on GitHub
                  </a>
                </p>
              ) : activity.length === 0 ? (
                <p className="mt-5 text-sm text-ink/60">No recent public activity.</p>
              ) : (
                <ul className="mt-5 space-y-4">
                  {activity.map(item => (
                    <li key={item.id} className="flex gap-3">
                      <GitCommit size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-orange" />
                      <div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm leading-snug text-ink/80 hover:text-blue"
                        >
                          {item.text}
                        </a>
                        <p className="mt-0.5 text-xs text-ink/50">{relativeTime(item.createdAt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Closing, blue */}
      <section className="panel bg-blue text-white">
        <div className="panel-inner panel-narrow text-center">
          <Reveal>
            <h2 className="section-title">Something here worth a conversation?</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn btn-light">Get in touch</Link>
              <Link to="/experience" className="btn btn-ghost">See experience</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
