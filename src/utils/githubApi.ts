

const GITHUB_OWNER = "aidanandrews22";
const GITHUB_REPO = "aidanandrews22.github.io";
const GITHUB_BRANCH = "main";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`;
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repos for ${username}: ${response.status} ${response.statusText}`);
  }

  const repos: GitHubRepo[] = await response.json();
  return repos.filter((r) => !r.fork);
}

export async function fetchGitHubFile(path: string): Promise<string> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
  
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  
  if (data.content && data.encoding === "base64") {
    return atob(data.content.replace(/\s/g, ""));
  }
  
  throw new Error(`Unexpected encoding for ${path}`);
}

export async function fetchGitHubJson<T>(path: string): Promise<T> {
  const content = await fetchGitHubFile(path);
  return JSON.parse(content) as T;
}

export async function fetchGitHubText(path: string): Promise<string> {
  return fetchGitHubFile(path);
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
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Contributions fetch failed: ${res.status}`);
  return res.json() as Promise<ContributionData>;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
}

export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const url = `https://api.github.com/users/${username}/events/public?per_page=30`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github.v3+json' } });
  if (!res.ok) throw new Error(`Events fetch failed: ${res.status}`);
  return res.json() as Promise<GitHubEvent[]>;
}

