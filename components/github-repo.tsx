import { Github, Star, GitFork } from "lucide-react"

interface GithubRepoProps {
  repo: {
    name: string
    description: string
    language: string
    stars: number
    forks: number
    url: string
  }
}

export default function GithubRepo({ repo }: GithubRepoProps) {
  const getLanguageColor = (language: string) => {
    switch (language) {
      case "JavaScript":
        return "bg-yellow-400"
      case "TypeScript":
        return "bg-blue-500"
      case "Python":
        return "bg-green-500"
      case "React":
        return "bg-cyan-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-nerv-dark border border-nerv-red/30 rounded-md p-5 hover:border-nerv-red transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Github className="w-5 h-5 text-nerv-red mr-3" />
          <h3 className="text-lg font-matisse eva-compressed text-nerv-light">{repo.name}</h3>
        </div>
        <div className="flex items-center space-x-3 text-nerv-light/70">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span className="text-sm font-futura">{repo.stars}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            <span className="text-sm font-futura">{repo.forks}</span>
          </div>
        </div>
      </div>

      <p className="text-nerv-light/70 text-sm mt-3 mb-4 line-clamp-2 font-helvetica">{repo.description}</p>

      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></div>
        <span className="text-xs text-nerv-light/70 font-helvetica">{repo.language}</span>
      </div>
    </a>
  )
}
