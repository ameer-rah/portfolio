export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`;
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repos for ${username}: ${response.status} ${response.statusText}`);
  }

  const repos: GitHubRepo[] = await response.json();
  return repos.filter((r) => !r.fork);
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  contributions: ContributionDay[];
  total: Record<string, number>;
}

export async function fetchContributions(username: string): Promise<ContributionData> {
  const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Contributions fetch failed: ${res.status}`);
  return res.json() as Promise<ContributionData>;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
  commitCount?: number;
}

export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const url = `https://api.github.com/users/${username}/events/public?per_page=30`;
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Events fetch failed: ${res.status}`);
  const events = (await res.json()) as GitHubEvent[];

  return Promise.all(
    events.map(async (event) => {
      if (event.type !== 'PushEvent') return event;

      const before = event.payload.before;
      const head = event.payload.head;
      if (typeof before !== 'string' || typeof head !== 'string') return event;

      try {
        const compareUrl = `https://api.github.com/repos/${event.repo.name}/compare/${before}...${head}`;
        const compareRes = await fetch(compareUrl, {
          headers: { Accept: 'application/vnd.github+json' },
          cache: 'no-store',
        });
        if (!compareRes.ok) return event;
        const comparison = (await compareRes.json()) as { total_commits?: number };
        return typeof comparison.total_commits === 'number'
          ? { ...event, commitCount: comparison.total_commits }
          : event;
      } catch {
        return event;
      }
    }),
  );
}
