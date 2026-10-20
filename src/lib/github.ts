import { siteConfig } from "@/lib/constants";

/**
 * GitHub numbers for the home page, fetched while the site is built.
 *
 * The site is a static export, so nothing here runs in a visitor's browser: the
 * figures are as fresh as the last deploy, and `fetchedAt` says when that was.
 * If GitHub cannot be reached the snapshot is null and the page falls back to a
 * plain link, so a rate limit never ships wrong or empty numbers.
 *
 * Set GITHUB_TOKEN (server-side only, never NEXT_PUBLIC_) to avoid the anonymous
 * rate limit on shared CI addresses.
 */

export interface ContributionDay {
  date: string;
  count: number;
  /** 0 (none) to 4 (most), as GitHub's contribution graph buckets them. */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageShare {
  name: string;
  repos: number;
  color: string;
}

export interface TopRepo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  languageColor: string;
  stars: number;
}

export interface GithubSnapshot {
  handle: string;
  profileUrl: string;
  followers: number;
  /** Repositories you created, forks excluded. */
  originalRepos: number;
  /** Stars across those repositories. */
  stars: number;
  contributionsLastYear: number | null;
  days: ContributionDay[];
  languages: LanguageShare[];
  topRepos: TopRepo[];
  fetchedAt: string;
}

interface ApiUser {
  followers: number;
}

interface ApiRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

/** GitHub's own language colours, for the languages that appear in the repos. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#da5b0b",
  "Jupyter Notebook": "#da5b0b",
  Dockerfile: "#384d54",
};
const FALLBACK_COLOR = "#8a8880";
const languageColor = (name: string | null) => (name && LANGUAGE_COLORS[name]) || FALLBACK_COLOR;

async function getJson<T>(url: string, authenticated = false): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-build",
  };
  if (authenticated && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`${url} responded ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getGithubSnapshot(): Promise<GithubSnapshot | null> {
  const handle = siteConfig.links.github.split("/").filter(Boolean).pop();
  if (!handle) return null;

  try {
    const [user, repos] = await Promise.all([
      getJson<ApiUser>(`https://api.github.com/users/${handle}`, true),
      getJson<ApiRepo[]>(`https://api.github.com/users/${handle}/repos?per_page=100&type=owner`, true),
    ]);

    // The contribution calendar is a convenience: if it fails, keep everything else.
    const contributions = await getJson<ContributionsResponse>(
      `https://github-contributions-api.jogruber.de/v4/${handle}?y=last`,
    ).catch((error) => {
      console.warn(`[github] contribution graph unavailable: ${error.message}`);
      return null;
    });

    // Forks are other people's work, and the profile README repo is not a project.
    const original = repos.filter((repo) => !repo.fork && !repo.archived && repo.name !== handle);

    const tally = new Map<string, number>();
    for (const repo of original) {
      if (repo.language) tally.set(repo.language, (tally.get(repo.language) ?? 0) + 1);
    }

    return {
      handle,
      profileUrl: `https://github.com/${handle}`,
      followers: user.followers,
      originalRepos: original.length,
      stars: original.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      contributionsLastYear: contributions?.total.lastYear ?? null,
      days: contributions?.contributions ?? [],
      languages: [...tally.entries()]
        .map(([name, count]) => ({ name, repos: count, color: languageColor(name) }))
        .sort((a, b) => b.repos - a.repos),
      topRepos: [...original]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          languageColor: languageColor(repo.language),
          stars: repo.stargazers_count,
        })),
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(`[github] snapshot unavailable, falling back to a plain link: ${(error as Error).message}`);
    return null;
  }
}
