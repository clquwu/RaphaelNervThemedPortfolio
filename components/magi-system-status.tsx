"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, XCircle, Activity, Cpu, Database, Zap } from "lucide-react"

interface SystemData {
  status: "operational" | "warning" | "critical"
  syncRate: number
  processingLoad: number
  temperature: number
  memoryUsage: number
  decision: "approve" | "deny" | "analyzing"
}

const MAGI_SYSTEMS = [
  {
    name: "MELCHIOR",
    id: "melchior",
    color: "text-nerv-red",
    bgColor: "bg-nerv-red/10",
    borderColor: "border-nerv-red/30",
    personality: "Scientist",
    core: "Logical Analysis"
  },
  {
    name: "BALTHASAR",
    id: "balthasar", 
    color: "text-nerv-orange",
    bgColor: "bg-nerv-orange/10",
    borderColor: "border-nerv-orange/30",
    personality: "Mother",
    core: "Emotional Balance"
  },
  {
    name: "CASPER",
    id: "casper",
    color: "text-nerv-light",
    bgColor: "bg-nerv-light/10",
    borderColor: "border-nerv-light/30",
    personality: "Woman",
    core: "Social Dynamics"
  }
]

export default function MagiSystemStatus() {
  const [systemData, setSystemData] = useState<Record<string, SystemData>>({
    melchior: {
      status: "operational",
      syncRate: 98.7,
      processingLoad: 76,
      temperature: 23.4,
      memoryUsage: 82,
      decision: "approve"
    },
    balthasar: {
      status: "operational", 
      syncRate: 97.2,
      processingLoad: 71,
      temperature: 24.1,
      memoryUsage: 79,
      decision: "approve"
    },
    casper: {
      status: "warning",
      syncRate: 95.8,
      processingLoad: 89,
      temperature: 26.7,
      memoryUsage: 91,
      decision: "deny"
    }
  })

  const [conflictDetected, setConflictDetected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => {
        const newData = { ...prev }
        
        // Randomly update each system
        Object.keys(newData).forEach(key => {
          const system = newData[key]
          
          // Small random fluctuations
          system.syncRate += (Math.random() - 0.5) * 2
          system.processingLoad += (Math.random() - 0.5) * 10
          system.temperature += (Math.random() - 0.5) * 1
          system.memoryUsage += (Math.random() - 0.5) * 5
          
          // Clamp values
          system.syncRate = Math.max(85, Math.min(100, system.syncRate))
          system.processingLoad = Math.max(0, Math.min(100, system.processingLoad))
          system.temperature = Math.max(20, Math.min(40, system.temperature))
          system.memoryUsage = Math.max(0, Math.min(100, system.memoryUsage))
          
          // Update status based on values
          if (system.temperature > 30 || system.memoryUsage > 95 || system.syncRate < 90) {
            system.status = "critical"
          } else if (system.temperature > 25 || system.memoryUsage > 85 || system.syncRate < 95) {
            system.status = "warning"
          } else {
            system.status = "operational"
          }
          
          // Occasionally create conflicts
          if (Math.random() < 0.1) {
            const decisions = ["approve", "deny", "analyzing"]
            system.decision = decisions[Math.floor(Math.random() * decisions.length)] as any
          }
        })
        
        // Check for conflicts
        const decisions = Object.values(newData).map(s => s.decision)
        const uniqueDecisions = new Set(decisions)
        setConflictDetected(uniqueDecisions.size > 1)
        
        setLastUpdate(new Date())
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-nerv-light" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-nerv-orange" />
      case "critical":
        return <XCircle className="w-5 h-5 text-nerv-red" />
      default:
        return <Activity className="w-5 h-5 text-nerv-light/50" />
    }
  }

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "approve":
        return "text-nerv-light"
      case "deny":
        return "text-nerv-red"
      case "analyzing":
        return "text-nerv-orange"
      default:
        return "text-nerv-light/50"
    }
  }

  return (
    <div className="bg-nerv-dark border border-nerv-red/30 rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Cpu className="w-6 h-6 text-nerv-red mr-3" />
          <h2 className="text-2xl font-matisse eva-compressed text-nerv-red">MAGI SYSTEM STATUS</h2>
        </div>
        
        {conflictDetected && (
          <div className="flex items-center px-3 py-1 bg-nerv-red/20 border border-nerv-red/40 rounded animate-pulse">
            <AlertTriangle className="w-4 h-4 text-nerv-red mr-2" />
            <span className="text-nerv-red text-sm font-helvetica">CONSENSUS CONFLICT</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {MAGI_SYSTEMS.map((magi) => {
          const data = systemData[magi.id]
          return (
            <div
              key={magi.id}
              className={`${magi.bgColor} ${magi.borderColor} border rounded-lg p-5`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Database className={`w-5 h-5 ${magi.color} mr-2`} />
                  <h3 className={`text-lg font-matisse eva-compressed ${magi.color}`}>
                    {magi.name}
                  </h3>
                </div>
                {getStatusIcon(data.status)}
              </div>

              <div className="space-y-3">
                <div className="text-xs text-nerv-light/70 font-helvetica mb-2">
                  <div>CORE: {magi.core}</div>
                  <div>TYPE: {magi.personality}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-nerv-light/70 font-helvetica">SYNC RATE</span>
                    <span className={`text-sm font-futura ${magi.color}`}>
                      {data.syncRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-nerv-black rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${magi.id === 'melchior' ? 'bg-nerv-red' : magi.id === 'balthasar' ? 'bg-nerv-orange' : 'bg-nerv-light'}`}
                      style={{ width: `${data.syncRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-nerv-light/70 font-helvetica">CPU LOAD</div>
                    <div className={`${magi.color} font-futura`}>{data.processingLoad.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-nerv-light/70 font-helvetica">TEMP</div>
                    <div className={`${magi.color} font-futura`}>{data.temperature.toFixed(1)}°C</div>
                  </div>
                  <div>
                    <div className="text-nerv-light/70 font-helvetica">MEMORY</div>
                    <div className={`${magi.color} font-futura`}>{data.memoryUsage.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-nerv-light/70 font-helvetica">STATUS</div>
                    <div className={`${data.status === 'operational' ? 'text-nerv-light' : data.status === 'warning' ? 'text-nerv-orange' : 'text-nerv-red'} font-futura uppercase`}>
                      {data.status}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-nerv-light/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-nerv-light/70 font-helvetica">DECISION</span>
                    <span className={`text-sm font-futura uppercase ${getDecisionColor(data.decision)}`}>
                      {data.decision}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-nerv-red/20 pt-4">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center text-nerv-light/50 font-helvetica">
            <Zap className="w-3 h-3 mr-1" />
            SYSTEM CONSENSUS: {conflictDetected ? 'DIVERGENT' : 'UNIFIED'}
          </div>
          <div className="text-nerv-light/50 font-helvetica">
            LAST UPDATE: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}