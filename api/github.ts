import type { VercelRequest, VercelResponse } from '@vercel/node';
import { XMLParser } from 'fast-xml-parser';

const USERNAME = 'ameer-rah';
const GITHUB_API = 'https://api.github.com';

type TextNode = string | { '#text': string };

type FeedEntry = {
  id: string;
  title: TextNode;
  published: string;
  link: { '@_href': string };
  content?: TextNode;
};

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function textContent(value: TextNode | undefined): string {
  if (!value) return '';
  return typeof value === 'string' ? value : value['#text'];
}

function describeEntry(entry: FeedEntry) {
  const title = textContent(entry.title).replace(`${USERNAME} `, '');
  const commitMatch = textContent(entry.content).match(/(\d+) commits? to/i);

  return {
    id: entry.id,
    text: commitMatch && title.startsWith('pushed ')
      ? `Pushed ${commitMatch[1]} commit${commitMatch[1] === '1' ? '' : 's'} to ${title.slice(7)}`
      : title.charAt(0).toUpperCase() + title.slice(1),
    createdAt: entry.published,
    url: entry.link['@_href'],
  };
}

export default async function handler(_request: VercelRequest, response: VercelResponse) {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'ameer-rahman-portfolio',
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [reposResponse, activityResponse] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=pushed&per_page=12&type=public`, { headers }),
      fetch(`https://github.com/${USERNAME}.atom`, {
        headers: { 'User-Agent': 'ameer-rahman-portfolio' },
      }),
    ]);

    const repos = reposResponse.ok
      ? (await reposResponse.json()) as Array<{ fork: boolean }>
      : [];
    let activity: ReturnType<typeof describeEntry>[] = [];
    if (activityResponse.ok) {
      const xml = await activityResponse.text();
      const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml) as {
        feed?: { entry?: FeedEntry | FeedEntry[] };
      };
      activity = asArray(parsed.feed?.entry).slice(0, 8).map(describeEntry);
    }

    if (!reposResponse.ok && !activityResponse.ok) {
      throw new Error(`GitHub upstream failed: repos ${reposResponse.status}, activity ${activityResponse.status}`);
    }

    response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    response.status(200).json({
      repos: repos.filter((repo) => !repo.fork).slice(0, 6),
      activity,
      reposAvailable: reposResponse.ok,
      activityAvailable: activityResponse.ok,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    response.status(502).json({ error: 'GitHub data is temporarily unavailable.' });
  }
}
