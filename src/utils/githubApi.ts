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

export interface GitHubActivity {
  id: string;
  text: string;
  createdAt: string;
  url: string;
}

export interface GitHubOverview {
  repos: GitHubRepo[];
  activity: GitHubActivity[];
  reposAvailable: boolean;
  activityAvailable: boolean;
  updatedAt: string;
}

let overviewRequest: Promise<GitHubOverview> | null = null;

export function fetchGitHubOverview(): Promise<GitHubOverview> {
  if (!overviewRequest) {
    overviewRequest = fetch('/api/github').then((response) => {
      if (!response.ok) throw new Error(`GitHub overview failed: ${response.status}`);
      return response.json() as Promise<GitHubOverview>;
    });
  }
  return overviewRequest;
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
