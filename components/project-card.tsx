import Image from "next/image"
import { Github, ExternalLink, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectProps {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  featured: boolean
}

interface ProjectCardProps {
  project: ProjectProps
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="bg-nerv-dark border border-nerv-red/30 rounded-md overflow-hidden group hover:border-nerv-red transition-colors">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-nerv-black to-transparent z-10"></div>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-nerv-black/80 px-2 py-1 rounded z-20 border border-nerv-red/30">
          <div className="text-xs text-nerv-red font-futura">{project.id}</div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-matisse eva-compressed text-nerv-light mb-2 group-hover:text-nerv-red transition-colors">
          {project.title}
        </h3>
        <p className="text-nerv-light/70 text-sm mb-4 line-clamp-3 font-helvetica">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-nerv-red/10 border border-nerv-red/30 rounded text-nerv-light font-futura"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-nerv-red/50 text-nerv-red hover:bg-nerv-red/10 font-helvetica"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </a>
          )}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-nerv-red hover:bg-nerv-red/80 text-white font-helvetica">
              <ExternalLink className="w-4 h-4 mr-2" />
              Project Link
            </Button>
          </a>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-nerv-red/20 bg-nerv-black/50 flex justify-between items-center">
        <div className="flex items-center">
          <AlertTriangle className="w-3 h-3 text-nerv-orange mr-1" />
          <span className="text-xs text-nerv-orange font-helvetica">SECURITY LEVEL {index + 1}</span>
        </div>
        <div className="text-xs text-nerv-light/50 font-futura">DEPLOYMENT: ACTIVE</div>
      </div>
    </div>
  )
}