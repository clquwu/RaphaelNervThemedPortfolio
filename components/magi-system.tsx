"use client"

import { useState } from "react"
import { Cpu, Brain, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Skill {
  name: string
  system: string
  confidence: number
  specialty: string
}

interface MagiSystemProps {
  skills: Skill[]
}

export default function MagiSystem({ skills }: MagiSystemProps) {
  const [activeSystem, setActiveSystem] = useState<string>("MELCHIOR")

  const getSystemIcon = (system: string) => {
    switch (system) {
      case "MELCHIOR":
        return <Cpu className="w-6 h-6 text-eva-purple" />
      case "BALTHASAR":
        return <Brain className="w-6 h-6 text-eva-orange" />
      case "CASPER":
        return <Database className="w-6 h-6 text-eva-green" />
      default:
        return <Cpu className="w-6 h-6 text-eva-purple" />
    }
  }

  const getSystemColor = (system: string) => {
    switch (system) {
      case "MELCHIOR":
        return "border-eva-purple/50 bg-eva-purple/10"
      case "BALTHASAR":
        return "border-eva-orange/50 bg-eva-orange/10"
      case "CASPER":
        return "border-eva-green/50 bg-eva-green/10"
      default:
        return "border-eva-purple/50 bg-eva-purple/10"
    }
  }

  const getSystemTextColor = (system: string) => {
    switch (system) {
      case "MELCHIOR":
        return "text-eva-purple"
      case "BALTHASAR":
        return "text-eva-orange"
      case "CASPER":
        return "text-eva-green"
      default:
        return "text-eva-purple"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* MAGI System Selection */}
      <div className="md:col-span-3 flex flex-wrap gap-4 mb-4">
        {skills.map((skill) => (
          <Button
            key={skill.system}
            variant={activeSystem === skill.system ? "default" : "outline"}
            className={`flex-1 ${
              activeSystem === skill.system
                ? getSystemTextColor(skill.system).replace("text", "bg") + " text-white"
                : `border ${getSystemColor(skill.system)} ${getSystemTextColor(skill.system)}`
            }`}
            onClick={() => setActiveSystem(skill.system)}
          >
            {getSystemIcon(skill.system)}
            <span className="ml-2">{skill.system}</span>
          </Button>
        ))}
      </div>

      {/* Active System Display */}
      {skills
        .filter((s) => s.system === activeSystem)
        .map((skill) => (
          <div key={skill.system} className="md:col-span-3">
            <div className={`border ${getSystemColor(skill.system)} rounded-md p-6`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {getSystemIcon(skill.system)}
                  <div className="ml-3">
                    <div className={`text-xl font-bold ${getSystemTextColor(skill.system)}`}>{skill.system}</div>
                    <div className="text-eva-light/70 text-sm">{skill.name} SUBSYSTEM</div>
                  </div>
                </div>
                <div className="bg-black/50 px-3 py-1 rounded border border-eva-light/20">
                  <div className="text-xs text-eva-light/70">CONFIDENCE</div>
                  <div className={`text-lg ${getSystemTextColor(skill.system)}`}>{skill.confidence}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-eva-light mb-4">SYSTEM OVERVIEW</h3>
                  <div className="space-y-4">
                    <div className="bg-black/50 p-4 rounded border border-eva-light/20">
                      <div className="text-sm text-eva-light/70 mb-1">SPECIALTY</div>
                      <div className="text-eva-light">{skill.specialty}</div>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-eva-light/20">
                      <div className="text-sm text-eva-light/70 mb-1">STATUS</div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-eva-green mr-2"></div>
                        <span className="text-eva-green">OPERATIONAL</span>
                      </div>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-eva-light/20">
                      <div className="text-sm text-eva-light/70 mb-1">LAST MAINTENANCE</div>
                      <div className="text-eva-light">2025-05-15T08:32:17Z</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-eva-light mb-4">PERFORMANCE METRICS</h3>
                  <div className="space-y-4">
                    {/* Simulated metrics based on the skill */}
                    {[
                      { name: "Code Quality", value: Math.floor(skill.confidence * 0.95) },
                      {
                        name: "Problem Solving",
                        value: Math.floor(skill.confidence * 1.02) > 100 ? 100 : Math.floor(skill.confidence * 1.02),
                      },
                      { name: "System Architecture", value: Math.floor(skill.confidence * 0.98) },
                      { name: "Optimization", value: Math.floor(skill.confidence * 0.93) },
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-eva-light/70">{metric.name}</div>
                          <div className={`text-sm ${getSystemTextColor(skill.system)}`}>{metric.value}%</div>
                        </div>
                        <div className="w-full h-1 bg-eva-dark-secondary rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full ${getSystemTextColor(skill.system).replace("text", "bg")}`}
                            style={{ width: `${metric.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button className={`w-full ${getSystemTextColor(skill.system).replace("text", "bg")} text-white`}>
                      VIEW DETAILED ANALYSIS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
