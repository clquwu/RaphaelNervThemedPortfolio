export type RepoStats = { stars: number; forks: number }

export const TRACKED_REPOS = [
  "clquwu/Clarity-OMR-Train",
  "clquwu/Cosmos-Music-Player",
  "Kotatsu-Redo/Kotatsu-Redo",
  "clquwu/PianoSync",
] as const

// Last known values, used when the GitHub API is unreachable or rate limited.
const FALLBACK: Record<string, RepoStats> = {
  "Kotatsu-Redo/Kotatsu-Redo": { stars: 96, forks: 8 },
  "clquwu/Cosmos-Music-Player": { stars: 26, forks: 0 },
  "clquwu/PianoSync": { stars: 0, forks: 0 },
  "clquwu/Clarity-OMR-Train": { stars: 0, forks: 0 },
}

/** Star and fork counts, fetched on the server and revalidated hourly. */
export async function getRepoStats(): Promise<Record<string, RepoStats>> {
  const entries = await Promise.all(
    TRACKED_REPOS.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(5000),
        })
        if (!res.ok) throw new Error(String(res.status))
        const data = (await res.json()) as { stargazers_count: number; forks_count: number }
        return [repo, { stars: data.stargazers_count, forks: data.forks_count }] as const
      } catch {
        return [repo, FALLBACK[repo] ?? { stars: 0, forks: 0 }] as const
      }
    }),
  )
  return Object.fromEntries(entries)
}
