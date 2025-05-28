"use client"

import { useState } from "react"
import Image from "next/image"
import { Shield, Code, ExternalLink, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  status: string
  threat: string
  image: string
}

interface ProjectEntryProps {
  project: Project
  index: number
}

export default function ProjectEntry({ project, index }: ProjectEntryProps) {
  const [expanded, setExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DEPLOYED":
        return "text-eva-green"
      case "ACTIVE":
        return "text-eva-orange"
      case "UNSTABLE":
        return "text-eva-red"
      default:
        return "text-eva-light"
    }
  }

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "LOW":
        return "text-eva-green"
      case "MEDIUM":
        return "text-eva-orange"
      case "HIGH":
        return "text-eva-red"
      default:
        return "text-eva-light"
    }
  }

  return (
    <div
      className={`border rounded-md overflow-hidden ${
        index % 3 === 0
          ? "border-eva-purple/30 bg-eva-purple/5"
          : index % 3 === 1
            ? "border-eva-green/30 bg-eva-green/5"
            : "border-eva-orange/30 bg-eva-orange/5"
      }`}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <Shield
            className={`w-5 h-5 mr-3 ${
              index % 3 === 0 ? "text-eva-purple" : index % 3 === 1 ? "text-eva-green" : "text-eva-orange"
            }`}
          />
          <div>
            <div className="text-xs text-eva-light/70">{project.id}</div>
            <div className="text-eva-light font-bold">{project.title}</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-xs text-eva-light/70">STATUS</div>
            <div className={`text-sm ${getStatusColor(project.status)}`}>{project.status}</div>
          </div>
          <div>
            <div className="text-xs text-eva-light/70">THREAT</div>
            <div className={`text-sm ${getThreatColor(project.threat)}`}>{project.threat}</div>
          </div>
          {expanded ? <ChevronUp className="text-eva-light" /> : <ChevronDown className="text-eva-light" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-eva-light/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="text-eva-light/80">{project.description}</div>

              <div>
                <div className="text-xs text-eva-light/70 mb-2">TECHNOLOGY STACK</div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <div
                      key={i}
                      className={`px-2 py-1 text-xs rounded ${
                        index % 3 === 0
                          ? "bg-eva-purple/20 text-eva-purple"
                          : index % 3 === 1
                            ? "bg-eva-green/20 text-eva-green"
                            : "bg-eva-orange/20 text-eva-orange"
                      }`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <Button
                  variant="outline"
                  className={`${
                    index % 3 === 0
                      ? "border-eva-purple text-eva-purple hover:bg-eva-purple/20"
                      : index % 3 === 1
                        ? "border-eva-green text-eva-green hover:bg-eva-green/20"
                        : "border-eva-orange text-eva-orange hover:bg-eva-orange/20"
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  VIEW CODE
                </Button>
                <Button
                  className={`${
                    index % 3 === 0
                      ? "bg-eva-purple hover:bg-eva-purple/80"
                      : index % 3 === 1
                        ? "bg-eva-green hover:bg-eva-green/80"
                        : "bg-eva-orange hover:bg-eva-orange/80"
                  } text-white`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  LIVE DEMO
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/50 to-transparent z-10"></div>
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded z-20 flex items-center">
                <AlertTriangle className="w-3 h-3 text-eva-red mr-1" />
                <span className="text-xs text-eva-red">CLASSIFIED</span>
              </div>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          <div className="bg-black/50 p-3 border-t border-eva-light/10 text-xs text-eva-light/50 flex justify-between">
            <div>DEPLOYMENT DATE: 2025-03-{15 + index}</div>
            <div>SECURITY CLEARANCE: LEVEL {3 - (index % 3)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
