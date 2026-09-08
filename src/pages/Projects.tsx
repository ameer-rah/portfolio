import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitCommit, Star } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import Reveal from '../components/Reveal';
import { FeatureShaderBackdrop } from '../components/ui/feature-shader-card';
import {
  fetchGitHubOverview,
  fetchContributions,
  type GitHubRepo,
  type ContributionData,
  type GitHubActivity,
} from '../utils/githubApi';

const VantaTopology = lazy(() => import('../components/VantaTopology'));

const GITHUB_USERNAME = 'ameer-rah';

const LEVEL_COLORS_LIGHT = ['#eee9dc', '#dce8b6', '#9ebd78', '#4c8969', '#174f3a'];

function ContributionGraph({ data }: { data: ContributionData }) {
  const levelColors = LEVEL_COLORS_LIGHT;
  const days = data.contributions;
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-stone-200 bg-raised p-5 shadow-[0_14px_35px_-28px_rgba(16,37,29,0.5)] sm:p-6">
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
                  style={{ backgroundColor: levelColors[day.level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-400">
        Less
        {levelColors.map((color) => (
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
  return <div className={`animate-pulse rounded-lg bg-stone-200/70 ${className}`} />;
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
      .then((data) => {
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
      {/* Featured projects */}
      <section className="relative overflow-hidden">
        <Suspense
          fallback={<div className="absolute inset-0 bg-[#f3efe3]" aria-hidden />}
        >
          <VantaTopology className="absolute inset-0" />
        </Suspense>
        <div className="absolute inset-0 bg-paper/10" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <h1 className="font-accent text-4xl font-bold italic text-brg sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-stone-600">
            Selected work across full-stack development, machine learning, data
            analysis, and security, plus live activity from my GitHub profile
            below.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.08, 0.24)}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-7 sm:p-9"
              >
                <FeatureShaderBackdrop variant={i} />
                <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">
                  {project.name}
                </h2>
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
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* GitHub activity */}
      <section className="border-t border-stone-200 bg-surface">
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
                <div className="mt-5 rounded-xl border border-stone-200 bg-raised p-5">
                  <p className="text-sm text-stone-500">GitHub's live data is temporarily unavailable.</p>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brg hover:underline"
                  >
                    View repositories on GitHub <ArrowUpRight size={14} />
                  </a>
                </div>
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
                        className="group flex h-full flex-col rounded-xl border border-stone-200 bg-raised p-5 transition-colors hover:border-brg"
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

            <div className="h-fit rounded-xl border border-stone-200 bg-raised p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-ink">Recent activity</h3>
              {loadingEvents ? (
                <div className="mt-5 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-10" />
                  ))}
                </div>
              ) : githubError ? (
                <p className="mt-5 text-sm leading-relaxed text-stone-500">
                  Live activity is temporarily unavailable.{' '}
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brg hover:underline"
                  >
                    View GitHub profile
                  </a>
                </p>
              ) : activity.length === 0 ? (
                <p className="mt-5 text-sm text-stone-500">No recent public activity.</p>
              ) : (
                <ul className="mt-5 space-y-4">
                  {activity.slice(0, 6).map((item, i) => (
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
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm leading-snug text-stone-700 hover:text-brg"
                        >
                          {item.text}
                        </a>
                        <p className="mt-0.5 text-xs text-stone-400">{relativeTime(item.createdAt)}</p>
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
