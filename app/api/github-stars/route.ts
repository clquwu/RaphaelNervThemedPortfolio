import { NextRequest, NextResponse } from 'next/server'

interface GitHubRepo {
  name: string
  stargazers_count: number
  forks_count: number
}

interface CachedData {
  data: Record<string, { stars: number; forks: number }>
  timestamp: number
}

let cache: CachedData | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

const REPOS = [
  'Kotatsu-Redo/Kotatsu-Redo',
  'clquwu/Cosmos-Music-Player',
  'clquwu/PianoSync'
]

const DEFAULT_STATS: Record<string, { stars: number; forks: number }> = {
  'Kotatsu-Redo/Kotatsu-Redo': { stars: 96, forks: 8 },
  'clquwu/Cosmos-Music-Player': { stars: 26, forks: 0 },
  'clquwu/PianoSync': { stars: 0, forks: 0 }
}

async function fetchGitHubStars(): Promise<Record<string, { stars: number; forks: number }>> {
  const results: Record<string, { stars: number; forks: number }> = {}

  for (const repo of REPOS) {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      })

      if (response.ok) {
        const data: GitHubRepo = await response.json()
        results[repo] = {
          stars: data.stargazers_count,
          forks: data.forks_count
        }
      } else {
        console.error(`Failed to fetch ${repo}: ${response.status}`)
        // Fallback to last known static values
        results[repo] = DEFAULT_STATS[repo] ?? { stars: 0, forks: 0 }
      }
    } catch (error) {
      console.error(`Error fetching ${repo}:`, error)
      // Fallback to last known static values
      results[repo] = DEFAULT_STATS[repo] ?? { stars: 0, forks: 0 }
    }
  }

  return results
}

export async function GET(request: NextRequest) {
  try {
    const now = Date.now()

    // Check if we have valid cached data
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cache.data)
    }

    // Fetch fresh data
    const data = await fetchGitHubStars()

    // Update cache
    cache = {
      data,
      timestamp: now
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GitHub stars API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stars' },
      { status: 500 }
    )
  }
}