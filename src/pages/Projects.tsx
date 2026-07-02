import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitCommit, Star } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import Reveal from '../components/Reveal';
import {
  fetchUserRepos,
  fetchContributions,
  fetchUserEvents,
  type GitHubRepo,
  type ContributionData,
  type GitHubEvent,
} from '../utils/githubApi';

const VantaTopology = lazy(() => import('../components/VantaTopology'));

const GITHUB_USERNAME = 'ameer-rah';

const LEVEL_COLORS = ['#e7e5e4', '#b7d4c3', '#6faa8a', '#2e7d55', '#004225'];

function ContributionGraph({ data }: { data: ContributionData }) {
  const days = data.contributions;
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);

  return (
    <div>
      <p className="text-sm text-stone-500">
        <span className="font-semibold text-ink">{total.toLocaleString()}</span>{' '}
        contributions in the last year
      </p>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
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
      <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-400">
        Less
        {LEVEL_COLORS.map((color) => (
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

function describeEvent(event: GitHubEvent): string | null {
  const repo = event.repo.name.split('/')[1] ?? event.repo.name;
  switch (event.type) {
    case 'PushEvent': {
      const commits = (event.payload.commits as unknown[] | undefined)?.length ?? 0;
      return `Pushed ${commits} commit${commits === 1 ? '' : 's'} to ${repo}`;
    }
    case 'CreateEvent':
      return `Created ${event.payload.ref_type ?? 'repository'} in ${repo}`;
    case 'PullRequestEvent':
      return `${event.payload.action === 'closed' ? 'Closed' : 'Opened'} a pull request in ${repo}`;
    case 'IssuesEvent':
      return `${event.payload.action === 'closed' ? 'Closed' : 'Opened'} an issue in ${repo}`;
    case 'WatchEvent':
      return `Starred ${event.repo.name}`;
    case 'ForkEvent':
      return `Forked ${event.repo.name}`;
    default:
      return null;
  }
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
  return <div className={`animate-pulse rounded-lg bg-stone-200/70 ${className}`} />;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoError, setRepoError] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [contribs, setContribs] = useState<ContributionData | null>(null);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    fetchUserRepos(GITHUB_USERNAME)
      .then(setRepos)
      .catch(() => setRepoError(true))
      .finally(() => setLoadingRepos(false));
    fetchContributions(GITHUB_USERNAME)
      .then(setContribs)
      .catch(() => setContribs(null))
      .finally(() => setLoadingContribs(false));
    fetchUserEvents(GITHUB_USERNAME)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoadingEvents(false));
  }, []);

  const activity = events
    .map((e) => ({ id: e.id, text: describeEvent(e), when: relativeTime(e.created_at) }))
    .filter((e): e is { id: string; text: string; when: string } => e.text !== null)
    .slice(0, 6);

  return (
    <>
      {/* Featured projects */}
      <section className="relative overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#e7e2d8]" aria-hidden />}>
          <VantaTopology className="absolute inset-0" />
        </Suspense>
        <div className="absolute inset-0 bg-paper/10" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <h1 className="font-accent text-4xl font-bold italic text-brg sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600">
            Selected work across full-stack development and security, plus live
            activity from my GitHub profile below.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.08, 0.24)}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-stone-200 bg-white p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">
                    {project.name}
                  </h2>
                  <span className="rounded-md bg-brg-soft px-2.5 py-1 text-xs font-medium text-brg">
                    {project.type}
                  </span>
                </div>
                <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-stone-600">
                  {project.description}
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {project.highlights.map((highlight) => (
                    <div key={highlight.title} className="border-l-2 border-brg-soft pl-4">
                      <h3 className="text-sm font-semibold text-brg">{highlight.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                        {highlight.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-6">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-5 text-sm font-medium">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brg transition-colors hover:text-brg-bright"
                      >
                        GitHub <ArrowUpRight size={14} strokeWidth={2} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brg transition-colors hover:text-brg-bright"
                      >
                        Live site <ArrowUpRight size={14} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* GitHub activity */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              On GitHub
            </h2>
            <p className="mt-3 text-base text-stone-600">
              Live data from{' '}
              <a
                href="https://github.com/ameer-rah"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brg underline-offset-4 hover:underline"
              >
                github.com/ameer-rah
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            {loadingContribs ? (
              <SkeletonBlock className="h-32 w-full" />
            ) : contribs ? (
              <ContributionGraph data={contribs} />
            ) : (
              <p className="text-sm text-stone-500">
                Contribution data is unavailable right now.
              </p>
            )}
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <h3 className="text-lg font-semibold text-ink">Recent repositories</h3>
              {loadingRepos ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-28" />
                  ))}
                </div>
              ) : repoError ? (
                <p className="mt-5 text-sm text-stone-500">
                  Couldn't load repositories from GitHub. Try again later.
                </p>
              ) : (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {repos.slice(0, 6).map((repo, i) => (
                    <Reveal key={repo.id} delay={Math.min(i * 0.05, 0.2)}>
                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="group flex h-full flex-col rounded-xl border border-stone-200 p-5 transition-colors hover:border-brg"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate text-[15px] font-semibold text-ink group-hover:text-brg">
                            {repo.name}
                          </h4>
                          {repo.stargazers_count > 0 && (
                            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-stone-500">
                              <Star size={12} strokeWidth={1.75} />
                              {repo.stargazers_count}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
                          {repo.description ?? 'No description yet.'}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-xs text-stone-400">
                          {repo.language && (
                            <span className="font-medium text-stone-500">{repo.language}</span>
                          )}
                          <span>Updated {relativeTime(repo.updated_at)}</span>
                        </div>
                      </motion.a>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-ink">Recent activity</h3>
              {loadingEvents ? (
                <div className="mt-5 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-10" />
                  ))}
                </div>
              ) : activity.length === 0 ? (
                <p className="mt-5 text-sm text-stone-500">No recent public activity.</p>
              ) : (
                <ul className="mt-5 space-y-4">
                  {activity.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                      className="flex gap-3"
                    >
                      <GitCommit
                        size={16}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-brg-bright"
                      />
                      <div>
                        <p className="text-sm leading-snug text-stone-700">{item.text}</p>
                        <p className="mt-0.5 text-xs text-stone-400">{item.when}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
